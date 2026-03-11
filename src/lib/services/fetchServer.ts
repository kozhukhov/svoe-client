const BASE_URL =
  process.env.SERVER_API_URL ?? 'https://admin.svoecafe.by/api/public/';

export async function serverGet<T>(path: string): Promise<T> {
  const res = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
