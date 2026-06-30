import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

type Locale = "es" | "en";

const footerCopy = {
  es: {
    rights: "Todos los derechos reservados.",
    privacy: "Aviso de Privacidad",
    keywords: [
      "Casas de madera prefabricadas en México",
      "Fabricación de casas prefabricadas",
      "Casas modulares de madera",
      "Construcción sustentable en México",
      "Muebles de madera a medida",
      "Carpintería fina en CDMX",
      "Puertas y pisos de madera",
      "Maderas premium",
    ],
  },
  en: {
    rights: "All rights reserved.",
    privacy: "Privacy Notice",
    keywords: [
      "Prefabricated wooden homes in Mexico",
      "Custom wooden home construction",
      "Modular wooden houses",
      "Sustainable construction in Mexico",
      "Custom wood furniture",
      "Fine woodworking in Mexico City",
      "Wooden doors and flooring",
      "Premium wood products",
    ],
  },
} satisfies Record<Locale, { rights: string; privacy: string; keywords: string[] }>;

export default function SiteFooter({ locale = "es" }: { locale?: Locale }) {
  const content = footerCopy[locale];

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
