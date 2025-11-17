import { NextResponse } from 'next/server';
import offresData from '@/data/offres.json';
import type { Offre } from '@/types/offre';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Pour l'instant, on utilise les données mockées
    // Plus tard, on remplacera par un appel à DatoCMS
    const offres = offresData as Offre[];
    
    // Chercher l'offre par id ou slug
    const offre = offres.find(
      o => o.id === id || o.slug === id
    );

    if (!offre) {
      return NextResponse.json(
        { error: 'Offre not found' },
        { status: 404 }
      );
    }

    // Vérifier si l'offre est active
    if (!offre.actif) {
      return NextResponse.json(
        { error: 'Offre not active' },
        { status: 404 }
      );
    }

    return NextResponse.json({ offre });
  } catch (error) {
    console.error('Error fetching offre:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offre' },
      { status: 500 }
    );
  }
}
