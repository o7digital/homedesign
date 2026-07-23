import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

type Locale = "es" | "en";

const footerCopy = {
  es: {
    rights: "Todos los derechos reservados.",
    privacy: "Aviso de Privacidad",
    seoKeywords: [
      "casas de madera México",
      "casas prefabricadas de madera",
      "cabañas de madera México",
      "construcción de casas de madera CDMX",
      "casas ecológicas México",
      "casas modulares de madera",
      "muebles de madera a medida",
      "mobiliario de madera para oficinas",
      "carpintería fina México",
      "puertas de madera México",
      "pisos de madera natural",
      "triplay México",
      "escaleras de madera",
      "madera de pino",
      "madera de cedro",
      "madera de encino",
      "madera de nogal",
      "madera parota",
      "productos de madera premium",
      "construcción sustentable México",
    ],
    links: [
      { href: "/#productos", label: "Casas de madera" },
      { href: "/#productos", label: "Mobiliario a medida" },
      { href: "/#tipos", label: "Tipos de madera" },
      { href: "/offres", label: "Ofertas" },
      { href: "/noticias", label: "Noticias" },
      { href: "/preguntas", label: "Preguntas frecuentes" },
    ],
  },
  en: {
    rights: "All rights reserved.",
    privacy: "Privacy Notice",
    seoKeywords: [
      "wooden homes Mexico",
      "prefabricated wooden homes",
      "wood cabins Mexico",
      "wooden house construction Mexico City",
      "eco-friendly homes Mexico",
      "modular wooden homes",
      "custom wood furniture",
      "wood office furniture",
      "fine woodworking Mexico",
      "wooden doors Mexico",
      "natural wood flooring",
      "plywood Mexico",
      "wooden stairs",
      "pine wood",
      "cedar wood",
      "oak wood",
      "walnut wood",
      "parota wood",
      "premium wood products",
      "sustainable construction Mexico",
    ],
    links: [
      { href: "/en/#productos", label: "Wooden homes" },
      { href: "/en/#productos", label: "Custom furniture" },
      { href: "/en/#tipos", label: "Wood types" },
      { href: "/en/offers", label: "Offers" },
      { href: "/en/news", label: "News" },
      { href: "/en/preguntas", label: "FAQ" },
    ],
  },
} satisfies Record<
  Locale,
  {
    rights: string;
    privacy: string;
    seoKeywords: string[];
    links: Array<{ href: string; label: string }>;
  }
>;

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
          href="https://wa.me/527208297054"
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
          {content.links.map((item) => (
            <li key={item.href + item.label}>
              <Link href={item.href} className="hover:text-white hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-8 max-w-5xl mx-auto px-4 text-xs leading-6 text-gray-500">
        {content.seoKeywords.join(" · ")}
      </p>
    </footer>
  );
}
