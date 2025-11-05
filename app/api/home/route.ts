import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type Asset = { url: string };

type HomeSingleton = {
  // Title field (quienes_somos) now used as title
  quienesSomos?: string | null;
  mision?: string | null;
  vision?: string | null;
  valores?: string | null;
  nuestraHistoria?: string | null;
  slider?: Asset[] | null;
};

type HomeQuery = {
  paginaHome?: HomeSingleton | null;
  allPaginaHomes?: HomeSingleton[];
};

const QUERY = /* GraphQL */ `
  query HomeContent($locale: SiteLocale) {
    paginaHome(locale: $locale) {
      quienesSomos
      mision
      vision
      valores
      nuestraHistoria
      slider { url }
    }
    allPaginaHomes(first: 1, locale: $locale) {
      quienesSomos
      mision
      vision
      valores
      nuestraHistoria
      slider { url }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale = process.env.DATOCMS_LOCALE || 'es';
    const data = await datoRequest<HomeQuery>(QUERY, { locale });
    const src = data.paginaHome ?? data.allPaginaHomes?.[0];
    const title = src?.quienesSomos ?? '';
    const mision = src?.mision ?? '';
    const vision = src?.vision ?? '';
    const valores = src?.valores ?? '';
    const nuestraHistoria = src?.nuestraHistoria ?? '';
    const slides = (src?.slider ?? []).map((a) => a?.url).filter(Boolean) as string[];
    // keep quienesSomos for backward compat as alias of title
    return NextResponse.json({ title, quienesSomos: title, mision, vision, valores, nuestraHistoria, slides });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
