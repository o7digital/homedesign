"use client";
import Image from "next/image";
import Link from "next/link";
import maderasData from "../../../data/maderas.json";
import { useEffect, useState } from "react";

export default function DetalleMadera({ params }: { params: { id: string } }) {
  const useDato = process.env.NEXT_PUBLIC_USE_DATO === "1";
  const [madera, setMadera] = useState<any>(() =>
    (maderasData as any[]).find((m) => m.id === params.id)
  );

  // Fetch desde Dato si está activo
  useEffect(() => {
    if (!useDato || !params?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/maderas/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) setMadera(json.item);
        }
      } catch (_) {}
    })();
    return () => {
      cancelled = true;
    };
  }, [useDato, params?.id]);

  if (!madera) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Madera no encontrada</h1>
        <Link href="/#tipos" className="text-[#5d3b2d] font-bold hover:underline">
          ← Volver a Tipos de Madera
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefaf3] min-h-screen font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black text-white z-50">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-lg">Home Design Márquez</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/#tipos" className="hover:underline">
                  Tipos de Madera
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="hover:underline">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Detalle de la madera */}
      <div className="max-w-[900px] mx-auto mt-28 p-6 bg-[#fff2e6] rounded-xl shadow-md">
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
            <strong>Origen:</strong> {madera.origen}
          </p>
          <p className="mb-6">{madera.descripcion}</p>
          <Link href="/#tipos" className="text-[#5d3b2d] font-bold hover:underline">
            ← Volver al catálogo de maderas
          </Link>
        </div>
      </div>
    </div>
  );
}
