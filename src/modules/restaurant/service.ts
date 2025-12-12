import {
  APIResultWithPagination,
  apiService,
  getURLWithQueryParams,
  ServiceWithPagination,
} from 'lib/services/APIService';

import { RestaurantDTO } from './dto';

export const getRestaurants: ServiceWithPagination<
  {
    page?: number;
  },
  { items: RestaurantDTO[] }
> = {
  getUrl: (params) =>
    getURLWithQueryParams('restaurants', {
      page: params?.page?.toString(),
    }),
  request: async (url) => {
    const result =
      await apiService.get<APIResultWithPagination<RestaurantDTO>>(url);

    return result;
  },
};
