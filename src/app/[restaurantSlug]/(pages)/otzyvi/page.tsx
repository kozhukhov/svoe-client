import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { ReviewDTO } from 'modules/review/dto';

import { OtzyviPageClient } from './_containers/OtzyviPageClient';

type APIResultWithPagination<T> = {
  items: T[];
  hasMore: boolean;
  total: number;
};

type PageParams = { restaurantSlug: string };

export default async function OtzyviPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { restaurantSlug } = await params;

  const restaurantsResult = await serverGet<
    APIResultWithPagination<RestaurantDTO>
  >(getURLWithQueryParams('restaurants', {}));

  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );

  if (!restaurant) {
    return null;
  }

  const reviewsResult = await serverGet<APIResultWithPagination<ReviewDTO>>(
    getURLWithQueryParams('reviews', {
      restaurant_id: restaurant.id,
      page: '1',
    }),
  );

  return (
    <OtzyviPageClient
      initialHasMore={reviewsResult.hasMore}
      initialReviews={reviewsResult.items}
      initialTotal={reviewsResult.total}
      restaurantId={restaurant.id}
      restaurantSlug={restaurantSlug}
    />
  );
}
