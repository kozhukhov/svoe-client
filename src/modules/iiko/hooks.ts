import { useFetch } from 'lib/services/APIService';

import { initIIKO } from './service';

export const useInitIIKO = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { isLoading, data } = useFetch(initIIKO.getUrl(), initIIKO.request);

  if (data) {
    onSuccess();
  } else {
    onError();
  }

  return {
    isLoading,
  };
};
