import { apiService, Service } from 'lib/services/APIService';

export const initIIKO: Service<void, { token: string }> = {
  getUrl: () => 'init',
  request: async (url) => {
    const result = await apiService.get<{ token: string }>(url);

    return result;
  },
};
