import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type WoodRecord = {
  slug: string | null;
  nombreTipoMadera: string | null;
  origen: string | null;
  descripcionDetallada: string | null;
  campoImagen?: { url: string } | null;
};

type WoodsQuery = {
  allTipoDeMaderas: WoodRecord[];
};

const QUERY = /* GraphQL */ `
  query AllWoods($locale: SiteLocale) {
    allTipoDeMaderas(first: 200, locale: $locale) {
      slug
      nombre_tipo_madera
      origen
      descripcion_detallada
      campo_imagen { url }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale: 'es' = 'es';
    const data = await datoRequest<WoodsQuery>(QUERY, { locale });
    const items = data.allTipoDeMaderas.map((w: any) => ({
      id: w.slug ?? '',
      nombre: w.nombre_tipo_madera ?? '',
      origen: w.origen ?? '',
      descripcion: w.descripcion_detallada ?? '',
      img: w.campo_imagen?.url ?? '',
    }));

    return NextResponse.json({ items, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
