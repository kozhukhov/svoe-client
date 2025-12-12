import { infiniteMutate, mutate } from 'lib/services/APIService';

import { getRestaurants } from './service';

export const onRestaurantsUpdate = () => {
  mutate(infiniteMutate(() => getRestaurants.getUrl({ page: 1 })));
};
