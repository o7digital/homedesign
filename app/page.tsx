"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTiktok, FaFacebook } from "react-icons/fa";
import productosData from "../data/productos.json";
import maderas from "../data/maderas.json";

// Definimos el tipo de producto
interface Producto {
  SKU: string;
  NombreProducto: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Tipo?: string | null;
  Imagen?: string | null;
}

// ✅ Forzamos el tipado del JSON
const productos: Producto[] = productosData as unknown as Producto[];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [selectedTipo, setSelectedTipo] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(9);

  const slides = ["/img/slider1.jpg", "/img/slider2.jpg", "/img/slider3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // ✅ Aquí ya reconoce el campo "Tipo"
  const tipos = [
    "Todos",
    ...Array.from(
      new Set(productos.map((p) => (p.Tipo ? p.Tipo : "Sin categoría")))
    ),
  ];

  const productosFiltrados =
    selectedTipo === "Todos"
      ? productos
      : selectedTipo === "Sin categoría"
      ? productos.filter((p) => !p.Tipo)
      : productos.filter((p) => p.Tipo === selectedTipo);

  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black text-white z-50">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-lg">Home Design Marques</div>

          {/* Menú hamburguesa en móvil */}
          <div
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </div>

          {/* Navegación */}
          <nav className="flex items-center gap-6">
            <ul
              className={`${
                menuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent md:overflow-visible max-h-[80vh] overflow-y-auto`}
            >
              <li className="md:ml-8 p-2 text-center">
                <a href="#tipos" className="hover:underline">
                  Tipos de Madera
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a href="#productos" className="hover:underline">
                  Productos
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a href="#contacto" className="hover:underline">
                  Contacto
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a
                  href="#ofertas"
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
                >
                  OFERTAS
                </a>
              </li>

              {/* Redes sociales → también visibles en móvil */}
              <li className="flex justify-center gap-6 py-4 md:hidden">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:opacity-70"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:opacity-70"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:opacity-70"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:opacity-70"
                >
                  <FaFacebook />
                </a>
              </li>
            </ul>

            {/* Redes sociales → solo desktop */}
            <div className="hidden md:flex items-center gap-4 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                <FaTiktok />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                <FaFacebook />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Slider */}
      <div className="h-screen mt-[60px] relative overflow-hidden">
        {slides.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Slider ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* ... resto del código (Quiénes somos, Tipos de madera, Productos, Contacto, Footer) ... */}
    </div>
  );
}
