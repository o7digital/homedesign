import 'server-only';

const DATO_API_URL = process.env.DATOCMS_API_URL || 'https://graphql.datocms.com/';

function buildDatoEndpoint(preview: boolean, env?: string) {
  const base = DATO_API_URL.replace(/\/$/, '');
  if (env && env.trim()) {
    const cleanEnv = env.trim();
    return `${base}/environments/${cleanEnv}${preview ? '/preview' : ''}`;
  }
  return preview ? `${base}/preview` : base;
}

export async function datoRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { preview?: boolean }
) {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('Missing DATOCMS_API_TOKEN');
  }
  const env = process.env.DATOCMS_ENVIRONMENT;
  const url = buildDatoEndpoint(!!options?.preview, env);

  const environment = process.env.DATOCMS_ENVIRONMENT;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  if (environment && environment.trim()) {
    headers['X-Environment'] = environment.trim();
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
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
