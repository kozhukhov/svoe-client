'use client';

import { useFetch } from 'lib/services/APIService';

import { getMenu } from 'modules/menu/service';

export default function MainPage() {
  const s = useFetch(getMenu.getUrl({ restaurantID: '1' }), getMenu.request);

  return <div>{s.data?.items.map((item) => item.name)}</div>;
}
