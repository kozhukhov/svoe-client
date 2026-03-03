import {
  apiService,
  getURLWithQueryParams,
  Service,
} from 'lib/services/APIService';

import { BannerDTO } from './dto';

export const getBanners: Service<
  { restaurantId?: string | null },
  BannerDTO[]
> = {
  getUrl: (params) =>
    getURLWithQueryParams('banners', {
      restaurant_id: params?.restaurantId ?? undefined,
    }),
  request: async (url) => {
    const result = await apiService.get<BannerDTO[]>(url);
    return result;
  },
};
