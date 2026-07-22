"use client";
import { useParams } from "next/navigation";
import productosData from "../../../data/productos.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

interface ProductoItem {
  SKU: string;
  Slug?: string | null;
  NombreProducto: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Tipo?: string | null;
  Imagen?: string | null;
}

type Locale = "es" | "en";

const copy = {
  es: {
    notFound: "Producto no encontrado",
    home: "Volver al inicio",
    noPhoto: "Foto no disponible",
    category: "Categoría:",
    uncategorized: "Sin categoría",
    price: "Precio:",
    quote: "Por cotizar",
    stock: "Stock disponible:",
    units: "unidades",
    byRequest: "Disponible bajo pedido",
    info: "Solicitar información",
  },
  en: {
    notFound: "Product not found",
    home: "Back to home",
    noPhoto: "Photo not available",
    category: "Category:",
    uncategorized: "Uncategorized",
    price: "Price:",
    quote: "Upon request",
    stock: "Available stock:",
    units: "units",
    byRequest: "Available by request",
    info: "Request information",
  },
};

export function ProductDetailContent({ locale = "es" }: { locale?: Locale }) {
  const { id } = useParams();
  const t = copy[locale];
  const homeHref = locale === "en" ? "/en" : "/";
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState<ProductoItem | undefined>(() =>
    (productosData as ProductoItem[]).find((p) => p.SKU === id || p.Slug === id)
  );

  // Fetch from Dato siempre; si falla, mantenemos el fallback del JSON local
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/productos/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) setProducto(json.item);
        }
      } catch {
        // Ignoramos errores y dejamos el fallback local
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading && !producto) {
    return <div className="min-h-screen bg-[#fefaf3]" />;
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          {t.notFound}
        </h1>
        <Link href={homeHref} className="mt-4 text-[#5d3b2d] underline">
          ← {t.home}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefaf3] min-h-screen">
      <SiteHeader locale={locale} />

      {/* Detalle producto */}
      <main className="max-w-[900px] mx-auto bg-[#fff2e6] pt-6 mt-[230px] p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {producto.Imagen ? (
            <Image
              src={producto.Imagen}
              alt={producto.NombreProducto}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          ) : (
            <div className="w-[400px] h-[300px] flex items-center justify-center bg-gray-300 rounded-lg text-gray-700 text-sm">
              {t.noPhoto}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-[#5d3b2d] mb-2">
              {producto.NombreProducto}
            </h1>
            <p className="text-gray-600 mb-2">SKU: {producto.SKU}</p>
            <p className="text-gray-600 mb-2">
              {t.category} {producto.Tipo || t.uncategorized}
            </p>
            <p className="mb-4 whitespace-pre-line">{producto.Descripcion}</p>
            <p className="text-2xl font-bold mb-4">
              {producto.Precio > 0
                ? `${t.price} $${producto.Precio.toFixed(2)} MXN`
                : `${t.price} ${t.quote}`}
            </p>
            <p
              className={`mb-4 ${
                producto.Stock > 0 ? "text-green-600" : "text-orange-600"
              }`}
            >
              {producto.Stock > 0
                ? `${t.stock} ${producto.Stock} ${t.units}`
                : t.byRequest}
            </p>
            <Link
              href={locale === "en" ? "/en/#contacto" : "/#contacto"}
              className="mt-6 inline-block bg-[#5d3b2d] text-white px-6 py-3 rounded-lg hover:bg-[#4a2f23] transition"
            >
              {t.info}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

export default function ProductoDetalle() {
  return <ProductDetailContent locale="es" />;
}
