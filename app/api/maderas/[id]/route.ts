import { NextResponse } from 'next/server';
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
  query WoodBySlug($slug: String) {
    allTipoDeMaderas(filter: { slug: { eq: $slug } }, first: 1) {
      slug
      nombreTipoMadera
      origen
      descripcionDetallada
      campoImagen { url }
    }
  }
`;

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const { id } = context.params;
    const data = await datoRequest<WoodQuery>(QUERY, { slug: id });
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
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
