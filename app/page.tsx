"use client";
import Link from "next/link";

export default function Suspendido() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">🚧 Sitio Fuera de Servicio 🚧</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-lg">
        Este sitio se encuentra temporalmente suspendido por falta de pago.  
        Para reactivarlo, por favor realiza el pago pendiente.
      </p>
      <Link
        href="https://pay.qonto.com/payment-links/01999b3d-d936-7e3e-bd61-5870a417481c?resource_id=01999b3d-d92b-7364-9f34-a87e8e6b9445"
        target="_blank"
        className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
      >
        💳 Realizar Pago
      </Link>
      <p className="mt-6 text-sm text-gray-600">
        Monto pendiente: <strong>18 € + 500 MXN</strong>
      </p>
    </div>
  );
}
