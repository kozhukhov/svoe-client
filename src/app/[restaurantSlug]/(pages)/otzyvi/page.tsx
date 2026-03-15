import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import type { Metadata } from 'next';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { ReviewDTO } from 'modules/review/dto';
import { getSeoDataServer } from 'modules/seo/service';

import { OtzyviPageClient } from './_containers/OtzyviPageClient';

type APIResultWithPagination<T> = {
  items: T[];
  hasMore: boolean;
  total: number;
};

type PageParams = { restaurantSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { restaurantSlug } = await params;
  const restaurantsResult = await serverGet<
    APIResultWithPagination<RestaurantDTO>
  >(getURLWithQueryParams('restaurants', {}));
  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );
  if (!restaurant) return {};
  const seoData = await getSeoDataServer({
    restaurantId: restaurant.id,
    url: 'otzyvi',
  });
  return {
    title: seoData.metaTitle ?? undefined,
    description: seoData.metaDescription ?? undefined,
  };
}

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

  const [reviewsResult, seoData] = await Promise.all([
    serverGet<APIResultWithPagination<ReviewDTO>>(
      getURLWithQueryParams('reviews', {
        restaurant_id: restaurant.id,
        page: '1',
      }),
    ),
    getSeoDataServer({
      restaurantId: restaurant.id,
      url: 'otzyvi',
    }),
  ]);

  return (
    <OtzyviPageClient
      initialHasMore={reviewsResult.hasMore}
      initialReviews={reviewsResult.items}
      initialTotal={reviewsResult.total}
      restaurantId={restaurant.id}
      restaurantSlug={restaurantSlug}
      seoData={seoData}
    />
  );
}
