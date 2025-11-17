"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Offre } from "@/types/offre";

export default function OffresPage() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffres() {
      try {
        const res = await fetch("/api/offres");
        if (res.ok) {
          const data = await res.json();
          setOffres(data.offres || []);
        }
      } catch (error) {
        console.error("Error fetching offres:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOffres();
  }, []);

  // Función para formatear las fechas
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fonction pour vérifier si l'offre est toujours valide
  const isOffreValide = (offre: Offre) => {
    const now = new Date();
    const dateFin = new Date(offre.dateFin);
    return dateFin >= now;
  };

  return (
    <div className="bg-[#fefaf3] min-h-screen">
      {/* Header */}
      <header className="w-full bg-black text-white p-4">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Home Design Marques
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/#quienes-somos" className="hover:underline">
                  Quiénes somos
                </Link>
              </li>
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
                <Link href="/offres" className="hover:underline font-bold">
                  Offres
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#5d3b2d] to-[#8b5a3c] text-white py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestras Ofertas Especiales
          </h1>
          <p className="text-xl opacity-90">
            Aprovecha nuestras promociones exclusivas en cabañas de madera
          </p>
        </div>
      </div>

      {/* Liste des offres */}
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Cargando ofertas...</p>
          </div>
        ) : offres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No hay ofertas disponibles en este momento.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-[#5d3b2d] underline hover:text-[#4a2f23]"
            >
              ← Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offres.map((offre) => {
              const valide = isOffreValide(offre);
              return (
                <div
                  key={offre.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                    offre.misEnAvant ? "ring-2 ring-[#5d3b2d]" : ""
                  }`}
                >
                  {/* Badge destacado */}
                  {offre.misEnAvant && (
                    <div className="bg-[#5d3b2d] text-white px-4 py-2 text-sm font-bold">
                      ⭐ Oferta Destacada
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-64 w-full bg-gray-200">
                    {offre.image ? (
                      <Image
                        src={offre.image}
                        alt={offre.titre}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                    {/* Badge réduction */}
                    {offre.pourcentageReduction && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        -{offre.pourcentageReduction}%
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                      {offre.titre}
                    </h2>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {offre.descriptionCourte}
                    </p>

                    {/* Prix */}
                    {offre.prix && (
                      <div className="mb-4">
                        {offre.prixOriginal && (
                          <span className="text-gray-500 line-through mr-3">
                            ${offre.prixOriginal.toFixed(2)} MXN
                          </span>
                        )}
                        <span className="text-3xl font-bold text-[#5d3b2d]">
                          ${offre.prix.toFixed(2)} MXN
                        </span>
                      </div>
                    )}

                    {/* Fechas */}
                    <div className="mb-4 text-sm">
                      <p className="text-gray-600">
                        📅 Válida del {formatDate(offre.dateDebut)} al{" "}
                        {formatDate(offre.dateFin)}
                      </p>
                      {!valide && (
                        <p className="text-red-600 font-bold mt-2">
                          ⚠️ Oferta expirada
                        </p>
                      )}
                    </div>

                    {/* Botón */}
                    <Link
                      href={`/offres/${offre.slug}`}
                      className={`block text-center px-6 py-3 rounded-lg transition ${
                        valide
                          ? "bg-[#5d3b2d] text-white hover:bg-[#4a2f23]"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                    >
                      {valide ? "Ver oferta" : "Oferta expirada"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Home Design Marques. Todos los derechos
          reservados.
        </p>
        <Link
          href="/aviso-privacidad"
          className="underline hover:text-gray-300"
        >
          Aviso de Privacidad
        </Link>
      </footer>
    </div>
  );
}
