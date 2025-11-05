import 'server-only';

const DATO_API_URL = process.env.DATOCMS_API_URL || 'https://graphql.datocms.com/';

export async function datoRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { preview?: boolean }
) {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('Missing DATOCMS_API_TOKEN');
  }

  const url = options?.preview ? 'https://graphql.datocms.com/preview' : DATO_API_URL;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    // Ensure this runs on server and can be cached/revalidated later
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DatoCMS request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`DatoCMS GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}
