"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import productosData from "../data/productos.json";
import maderasData from "../data/maderas.json";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

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

type Locale = "es" | "en";

const copy = {
  es: {
    all: "Todos",
    uncategorized: "Sin categoría",
    about: "Quiénes somos",
    mission: "Misión:",
    vision: "Visión:",
    values: "Valores:",
    history: "Nuestra historia:",
    fallbackMission: "Ofrecer viviendas de madera prefabricadas de alta calidad, ecológicas y accesibles para familias mexicanas.",
    fallbackVision: "Ser líderes en el mercado nacional de casas de madera, innovando en diseño y servicio al cliente.",
    fallbackValues: "Calidad · Sustentabilidad · Cercanía · Diseño innovador",
    fallbackHistory: "Home Design Marques nace del sueño de crear hogares accesibles y acogedores, con diseño moderno y materiales naturales.",
    woodTypes: "Tipos de Madera",
    origin: "Origen:",
    products: "Nuestros Productos",
    noPhoto: "Foto no disponible",
    price: "Precio:",
    quote: "Por cotizar",
    stock: "Stock:",
    units: "unidades",
    byRequest: "Disponible bajo pedido",
    seeMore: "Ver más",
    seeMoreProducts: "Ver más productos",
    contactTitle: "Contáctanos",
    contactIntro: "Completa el siguiente formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    email: "Correo electrónico",
    comments: "Comentarios",
    namePlaceholder: "Escribe tu nombre",
    lastNamePlaceholder: "Escribe tu apellido",
    commentsPlaceholder: "Cuéntanos cómo podemos ayudarte...",
    send: "Enviar mensaje",
  },
  en: {
    all: "All",
    uncategorized: "Uncategorized",
    about: "About us",
    mission: "Mission:",
    vision: "Vision:",
    values: "Values:",
    history: "Our story:",
    fallbackMission: "To offer high-quality, eco-conscious and accessible prefabricated wooden homes for families and projects in Mexico.",
    fallbackVision: "To become a national reference for wooden homes, custom furniture and thoughtful wood design.",
    fallbackValues: "Quality · Sustainability · Proximity · Innovative design",
    fallbackHistory: "Home Design Marques was born from the idea of creating warm, accessible spaces with modern design and natural materials.",
    woodTypes: "Wood Types",
    origin: "Origin:",
    products: "Our Products",
    noPhoto: "Photo not available",
    price: "Price:",
    quote: "Upon request",
    stock: "Stock:",
    units: "units",
    byRequest: "Available by request",
    seeMore: "View more",
    seeMoreProducts: "View more products",
    contactTitle: "Contact us",
    contactIntro: "Complete the form and our team will contact you as soon as possible.",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    comments: "Comments",
    namePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    commentsPlaceholder: "Tell us how we can help...",
    send: "Send message",
  },
};

export function HomeContent({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const [debug, setDebug] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [selectedTipo, setSelectedTipo] = useState(t.all);
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
    t.all,
    ...Array.from(
      new Set(productos.map((p) => (p.Tipo ? p.Tipo : t.uncategorized)))
    ),
  ];

  const productosFiltrados =
    selectedTipo === t.all
      ? productos
      : selectedTipo === t.uncategorized
      ? productos.filter((p) => !p.Tipo)
      : productos.filter((p) => p.Tipo === selectedTipo);

  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen">
      <SiteHeader locale={locale} />

      {/* Slider */}
      <div className="h-screen mt-[60px] relative overflow-hidden">
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
      </div>

      {/* Quiénes somos */}
      <section id="quienes-somos" className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#5d3b2d]">{locale === "es" && qsTitle ? qsTitle : t.about}</h2>
        {/* Mostramos campos desglosados desde Dato si existen; si no, fallback estático */}
        {locale === "es" && (qsMision || qsVision || qsValores || qsHistoria) ? (
          <>
            {qsMision ? (
              <p className="text-gray-800"><strong>{t.mission}</strong> {qsMision}</p>
            ) : null}
            {qsVision ? (
              <p className="text-gray-800"><strong>{t.vision}</strong> {qsVision}</p>
            ) : null}
            {qsValores ? (
              <p className="text-gray-800"><strong>{t.values}</strong> {qsValores}</p>
            ) : null}
            {qsHistoria ? (
              <p className="text-gray-800"><strong>{t.history}</strong> {qsHistoria}</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-gray-800">
              <strong>{t.mission}</strong> {t.fallbackMission}
            </p>
            <p className="text-gray-800">
              <strong>{t.vision}</strong> {t.fallbackVision}
            </p>
            <p className="text-gray-800">
              <strong>{t.values}</strong> {t.fallbackValues}
            </p>
            <p className="text-gray-800">
              <strong>{t.history}</strong> {t.fallbackHistory}
            </p>
          </>
        )}
      </section>

      {/* Tipos de Madera */}
      <section id="tipos" className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#5d3b2d]">
          {t.woodTypes}
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {maderas.map((madera) => (
            <Link key={madera.id} href={`/maderas/${madera.id}`}>
              <div className="bg-[#fff2e6] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                <Image
                  src={madera.img}
                  alt={`Madera de ${madera.nombre} - ${madera.origen} - Home Design Marques`}
                  width={400}
                  height={250}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#5d3b2d]">
                    {madera.nombre}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>{t.origin}</strong> {madera.origen}
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
          {t.products}
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
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedTipo === tipo
                  ? "bg-[#5d3b2d] text-white"
                  : "bg-gray-200 text-gray-700"
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
              className="bg-[#fff2e6] p-4 rounded-xl text-center shadow-md hover:shadow-lg transition"
            >
              {prod.Imagen ? (
                <Image
                  src={prod.Imagen}
                  alt={`${prod.NombreProducto} - ${prod.Descripcion} - Home Design Marques México`}
                  width={250}
                  height={200}
                  className="rounded-lg mx-auto mb-4"
                />
              ) : (
                <div className="w-[250px] h-[200px] flex items-center justify-center bg-gray-300 rounded-lg mx-auto mb-4 text-gray-700 text-sm">
                  {t.noPhoto}
                </div>
              )}
              <div className="text-sm text-gray-600 mb-2">{prod.SKU}</div>
              <h3 className="font-bold text-lg text-[#5d3b2d]">
                {prod.NombreProducto}
              </h3>
              <p className="text-sm text-gray-700">{prod.Descripcion}</p>
              <p className="font-semibold mt-2">
                {prod.Precio > 0
                  ? `${t.price} $${prod.Precio.toFixed(2)} MXN`
                  : `${t.price} ${t.quote}`}
              </p>
              <p
                className={`font-semibold mt-1 ${
                  prod.Stock > 0 ? "text-green-600" : "text-orange-600"
                }`}
              >
                {prod.Stock > 0
                  ? `${t.stock} ${prod.Stock} ${t.units}`
                  : t.byRequest}
              </p>
              <Link
                href={`/productos/${prod.Slug || prod.SKU}`}
                className="mt-3 inline-block bg-[#5d3b2d] text-white px-4 py-2 rounded-lg hover:bg-[#4a2f23] transition"
              >
                {t.seeMore}
              </Link>
            </div>
          ))}
        </div>

        {/* Botón Ver más */}
        {visibleCount < productosFiltrados.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="bg-[#5d3b2d] text-white px-6 py-3 rounded-lg hover:bg-[#4a2f23] transition"
            >
              {t.seeMoreProducts}
            </button>
          </div>
        )}
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-[1100px] mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#5d3b2d]">
          {t.contactTitle}
        </h2>
        <p className="mb-8 text-center text-gray-700 max-w-2xl mx-auto">
          {t.contactIntro}
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
              {t.firstName}
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder={t.namePlaceholder}
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="apellido"
            >
              {t.lastName}
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder={t.lastNamePlaceholder}
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            />
          </div>

          <div>
            <label
              className="block text-base font-semibold text-[#5d3b2d] mb-2"
              htmlFor="telefono"
            >
              {t.phone}
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
              {t.email}
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
              {t.comments}
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              rows={5}
              placeholder={t.commentsPlaceholder}
              required
              className="w-full px-4 py-2 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5d3b2d]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5d3b2d] text-white py-3 rounded-lg font-bold hover:bg-[#4a2f23] transition"
          >
            {t.send}
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

      <SiteFooter locale={locale} />
    </div>
  );
}

export default function Home() {
  return <HomeContent locale="es" />;
}
