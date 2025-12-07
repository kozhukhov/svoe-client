'use client';

import { useCallback, useMemo } from 'react';
import {
  Fetcher,
  InfiniteResponse,
  useInfiniteFetch,
} from 'lib/services/APIService';

export type FetcherResponse<T> = {
  items: Array<T>;
  hasMore: boolean;
  total: number;
};

export const useLister = <T>(
  getUrl: (pageIndex: number) => string,
  fetcher: Fetcher<FetcherResponse<T>>,
): {
  hasMore: boolean;
  items: Array<T>;
  response: InfiniteResponse<FetcherResponse<T>>;
  loadMore: () => void;
  isLoading: boolean;
  isValidating: boolean;
  total: number;
} => {
  const getKey = (pageIndex: number, previousPageData: FetcherResponse<T>) => {
    if (previousPageData && !previousPageData.hasMore) return null;

    return getUrl(pageIndex + 1);
  };

  const response = useInfiniteFetch<{
    items: Array<T>;
    hasMore: boolean;
    total: number;
  }>(getKey, fetcher);

  const loadMore = useCallback(() => {
    response.setSize(response.size + 1);
  }, [response]);

  const { items, hasMore, total } = useMemo(() => {
    return {
      items: response.data?.map((d) => d.items).flat() || [],
      hasMore: response.data?.[response.data.length - 1]?.hasMore ?? false,
      total: response.data?.[response.data.length - 1]?.total ?? 0,
    };
  }, [response.data]);

  return {
    items,
    hasMore,
    loadMore,
    response,
    isLoading: response.isLoading,
    isValidating: response.isValidating,
    total,
  };
};
