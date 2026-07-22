import type { Metadata } from "next";
import productosData from "../../../data/productos.json";
import { ProductDetailContent } from "./ProductDetailClient";

interface ProductoItem {
  SKU: string;
  Slug?: string | null;
  NombreProducto: string;
  Descripcion: string;
  Tipo?: string | null;
  Imagen?: string | null;
}

const productos = productosData as ProductoItem[];

function findProducto(id: string) {
  return productos.find((p) => p.SKU === id || p.Slug === id);
}

function excerpt(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 155);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const producto = findProducto(id);
  const slug = producto?.Slug || producto?.SKU || id;

  if (!producto) {
    return {
      title: "Producto no encontrado | Home Design Marques",
      alternates: { canonical: `/productos/${slug}` },
    };
  }

  return {
    title: `${producto.NombreProducto} | Home Design Marques`,
    description: excerpt(producto.Descripcion),
    alternates: {
      canonical: `/productos/${slug}`,
      languages: {
        "es-MX": `/productos/${slug}`,
        en: `/en/products/${slug}`,
      },
    },
    openGraph: {
      title: `${producto.NombreProducto} | Home Design Marques`,
      description: excerpt(producto.Descripcion),
      url: `/productos/${slug}`,
      images: producto.Imagen ? [{ url: producto.Imagen, alt: producto.NombreProducto }] : undefined,
    },
  };
}

export default function ProductoDetalle() {
  return <ProductDetailContent locale="es" />;
}
