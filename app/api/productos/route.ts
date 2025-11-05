import { NextResponse } from 'next/server';
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
  query AllProductos {
    allProductos(orderBy: fechaCreacion_DESC, first: 200) {
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

    const data = await datoRequest<ProductsQuery>(QUERY);
    // Map to legacy shape used in the app
    const items = data.allProductos.map((p) => {
      const firstCat = p.categoriaProducto?.find(Boolean) as any;
      const firstImage = p.imagen?.[0]?.url ?? null;
      const priceNumber = p.precio ? Number(String(p.precio).replace(/[^0-9.,-]/g, '').replace(',', '.')) : 0;
      return {
        SKU: p.sku ?? '',
        Slug: p.slug ?? null,
        NombreProducto: p.titulo ?? '',
        Descripcion: p.descripcion ?? '',
        Precio: isNaN(priceNumber) ? 0 : priceNumber,
        Stock: p.disponibilidad ? 1 : 0,
        Tipo: firstCat?.nombreCategoria ?? null,
        Imagen: firstImage,
      };
    });

    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
