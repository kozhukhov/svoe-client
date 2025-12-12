import { useLister } from 'lib/hooks/useLister';
import { usePathname } from 'next/navigation';

import { RestaurantDTO } from './dto';
import { getRestaurants } from './service';

export const useRestaurants = () => {
  const {
    items: restaurants,
    isLoading,
    isValidating,
  } = useLister<RestaurantDTO>(
    (pageIndex) => getRestaurants.getUrl({ page: pageIndex }),
    getRestaurants.request,
  );

  return {
    restaurants,
    isRestaurantsLoading: isLoading,
    isRestaurantsValidating: isValidating,
  };
};

export const useActiveRestaurant = () => {
  const { restaurants, isRestaurantsLoading, isRestaurantsValidating } =
    useRestaurants();

  const restaurantSlug = usePathname().split('/').filter(Boolean)[0];

  return {
    activeRestaurant: restaurants.find(
      (restaurant) => restaurant.slug === restaurantSlug,
    ),
    isRestaurantsLoading,
    isRestaurantsValidating,
    restaurants,
  };
};
