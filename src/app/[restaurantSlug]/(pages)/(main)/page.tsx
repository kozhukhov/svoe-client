import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';

import { BannerDTO } from 'modules/banner/dto';
import { RestaurantDTO } from 'modules/restaurant/dto';

import { MainPageClient } from './_containers/MainPageClient';

type Paginated<T> = { items: T[]; hasMore: boolean; total: number };

type PageParams = { restaurantSlug: string };

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

  const bannersResult = await serverGet<BannerDTO[]>(
    getURLWithQueryParams('banners', { restaurant_id: restaurant.id }),
  );

  return (
    <MainPageClient
      deliveryMinFreeSum={restaurant.deliveryMinFreeSum ?? 35}
      initialBanners={bannersResult}
      restaurantId={restaurant.id}
    />
  );
}
