import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type ProductBase = {
  titulo: string | null;
  sku: string | null;
  slug: string | null;
  descripcion: string | null;
  precio: string | null;
  disponibilidad: boolean | null;
  imagen: { url: string }[] | null;
};

type ProductBaseQuery = { allProductos: ProductBase[] };

const QUERY_BASE = /* GraphQL */ `
  query ProductByQBase($q: String, $locale: SiteLocale) {
    allProductos(
      filter: { OR: [{ slug: { eq: $q } }, { sku: { eq: $q } }] },
      first: 1,
      locale: $locale
    ) {
      titulo
      sku
      slug
      descripcion
      precio
      disponibilidad
      imagen { url }
    }
  }
`;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ sku: string }> }
) {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const { sku } = await context.params;
    const locale = 'es' as const;
    // 1) Try direct match via GraphQL filter
    const data = await datoRequest<ProductBaseQuery>(QUERY_BASE, { q: sku, locale });
    let p = data.allProductos?.[0];
    // 2) If not found, fetch a wider list and match locally by normalized slug/SKU
    if (!p) {
      const LIST_BASE = /* GraphQL */ `
        query ProductsListBase($locale: SiteLocale) {
          allProductos(first: 500, locale: $locale) {
            titulo
            sku
            slug
            descripcion
            precio
            disponibilidad
            imagen { url }
          }
        }
      `;
      const list = await datoRequest<ProductBaseQuery>(LIST_BASE, { locale });
      const norm = (s: string | null | undefined) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const target = norm(sku);
      p = list.allProductos.find(it => norm(it.slug) === target || norm(it.sku) === target);
    }
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const firstCatName = null;
    const firstImage = p.imagen?.[0]?.url ?? null;
    const priceNumber = p.precio ? Number(String(p.precio).replace(/[^0-9.,-]/g, '').replace(',', '.')) : 0;
    const item = {
      SKU: p.sku ?? '',
      Slug: p.slug ?? null,
      NombreProducto: p.titulo ?? '',
      Descripcion: p.descripcion ?? '',
      Precio: isNaN(priceNumber) ? 0 : priceNumber,
      Stock: p.disponibilidad ? 1 : 0,
      Tipo: firstCatName,
      Imagen: firstImage,
    };

    return NextResponse.json({ item, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
