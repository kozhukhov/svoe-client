import { FetcherResponse } from 'lib/hooks/useLister';
import { infiniteMutate, mutate } from 'lib/services/APIService';

import { ReviewDTO } from './dto';
import { getReviews } from './service';

export const onReviewsUpdate = ({
  restaurantID,
  page,
}: {
  restaurantID: string;
  page?: number;
}) => {
  mutate(
    infiniteMutate(
      (_pageIndex, _previousPageData: FetcherResponse<ReviewDTO> | null) => {
        return getReviews.getUrl({ page: page ?? 1, restaurantID });
      },
    ),
  );
};
