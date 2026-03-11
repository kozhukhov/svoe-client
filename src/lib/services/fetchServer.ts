import { cache } from 'react';

const BASE_URL =
  process.env.SERVER_API_URL ?? 'https://admin.svoecafe.by/api/public/';

// Deduplicated per request — runs only once even if called from multiple pages
const getToken = cache(async (): Promise<string> => {
  const res = await fetch(BASE_URL + 'init', {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Auth error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.token as string;
});

export async function serverGet<T>(path: string): Promise<T> {
  const token = await getToken();

  const res = await fetch(BASE_URL + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
