import { useLister } from 'lib/hooks/useLister';

import { getReviews } from './service';

export const useReviews = () => {
  const activeRestaurantID = 'cmirn0fht0002ukrep10qbook';

  const { items, hasMore, total, loadMore, isLoading, isValidating } =
    useLister(
      (pageIndex) =>
        activeRestaurantID
          ? getReviews.getUrl({
              page: pageIndex,
              restaurantID: activeRestaurantID,
            })
          : '',
      getReviews.request,
    );

  return {
    reviews: items,
    reviewsHasMore: hasMore,
    reviewsTotal: total,
    isReviewsLoading: isLoading,
    isReviewsValidating: isValidating,
    loadMoreReviews: loadMore,
  };
};
