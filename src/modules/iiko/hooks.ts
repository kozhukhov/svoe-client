import { useEffect, useState } from 'react';
import { apiService, useFetch } from 'lib/services/APIService';

import { initIIKO } from './service';

export const useInitIIKO = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { error, data } = useFetch(initIIKO.getUrl(), initIIKO.request);

  useEffect(() => {
    if (data) {
      apiService.init(data.token);

      setIsLoading(false);
    }
  }, [data]);

  return {
    isLoading,
    error,
  };
};
