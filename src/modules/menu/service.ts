import {
  apiService,
  getURLWithQueryParams,
  Service,
} from 'lib/services/APIService';

import { MenuDTO } from './dto';

export const getMenu: Service<
  {
    restaurantID?: string;
  },
  { items: MenuDTO[] }
> = {
  getUrl: (params) =>
    getURLWithQueryParams('menu', {
      restaurant_id: params?.restaurantID?.toString(),
    }),
  request: async (url) => {
    const result = await apiService.get<{ items: MenuDTO[] }>(url);

    return result;
  },
};
