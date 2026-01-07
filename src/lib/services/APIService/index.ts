'use client';

import type { Fetcher, SWRConfiguration } from 'swr';
import useSWR, { mutate, SWRConfig } from 'swr';
import type { SWRInfiniteKeyLoader, SWRInfiniteResponse } from 'swr/infinite';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite';

export { mutate, SWRConfig, useSWR as useFetch };
export {
  unstable_serialize as infiniteMutate,
  useSWRInfinite as useInfiniteFetch,
};

export const mutateByKey = (expectedKey: string) =>
  mutate((key) => typeof key === 'string' && key.startsWith(expectedKey));

export * from './types';
export * from './utils';

export type { Fetcher, SWRConfiguration };
export type {
  SWRInfiniteKeyLoader as InfiniteKey,
  SWRInfiniteResponse as InfiniteResponse,
};
export { default as useMutation } from 'swr/mutation';
type RequestOptions = {
  file?: boolean;
};

export class APIServiceClass {
  baseURL: string;
  token: string;
  headers: Record<string, string>;
  isRedirectedToLogin: boolean;

  constructor() {
    this.baseURL = 'https://admin.svoecafe.by/api/public/';
    this.token = '';
    this.isRedirectedToLogin = false;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  init = (token: string) => {
    this.token = token;
    this.headers['Authorization'] = `Bearer ${token}`;
  };

  handleResponse = async <T>(
    result: Response,
    options?: RequestOptions,
  ): Promise<T> => {
    if (this.isRedirectedToLogin === true) {
      throw new Error('Redirection to login');
    }

    if (result.status === 401) {
      window.location.replace('/login');
      this.isRedirectedToLogin = true;
    }

    if (result.ok) {
      if (options?.file) {
        // @ts-expect-error: not typed
        return {
          file: await result.blob(),
          name: result.headers
            .get('Content-Disposition')
            ?.replace('attachment; filename=', ''),
        };
      } else {
        return result.json();
      }
    }

    throw new Error(result.statusText);
  };

  post = <T>(url: string, data?: unknown): Promise<T> => {
    return fetch(this.baseURL + url, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((result) => this.handleResponse<T>(result));
  };

  delete = <T>(url: string, data?: unknown): Promise<T> => {
    return fetch(this.baseURL + url, {
      headers: this.headers,
      method: 'DELETE',
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((result) => this.handleResponse<T>(result));
  };

  patch = <T>(url: string, data: unknown): Promise<T> => {
    return fetch(this.baseURL + url, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(this.handleResponse, (result) => result);
  };

  get = <T>(url: string, options?: RequestOptions) => {
    return fetch(this.baseURL + url, {
      headers: this.headers,
      credentials: 'include',
    }).then((result) => this.handleResponse<T>(result, options));
  };
}

export const apiService = new APIServiceClass();
