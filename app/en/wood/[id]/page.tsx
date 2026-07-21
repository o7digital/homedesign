"use client";

import Image from "next/image";
import Link from "next/link";
import maderasData from "../../../../data/maderas.json";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";

interface MaderaItem {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  img: string;
}

export default function EnglishWoodDetail({ params }: { params: { id: string } }) {
  const madera = (maderasData as MaderaItem[]).find((m) => m.id === params.id);

  if (!madera) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Wood type not found</h1>
        <Link href="/en/#tipos" className="text-[#5d3b2d] font-bold hover:underline">
          ← Back to Wood Types
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefaf3] min-h-screen font-sans">
      <SiteHeader locale="en" />
      <div className="max-w-[900px] mx-auto mt-[230px] p-6 bg-[#fff2e6] rounded-xl shadow-md">
        <div className="flex flex-col items-center text-center">
          <Image
            src={madera.img}
            alt={madera.nombre}
            width={500}
            height={400}
            className="rounded-lg mb-6"
          />
          <h1 className="text-2xl font-bold mb-2">{madera.nombre}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Origin:</strong> {madera.origen}
          </p>
          <p className="mb-6 whitespace-pre-line">{madera.descripcion}</p>
          <Link href="/en/#tipos" className="text-[#5d3b2d] font-bold hover:underline">
            ← Back to wood catalog
          </Link>
        </div>
      </div>
      <SiteFooter locale="en" />
    </div>
  );
}
