import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';

import { SeoDataDTO } from './dto';

export type GetSeoParams = {
  restaurantId: string;
  url: string;
};

/**
 * Серверный запрос SEO-данных (GET /api/public/seo). Только для SSR.
 */
export async function getSeoDataServer(
  params: GetSeoParams,
): Promise<SeoDataDTO> {
  const path = getURLWithQueryParams('seo', {
    restaurant_id: params.restaurantId,
    url: params.url,
  });
  return serverGet<SeoDataDTO>(path);
}
