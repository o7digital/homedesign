"use client";
import { useParams } from "next/navigation";
import productos from "../../../data/productos.json";
import Image from "next/image";
import Link from "next/link";

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = productos.find((p) => p.SKU === id);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          Producto no encontrado
        </h1>
        <Link href="/" className="mt-4 text-[#5d3b2d] underline">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefaf3] min-h-screen p-6">
      {/* Header */}
      <header className="w-full bg-black text-white p-4">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Home Design Marques
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/#tipos" className="hover:underline">
                  Tipos de Madera
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="hover:underline">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Detalle producto */}
      <main className="max-w-[900px] mx-auto bg-[#fff2e6] mt-10 p-6 rounded-xl shadow-md">
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
              Foto no disponible
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-[#5d3b2d] mb-2">
              {producto.NombreProducto}
            </h1>
            <p className="text-gray-600 mb-2">SKU: {producto.SKU}</p>
            <p className="text-gray-600 mb-2">
              Categoría: {producto.Tipo || "Sin categoría"}
            </p>
            <p className="mb-4">{producto.Descripcion}</p>
            <p className="text-2xl font-bold mb-4">
              {producto.Precio > 0
                ? `Precio: $${producto.Precio} MXN`
                : "Precio: Por cotizar"}
            </p>
            <p
              className={`mb-4 ${
                producto.Stock > 0 ? "text-green-600" : "text-orange-600"
              }`}
            >
              {producto.Stock > 0
                ? `Stock disponible: ${producto.Stock} unidades`
                : "Disponible bajo pedido"}
            </p>
            <Link
              href="/#contacto"
              className="mt-6 inline-block bg-[#5d3b2d] text-white px-6 py-3 rounded-lg hover:bg-[#4a2f23] transition"
            >
              📩 Solicitar información
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Home Design Marques. Todos los derechos
          reservados.
        </p>
        <Link href="/aviso-privacidad" className="underline hover:text-gray-300">
          Aviso de Privacidad
        </Link>
      </footer>
    </div>
  );
}
