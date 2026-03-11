import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import { notFound } from 'next/navigation';

import { MenuItemDTO } from 'modules/menu/dto';
import { RestaurantDTO } from 'modules/restaurant/dto';

import { CategoryPageClient } from './_containers/CategoryPageClient';

type Paginated<T> = { items: T[]; hasMore: boolean; total: number };

type CategoryResponse = {
  label: string;
  items: MenuItemDTO[];
};

type PageParams = {
  restaurantSlug: string;
  categorySlug: string;
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { restaurantSlug, categorySlug } = await params;

  const restaurantsResult = await serverGet<Paginated<RestaurantDTO>>(
    getURLWithQueryParams('restaurants', {}),
  );

  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );

  if (!restaurant) {
    notFound();
  }

  const categoryResult = await serverGet<CategoryResponse>(
    `menu/${categorySlug}?restaurant_id=${restaurant.id}`,
  );

  return (
    <CategoryPageClient
      items={categoryResult.items}
      label={categoryResult.label}
    />
  );
}
