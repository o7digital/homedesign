"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Locale = "es" | "en";

export default function SiteHeader({ locale = "es" }: { locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isEn = locale === "en";
  const base = isEn ? "/en" : "";
  const labels = isEn
    ? {
        about: "About us",
        wood: "Wood Types",
        products: "Products",
        contact: "Contact",
        faq: "Frequently asked questions",
        offers: "OFFERS",
      }
    : {
        about: "Quiénes somos",
        wood: "Tipos de Madera",
        products: "Productos",
        contact: "Contacto",
        faq: "Preguntas frecuentes",
        offers: "OFERTAS",
      };

  return (
    <header className="fixed top-0 w-full bg-black text-white z-50">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center p-4">
        <Link href={base || "/"} className="font-bold text-lg" aria-label="Home Design Marques">
          <Image
            src="/logo-transparent.png"
            alt="Home Design Marques - Venta y Fabricación de Casas de Madera Prefabricadas México"
            width={600}
            height={160}
            className="h-40 w-auto"
            priority
          />
        </Link>
        <button
          type="button"
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
        >
          &#9776;
        </button>
        <nav>
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent`}
          >
            <li className="md:ml-8 p-2 text-center">
              <Link href={`${base}/#quienes-somos`} className="hover:underline">
                {labels.about}
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href={`${base}/#tipos`} className="hover:underline">
                {labels.wood}
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href={`${base}/#productos`} className="hover:underline">
                {labels.products}
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href={`${base}/#contacto`} className="hover:underline">
                {labels.contact}
              </Link>
              <Link
                href={isEn ? "/en/preguntas" : "/preguntas"}
                className="mt-2 block text-xs uppercase tracking-wide text-gray-300 hover:text-white hover:underline"
              >
                {labels.faq}
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link
                href={isEn ? "/en/offers" : "/offres"}
                className="ofertas-flash bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                {labels.offers}
              </Link>
            </li>
            <li className="md:ml-4 p-2 text-center flex items-center justify-center gap-2 text-sm font-semibold">
              <Link href="/" className={isEn ? "text-gray-400 hover:text-white" : "text-white underline"}>
                ES
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/en" className={isEn ? "text-white underline" : "text-gray-400 hover:text-white"}>
                EN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
