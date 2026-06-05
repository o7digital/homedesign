"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-black text-white z-50">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-lg" aria-label="Home Design Marques">
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
              <Link href="/#quienes-somos" className="hover:underline">
                Quiénes somos
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href="/#tipos" className="hover:underline">
                Tipos de Madera
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href="/#productos" className="hover:underline">
                Productos
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link href="/#contacto" className="hover:underline">
                Contacto
              </Link>
              <Link
                href="/preguntas"
                className="block text-xs uppercase tracking-wide text-gray-300 hover:text-white hover:underline"
              >
                Preguntas frecuentes
              </Link>
            </li>
            <li className="md:ml-8 p-2 text-center">
              <Link
                href="/offres"
                className="ofertas-flash bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                OFERTAS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
