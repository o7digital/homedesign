import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type ProductRecord = {
  titulo: string | null;
  sku: string | null;
  slug: string | null;
  descripcion: string | null;
  precio: string | null;
  disponibilidad: boolean | null;
  imagen: { url: string }[] | null;
  categoria_producto?: Array<{
    __typename: string;
    slug?: string | null;
    nombre_categoria?: string | null;
  } | null> | null;
};

type ProductQuery = {
  allProductos: ProductRecord[];
};

const QUERY = /* GraphQL */ `
  query ProductByQ($q: String, $locale: SiteLocale) {
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
      categoria_producto {
        __typename
        ... on CategoriaProductosRecord {
          slug
          nombre_categoria
        }
      }
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
    const data = await datoRequest<ProductQuery>(QUERY, { q: sku, locale });
    const p = data.allProductos?.[0];
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const firstCatName = (() => {
      const arr = p.categoria_producto;
      if (!Array.isArray(arr)) return null;
      for (const c of arr) {
        if (c && typeof c === 'object' && 'nombre_categoria' in c) {
          const obj = c as { nombre_categoria?: string | null };
          return obj.nombre_categoria ?? null;
        }
      }
      return null;
    })();
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
