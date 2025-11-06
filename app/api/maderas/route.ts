import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type WoodSnake = {
  slug: string | null;
  nombre_tipo_madera?: string | null;
  origen?: string | null;
  descripcion_detallada?: string | null;
  campo_imagen?: { url: string } | null;
};

type WoodCamel = {
  slug: string | null;
  nombreTipoMadera?: string | null;
  origen?: string | null;
  descripcionDetallada?: string | null;
  campoImagen?: { url: string } | null;
};

type WoodsSnakeQuery = {
  allTipoDeMaderas: WoodSnake[];
};
type WoodsCamelQuery = {
  allTipoDeMaderas: WoodCamel[];
};

const QUERY_SNAKE = /* GraphQL */ `
  query AllWoodsSnake($locale: SiteLocale) {
    allTipoDeMaderas(first: 200, locale: $locale) {
      slug
      nombre_tipo_madera
      origen
      descripcion_detallada
      campo_imagen { url }
    }
  }
`;

const QUERY_CAMEL = /* GraphQL */ `
  query AllWoodsCamel($locale: SiteLocale) {
    allTipoDeMaderas(first: 200, locale: $locale) {
      slug
      nombreTipoMadera
      origen
      descripcionDetallada
      campoImagen { url }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale = 'es' as const;
    let records: Array<WoodSnake | WoodCamel> = [];
    try {
      const data = await datoRequest<WoodsSnakeQuery>(QUERY_SNAKE, { locale });
      records = data.allTipoDeMaderas;
    } catch {
      const data = await datoRequest<WoodsCamelQuery>(QUERY_CAMEL, { locale });
      records = data.allTipoDeMaderas;
    }

    const items = records.map((w) => ({
      id: w.slug ?? '',
      nombre: 'nombre_tipo_madera' in w ? (w.nombre_tipo_madera ?? '') : (w as WoodCamel).nombreTipoMadera ?? '',
      origen: w.origen ?? '',
      descripcion: 'descripcion_detallada' in w ? (w.descripcion_detallada ?? '') : (w as WoodCamel).descripcionDetallada ?? '',
      img: 'campo_imagen' in w ? (w.campo_imagen?.url ?? '') : (w as WoodCamel).campoImagen?.url ?? '',
    }));

    return NextResponse.json({ items, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
