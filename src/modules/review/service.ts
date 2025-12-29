import {
  APIResultWithPagination,
  apiService,
  getURLWithQueryParams,
  ServiceWithBody,
  ServiceWithPagination,
} from 'lib/services/APIService';

import { CreateReviewData, ReviewDTO } from './dto';

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

export const createReview: ServiceWithBody<void, CreateReviewData, ReviewDTO> =
  {
    getUrl: () => 'reviews',
    request: async (url, { arg }) => {
      const response = await apiService.post<ReviewDTO>(url, arg);
      return response;
    },
  };
