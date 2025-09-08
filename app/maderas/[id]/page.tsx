"use client";
import Image from "next/image";
import Link from "next/link";
import maderas from "../../../data/maderas.json";

export default function DetalleMadera({ params }: { params: { id: string } }) {
  // Buscar la madera en el JSON por el id de la URL
  const madera = maderas.find((m) => m.id === params.id);

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
