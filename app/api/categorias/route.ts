import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type CatSnake = {
  slug: string | null;
  nombre_categoria?: string | null;
  imagen?: { url: string } | null;
  orden?: number | null;
};
type CatCamel = {
  slug: string | null;
  nombreCategoria?: string | null;
  imagen?: { url: string } | null;
  orden?: number | null;
};

type CatsSnakeQuery = { allCategoriaProductos: CatSnake[] };
type CatsCamelQuery = { allCategoriaProductos: CatCamel[] };

const QUERY_SNAKE = /* GraphQL */ `
  query AllCategoriasSnake($locale: SiteLocale) {
    allCategoriaProductos(orderBy: orden_ASC, locale: $locale) {
      slug
      nombre_categoria
      imagen { url }
      orden
    }
  }
`;

const QUERY_CAMEL = /* GraphQL */ `
  query AllCategoriasCamel($locale: SiteLocale) {
    allCategoriaProductos(orderBy: orden_ASC, locale: $locale) {
      slug
      nombreCategoria
      imagen { url }
      orden
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale = 'es' as const;
    let cats: Array<CatSnake | CatCamel> = [];
    try {
      const data = await datoRequest<CatsSnakeQuery>(QUERY_SNAKE, { locale });
      cats = data.allCategoriaProductos;
    } catch {
      const data = await datoRequest<CatsCamelQuery>(QUERY_CAMEL, { locale });
      cats = data.allCategoriaProductos;
    }

    const items = cats.map((c) => ({
      slug: c.slug ?? '',
      nombre: 'nombre_categoria' in c ? (c.nombre_categoria ?? '') : (c as CatCamel).nombreCategoria ?? '',
      imagen: c.imagen?.url ?? null,
      orden: c.orden ?? null,
    }));

    return NextResponse.json({ items, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

