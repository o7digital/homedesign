import { NextResponse } from 'next/server';
import { datoRequest } from '@/lib/datocms';

type Asset = { url: string };

type HomeSingleton = {
  quienesSomos?: string | null;
  slider?: Asset[] | null;
};

type HomeQuery = {
  paginaHome?: HomeSingleton | null;
  allPaginaHomes?: HomeSingleton[];
};

const QUERY = /* GraphQL */ `
  query HomeContent {
    paginaHome {
      quienesSomos
      slider { url }
    }
    allPaginaHomes(first: 1) {
      quienesSomos
      slider { url }
    }
  }
`;

export async function GET() {
  try {
    if (!process.env.DATOCMS_API_TOKEN) {
      return NextResponse.json({ error: 'DATOCMS_API_TOKEN not configured' }, { status: 503 });
    }

    const data = await datoRequest<HomeQuery>(QUERY);
    const src = data.paginaHome ?? data.allPaginaHomes?.[0];
    const quienesSomos = src?.quienesSomos ?? '';
    const slides = (src?.slider ?? []).map((a) => a?.url).filter(Boolean) as string[];
    return NextResponse.json({ quienesSomos, slides });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
