import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

type Locale = "es" | "en";

const footerCopy = {
  es: {
    rights: "Todos los derechos reservados.",
    privacy: "Aviso de Privacidad",
    keywords: [
      "venta casas de madera México",
      "fabricación casas prefabricadas",
      "casas de madera prefabricadas México",
      "construcción casas de madera CDMX",
      "venta casas ecológicas México",
      "casas modulares de madera",
      "venta mobiliario madera CDMX",
      "fabricación muebles de madera México",
      "muebles madera para oficinas",
      "mobiliario de madera para casas",
      "carpintería fina México",
      "venta puertas de madera México",
      "fabricación puertas madera CDMX",
      "pisos de madera natural",
      "venta triplay México",
      "madera barnizada",
      "escaleras de madera",
      "madera de pino México",
      "madera de cedro CDMX",
      "madera de encino",
      "madera de nogal",
      "productos madera premium",
      "construcción sustentable México",
      "viviendas ecológicas",
      "diseño casas modernas madera",
      "carpintería a medida CDMX",
    ],
  },
  en: {
    rights: "All rights reserved.",
    privacy: "Privacy Notice",
    keywords: [
      "wooden homes for sale in Mexico",
      "prefabricated home manufacturing",
      "prefabricated wooden homes in Mexico",
      "wooden home construction in Mexico City",
      "eco-friendly homes for sale in Mexico",
      "modular wooden homes",
      "wood furniture for sale in Mexico City",
      "wood furniture manufacturing in Mexico",
      "wood office furniture",
      "wood furniture for homes",
      "fine woodworking in Mexico",
      "wooden doors for sale in Mexico",
      "wooden door manufacturing in Mexico City",
      "natural wood flooring",
      "plywood for sale in Mexico",
      "varnished wood",
      "wooden staircases",
      "pine wood in Mexico",
      "cedar wood in Mexico City",
      "oak wood",
      "walnut wood",
      "premium wood products",
      "sustainable construction in Mexico",
      "eco-friendly housing",
      "modern wooden home design",
      "custom woodworking in Mexico City",
    ],
  },
} satisfies Record<Locale, { rights: string; privacy: string; keywords: string[] }>;

export default function SiteFooter({ locale = "es" }: { locale?: Locale }) {
  const content = footerCopy[locale];
  const isEn = locale === "en";

  return (
    <footer className="bg-black text-white text-center py-8 mt-10">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-xl"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-xl"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://wa.me/5215512345678"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-xl"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://www.tiktok.com/@TU_USUARIO"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 text-xl"
          aria-label="TikTok"
        >
          <FaTiktok />
        </a>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} Home Design Marques. {content.rights}
      </p>
      <Link
        href={locale === "en" ? "/en/privacy" : "/aviso-privacidad"}
        className="underline hover:text-gray-300 block mt-2"
      >
        {content.privacy}
      </Link>
      <p className="text-sm mt-3 text-gray-300">
        {isEn ? "Made by " : "Realizado por "}
        <a
          href={isEn ? "https://www.o7digital.com/en" : "https://www.o7digital.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          o7 digital
        </a>
      </p>

      <nav
        aria-label={locale === "en" ? "Services" : "Servicios"}
        className="mt-7 max-w-4xl mx-auto px-4"
      >
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-gray-300">
          {content.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
