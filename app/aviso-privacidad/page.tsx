"use client";
import Link from "next/link";

export default function AvisoPrivacidad() {
  return (
    <div className="bg-[#fefaf3] font-sans min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#5d3b2d] mb-6">
          Aviso de Privacidad
        </h1>

        <p className="mb-4 text-gray-800 leading-relaxed">
          En <strong>Home Design Márquez</strong>, respetamos y protegemos la
          privacidad de nuestros clientes y visitantes. Este Aviso de Privacidad
          explica cómo recopilamos, usamos y protegemos tu información personal,
          en cumplimiento con:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800">
          <li>
            Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (México).
          </li>
          <li>
            Reglamento General de Protección de Datos (RGPD - Unión Europea).
          </li>
          <li>
            California Consumer Privacy Act (CCPA - Estados Unidos).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Datos que recopilamos
        </h2>
        <p className="mb-4 text-gray-800">
          Podemos recopilar los siguientes datos personales a través de nuestros
          formularios de contacto, cotización o compras:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800">
          <li>Nombre y Apellido</li>
          <li>Teléfono</li>
          <li>Correo electrónico</li>
          <li>Dirección</li>
          <li>Comentarios y mensajes proporcionados voluntariamente</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Uso de la información
        </h2>
        <p className="mb-4 text-gray-800">
          La información recopilada será utilizada para:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800">
          <li>Dar seguimiento a tus solicitudes de información o cotización.</li>
          <li>Brindar soporte sobre nuestros productos y servicios.</li>
          <li>Fines administrativos y de facturación.</li>
          <li>Enviarte novedades y promociones (solo si lo autorizas).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Derechos ARCO
        </h2>
        <p className="mb-4 text-gray-800">
          Conforme a la legislación mexicana, tienes derecho a Acceder,
          Rectificar, Cancelar u Oponerte (ARCO) al uso de tus datos personales.
          Para ejercer estos derechos, puedes enviarnos un correo a:
          <a
            href="mailto:contacto@homedesignmarquez.com"
            className="text-[#5d3b2d] underline ml-1"
          >
            contacto@homedesignmarquez.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Plazos legales
        </h2>
        <p className="mb-4 text-gray-800">
          Responderemos cualquier solicitud ARCO en un plazo máximo de{" "}
          <strong>20 días hábiles</strong>. En caso de proceder, la solicitud se
          hará efectiva en un máximo de{" "}
          <strong>15 días hábiles</strong> adicionales.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Protección de la información
        </h2>
        <p className="mb-4 text-gray-800">
          Implementamos medidas de seguridad técnicas, administrativas y físicas
          para proteger tu información personal contra daño, pérdida, alteración,
          destrucción o uso no autorizado.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Cambios al aviso
        </h2>
        <p className="mb-4 text-gray-800">
          Este aviso de privacidad puede actualizarse periódicamente para cumplir
          con nuevas disposiciones legales o internas. Te notificaremos cualquier
          cambio a través de nuestro sitio web:
          <a
            href="https://homedesignmarquez.com"
            className="text-[#5d3b2d] underline ml-1"
          >
            www.homedesignmarquez.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">
          Responsable
        </h2>
        <p className="mb-4 text-gray-800">
          El responsable del tratamiento de tus datos personales es{" "}
          <strong>Home Design Márquez</strong>, con domicilio en Ciudad de México.
        </p>

        <p className="mt-8 text-sm text-gray-600">
          Última actualización: Agosto 2025
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="bg-[#5d3b2d] text-white px-6 py-2 rounded-lg hover:bg-[#4a2f23] transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
