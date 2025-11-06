import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type ProductRecord = {
  titulo: string | null;
  sku: string | null;
  slug: string | null;
  descripcion: string | null;
  precio: string | null; // in schema it’s string
  disponibilidad: boolean | null;
  imagen: { url: string }[] | null; // gallery
  categoriaProducto?: Array<{
    __typename: string;
    slug?: string | null;
    nombreCategoria?: string | null;
  } | null> | null;
};

type ProductsQuery = {
  allProductos: ProductRecord[];
};

const QUERY = /* GraphQL */ `
  query AllProductos($locale: SiteLocale) {
    allProductos(first: 200, locale: $locale) {
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

export async function GET() {
  try {
    // If token missing, tell client we are in fallback mode
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale: 'es' = 'es';
    const data = await datoRequest<ProductsQuery>(QUERY, { locale });
    // Map to legacy shape used in the app
    const items = data.allProductos.map((p: any) => {
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
      return {
        SKU: p.sku ?? '',
        Slug: p.slug ?? null,
        NombreProducto: p.titulo ?? '',
        Descripcion: p.descripcion ?? '',
        Precio: isNaN(priceNumber) ? 0 : priceNumber,
        Stock: p.disponibilidad ? 1 : 0,
        Tipo: firstCatName,
        Imagen: firstImage,
      };
    });

    return NextResponse.json({ items, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
