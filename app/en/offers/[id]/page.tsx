import type { Metadata } from "next";
import offresData from "../../../../data/offres.json";
import type { Offre } from "@/types/offre";
import OffreDetailPage from "../../../offres/[id]/OfferDetailClient";
import { offerTranslations } from "../../../offres/[id]/translations";

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
      title: "Offer not found | Home Design Marques",
      alternates: { canonical: `/en/offers/${slug}` },
    };
  }

  const translated = offerTranslations[offre.slug] || offre;

  return {
    title: `${translated.titre} | Home Design Marques`,
    description: excerpt(translated.descriptionCourte || translated.description),
    alternates: {
      canonical: `/en/offers/${slug}`,
      languages: {
        "es-MX": `/offres/${slug}`,
        en: `/en/offers/${slug}`,
      },
    },
    openGraph: {
      title: `${translated.titre} | Home Design Marques`,
      description: excerpt(translated.descriptionCourte || translated.description),
      url: `/en/offers/${slug}`,
      locale: "en_US",
      images: offre.image ? [{ url: offre.image, alt: translated.titre }] : undefined,
    },
  };
}

export default function EnglishOfferDetailPage() {
  return <OffreDetailPage locale="en" />;
}
