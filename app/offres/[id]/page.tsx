"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Offre } from "@/types/offre";

type Locale = "es" | "en";

const offerTranslations: Record<string, Pick<Offre, "titre" | "description" | "descriptionCourte">> = {
  "promo-cabanas-noviembre": {
    titre: "Special Wood Cabin Promotion",
    descriptionCourte: "Up to 30% off three-bedroom English-style cabins",
    description:
      "Take advantage of our special offer on three-bedroom English-style cabins. Premium wood construction with luxury finishes.\n\nIncludes:\n- Main bedroom with jacuzzi\n- Space for a king-size bed\n- Two bedrooms with shared bathroom\n- Service bathroom\n- Two levels\n- Cistern and solar water heater\n- Porsche kitchen\n\nOptional: Study or TV room. Delivery in 90 days.",
  },
  "oferta-cabana-chimenea-diciembre": {
    titre: "December Offer - Cabin with Stone Fireplace",
    descriptionCourte: "Cabin with two stone fireplaces - Perfect for winter",
    description:
      "Perfect for enjoying winter in style. English-style cabin with two natural stone fireplaces.\n\nFeatures:\n- Two stone fireplaces\n- Three spacious bedrooms\n- Main bedroom with jacuzzi\n- Service bathroom\n- Equipped Porsche kitchen\n- Solar water heater included\n- 10,000-liter cistern\n\nFinancing available up to 24 months with no interest.",
  },
  "fin-ano-cabanas": {
    titre: "Year-End Special - Premium Cabins",
    descriptionCourte: "Last chance of the year - Premium English-style cabins",
    description:
      "The last opportunity of the year to purchase your wood cabin with a special discount.\n\nPremium model includes:\n- Classic English-style architecture\n- Three spacious bedrooms\n- Jacuzzi in the main bedroom\n- Two-level construction\n- Eco-friendly installations with solar water heater\n- Luxury Porsche kitchen\n- Premium wood finishes\n\nScheduled delivery: March 2026. 30% down payment to reserve.",
  },
  "pack-familiar-noviembre": {
    titre: "Family Package - English-Style Cabin",
    descriptionCourte: "Complete family package - Cabin with stone fireplace",
    description:
      "Ideal for families looking for a welcoming space surrounded by nature.\n\nFamily Package benefits:\n- Spacious design for the whole family\n- Three comfortable bedrooms\n- Optimized shared bathroom\n- Additional service bathroom\n- Stone fireplace for cold nights\n- Fully equipped kitchen\n- Cistern installation included\n- Eco-friendly solar water heater\n\nSpecial price valid only in November. Includes personalized consulting and construction plans.",
  },
};

const copy = {
  es: {
    loading: "Cargando...",
    notFound: "Oferta no encontrada",
    backOffers: "← Volver a ofertas",
    home: "Inicio",
    offers: "Ofertas",
    noImage: "Sin imagen",
    featured: "⭐ Oferta Destacada",
    expiredTitle: "⚠️ Esta oferta ha expirado",
    expiredUntil: "La oferta era válida hasta el",
    endingTitle: "⏰ ¡Oferta por terminar!",
    onlyLeft: "Solo quedan",
    daysToUse: "para aprovecharla",
    validTitle: "✅ Oferta válida",
    stillLeft: "Aún quedan",
    daysLeft: "días para aprovecharla",
    normalPrice: "Precio normal:",
    promoPrice: "Precio promoción:",
    savings: "💰 Ahorras:",
    validPeriod: "Período de validez:",
    from: "Del",
    to: "al",
    summary: "En resumen",
    details: "Descripción detallada",
    cta: "📩 Aprovechar oferta",
    expiredOffer: "Oferta expirada",
    allOffers: "← Ver todas las ofertas",
    footerRights: "Todos los derechos reservados.",
    privacy: "Aviso de Privacidad",
    dateLocale: "es-MX",
    numberLocale: "es-MX",
    homeHref: "/",
    offersHref: "/offres",
    contactHref: "/#contacto",
    privacyHref: "/aviso-privacidad",
    aboutHref: "/#quienes-somos",
    woodHref: "/#tipos",
    productsHref: "/#productos",
    contactLabel: "Contacto",
    aboutLabel: "Quiénes somos",
    woodLabel: "Tipos de Madera",
    productsLabel: "Productos",
    daySingular: "día",
    dayPlural: "días",
  },
  en: {
    loading: "Loading...",
    notFound: "Offer not found",
    backOffers: "← Back to offers",
    home: "Home",
    offers: "Offers",
    noImage: "No image",
    featured: "⭐ Featured Offer",
    expiredTitle: "⚠️ This offer has expired",
    expiredUntil: "The offer was valid until",
    endingTitle: "⏰ Offer ending soon!",
    onlyLeft: "Only",
    daysToUse: "left to claim it",
    validTitle: "✅ Valid offer",
    stillLeft: "There are still",
    daysLeft: "days left to claim it",
    normalPrice: "Regular price:",
    promoPrice: "Promotional price:",
    savings: "💰 You save:",
    validPeriod: "Validity period:",
    from: "From",
    to: "to",
    summary: "Summary",
    details: "Detailed description",
    cta: "📩 Claim offer",
    expiredOffer: "Offer expired",
    allOffers: "← View all offers",
    footerRights: "All rights reserved.",
    privacy: "Privacy Notice",
    dateLocale: "en-US",
    numberLocale: "en-US",
    homeHref: "/en",
    offersHref: "/en/offers",
    contactHref: "/en#contacto",
    privacyHref: "/en/privacy",
    aboutHref: "/en#quienes-somos",
    woodHref: "/en#tipos",
    productsHref: "/en#productos",
    contactLabel: "Contact",
    aboutLabel: "About us",
    woodLabel: "Wood Types",
    productsLabel: "Products",
    daySingular: "day",
    dayPlural: "days",
  },
} as const;

export default function OffreDetailPage({ locale = "es" }: { locale?: Locale }) {
  const { id } = useParams();
  const [offre, setOffre] = useState<Offre | null>(null);
  const [loading, setLoading] = useState(true);
  const t = copy[locale];

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
        <p className="text-xl text-gray-600">{t.loading}</p>
      </div>
    );
  }

  if (!offre) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefaf3]">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {t.notFound}
        </h1>
        <Link href={t.offersHref} className="text-[#5d3b2d] underline hover:text-[#4a2f23]">
          {t.backOffers}
        </Link>
      </div>
    );
  }

  const translatedOffer =
    locale === "en" && offerTranslations[offre.slug]
      ? { ...offre, ...offerTranslations[offre.slug] }
      : offre;
  const valide = isOffreValide(offre);
  const jours = joursRestants(offre);

  return (
    <div className="bg-[#fefaf3] min-h-screen">
      {/* Header */}
      <header className="w-full bg-black text-white p-4">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <Link href={t.homeHref} className="font-bold text-lg">
            Home Design Marques
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href={t.aboutHref} className="hover:underline">
                  {t.aboutLabel}
                </Link>
              </li>
              <li>
                <Link href={t.woodHref} className="hover:underline">
                  {t.woodLabel}
                </Link>
              </li>
              <li>
                <Link href={t.productsHref} className="hover:underline">
                  {t.productsLabel}
                </Link>
              </li>
              <li>
                <Link href={t.offersHref} className="hover:underline font-bold">
                  {t.offers}
                </Link>
              </li>
              <li>
                <Link href={t.contactHref} className="hover:underline">
                  {t.contactLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-[1100px] mx-auto px-6 py-4">
        <nav className="text-sm text-gray-600">
          <Link href={t.homeHref} className="hover:text-[#5d3b2d]">
            {t.home}
          </Link>
          {" > "}
          <Link href={t.offersHref} className="hover:text-[#5d3b2d]">
            {t.offers}
          </Link>
          {" > "}
          <span className="text-gray-800">{translatedOffer.titre}</span>
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
                alt={translatedOffer.titre}
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
              <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-2xl shadow-xl">
                -{offre.pourcentageReduction}%
              </div>
            )}

            {/* Badge destacado */}
            {offre.misEnAvant && (
              <div className="absolute top-6 left-6 bg-[#5d3b2d] text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                {t.featured}
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#5d3b2d] mb-4">
              {translatedOffer.titre}
            </h1>

            {/* Alerta de validez */}
            {!valide ? (
              <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-6 rounded">
                <p className="font-bold">{t.expiredTitle}</p>
                <p className="text-sm">
                  {t.expiredUntil} {formatDate(offre.dateFin)}
                </p>
              </div>
            ) : jours <= 7 ? (
              <div className="bg-orange-100 border-l-4 border-orange-600 text-orange-800 p-4 mb-6 rounded">
                <p className="font-bold">{t.endingTitle}</p>
                <p className="text-sm">
                  {t.onlyLeft} {jours} {jours === 1 ? t.daySingular : t.dayPlural} {t.daysToUse}
                </p>
              </div>
            ) : (
              <div className="bg-green-100 border-l-4 border-green-600 text-green-800 p-4 mb-6 rounded">
                <p className="font-bold">{t.validTitle}</p>
                <p className="text-sm">
                  {t.stillLeft} {jours} {t.daysLeft}
                </p>
              </div>
            )}

            {/* Precio */}
            {offre.prix && (
              <div className="bg-[#fff2e6] p-6 rounded-lg mb-6">
                <div className="flex items-baseline gap-4">
                  {offre.prixOriginal && (
                    <div className="text-gray-500">
                      <span className="text-sm">{t.normalPrice}</span>
                      <span className="text-2xl line-through ml-2">
                        ${offre.prixOriginal.toLocaleString(t.numberLocale)} MXN
                      </span>
                    </div>
                  )}
                  <div className="text-[#5d3b2d]">
                    <span className="text-sm">{t.promoPrice}</span>
                    <span className="text-4xl font-bold ml-2">
                      ${offre.prix.toLocaleString(t.numberLocale)} MXN
                    </span>
                  </div>
                </div>
                {offre.prixOriginal && offre.prix && (
                  <p className="text-green-700 font-bold mt-2">
                    {t.savings} $
                    {(offre.prixOriginal - offre.prix).toLocaleString(t.numberLocale)} MXN
                  </p>
                )}
              </div>
            )}

            {/* Período de validez */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                📅 <strong>{t.validPeriod}</strong>
              </p>
              <p className="text-lg mt-1">
                {t.from} {formatDate(offre.dateDebut)} {t.to} {formatDate(offre.dateFin)}
              </p>
            </div>

            {/* Descripción corta */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                {t.summary}
              </h2>
              <p className="text-xl text-gray-700">{translatedOffer.descriptionCourte}</p>
            </div>

            {/* Descripción completa */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#5d3b2d] mb-3">
                {t.details}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {translatedOffer.description}
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4">
              <Link
                href={t.contactHref}
                className={`flex-1 text-center px-8 py-4 rounded-lg font-bold text-lg transition ${
                  valide
                    ? "bg-[#5d3b2d] text-white hover:bg-[#4a2f23]"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {valide ? t.cta : t.expiredOffer}
              </Link>
              <Link
                href={t.offersHref}
                className="px-8 py-4 border-2 border-[#5d3b2d] text-[#5d3b2d] rounded-lg font-bold text-lg hover:bg-[#5d3b2d] hover:text-white transition"
              >
                {t.allOffers}
              </Link>
            </div>
          </div>
        </div>
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
