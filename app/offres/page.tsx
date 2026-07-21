"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Offre } from "@/types/offre";

type Locale = "es" | "en";

const offerTranslations: Record<string, Pick<Offre, "titre" | "descriptionCourte">> = {
  "promo-cabanas-noviembre": {
    titre: "Special Wood Cabin Promotion",
    descriptionCourte: "Up to 30% off three-bedroom English-style cabins",
  },
  "oferta-cabana-chimenea-diciembre": {
    titre: "December Offer - Cabin with Stone Fireplace",
    descriptionCourte: "Cabin with two stone fireplaces - Perfect for winter",
  },
  "fin-ano-cabanas": {
    titre: "Year-End Special - Premium Cabins",
    descriptionCourte: "Last chance of the year - Premium English-style cabins",
  },
  "pack-familiar-noviembre": {
    titre: "Family Package - English-Style Cabin",
    descriptionCourte: "Complete family package - Cabin with stone fireplace",
  },
};

const copy = {
  es: {
    navAbout: "Quiénes somos",
    navWood: "Tipos de Madera",
    navProducts: "Productos",
    navOffers: "Offres",
    navContact: "Contacto",
    heroTitle: "Nuestras Ofertas Especiales",
    heroSubtitle: "Aprovecha nuestras promociones exclusivas en cabañas de madera",
    loading: "Cargando ofertas...",
    empty: "No hay ofertas disponibles en este momento.",
    backHome: "← Volver al inicio",
    featured: "⭐ Oferta Destacada",
    noImage: "Sin imagen",
    validFrom: "📅 Válida del",
    validTo: "al",
    expiredWarning: "⚠️ Oferta expirada",
    viewOffer: "Ver oferta",
    expiredOffer: "Oferta expirada",
    footerRights: "Todos los derechos reservados.",
    privacy: "Aviso de Privacidad",
    dateLocale: "es-MX",
    homeHref: "/",
    aboutHref: "/#quienes-somos",
    woodHref: "/#tipos",
    productsHref: "/#productos",
    offersHref: "/offres",
    contactHref: "/#contacto",
    privacyHref: "/aviso-privacidad",
  },
  en: {
    navAbout: "About us",
    navWood: "Wood Types",
    navProducts: "Products",
    navOffers: "Offers",
    navContact: "Contact",
    heroTitle: "Our Special Offers",
    heroSubtitle: "Take advantage of our exclusive promotions on wood cabins",
    loading: "Loading offers...",
    empty: "No offers are available at the moment.",
    backHome: "← Back to home",
    featured: "⭐ Featured Offer",
    noImage: "No image",
    validFrom: "📅 Valid from",
    validTo: "to",
    expiredWarning: "⚠️ Offer expired",
    viewOffer: "View offer",
    expiredOffer: "Offer expired",
    footerRights: "All rights reserved.",
    privacy: "Privacy Notice",
    dateLocale: "en-US",
    homeHref: "/en",
    aboutHref: "/en#quienes-somos",
    woodHref: "/en#tipos",
    productsHref: "/en#productos",
    offersHref: "/en/offers",
    contactHref: "/en#contacto",
    privacyHref: "/en/privacy",
  },
} as const;

export default function OffresPage({ locale = "es" }: { locale?: Locale }) {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(true);
  const t = copy[locale];

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
    return date.toLocaleDateString(t.dateLocale, {
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
            <Image 
              src="/logo-transparent.png" 
              alt="Home Design Marques" 
              width={600} 
              height={160}
              className="h-40 w-auto"
            />
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href={t.aboutHref} className="hover:underline">
                  {t.navAbout}
                </Link>
              </li>
              <li>
                <Link href={t.woodHref} className="hover:underline">
                  {t.navWood}
                </Link>
              </li>
              <li>
                <Link href={t.productsHref} className="hover:underline">
                  {t.navProducts}
                </Link>
              </li>
              <li>
                <Link href={t.offersHref} className="hover:underline font-bold">
                  {t.navOffers}
                </Link>
              </li>
              <li>
                <Link href={t.contactHref} className="hover:underline">
                  {t.navContact}
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
            {t.heroTitle}
          </h1>
          <p className="text-xl opacity-90">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Liste des offres */}
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">{t.loading}</p>
          </div>
        ) : offres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {t.empty}
            </p>
            <Link
              href={t.homeHref}
              className="mt-6 inline-block text-[#5d3b2d] underline hover:text-[#4a2f23]"
            >
              {t.backHome}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offres.map((offre) => {
              const valide = isOffreValide(offre);
              const translatedOffer =
                locale === "en" && offerTranslations[offre.slug]
                  ? { ...offre, ...offerTranslations[offre.slug] }
                  : offre;
              return (
                <div
                  key={offre.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col ${
                    offre.misEnAvant ? "ring-2 ring-[#5d3b2d]" : ""
                  }`}
                >
                  {/* Badge destacado */}
                  {offre.misEnAvant && (
                    <div className="bg-[#5d3b2d] text-white px-4 py-2 text-sm font-bold">
                      {t.featured}
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
                        {t.noImage}
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
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                      {translatedOffer.titre}
                    </h2>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {translatedOffer.descriptionCourte}
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
                        {t.validFrom} {formatDate(offre.dateDebut)} {t.validTo}{" "}
                        {formatDate(offre.dateFin)}
                      </p>
                      {!valide && (
                        <p className="text-red-600 font-bold mt-2">
                          {t.expiredWarning}
                        </p>
                      )}
                    </div>

                    {/* Botón - poussé vers le bas avec mt-auto */}
                    <Link
                      href={`${t.offersHref}/${offre.slug}`}
                      className={`block text-center px-6 py-3 rounded-lg transition mt-auto ${
                        valide
                          ? "bg-[#5d3b2d] text-white hover:bg-[#4a2f23]"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                    >
                      {valide ? t.viewOffer : t.expiredOffer}
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
          © {new Date().getFullYear()} Home Design Marques. {t.footerRights}
        </p>
        <Link
          href={t.privacyHref}
          className="underline hover:text-gray-300"
        >
          {t.privacy}
        </Link>
      </footer>
    </div>
  );
}
