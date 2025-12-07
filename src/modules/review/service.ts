import {
  APIResultWithPagination,
  apiService,
  getURLWithQueryParams,
  ServiceWithPagination,
} from 'lib/services/APIService';

import { ReviewDTO } from './dto';

export const getReviews: ServiceWithPagination<
  {
    page?: number;
    restaurantID?: string;
  },
  { items: ReviewDTO[] }
> = {
  getUrl: (params) =>
    getURLWithQueryParams('reviews', {
      restaurant_id: params?.restaurantID?.toString(),
      page: params?.page?.toString(),
    }),
  request: async (url) => {
    const result =
      await apiService.get<APIResultWithPagination<ReviewDTO>>(url);

    return result;
  },
};
