import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RestaurantDTO } from 'modules/restaurant/dto';
import { getSeoDataServer } from 'modules/seo/service';

import { CategoryPageClient } from './_containers/CategoryPageClient';

type Paginated<T> = { items: T[]; hasMore: boolean; total: number };

type PageParams = {
  restaurantSlug: string;
  categorySlug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { restaurantSlug, categorySlug } = await params;
  const restaurantsResult = await serverGet<Paginated<RestaurantDTO>>(
    getURLWithQueryParams('restaurants', {}),
  );
  const restaurant = restaurantsResult.items.find(
    (r) => r.slug === restaurantSlug,
  );
  if (!restaurant) return {};
  const seoData = await getSeoDataServer({
    restaurantId: restaurant.id,
    url: categorySlug,
  });
  return {
    title: seoData.metaTitle ?? undefined,
    description: seoData.metaDescription ?? undefined,
  };
}

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

  const seoData = await getSeoDataServer({
    restaurantId: restaurant.id,
    url: categorySlug,
  });

  return (
    <CategoryPageClient
      categorySlug={categorySlug}
      restaurantId={restaurant.id}
      restaurantSlug={restaurantSlug}
      seoData={seoData}
    />
  );
}
