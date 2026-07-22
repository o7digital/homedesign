"use client";
import Image from "next/image";
import Link from "next/link";
import maderasData from "../../../data/maderas.json";
import { useEffect, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

interface MaderaItem {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  img: string;
}

type Locale = "es" | "en";

export function WoodDetailContent({ params, locale = "es" }: { params: { id: string }; locale?: Locale }) {
  const isEn = locale === "en";
  const [madera, setMadera] = useState<MaderaItem | undefined>(() =>
    (maderasData as MaderaItem[]).find((m) => m.id === params.id)
  );

  // Fetch desde Dato siempre; si falla, dejamos el fallback local
  useEffect(() => {
    if (!params?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/maderas/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json?.item) setMadera(json.item as MaderaItem);
        }
      } catch {
        // Ignoramos errores y dejamos el fallback local
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  if (!madera) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">{isEn ? "Wood type not found" : "Madera no encontrada"}</h1>
        <Link href={isEn ? "/en/#tipos" : "/#tipos"} className="text-[#5d3b2d] font-bold hover:underline">
          ← {isEn ? "Back to Wood Types" : "Volver a Tipos de Madera"}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefaf3] min-h-screen font-sans">
      <SiteHeader locale={locale} />

      {/* Detalle de la madera */}
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
            <strong>{isEn ? "Origin:" : "Origen:"}</strong> {madera.origen}
          </p>
          <p className="mb-6 whitespace-pre-line">{madera.descripcion}</p>
          <Link href={isEn ? "/en/#tipos" : "/#tipos"} className="text-[#5d3b2d] font-bold hover:underline">
            ← {isEn ? "Back to wood catalog" : "Volver al catálogo de maderas"}
          </Link>
        </div>
      </div>
      <SiteFooter locale={locale} />
    </div>
  );
}

export default function DetalleMadera({ params }: { params: { id: string } }) {
  return <WoodDetailContent params={params} locale="es" />;
}
