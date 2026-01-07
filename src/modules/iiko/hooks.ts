import { useEffect } from 'react';
import { apiService, useFetch } from 'lib/services/APIService';

import { initIIKO } from './service';

export const useInitIIKO = () => {
  const { isLoading, error, data } = useFetch(
    initIIKO.getUrl(),
    initIIKO.request,
  );

  useEffect(() => {
    if (data) {
      apiService.init(data.token);
    }
  }, [data]);

  return {
    isLoading,
    error,
  };
};
