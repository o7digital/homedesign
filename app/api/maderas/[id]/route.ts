import { NextResponse, NextRequest } from 'next/server';
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

type WoodQuery = {
  allTipoDeMaderas: WoodRecord[];
};

const QUERY = /* GraphQL */ `
  query WoodBySlug($slug: String, $locale: SiteLocale) {
    allTipoDeMaderas(filter: { slug: { eq: $slug } }, first: 1, locale: $locale) {
      slug
      nombreTipoMadera
      origen
      descripcionDetallada
      campoImagen { url }
    }
  }
`;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const { id } = await context.params;
    const locale = process.env.DATOCMS_LOCALE || 'es';
    const data = await datoRequest<WoodQuery>(QUERY, { slug: id, locale });
    const w = data.allTipoDeMaderas?.[0];
    if (!w) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const item = {
      id: w.slug ?? '',
      nombre: w.nombreTipoMadera ?? '',
      origen: w.origen ?? '',
      descripcion: w.descripcionDetallada ?? '',
      img: w.campoImagen?.url ?? '',
    };

    return NextResponse.json({ item });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
