"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6"; // ✅ TikTok
import productosData from "../data/productos.json";
import maderasData from "../data/maderas.json";

// Definimos el tipo de producto
interface Producto {
  SKU: string;
  NombreProducto: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Tipo?: string | null;
  Imagen?: string | null;
  Slug?: string | null;
}

// ✅ Forzamos el tipado del JSON
const productosFallback: Producto[] = productosData as unknown as Producto[];

interface MaderaItem {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  img: string;
}
const maderasFallback: MaderaItem[] = maderasData as unknown as MaderaItem[];

export default function Home() {
  const [debug, setDebug] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [selectedTipo, setSelectedTipo] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(9);
  // Nota: Antes teníamos un toggle NEXT_PUBLIC_USE_DATO; ahora intentamos siempre y hacemos fallback si falla

  const [productos, setProductos] = useState<Producto[]>(productosFallback);
  const [maderas, setMaderas] = useState<MaderaItem[]>(maderasFallback);

  const [slides, setSlides] = useState<string[]>(["/img/slider1.jpg", "/img/slider2.jpg", "/img/slider3.jpg"]);
  // mantenido antes, ya no usado tras migración a campos separados
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quienesSomos, setQuienesSomos] = useState<string>("");
  const [qsTitle, setQsTitle] = useState<string>("");
  const [qsMision, setQsMision] = useState<string>("");
  const [qsVision, setQsVision] = useState<string>("");
  const [qsValores, setQsValores] = useState<string>("");
  const [qsHistoria, setQsHistoria] = useState<string>("");
  const [homeMeta, setHomeMeta] = useState<{ environment?: string | null; locale?: string | null } | null>(null);

  // Read debug flag from URL on client without useSearchParams (avoids Suspense requirement)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const p = new URLSearchParams(window.location.search);
        setDebug(p.get("debug") === "1");
      }
    } catch {}
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Cargar datos desde DatoCMS (intentamos siempre; si falla, usamos fallbacks por sección)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [prodRes, woodRes, homeRes] = await Promise.allSettled([
        fetch("/api/productos"),
        fetch("/api/maderas"),
        fetch("/api/home"),
      ]);

      // Productos
      try {
        if (prodRes.status === "fulfilled" && prodRes.value.ok) {
          const prodJson = await prodRes.value.json();
          const arr = (prodJson.items as Producto[]) || [];
          if (!cancelled) setProductos(arr.length ? arr : productosFallback);
        } else if (!cancelled) {
          setProductos(productosFallback);
        }
      } catch {
        if (!cancelled) setProductos(productosFallback);
      }

      // Maderas
      try {
        if (woodRes.status === "fulfilled" && woodRes.value.ok) {
          const woodJson = await woodRes.value.json();
          const arr = (woodJson.items as MaderaItem[]) || [];
          if (!cancelled) setMaderas(arr.length ? arr : maderasFallback);
        } else if (!cancelled) {
          setMaderas(maderasFallback);
        }
      } catch {
        if (!cancelled) setMaderas(maderasFallback);
      }

      // Home (no bloqueo si falla)
      try {
        if (homeRes.status === "fulfilled" && homeRes.value.ok) {
          const homeJson = await homeRes.value.json();
          if (!cancelled) {
            if (homeJson?.slides?.length)
              setSlides(homeJson.slides as string[]);
            if (homeJson?.title) setQsTitle(homeJson.title as string);
            if (homeJson?.mision) setQsMision(homeJson.mision as string);
            if (homeJson?.vision) setQsVision(homeJson.vision as string);
            if (homeJson?.valores) setQsValores(homeJson.valores as string);
            if (homeJson?.nuestraHistoria)
              setQsHistoria(homeJson.nuestraHistoria as string);
            if (homeJson?.meta) {
              const meta = homeJson.meta as Partial<{ environment: string | null; locale: string | null }>;
              setHomeMeta({
                environment: typeof meta.environment === "string" || meta.environment === null ? meta.environment : null,
                locale: typeof meta.locale === "string" || meta.locale === null ? meta.locale : null,
              });
            }
          }
        }
      } catch {
        // no-op; mantenemos fallbacks existentes
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
    <div className="olivia-ai-skin font-sans flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-white/10 bg-[#15110f]/90 text-white z-50 backdrop-blur-xl">
        <div className="max-w-[1180px] mx-auto flex justify-between items-center px-4 py-3">
          <div className="font-bold text-lg">
            <Image 
              src="/logo-transparent.png" 
              alt="Home Design Marques - Venta y Fabricación de Casas de Madera Prefabricadas México" 
              width={600} 
              height={160}
              className="h-24 md:h-28 w-auto"
            />
          </div>
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
              } md:flex flex-col md:flex-row absolute md:static top-24 left-0 w-full md:w-auto bg-[#15110f] md:bg-transparent`}
            >
              <li className="md:ml-8 p-2 text-center">
                <a href="#quienes-somos" className="hover:text-[#d8b4fe] transition">
                  Quiénes somos
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a href="#tipos" className="hover:text-[#d8b4fe] transition">
                  Tipos de Madera
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a href="#productos" className="hover:text-[#d8b4fe] transition">
                  Productos
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <a href="#contacto" className="hover:text-[#d8b4fe] transition">
                  Contacto
                </a>
              </li>
              <li className="md:ml-8 p-2 text-center">
                <Link
                  href="/offres"
                  className="ofertas-flash bg-[#f7d046] text-[#17110d] font-bold px-4 py-2 rounded-md hover:bg-[#ffe073] transition"
                >
                  OFERTAS
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Slider */}
      <div className="h-screen min-h-[620px] relative overflow-hidden">
        {slides.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Casas de madera prefabricadas México - Home Design Marques ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,17,15,0.88),rgba(42,31,52,0.42),rgba(21,17,15,0.28))]" />
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="max-w-[1180px] mx-auto w-full px-6 pb-14 md:pb-0 pt-32">
            <div className="max-w-3xl text-white">
              <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-[#f2e9ff] backdrop-blur">
                Olivia AI skin
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Casas de madera con diseño inteligente y acabado premium
              </h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg text-white/85">
                Fabricamos espacios cálidos, duraderos y personalizados con una experiencia visual más clara, moderna y asistida por IA.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#productos" className="rounded-md bg-[#c084fc] px-5 py-3 font-bold text-[#150f1b] transition hover:bg-[#d8b4fe]">
                  Ver productos
                </a>
                <a href="#contacto" className="rounded-md border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20">
                  Solicitar cotización
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiénes somos */}
      <section id="quienes-somos" className="max-w-[1180px] mx-auto p-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#271c2f]">{qsTitle || 'Quiénes somos'}</h2>
        {/* Mostramos campos desglosados desde Dato si existen; si no, fallback estático */}
        {(qsMision || qsVision || qsValores || qsHistoria) ? (
          <>
            {qsMision ? (
              <p className="text-[#3d3542]"><strong>Misión:</strong> {qsMision}</p>
            ) : null}
            {qsVision ? (
              <p className="text-[#3d3542]"><strong>Visión:</strong> {qsVision}</p>
            ) : null}
            {qsValores ? (
              <p className="text-[#3d3542]"><strong>Valores:</strong> {qsValores}</p>
            ) : null}
            {qsHistoria ? (
              <p className="text-[#3d3542]"><strong>Nuestra historia:</strong> {qsHistoria}</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-[#3d3542]">
              <strong>Misión:</strong> Ofrecer viviendas de madera prefabricadas de
              alta calidad, ecológicas y accesibles para familias mexicanas.
            </p>
            <p className="text-[#3d3542]">
              <strong>Visión:</strong> Ser líderes en el mercado nacional de casas
              de madera, innovando en diseño y servicio al cliente.
            </p>
            <p className="text-[#3d3542]">
              <strong>Valores:</strong> Calidad · Sustentabilidad · Cercanía ·
              Diseño innovador
            </p>
            <p className="text-[#3d3542]">
              <strong>Nuestra historia:</strong> Home Design Marques nace del sueño
              de crear hogares accesibles y acogedores, con diseño moderno y
              materiales naturales.
            </p>
          </>
        )}
      </section>

      {/* Tipos de Madera */}
      <section id="tipos" className="max-w-[1180px] mx-auto p-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#271c2f]">
          Tipos de Madera
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {maderas.map((madera) => (
            <Link key={madera.id} href={`/maderas/${madera.id}`}>
              <div className="rounded-lg border border-[#e8dff0] bg-white shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition cursor-pointer">
                <Image
                  src={madera.img}
                  alt={`Madera de ${madera.nombre} - ${madera.origen} - Home Design Marques`}
                  width={400}
                  height={250}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#271c2f]">
                    {madera.nombre}
                  </h3>
                  <p className="text-sm text-[#5b5360]">
                    <strong>Origen:</strong> {madera.origen}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-[1180px] mx-auto p-6 py-16 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#271c2f]">
          Nuestros Productos
        </h2>

        {/* Filtro */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => {
                setSelectedTipo(tipo);
                setVisibleCount(9);
              }}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                selectedTipo === tipo
                  ? "bg-[#6d28d9] text-white"
                  : "bg-white text-[#453a4d] border border-[#e8dff0] hover:border-[#c084fc]"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* Lista de productos */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {productosFiltrados.slice(0, visibleCount).map((prod) => (
            <div
              key={prod.SKU}
              className="bg-white p-4 rounded-lg text-center border border-[#e8dff0] shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
            >
              {prod.Imagen ? (
                <Image
                  src={prod.Imagen}
                  alt={`${prod.NombreProducto} - ${prod.Descripcion} - Home Design Marques México`}
                  width={250}
                  height={200}
                  className="rounded-md mx-auto mb-4"
                />
              ) : (
                <div className="w-[250px] h-[200px] flex items-center justify-center bg-[#eee8f4] rounded-md mx-auto mb-4 text-[#5b5360] text-sm">
                  Foto no disponible
                </div>
              )}
              <div className="text-sm text-[#766d7d] mb-2">{prod.SKU}</div>
              <h3 className="font-bold text-lg text-[#271c2f]">
                {prod.NombreProducto}
              </h3>
              <p className="text-sm text-[#5b5360]">{prod.Descripcion}</p>
              <p className="font-semibold mt-2">
                {prod.Precio > 0
                  ? `Precio: $${prod.Precio.toFixed(2)} MXN`
                  : "Precio: Por cotizar"}
              </p>
              <p
                className={`font-semibold mt-1 ${
                  prod.Stock > 0 ? "text-green-600" : "text-orange-600"
                }`}
              >
                {prod.Stock > 0
                  ? `Stock: ${prod.Stock} unidades`
                  : "Disponible bajo pedido"}
              </p>
              <Link
                href={`/productos/${prod.Slug || prod.SKU}`}
                className="mt-3 inline-block bg-[#6d28d9] text-white px-4 py-2 rounded-md hover:bg-[#5b21b6] transition"
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>

        {/* Botón Ver más */}
        {visibleCount < productosFiltrados.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="bg-[#271c2f] text-white px-6 py-3 rounded-md hover:bg-[#3f2d4d] transition"
            >
              Ver más productos
            </button>
          </div>
        )}
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-[1180px] mx-auto p-6 py-16">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#271c2f]">
          Contáctanos
        </h2>
        <p className="mb-8 text-center text-[#5b5360] max-w-2xl mx-auto">
          Completa el siguiente formulario y nuestro equipo se pondrá en
          contacto contigo lo antes posible.
        </p>

        <form
          action="https://formspree.io/f/xqadzpgz"
          method="POST"
          className="bg-white p-8 rounded-lg border border-[#e8dff0] shadow-xl max-w-lg mx-auto space-y-6"
        >
          <div>
            <label
              className="block text-base font-semibold text-[#271c2f] mb-2"
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
              className="w-full px-4 py-2 border border-[#d8cfe0] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#271c2f] mb-2"
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
              className="w-full px-4 py-2 border border-[#d8cfe0] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#271c2f] mb-2"
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
              className="w-full px-4 py-2 border border-[#d8cfe0] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#271c2f] mb-2"
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
              className="w-full px-4 py-2 border border-[#d8cfe0] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#271c2f] mb-2"
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
              className="w-full px-4 py-2 border border-[#d8cfe0] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6d28d9] text-white py-3 rounded-md font-bold hover:bg-[#5b21b6] transition"
          >
            📩 Enviar mensaje
          </button>
        </form>
      </section>

      {debug && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded shadow-lg space-y-1 max-w-[320px] z-[60]">
          <div>Debug: Dato Home</div>
          <div>env: {homeMeta?.environment ?? "?"} | locale: {homeMeta?.locale ?? "?"}</div>
          <div>title: {(qsTitle || "").slice(0, 50)}</div>
          <div>mision: {(qsMision || "").slice(0, 80)}</div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#15110f] text-white text-center py-8 mt-10">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d8b4fe] text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d8b4fe] text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d8b4fe] text-xl"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.tiktok.com/@TU_USUARIO"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d8b4fe] text-xl"
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
        
        {/* SEO Keywords - Visibles */}
        <div className="mt-8 text-xs text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
          <p className="text-center">
            venta casas de madera México • fabricación casas prefabricadas • casas de madera prefabricadas México • 
            construcción casas de madera CDMX • venta casas ecológicas México • casas modulares de madera • 
            venta mobiliario madera CDMX • fabricación muebles de madera México • muebles madera para oficinas • 
            mobiliario de madera para casas • carpintería fina México • venta puertas de madera México • 
            fabricación puertas madera CDMX • pisos de madera natural • venta triplay México • madera barnizada • 
            escaleras de madera • madera de pino México • madera de cedro CDMX • madera de encino • 
            madera de nogal • productos madera premium • construcción sustentable México • viviendas ecológicas • 
            diseño casas modernas madera • carpintería a medida CDMX
          </p>
        </div>
      </footer>
    </div>
  );
}
