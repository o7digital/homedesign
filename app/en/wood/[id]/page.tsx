import type { Metadata } from "next";
import maderasData from "../../../../data/maderas.json";
import { WoodDetailContent } from "../../../maderas/[id]/WoodDetailClient";

interface MaderaItem {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  img: string;
}

const maderas = maderasData as MaderaItem[];

function findMadera(id: string) {
  return maderas.find((m) => m.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const madera = findMadera(id);

  if (!madera) {
    return {
      title: "Wood type not found | Home Design Marques",
      alternates: { canonical: `/en/wood/${id}` },
    };
  }

  const description = `${madera.nombre}: ${madera.descripcion} Origin: ${madera.origen}.`;

  return {
    title: `${madera.nombre} wood | Home Design Marques`,
    description,
    alternates: {
      canonical: `/en/wood/${madera.id}`,
      languages: {
        "es-MX": `/maderas/${madera.id}`,
        en: `/en/wood/${madera.id}`,
      },
    },
    openGraph: {
      title: `${madera.nombre} wood | Home Design Marques`,
      description,
      url: `/en/wood/${madera.id}`,
      locale: "en_US",
      images: [{ url: madera.img, alt: madera.nombre }],
    },
  };
}

export default function EnglishWoodDetail({ params }: { params: { id: string } }) {
  return <WoodDetailContent params={params} locale="en" />;
}
