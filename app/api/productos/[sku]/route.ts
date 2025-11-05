import { NextResponse } from 'next/server';
import { datoRequest } from '@/lib/datocms';

type ProductRecord = {
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

type ProductQuery = {
  allProductos: ProductRecord[];
};

const QUERY = /* GraphQL */ `
  query ProductByQ($q: String) {
    allProductos(
      filter: { OR: [{ slug: { eq: $q } }, { sku: { eq: $q } }] },
      first: 1
    ) {
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

export async function GET(
  _req: Request,
  context: { params: { sku: string } }
) {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const { sku } = context.params;
    const data = await datoRequest<ProductQuery>(QUERY, { q: sku });
    const p = data.allProductos?.[0];
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const firstCat = p.categoriaProducto?.find(Boolean) as any;
    const firstImage = p.imagen?.[0]?.url ?? null;
    const priceNumber = p.precio ? Number(String(p.precio).replace(/[^0-9.,-]/g, '').replace(',', '.')) : 0;
    const item = {
      SKU: p.sku ?? '',
      Slug: p.slug ?? null,
      NombreProducto: p.titulo ?? '',
      Descripcion: p.descripcion ?? '',
      Precio: isNaN(priceNumber) ? 0 : priceNumber,
      Stock: p.disponibilidad ? 1 : 0,
      Tipo: firstCat?.nombreCategoria ?? null,
      Imagen: firstImage,
    };

    return NextResponse.json({ item });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
