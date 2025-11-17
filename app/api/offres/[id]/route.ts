import { NextResponse } from 'next/server';
import offresData from '@/data/offres.json';
import type { Offre } from '@/types/offre';
import { datoRequest } from '@/lib/datocms';

export const dynamic = 'force-dynamic';

const OFFRE_QUERY = `
  query OffreQuery($slug: String!) {
    ofertaHomedesign(filter: { slug: { eq: $slug } }) {
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Essayer de récupérer depuis DatoCMS
    try {
      const data = await datoRequest<{ ofertaHomedesign: DatoOffre | null }>(
        OFFRE_QUERY,
        { slug: id }
      );

      if (data?.ofertaHomedesign) {
        const offre: Offre = {
          id: data.ofertaHomedesign.id,
          slug: data.ofertaHomedesign.slug,
          titre: data.ofertaHomedesign.titulo,
          description: data.ofertaHomedesign.descripcion,
          descriptionCourte: data.ofertaHomedesign.descripcionCorta,
          dateDebut: data.ofertaHomedesign.fechaDeInicio,
          dateFin: data.ofertaHomedesign.fechaDeFin,
          image: data.ofertaHomedesign.imagen?.url || null,
          prix: data.ofertaHomedesign.precio || null,
          prixOriginal: data.ofertaHomedesign.precioOriginal || null,
          pourcentageReduction: data.ofertaHomedesign.porcentajeDeDescuento || null,
          actif: data.ofertaHomedesign.activo,
          misEnAvant: data.ofertaHomedesign.destacado || false,
        };

        return NextResponse.json({
          offre,
          source: 'datocms'
        });
      }
    } catch (datoError) {
      console.warn('DatoCMS unavailable, using fallback data:', datoError);
    }

    // Fallback sur les données JSON
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

    return NextResponse.json({ 
      offre,
      source: 'fallback'
    });
  } catch (error) {
    console.error('Error fetching offre:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offre' },
      { status: 500 }
    );
  }
}
