"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Offre } from "@/types/offre";

export default function OffreDetailPage() {
  const { id } = useParams();
  const [offre, setOffre] = useState<Offre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    async function fetchOffre() {
      try {
        const res = await fetch(`/api/offres/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOffre(data.offre);
        }
      } catch (error) {
        console.error("Error fetching offre:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOffre();
  }, [id]);

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

  // Calculer les jours restants
  const joursRestants = (offre: Offre) => {
    const now = new Date();
    const dateFin = new Date(offre.dateFin);
    const diff = dateFin.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefaf3]">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!offre) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefaf3]">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oferta no encontrada
        </h1>
        <Link href="/offres" className="text-[#5d3b2d] underline hover:text-[#4a2f23]">
          ← Volver a ofertas
        </Link>
      </div>
    );
  }

  const valide = isOffreValide(offre);
  const jours = joursRestants(offre);

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

      {/* Breadcrumbs */}
      <div className="max-w-[1100px] mx-auto px-6 py-4">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-[#5d3b2d]">
            Inicio
          </Link>
          {" > "}
          <Link href="/offres" className="hover:text-[#5d3b2d]">
            Ofertas
          </Link>
          {" > "}
          <span className="text-gray-800">{offre.titre}</span>
        </nav>
      </div>

      {/* Détail de l'offre */}
      <main className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image principale */}
          <div className="relative h-96 w-full bg-gray-200">
            {offre.image ? (
              <Image
                src={offre.image}
                alt={offre.titre}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Pas d&apos;image
              </div>
            )}
            
            {/* Badge réduction */}
            {offre.pourcentageReduction && (
              <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-2xl shadow-xl">
                -{offre.pourcentageReduction}%
              </div>
            )}

            {/* Badge destacado */}
            {offre.misEnAvant && (
              <div className="absolute top-6 left-6 bg-[#5d3b2d] text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                ⭐ Oferta Destacada
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#5d3b2d] mb-4">
              {offre.titre}
            </h1>

            {/* Alerta de validez */}
            {!valide ? (
              <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-6 rounded">
                <p className="font-bold">⚠️ Esta oferta ha expirado</p>
                <p className="text-sm">
                  La oferta era válida hasta el {formatDate(offre.dateFin)}
                </p>
              </div>
            ) : jours <= 7 ? (
              <div className="bg-orange-100 border-l-4 border-orange-600 text-orange-800 p-4 mb-6 rounded">
                <p className="font-bold">⏰ ¡Oferta por terminar!</p>
                <p className="text-sm">
                  Solo quedan {jours} día{jours > 1 ? "s" : ""} para aprovecharla
                </p>
              </div>
            ) : (
              <div className="bg-green-100 border-l-4 border-green-600 text-green-800 p-4 mb-6 rounded">
                <p className="font-bold">✅ Oferta válida</p>
                <p className="text-sm">
                  Aún quedan {jours} días para aprovecharla
                </p>
              </div>
            )}

            {/* Precio */}
            {offre.prix && (
              <div className="bg-[#fff2e6] p-6 rounded-lg mb-6">
                <div className="flex items-baseline gap-4">
                  {offre.prixOriginal && (
                    <div className="text-gray-500">
                      <span className="text-sm">Precio normal:</span>
                      <span className="text-2xl line-through ml-2">
                        ${offre.prixOriginal.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  )}
                  <div className="text-[#5d3b2d]">
                    <span className="text-sm">Precio promoción:</span>
                    <span className="text-4xl font-bold ml-2">
                      ${offre.prix.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
                {offre.prixOriginal && offre.prix && (
                  <p className="text-green-700 font-bold mt-2">
                    💰 Ahorras: $
                    {(offre.prixOriginal - offre.prix).toLocaleString('es-MX')} MXN
                  </p>
                )}
              </div>
            )}

            {/* Período de validez */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                📅 <strong>Período de validez:</strong>
              </p>
              <p className="text-lg mt-1">
                Del {formatDate(offre.dateDebut)} al {formatDate(offre.dateFin)}
              </p>
            </div>

            {/* Descripción corta */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                En resumen
              </h2>
              <p className="text-xl text-gray-700">{offre.descriptionCourte}</p>
            </div>

            {/* Descripción completa */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                Descripción detallada
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {offre.description}
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4">
              <Link
                href="/#contacto"
                className={`flex-1 text-center px-8 py-4 rounded-lg font-bold text-lg transition ${
                  valide
                    ? "bg-[#5d3b2d] text-white hover:bg-[#4a2f23]"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {valide ? "📩 Aprovechar oferta" : "Oferta expirada"}
              </Link>
              <Link
                href="/offres"
                className="px-8 py-4 border-2 border-[#5d3b2d] text-[#5d3b2d] rounded-lg font-bold text-lg hover:bg-[#5d3b2d] hover:text-white transition"
              >
                ← Ver todas las ofertas
              </Link>
            </div>
          </div>
        </div>
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
