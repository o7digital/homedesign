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
  query AllWoods {
    allTipoDeMaderas(orderBy: _createdAt_DESC, first: 200) {
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

    const data = await datoRequest<WoodsQuery>(QUERY);
    const items = data.allTipoDeMaderas.map((w) => ({
      id: w.slug ?? '',
      nombre: w.nombreTipoMadera ?? '',
      origen: w.origen ?? '',
      descripcion: w.descripcionDetallada ?? '',
      img: w.campoImagen?.url ?? '',
    }));

    return NextResponse.json({ items });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
