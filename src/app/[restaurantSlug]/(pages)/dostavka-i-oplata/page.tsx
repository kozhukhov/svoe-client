import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';

import { RestaurantDTO } from 'modules/restaurant/dto';

import { DostavkaPageClient } from './_containers/DostavkaPageClient';

type APIResultWithPagination<T> = {
  items: T[];
  hasMore: boolean;
  total: number;
};

type PageParams = { restaurantSlug: string };

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

  return <DostavkaPageClient restaurant={restaurant} />;
}
