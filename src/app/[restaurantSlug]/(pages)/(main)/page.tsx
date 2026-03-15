import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import type { Metadata } from 'next';

import { BannerDTO } from 'modules/banner/dto';
import { RestaurantDTO } from 'modules/restaurant/dto';
import { getSeoDataServer } from 'modules/seo/service';

import { MainPageClient } from './_containers/MainPageClient';

type Paginated<T> = { items: T[]; hasMore: boolean; total: number };

type PageParams = { restaurantSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { restaurantSlug } = await params;
  const restaurantsResult = await serverGet<Paginated<RestaurantDTO>>(
    getURLWithQueryParams('restaurants', {}),
  );
  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );
  if (!restaurant) return {};
  const seoData = await getSeoDataServer({
    restaurantId: restaurant.id,
    url: '',
  });
  return {
    title: seoData.metaTitle ?? undefined,
    description: seoData.metaDescription ?? undefined,
  };
}

export default async function MainPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { restaurantSlug } = await params;

  const restaurantsResult = await serverGet<Paginated<RestaurantDTO>>(
    getURLWithQueryParams('restaurants', {}),
  );

  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );

  if (!restaurant) {
    return null;
  }

  const [bannersResult, seoData] = await Promise.all([
    serverGet<BannerDTO[]>(
      getURLWithQueryParams('banners', { restaurant_id: restaurant.id }),
    ),
    getSeoDataServer({
      restaurantId: restaurant.id,
      url: '',
    }),
  ]);

  return (
    <MainPageClient
      deliveryMinFreeSum={restaurant.deliveryMinFreeSum ?? 35}
      initialBanners={bannersResult}
      restaurantId={restaurant.id}
      seoData={seoData}
    />
  );
}
