import { NextResponse } from 'next/server';
import offresData from '@/data/offres.json';
import type { Offre } from '@/types/offre';
import { datoRequest } from '@/lib/datocms';

export const dynamic = 'force-dynamic';

const OFFRES_QUERY = `
  query OffresQuery {
    allOfertaHomedesigns(orderBy: _createdAt_DESC) {
      id
      titulo
      slug
      descripcion
      descripcionCorta
      fechaDeInicio
      fechaDeFin
      imagen {
        url
      }
      precio
      precioOriginal
      porcentajeDeDescuento
      activo
      destacado
    }
  }
`;

interface DatoOffre {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  descripcionCorta: string;
  fechaDeInicio: string;
  fechaDeFin: string;
  imagen?: { url: string } | null;
  precio?: number | null;
  precioOriginal?: number | null;
  porcentajeDeDescuento?: number | null;
  activo: boolean;
  destacado?: boolean;
}

export async function GET() {
  try {
    // Essayer de récupérer depuis DatoCMS
    try {
      const data = await datoRequest<{ allOfertaHomedesigns: DatoOffre[] }>(OFFRES_QUERY);RES_QUERY);
      
      if (data?.allOfertaHomedesigns && data.allOfertaHomedesigns.length > 0) {edesigns.length > 0) {
        // Transformer les données DatoCMS au format attendu
        const offres: Offre[] = data.allOfertaHomedesigns.map((offre) => ({
          id: offre.id,
          slug: offre.slug,
          titre: offre.titulo,
          description: offre.descripcion,
          descriptionCourte: offre.descripcionCorta,
          dateDebut: offre.fechaDeInicio,
          dateFin: offre.fechaDeFin,
          image: offre.imagen?.url || null,
          prix: offre.precio || null,
          prixOriginal: offre.precioOriginal || null,
          pourcentageReduction: offre.porcentajeDeDescuento || null,
          actif: offre.activo,
          misEnAvant: offre.destacado || false,
        }));

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
          count: offresTries.length,
          source: 'datocms'
        });
      }
    } catch (datoError) {
      console.warn('DatoCMS unavailable, using fallback data:', datoError);
    }

    // Fallback sur les données JSON
    const offres = offresData as Offre[];
    const offresActives = offres.filter(offre => offre.actif);
    const offresTries = offresActives.sort((a, b) => {
      if (a.misEnAvant && !b.misEnAvant) return -1;
      if (!a.misEnAvant && b.misEnAvant) return 1;
      return new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime();
    });

    return NextResponse.json({
      offres: offresTries,
      count: offresTries.length,
      source: 'fallback'
    });
  } catch (error) {
    console.error('Error fetching offres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offres' },
      { status: 500 }
    );
  }
}
