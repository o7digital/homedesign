import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

type Locale = "es" | "en";

const keywords = {
  es: "venta casas de madera México • fabricación casas prefabricadas • casas de madera prefabricadas México • construcción casas de madera CDMX • venta casas ecológicas México • casas modulares de madera • venta mobiliario madera CDMX • fabricación muebles de madera México • muebles madera para oficinas • mobiliario de madera para casas • carpintería fina México • venta puertas de madera México • fabricación puertas madera CDMX • pisos de madera natural • venta triplay México • madera barnizada • escaleras de madera • madera de pino México • madera de cedro CDMX • madera de encino • madera de nogal • productos madera premium • construcción sustentable México • viviendas ecológicas • diseño casas modernas madera • carpintería a medida CDMX",
  en: "wooden homes Mexico • prefabricated wooden homes • custom wood furniture Mexico • wood furniture for offices • wood furniture for homes • fine carpentry Mexico • wooden doors Mexico • custom wooden doors • natural wood flooring • plywood Mexico • varnished wood • wooden stairs • pine wood Mexico • cedar wood • oak wood • walnut wood • premium wood products • sustainable construction Mexico • eco-friendly homes • modern wooden house design • custom carpentry Mexico",
};

export default function SiteFooter({ locale = "es" }: { locale?: Locale }) {
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
        © {new Date().getFullYear()} Home Design Marques. Todos los derechos
        reservados.
      </p>
      <Link
        href="/aviso-privacidad"
        className="underline hover:text-gray-300 block mt-2"
      >
        Aviso de Privacidad
      </Link>

      <div className="mt-8 text-sm text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
        <p className="text-center">{keywords[locale]}</p>
      </div>
    </footer>
  );
}
