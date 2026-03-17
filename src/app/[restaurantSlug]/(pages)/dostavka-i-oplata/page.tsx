import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import type { Metadata } from 'next';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { buildMetadataFromSeo, getSeoDataServer } from 'modules/seo/service';

import { DostavkaPageClient } from './_containers/DostavkaPageClient';

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
    url: 'dostavka-i-oplata',
  });
  return buildMetadataFromSeo(seoData);
}

export default async function DostavkaIPlataPage({
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

  const seoData = await getSeoDataServer({
    restaurantId: restaurant.id,
    url: 'dostavka-i-oplata',
  });

  return <DostavkaPageClient restaurant={restaurant} seoData={seoData} />;
}
