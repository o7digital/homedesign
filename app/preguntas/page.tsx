import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Home Design Marques",
  description:
    "Preguntas frecuentes sobre casas de madera prefabricadas, muebles a medida, tipos de madera, cotizaciones, entregas, mantenimiento y formas de pago en Home Design Marques.",
};

const preguntas = [
  {
    pregunta: "¿Qué fabrica Home Design Marques?",
    respuesta:
      "Fabricamos y comercializamos soluciones en madera para vivienda, interiorismo y proyectos especiales: casas de madera prefabricadas, puertas, pisos, escaleras, mobiliario para casa u oficina, triplay, tableros y piezas de carpintería a medida. Cada proyecto se revisa según medidas, uso, ubicación, presupuesto y acabado deseado.",
  },
  {
    pregunta: "¿Las casas de madera son prefabricadas o se hacen completamente a medida?",
    respuesta:
      "Trabajamos ambas opciones. Podemos partir de modelos base para acelerar la cotización y producción, o desarrollar un diseño a medida cuando el terreno, la distribución interior o el estilo arquitectónico requieren una solución personalizada. En todos los casos buscamos que la casa sea funcional, resistente y coherente con el clima donde se instalará.",
  },
  {
    pregunta: "¿Qué información necesitan para cotizar una casa de madera?",
    respuesta:
      "Para una primera cotización necesitamos ubicación del proyecto, medidas aproximadas, numero de habitaciones, baños, tipo de uso, estilo deseado y si ya cuentas con terreno, planos o referencias visuales. Con esa información podemos orientar el alcance, materiales, tiempos y presupuesto inicial. Si el proyecto avanza, se revisan detalles técnicos antes de confirmar producción.",
  },
  {
    pregunta: "¿También hacen muebles y carpintería para oficinas?",
    respuesta:
      "Sí. Diseñamos y fabricamos mobiliario para casas, oficinas, locales y espacios de trabajo: escritorios, libreros, puertas, closets, repisas, barras, cubiertas, muebles de recepción y piezas especiales. Podemos adaptar medidas, tono de madera, herrajes y acabado para que el mobiliario combine con el proyecto existente.",
  },
  {
    pregunta: "¿Qué tipos de madera recomiendan?",
    respuesta:
      "La recomendación depende del uso. Para estructuras y soluciones de costo eficiente suele considerarse pino tratado. Para acabados con mayor presencia visual pueden utilizarse maderas como parota, nogal, fresno, teca, arce o castaño, según disponibilidad y presupuesto. También trabajamos tableros y triplay cuando conviene por estabilidad, formato o aplicación.",
  },
  {
    pregunta: "¿La madera necesita mantenimiento?",
    respuesta:
      "Sí. La madera es un material natural y requiere protección adecuada. En exteriores se recomienda revisar selladores, barnices o tratamientos de forma periódica, especialmente si hay sol directo, humedad o lluvia constante. En interiores el mantenimiento suele ser menor: limpieza suave, evitar humedad estancada y retocar acabados cuando el uso lo pida.",
  },
  {
    pregunta: "¿Las casas de madera resisten lluvia, humedad y cambios de temperatura?",
    respuesta:
      "Una casa de madera bien diseñada puede funcionar muy bien en distintos climas, siempre que se especifiquen correctamente estructura, tratamiento, aislamiento, ventilación, cubiertas y detalles contra humedad. Antes de fabricar es importante conocer la ubicación y condiciones del terreno para proponer materiales y protecciones adecuadas.",
  },
  {
    pregunta: "¿Realizan entregas o instalaciones fuera de CDMX?",
    respuesta:
      "Podemos revisar proyectos en CDMX, Estado de México y otras zonas de la República Mexicana. La viabilidad de entrega o instalación depende del tipo de producto, volumen, distancia, accesos y condiciones del sitio. Para proyectos grandes recomendamos compartir ubicación desde el inicio para calcular logística con mayor precisión.",
  },
  {
    pregunta: "¿Cuánto tarda la fabricación?",
    respuesta:
      "El tiempo depende del alcance. Un mueble o puerta puede tomar menos que una casa prefabricada o un proyecto integral de carpintería. Influyen medidas, disponibilidad de madera, complejidad del diseño, acabados, volumen de piezas y agenda de instalación. Al cotizar se entrega un estimado de tiempo y se actualiza antes de iniciar producción.",
  },
  {
    pregunta: "¿Puedo pedir un diseño igual a una foto de referencia?",
    respuesta:
      "Puedes enviarnos referencias para entender estilo, proporciones, tono y funcionalidad. A partir de ahí revisamos qué se puede fabricar de manera responsable y qué conviene adaptar por medidas, material, presupuesto o instalación. El objetivo es lograr un resultado con la misma intención visual, pero preparado para tu espacio real.",
  },
  {
    pregunta: "¿Manejan productos en stock o todo es bajo pedido?",
    respuesta:
      "Algunos productos pueden estar disponibles en stock, pero muchos trabajos de carpintería, mobiliario y casas de madera se fabrican bajo pedido. Esto permite ajustar medidas, acabados y materiales. En el catálogo se indica cuando un producto está disponible o si se debe cotizar según proyecto.",
  },
  {
    pregunta: "¿Qué formas de pago aceptan?",
    respuesta:
      "Las condiciones de pago se confirman al momento de cotizar, según el tamaño del pedido y la logística requerida. En proyectos a medida normalmente se solicita un anticipo para iniciar producción y el saldo se liquida conforme al acuerdo de entrega o instalación. Si necesitas factura, indícalo desde el inicio para revisar los datos fiscales.",
  },
  {
    pregunta: "¿Cómo puedo contactar para una cotización?",
    respuesta:
      "Puedes escribirnos desde el formulario de contacto del sitio o por WhatsApp. Para acelerar la respuesta, incluye tu nombre, ciudad, tipo de proyecto, medidas aproximadas, fotos del espacio si las tienes y referencias de estilo. Entre más claro sea el alcance, más precisa será la primera orientación.",
  },
];

export default function PreguntasPage() {
  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen">
      <SiteHeader />

      <main className="pt-[210px]">
        <section className="max-w-[1100px] mx-auto px-6 pb-4">
          <p className="text-sm uppercase tracking-[0.18em] text-[#8b6a3f] font-semibold">
            Home Design Marques
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5d3b2d] mt-3">
            Preguntas frecuentes
          </h1>
          <p className="text-gray-700 mt-5 max-w-3xl leading-7">
            Resolvemos las dudas más comunes antes de iniciar un proyecto en madera:
            casas prefabricadas, mobiliario a medida, materiales, tiempos,
            mantenimiento, entregas y cotizaciones.
          </p>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 py-8">
          <div className="bg-[#fff2e6] rounded-xl shadow-md p-6 md:p-10">
            {preguntas.map((item) => (
              <article
                key={item.pregunta}
                className="border-b border-[#d7bea1] last:border-b-0 py-6 first:pt-0 last:pb-0"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#5d3b2d]">
                  {item.pregunta}
                </h2>
                <p className="mt-3 text-gray-800 leading-7">{item.respuesta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 pb-8">
          <div className="bg-black text-white p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold">¿Tienes otra pregunta?</h2>
              <p className="text-gray-300 mt-2">
                Cuéntanos qué quieres fabricar y te orientamos con el siguiente paso.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="bg-yellow-400 text-black font-bold px-5 py-3 rounded hover:bg-yellow-500 transition text-center"
            >
              Contactar
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
