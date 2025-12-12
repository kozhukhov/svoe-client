import { useLister } from 'lib/hooks/useLister';

import { useActiveRestaurant } from 'modules/restaurant/hooks';

import { getReviews } from './service';

export const useReviews = () => {
  const { activeRestaurant } = useActiveRestaurant();

  const activeRestaurantID = activeRestaurant?.id;

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
