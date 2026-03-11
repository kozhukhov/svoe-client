import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';

import { RestaurantDTO } from 'modules/restaurant/dto';

import { KontaktyPageClient } from './_containers/KontaktyPageClient';

type APIResultWithPagination<T> = {
  items: T[];
  hasMore: boolean;
  total: number;
};

type PageParams = { restaurantSlug: string };

export default async function KontaktyPage({
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

  return <KontaktyPageClient restaurant={restaurant} />;
}
