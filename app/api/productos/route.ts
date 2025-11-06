import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type ProductSnake = {
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
type ProductCamel = {
  titulo: string | null;
  sku: string | null;
  slug: string | null;
  descripcion: string | null;
  precio: string | null;
  disponibilidad: boolean | null;
  imagen: { url: string }[] | null;
  categoriaProducto?: Array<{
    __typename: string;
    slug?: string | null;
    nombreCategoria?: string | null;
  } | null> | null;
};

type ProductsSnakeQuery = { allProductos: ProductSnake[] };
type ProductsCamelQuery = { allProductos: ProductCamel[] };

const QUERY_SNAKE = /* GraphQL */ `
  query AllProductosSnake($locale: SiteLocale) {
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

const QUERY_CAMEL = /* GraphQL */ `
  query AllProductosCamel($locale: SiteLocale) {
    allProductos(first: 200, locale: $locale) {
      titulo
      sku
      slug
      descripcion
      precio
      disponibilidad
      imagen { url }
      categoriaProducto {
        __typename
        ... on CategoriaProductosRecord {
          slug
          nombreCategoria
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

    const locale = 'es' as const;
    let products: Array<ProductSnake | ProductCamel> = [];
    try {
      const data = await datoRequest<ProductsSnakeQuery>(QUERY_SNAKE, { locale });
      products = data.allProductos;
    } catch {
      const data = await datoRequest<ProductsCamelQuery>(QUERY_CAMEL, { locale });
      products = data.allProductos;
    }

    const items = products.map((p) => {
      const catArr = 'categoria_producto' in p ? p.categoria_producto : (p as ProductCamel).categoriaProducto;
      const firstCatName = (() => {
        const arr = catArr;
        if (!Array.isArray(arr)) return null;
        for (const c of arr) {
          if (!c) continue;
          if ('nombre_categoria' in c) return (c as { nombre_categoria?: string | null }).nombre_categoria ?? null;
          if ('nombreCategoria' in c) return (c as { nombreCategoria?: string | null }).nombreCategoria ?? null;
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
