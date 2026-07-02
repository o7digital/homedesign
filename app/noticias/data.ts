export type Noticia = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Construcción" | "Diseño" | "Mantenimiento" | "Sustentabilidad";
  date: string;
  displayDate: string;
  readingTime: string;
  image: string;
  content: string[];
};

export const noticias: Noticia[] = [
  {
    slug: "madera-parota-caracteristicas-usos-cuidados",
    title: "Madera de parota: carácter, usos y cuidados",
    excerpt: "Vetas expresivas, grandes formatos y presencia natural: conoce por qué la parota es una madera emblemática del diseño mexicano.",
    category: "Diseño",
    date: "2026-07-02",
    displayDate: "02 JUL",
    readingTime: "6 min",
    image: "/img/maderas/parota.webp",
    content: [
      "La parota destaca por sus vetas amplias, tonos cálidos y contrastes naturales. Cada tabla presenta un dibujo diferente, por lo que mesas, cubiertas, puertas y piezas de gran formato adquieren una identidad única.",
      "Su disponibilidad en secciones anchas permite crear superficies continuas con bordes orgánicos. Es especialmente apreciada en comedores, mesas de centro, escritorios, cabeceras y elementos protagonistas de interiorismo.",
      "Antes de fabricar una pieza deben evaluarse el secado, la estabilidad, el espesor y el uso previsto. Un diseño correcto considera los movimientos naturales de la madera y selecciona un acabado compatible con la exposición, la humedad y el mantenimiento esperado.",
      "Para conservarla conviene limpiar con productos suaves, evitar humedad permanente y renovar la protección cuando el acabado lo requiera. La selección de cada tabla y la solución constructiva deben ser confirmadas por un especialista según el proyecto.",
    ],
  },
  {
    slug: "por-que-elegir-una-casa-prefabricada-de-madera",
    title: "¿Por qué elegir una casa prefabricada de madera?",
    excerpt: "Rapidez, confort térmico y una huella ambiental menor: las ventajas que explican su creciente popularidad.",
    category: "Construcción",
    date: "2026-06-18",
    displayDate: "18 JUN",
    readingTime: "5 min",
    image: "/img/slider1.webp",
    content: [
      "Las casas prefabricadas de madera combinan procesos precisos en taller con una instalación más rápida en el terreno. Esto permite controlar mejor los materiales, reducir desperdicios y acortar los tiempos de obra.",
      "La madera también aporta un excelente comportamiento térmico. Con el aislamiento y los acabados adecuados, una vivienda mantiene temperaturas interiores más estables y requiere menos energía para climatizarse.",
      "El resultado no tiene por qué ser uniforme: distribución, fachadas, acabados y equipamiento pueden adaptarse a las necesidades del terreno y de cada familia.",
    ],
  },
  {
    slug: "cuanto-tarda-construir-una-casa-de-madera",
    title: "¿Cuánto tarda construir una casa de madera?",
    excerpt: "Las etapas de un proyecto, desde el diseño inicial hasta el montaje y los acabados finales.",
    category: "Construcción",
    date: "2026-05-29",
    displayDate: "29 MAY",
    readingTime: "6 min",
    image: "/img/slider2.webp",
    content: [
      "El plazo depende de la superficie, el nivel de personalización y las condiciones del terreno. La gran ventaja del sistema prefabricado es que varias tareas pueden realizarse en paralelo.",
      "Mientras se preparan cimentación y servicios, los componentes de madera se fabrican bajo condiciones controladas. Después, la estructura se transporta y se monta en sitio.",
      "Una planeación completa desde el inicio —incluidos permisos, accesos y acabados— es la mejor forma de evitar retrasos durante la ejecución.",
    ],
  },
  {
    slug: "mantenimiento-casa-de-madera-en-mexico",
    title: "Guía de mantenimiento para tu casa de madera",
    excerpt: "Qué revisar cada temporada para proteger fachadas, cubiertas y estructura durante muchos años.",
    category: "Mantenimiento",
    date: "2026-05-12",
    displayDate: "12 MAY",
    readingTime: "7 min",
    image: "/img/slider3.webp",
    content: [
      "El mantenimiento preventivo comienza con una inspección visual anual. Conviene revisar sellos, uniones, bajantes y cualquier punto donde el agua pueda acumularse.",
      "Los acabados exteriores deben renovarse según su exposición al sol y a la lluvia. Una protección bien aplicada evita que la humedad penetre y conserva el tono de la madera.",
      "Mantener vegetación y tierra separadas de la fachada, además de asegurar una buena ventilación, reduce considerablemente el riesgo de deterioro.",
    ],
  },
  {
    slug: "diseno-interior-casas-de-madera-modernas",
    title: "Ideas de interiorismo para casas de madera modernas",
    excerpt: "Luz natural, texturas honestas y contrastes que crean espacios cálidos sin perder una estética contemporánea.",
    category: "Diseño",
    date: "2026-04-24",
    displayDate: "24 ABR",
    readingTime: "4 min",
    image: "/img/modelo-familiar.jpg",
    content: [
      "La madera puede ser protagonista sin cubrir cada superficie. Combinarla con muros claros, piedra, metal negro o textiles naturales genera contraste y evita una sensación recargada.",
      "Las ventanas amplias refuerzan la conexión con el paisaje y hacen que las vetas cambien de carácter durante el día. La iluminación cálida complementa ese efecto por la noche.",
      "El mobiliario integrado aprovecha mejor cada metro cuadrado y permite mantener una lectura limpia del espacio.",
    ],
  },
  {
    slug: "maderas-recomendadas-para-exteriores",
    title: "Las mejores maderas para exteriores",
    excerpt: "Durabilidad, estabilidad y acabado: cómo escoger la especie correcta para cada clima y aplicación.",
    category: "Mantenimiento",
    date: "2026-04-03",
    displayDate: "03 ABR",
    readingTime: "5 min",
    image: "/img/modelo-rancho.jpg",
    content: [
      "La elección no depende únicamente de la apariencia. Densidad, estabilidad dimensional y resistencia natural son factores clave para fachadas, terrazas y elementos expuestos.",
      "También importa el sistema constructivo: buenos aleros, drenaje, ventilación y fijaciones correctas prolongan la vida útil de cualquier especie.",
      "El acabado debe ser compatible con el uso y el clima local. Nuestro equipo puede recomendar la combinación adecuada para cada proyecto.",
    ],
  },
  {
    slug: "casas-de-madera-construccion-sustentable",
    title: "Casas de madera y construcción sustentable",
    excerpt: "Cómo un material renovable, bien gestionado y eficiente puede reducir el impacto de una vivienda.",
    category: "Sustentabilidad",
    date: "2026-03-16",
    displayDate: "16 MAR",
    readingTime: "6 min",
    image: "/img/modelo-compacto.jpg",
    content: [
      "La madera procede de un recurso renovable y almacena carbono durante toda su vida útil. Cuando su origen es responsable, representa una alternativa de menor impacto frente a materiales más intensivos en energía.",
      "La prefabricación optimiza cortes y cantidades, disminuye residuos y reduce movimientos de maquinaria en el terreno.",
      "La sustentabilidad final también depende del diseño bioclimático, el aislamiento, la durabilidad y la posibilidad de reparar los componentes con el paso del tiempo.",
    ],
  },
];
