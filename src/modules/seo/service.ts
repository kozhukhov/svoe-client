import { getURLWithQueryParams } from 'lib/services/APIService/utils';
import { serverGet } from 'lib/services/fetchServer';
import type { Metadata } from 'next';

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

/**
 * Формирует Next.js Metadata из SEO-данных (title, description, openGraph, twitter).
 */
export function buildMetadataFromSeo(seoData: SeoDataDTO): Metadata {
  const title = seoData.metaTitle ?? undefined;
  const description = seoData.metaDescription ?? undefined;
  const ogImage = seoData.ogImageUrl ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}
