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
      quienes_somos
      mision
      vision
      valores
      nuestra_historia
      slider { url }
    }
    allPaginaHomes(first: 1, locale: $locale) {
      quienes_somos
      mision
      vision
      valores
      nuestra_historia
      slider { url }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const locale: 'es' = 'es';
    const data = await datoRequest<HomeQuery>(QUERY, { locale });
    const src = data.paginaHome ?? data.allPaginaHomes?.[0];
    const title = (src as any)?.quienes_somos ?? '';
    const mision = (src as any)?.mision ?? '';
    const vision = (src as any)?.vision ?? '';
    const valores = (src as any)?.valores ?? '';
    const nuestraHistoria = (src as any)?.nuestra_historia ?? '';
    const slides = (src?.slider ?? []).map((a) => a?.url).filter(Boolean) as string[];
    // keep quienesSomos for backward compat as alias of title
    return NextResponse.json({ title, quienesSomos: title, mision, vision, valores, nuestraHistoria, slides, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
