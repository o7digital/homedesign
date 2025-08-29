"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import productos from "../data/productos.json";
import maderas from "../data/maderas.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = ["/img/slider1.jpg", "/img/slider2.jpg", "/img/slider3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black text-white z-50">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-lg">Home Design Márques</div>
          <div
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </div>
          <nav>
            <ul
              className={`${
                menuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent`}
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
            </ul>
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

      {/* Quiénes somos */}
      <section className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#5d3b2d]">Quiénes somos</h2>
        <p className="text-gray-800">
          <strong>Misión:</strong> Ofrecer viviendas de madera prefabricadas de
          alta calidad, ecológicas y accesibles para familias mexicanas.
        </p>
        <p className="text-gray-800">
          <strong>Visión:</strong> Ser líderes en el mercado nacional de casas
          de madera, innovando en diseño y servicio al cliente.
        </p>
        <p className="text-gray-800">
          <strong>Valores:</strong> Calidad · Sustentabilidad · Cercanía ·
          Diseño innovador
        </p>
        <p className="text-gray-800">
          <strong>Nuestra historia:</strong> Home Design Márquez nace del sueño
          de crear hogares accesibles y acogedores, con diseño moderno y
          materiales naturales.
        </p>
      </section>

      {/* Tipos de Madera */}
      <section id="tipos" className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#5d3b2d]">
          Tipos de Madera
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {maderas.map((madera) => (
            <Link key={madera.id} href={`/maderas/${madera.id}`}>
              <div className="bg-[#fff2e6] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                <Image
                  src={madera.img}
                  alt={madera.nombre}
                  width={400}
                  height={250}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#5d3b2d]">
                    {madera.nombre}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Origen:</strong> {madera.origen}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-[1100px] mx-auto p-6 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#5d3b2d]">
          Nuestros Productos
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {productos.map((prod) => (
            <SwiperSlide key={prod.id}>
              <div className="bg-[#fff2e6] p-4 rounded-xl text-center shadow-md hover:shadow-lg transition">
                <Image
                  src={prod.img || "/img/productos/default.jpeg"}
                  alt={prod.nombre}
                  width={250}
                  height={200}
                  className="rounded-lg mx-auto mb-4"
                />
                <div className="text-sm text-gray-600 mb-2">{prod.id}</div>
                <h3 className="font-bold text-lg text-[#5d3b2d]">
                  {prod.nombre}
                </h3>
                <p className="text-sm text-gray-700">{prod.descripcion}</p>
                <p className="font-semibold mt-2">{prod.precio}</p>
                <p className="text-green-600 font-semibold mt-1">
                  Stock: {prod.stock} unidades
                </p>
                <Link
                  href={`/productos/${prod.id}`}
                  className="mt-3 inline-block bg-[#5d3b2d] text-white px-4 py-2 rounded-lg hover:bg-[#4a2f23] transition"
                >
                  Ver más
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#5d3b2d]">
          Contáctanos
        </h2>
        <p className="mb-8 text-center text-gray-700 max-w-2xl mx-auto">
          Completa el siguiente formulario y nuestro equipo se pondrá en
          contacto contigo lo antes posible.
        </p>

        <form
          action="https://formspree.io/f/xqadzpgz"
          method="POST"
          className="bg-[#fff2e6] p-8 rounded-xl shadow-md max-w-lg mx-auto space-y-6"
        >
          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Escribe tu nombre"
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="apellido"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Escribe tu apellido"
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="+52 55 1234 5678"
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="_replyto"
              placeholder="tucorreo@ejemplo.com"
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="comentarios"
            >
              Comentarios
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              rows={5}
              placeholder="Cuéntanos cómo podemos ayudarte..."
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5d3b2d] text-white py-3 rounded-lg font-bold hover:bg-[#4a2f23] transition"
          >
            📩 Enviar mensaje
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Home Design Márques. Todos los derechos
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
