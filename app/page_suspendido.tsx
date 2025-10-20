"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen items-center justify-center text-center p-6">
      {/* Mensaje principal */}
      <h1 className="text-4xl font-bold text-red-700 mb-6">
        🚧 Sitio fuera de servicio 🚧
      </h1>
      <p className="text-lg text-gray-800 mb-8 max-w-xl">
        Este sitio ha sido suspendido temporalmente por falta de pago.  
        Para reactivarlo, por favor realiza el pago pendiente a través del siguiente enlace seguro:
      </p>

      {/* Botón de pago */}
      <Link
        href="https://pay.qonto.com/payment-links/01999b4b-c141-7eca-a804-2878c5f33ba4?resource_id=01999b4b-c13a-711b-b941-6e7bc237b376"
        target="_blank"
        className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
      >
        💳 Realizar Pago
      </Link>

      {/* Nota */}
      <p className="mt-6 text-sm text-gray-600">
        Una vez confirmado el pago, el sitio volverá a estar disponible.
      </p>
    </div>
  );
}
