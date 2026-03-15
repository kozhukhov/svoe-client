import {
  apiService,
  getURLWithQueryParams,
  Service,
} from 'lib/services/APIService';

import { MenuDTO, MenuItemDTO } from './dto';

export type CategoryResponse = {
  label: string;
  items: MenuItemDTO[];
};

export const getMenu: Service<
  {
    restaurantID?: string;
  },
  { categories: MenuDTO[] }
> = {
  getUrl: (params) =>
    getURLWithQueryParams('menu', {
      restaurant_id: params?.restaurantID?.toString(),
    }),
  request: async (url) => {
    const result = await apiService.get<{ categories: MenuDTO[] }>(url);

    return result;
  },
};

export const getCategory: Service<
  { restaurantID: string; categorySlug: string },
  CategoryResponse
> = {
  getUrl: (params) =>
    `menu/${params?.categorySlug ?? ''}?${new URLSearchParams({ restaurant_id: params?.restaurantID ?? '' }).toString()}`,
  request: async (url) => apiService.get<CategoryResponse>(url),
};
