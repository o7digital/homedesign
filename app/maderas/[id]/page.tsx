import type { Metadata } from "next";
import maderasData from "../../../data/maderas.json";
import { WoodDetailContent } from "./WoodDetailClient";

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
      title: "Madera no encontrada | Home Design Marques",
      alternates: { canonical: `/maderas/${id}` },
    };
  }

  const description = `${madera.nombre}: ${madera.descripcion} Origen: ${madera.origen}.`;

  return {
    title: `Madera de ${madera.nombre} | Home Design Marques`,
    description,
    alternates: {
      canonical: `/maderas/${madera.id}`,
      languages: {
        "es-MX": `/maderas/${madera.id}`,
        en: `/en/wood/${madera.id}`,
      },
    },
    openGraph: {
      title: `Madera de ${madera.nombre} | Home Design Marques`,
      description,
      url: `/maderas/${madera.id}`,
      images: [{ url: madera.img, alt: madera.nombre }],
    },
  };
}

export default function DetalleMadera({ params }: { params: { id: string } }) {
  return <WoodDetailContent params={params} locale="es" />;
}
