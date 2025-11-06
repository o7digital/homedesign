import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { datoRequest } from '@/lib/datocms';

type Asset = { url: string };

type HomeSnake = {
  quienes_somos?: string | null;
  mision?: string | null;
  vision?: string | null;
  valores?: string | null;
  nuestra_historia?: string | null;
  slider?: Asset[] | null;
};

type HomeCamel = {
  quienesSomos?: string | null;
  mision?: string | null;
  vision?: string | null;
  valores?: string | null;
  nuestraHistoria?: string | null;
  slider?: Asset[] | null;
};

type HomeSnakeQuery = {
  paginaHome?: HomeSnake | null;
  allPaginaHomes?: HomeSnake[];
};

type HomeCamelQuery = {
  paginaHome?: HomeCamel | null;
  allPaginaHomes?: HomeCamel[];
};

const QUERY_SNAKE = /* GraphQL */ `
  query HomeContentSnake($locale: SiteLocale) {
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

const QUERY_CAMEL = /* GraphQL */ `
  query HomeContentCamel($locale: SiteLocale) {
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

    const locale = 'es' as const;
    let title = '';
    let mision = '';
    let vision = '';
    let valores = '';
    let nuestraHistoria = '';
    let slides: string[] = [];

    try {
      const data = await datoRequest<HomeSnakeQuery>(QUERY_SNAKE, { locale });
      const src = data.paginaHome ?? data.allPaginaHomes?.[0];
      title = src?.quienes_somos ?? '';
      mision = src?.mision ?? '';
      vision = src?.vision ?? '';
      valores = src?.valores ?? '';
      nuestraHistoria = src?.nuestra_historia ?? '';
      slides = (src?.slider ?? []).map((a) => a?.url).filter(Boolean) as string[];
    } catch {
      const data = await datoRequest<HomeCamelQuery>(QUERY_CAMEL, { locale });
      const src = data.paginaHome ?? data.allPaginaHomes?.[0];
      title = src?.quienesSomos ?? '';
      mision = src?.mision ?? '';
      vision = src?.vision ?? '';
      valores = src?.valores ?? '';
      nuestraHistoria = src?.nuestraHistoria ?? '';
      slides = (src?.slider ?? []).map((a) => a?.url).filter(Boolean) as string[];
    }

    return NextResponse.json({ title, quienesSomos: title, mision, vision, valores, nuestraHistoria, slides, meta: { environment: 'main-copy-2025-11-04', locale } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
