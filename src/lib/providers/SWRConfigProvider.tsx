'use client';

import { FC, ReactNode, useCallback } from 'react';
import { SWRConfig } from 'lib/services/APIService';

export interface ApiConfigProviderProps {
  devMode?: boolean;
}

export const SWRConfigProvider: FC<
  { children: ReactNode } & ApiConfigProviderProps
> = ({ children, devMode }) => {
  const onError = useCallback((error: Error & { responseStatus: number }) => {
    if (error.responseStatus !== 404) {
      console.log(error);
    }
  }, []);

  if (devMode) {
    return (
      <SWRConfig
        value={{
          provider: () => new Map(),
          onError,
        }}
      >
        {children}
      </SWRConfig>
    );
  }

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        onError,
      }}
    >
      {children}
    </SWRConfig>
  );
};
