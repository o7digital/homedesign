import { NextResponse } from "next/server";

const FALLBACK_REPLIES = {
  es: "Puedo ayudarte con casas de madera, muebles, puertas, pisos, tipos de madera y cotizaciones. Cuéntame qué proyecto tienes en mente y te oriento.",
  en: "I can help with wooden houses, furniture, doors, floors, wood types, and quote requests. Tell me what project you have in mind and I will guide you.",
  fr: "Je peux vous aider avec les maisons en bois, meubles, portes, sols, types de bois et demandes de devis. Décrivez votre projet et je vous oriente.",
};

const LANGUAGE_NAMES = {
  es: "Spanish",
  en: "English",
  fr: "French",
};

const FAQ_CONTEXT = `
Approved FAQ context, Spanish:
- Home Design Marques fabrica y comercializa soluciones en madera para vivienda, interiorismo y proyectos especiales: casas de madera prefabricadas, puertas, pisos, escaleras, mobiliario para casa u oficina, triplay, tableros y piezas de carpintería a medida.
- Las casas pueden partir de modelos base para acelerar cotización y producción, o desarrollarse a medida según terreno, distribución interior y estilo arquitectónico.
- Para cotizar una casa se necesita ubicación del proyecto, medidas aproximadas, número de habitaciones, baños, tipo de uso, estilo deseado, y si el cliente ya tiene terreno, planos o referencias visuales.
- También fabrican mobiliario para casas, oficinas, locales y espacios de trabajo: escritorios, libreros, puertas, closets, repisas, barras, cubiertas, muebles de recepción y piezas especiales.
- La madera recomendada depende del uso. Para estructuras y costo eficiente suele considerarse pino tratado. Para acabados visuales pueden usarse parota, nogal, fresno, teca, arce o castaño según disponibilidad y presupuesto. También trabajan tableros y triplay.
- La madera requiere mantenimiento. En exteriores se revisan selladores, barnices o tratamientos periódicamente, especialmente con sol directo, humedad o lluvia constante. En interiores el mantenimiento suele ser menor.
- Una casa de madera bien diseñada puede funcionar en distintos climas si se especifican correctamente estructura, tratamiento, aislamiento, ventilación, cubiertas y detalles contra humedad.
- Pueden revisar proyectos en CDMX, Estado de México y otras zonas de la República Mexicana. La viabilidad depende del producto, volumen, distancia, accesos y condiciones del sitio.
- El tiempo de fabricación depende del alcance, medidas, disponibilidad de madera, complejidad, acabados, volumen y agenda de instalación. Se entrega un estimado al cotizar.
- El cliente puede enviar fotos de referencia para entender estilo, proporciones, tono y funcionalidad; se revisa qué se puede fabricar responsablemente y qué conviene adaptar.
- Algunos productos pueden estar en stock, pero muchos trabajos de carpintería, mobiliario y casas de madera se fabrican bajo pedido.
- Las condiciones de pago se confirman al cotizar. En proyectos a medida normalmente se solicita anticipo y el saldo se liquida según acuerdo de entrega o instalación. Si necesita factura, debe indicarlo desde el inicio.
- Para cotizar: usar formulario o WhatsApp e incluir nombre, ciudad, tipo de proyecto, medidas aproximadas, fotos del espacio si existen y referencias de estilo.

Approved FAQ context, English:
- Home Design Marques manufactures and sells wood solutions for homes, interiors and special projects: prefabricated wooden homes, doors, floors, stairs, home and office furniture, plywood, boards and custom carpentry.
- Wooden homes can be based on existing models to speed up quote and production, or custom designed when land, layout or architectural style requires it.
- To quote a wooden home they need project location, approximate dimensions, number of rooms and bathrooms, intended use, preferred style, and any plans or reference images.
- They make office and commercial furniture: desks, bookcases, doors, closets, shelves, counters, reception furniture and custom pieces.
- Recommended wood depends on use. Pine is often considered for efficient structural solutions; parota, walnut, ash, teak, maple or chestnut can be used for stronger visual finishes depending on availability and budget.
- Wood requires maintenance. Exterior pieces should be checked periodically for sealers, varnishes or protective treatments, especially with direct sun, humidity or rain.
- A well-designed wooden home can perform well in different climates when structure, treatment, insulation, ventilation and moisture protection are specified correctly.
- They can review projects in Mexico City, Estado de Mexico and other areas in Mexico. Feasibility depends on product type, distance, access and site conditions.
- Production timing depends on scope, dimensions, wood availability, design complexity, finishes, number of pieces and installation schedule. An estimated timeline is provided with the quote.
- Quote requests should use the contact form or WhatsApp and include name, city, project type, approximate dimensions, photos of the space and style references when available.
`;

function normalizeLanguage(value: unknown): keyof typeof FALLBACK_REPLIES {
  return value === "en" || value === "fr" ? value : "es";
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

type OpenAIResponsePart = {
  type?: string;
  text?: string;
};

type OpenAIResponseItem = {
  content?: OpenAIResponsePart[];
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: OpenAIResponseItem[];
};

function getResponseText(data: OpenAIResponsePayload) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const text = data?.output
    ?.flatMap((item) => item?.content || [])
    ?.find((part) => part?.type === "output_text" && part?.text)?.text;

  return typeof text === "string" && text.trim() ? text.trim() : null;
}

export async function POST(request: Request) {
  try {
    const { message, language, lead } = await request.json();
    const cleanMessage = clean(message);
    const lang = normalizeLanguage(language);
    const fallbackReply = FALLBACK_REPLIES[lang];

    if (!cleanMessage) {
      return NextResponse.json({ reply: fallbackReply });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: fallbackReply, mode: "fallback" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        instructions: `
You are Vanessa AI Assistant for Home Design Marques.
Answer only in ${LANGUAGE_NAMES[lang]}.

Business context:
- Home Design Marques sells and manufactures prefabricated wooden houses in Mexico.
- The company also offers wooden furniture for homes and offices, doors, floors, plywood, stairs, custom carpentry, and premium wood products.
- Service area: Mexico City and all Mexico.
- The brand focuses on natural materials, modern design, sustainable wood construction, and custom projects.
- Visitors may ask about cabins, modular wooden houses, furniture, wood types, prices, availability, delivery timing, and quote requests.
- Useful quote details: name, phone, email, project type, city/state, approximate measurements, budget, and desired timing.
- If a visitor asks for exact prices, availability, measurements, delivery time, or a formal quote, explain that an advisor must confirm details and invite them to leave their contact details.

${FAQ_CONTEXT}

Lead already provided by visitor:
${JSON.stringify(lead || {})}

Rules:
- Be concise, helpful, natural, and commercial.
- Do not invent exact prices, delivery dates, stock, discounts, legal commitments, or technical guarantees.
- Ask one short follow-up question when the request is vague.
- Never ask for sensitive personal data.
        `.trim(),
        input: cleanMessage,
        max_output_tokens: 320,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: fallbackReply, mode: "openai-error" });
    }

    const data = await response.json();
    return NextResponse.json({ reply: getResponseText(data) || fallbackReply, mode: "openai" });
  } catch (error) {
    console.error("Vanessa chat error:", error);
    return NextResponse.json({ reply: FALLBACK_REPLIES.es }, { status: 200 });
  }
}
