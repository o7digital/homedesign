import { NextResponse } from 'next/server';
import offresData from '@/data/offres.json';
import type { Offre } from '@/types/offre';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Pour l'instant, on utilise les données mockées
    // Plus tard, on remplacera par un appel à DatoCMS
    const offres = offresData as Offre[];
    
    // Filtrer uniquement les offres actives
    const offresActives = offres.filter(offre => offre.actif);
    
    // Trier par mise en avant puis par date de début
    const offresTries = offresActives.sort((a, b) => {
      if (a.misEnAvant && !b.misEnAvant) return -1;
      if (!a.misEnAvant && b.misEnAvant) return 1;
      return new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime();
    });

    return NextResponse.json({
      offres: offresTries,
      count: offresTries.length
    });
  } catch (error) {
    console.error('Error fetching offres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offres' },
      { status: 500 }
    );
  }
}
