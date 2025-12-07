export type ServiceBodyArgs<T> = { arg: T };

// fot GET
export type Service<UrlParams, Result = void> = {
  getUrl: (params?: UrlParams) => string;
  request: (url: string) => Promise<Result>;
};

// fot POST, PATCH, DELETE, etc

export type ServiceWithBody<UrlParams, BodyArgs = any, Result = void> = {
  getUrl: (params: UrlParams) => string;
  request: (url: string, body: ServiceBodyArgs<BodyArgs>) => Promise<Result>;
};

export type ServiceWithPagination<UrlParams, Result = void> = {
  getUrl: (params: UrlParams & { page: number }) => string;
  request: (
    url: string,
  ) => Promise<Result & { hasMore: boolean; total: number }>;
};

export type APIResultWithPagination<T> = {
  items: T[];
  hasMore: boolean;
  total: number;
};
