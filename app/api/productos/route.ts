import { NextResponse } from 'next/server';
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
type ProductsBaseQuery = { allProductos: ProductBase[] };

const QUERY_BASE = /* GraphQL */ `
  query AllProductosBase($locale: SiteLocale) {
    allProductos(first: 200, locale: $locale) {
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

export async function GET() {
  try {
    // If token missing, tell client we are in fallback mode
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale = 'es' as const;
    const data = await datoRequest<ProductsBaseQuery>(QUERY_BASE, { locale });
    const products = data.allProductos;

    const items = products.map((p) => {
      const firstImage = p.imagen?.[0]?.url ?? null;
      const priceRaw = p.precio as string | null | undefined;
      const priceNumber = priceRaw ? Number(String(priceRaw).replace(/[^0-9.,-]/g, '').replace(',', '.')) : 0;
      return {
        SKU: p.sku ?? '',
        Slug: p.slug ?? null,
        NombreProducto: p.titulo ?? '',
        Descripcion: p.descripcion ?? '',
        Precio: isNaN(priceNumber) ? 0 : priceNumber,
        Stock: p.disponibilidad ? 1 : 0,
        Tipo: null,
        Imagen: firstImage,
      };
    });

    return NextResponse.json({ items, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
