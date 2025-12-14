import { useFetch } from 'lib/services/APIService';

import { initIIKO } from './service';

export const useInitIIKO = () => {
  const { isLoading } = useFetch(initIIKO.getUrl(), initIIKO.request);

  return {
    isLoading,
  };
};
