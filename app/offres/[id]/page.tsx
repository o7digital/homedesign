import type { Metadata } from "next";
import offresData from "../../../data/offres.json";
import type { Offre } from "@/types/offre";
import OffreDetailPage from "./OfferDetailClient";

const offres = offresData as Offre[];

function findOffre(id: string) {
  return offres.find((offre) => offre.slug === id || offre.id === id);
}

function excerpt(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 155);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const offre = findOffre(id);
  const slug = offre?.slug || id;

  if (!offre) {
    return {
      title: "Oferta no encontrada | Home Design Marques",
      alternates: { canonical: `/offres/${slug}` },
    };
  }

  return {
    title: `${offre.titre} | Home Design Marques`,
    description: excerpt(offre.descriptionCourte || offre.description),
    alternates: {
      canonical: `/offres/${slug}`,
      languages: {
        "es-MX": `/offres/${slug}`,
        en: `/en/offers/${slug}`,
      },
    },
    openGraph: {
      title: `${offre.titre} | Home Design Marques`,
      description: excerpt(offre.descriptionCourte || offre.description),
      url: `/offres/${slug}`,
      images: offre.image ? [{ url: offre.image, alt: offre.titre }] : undefined,
    },
  };
}

export default function OffrePage() {
  return <OffreDetailPage locale="es" />;
}
