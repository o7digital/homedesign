import type { Noticia } from "../../noticias/data";

export const news: Noticia[] = [
  {
    slug: "parota-wood-characteristics-uses-care",
    title: "Parota wood: character, uses, and care",
    excerpt: "Expressive grain, wide slabs, and natural presence: discover why parota is an iconic material in Mexican design.",
    category: "Diseño", date: "2026-07-02", displayDate: "02 JUL", readingTime: "6 min", image: "/img/maderas/parota.webp",
    content: [
      "Parota stands out for its broad grain, warm tones, and natural contrasts. Every board has a different pattern, giving tables, countertops, doors, and large-format pieces a unique identity.",
      "Its availability in wide sections makes it possible to create continuous surfaces with organic edges. It is especially valued for dining tables, coffee tables, desks, headboards, and statement interior pieces.",
      "Before producing a piece, drying, stability, thickness, and intended use must be assessed. Good design allows for the wood's natural movement and uses a finish suited to exposure, moisture, and expected maintenance.",
      "To preserve parota, clean it with gentle products, avoid permanent moisture, and renew its protection when required. Board selection and construction details should be confirmed by a specialist for each project.",
    ],
  },
  {
    slug: "why-choose-a-prefabricated-wooden-house",
    title: "Why choose a prefabricated wooden house?",
    excerpt: "Speed, thermal comfort, and a smaller environmental footprint: the benefits behind their growing popularity.",
    category: "Construcción", date: "2026-06-18", displayDate: "18 JUN", readingTime: "5 min", image: "/img/slider1.webp",
    content: [
      "Prefabricated wooden houses combine precise workshop production with faster on-site installation. This improves material control, reduces waste, and shortens construction times.",
      "Wood also provides excellent thermal performance. With proper insulation and finishes, a home maintains more stable indoor temperatures and requires less energy for heating and cooling.",
      "The result does not have to be standardized: layouts, façades, finishes, and equipment can be tailored to the site and each family's needs.",
    ],
  },
  {
    slug: "how-long-does-it-take-to-build-a-wooden-house",
    title: "How long does it take to build a wooden house?",
    excerpt: "The stages of a project, from the initial design through assembly and final finishes.",
    category: "Construcción", date: "2026-05-29", displayDate: "29 MAY", readingTime: "6 min", image: "/img/slider2.webp",
    content: [
      "The schedule depends on floor area, customization, and site conditions. The main advantage of prefabrication is that several tasks can happen in parallel.",
      "While foundations and utilities are prepared, the wooden components are manufactured under controlled conditions. The structure is then transported and assembled on site.",
      "Complete planning from the outset—including permits, access, and finishes—is the best way to prevent delays during construction.",
    ],
  },
  {
    slug: "wooden-house-maintenance-guide-mexico",
    title: "A maintenance guide for your wooden house",
    excerpt: "What to inspect each season to protect façades, roofs, and the structure for many years.",
    category: "Mantenimiento", date: "2026-05-12", displayDate: "12 MAY", readingTime: "7 min", image: "/img/slider3.webp",
    content: [
      "Preventive maintenance starts with an annual visual inspection. Check seals, joints, downspouts, and any point where water could collect.",
      "Exterior finishes should be renewed according to their exposure to sun and rain. Properly applied protection keeps moisture out and preserves the wood's color.",
      "Keeping plants and soil away from the façade, while ensuring good ventilation, considerably reduces the risk of deterioration.",
    ],
  },
  {
    slug: "interior-design-ideas-for-modern-wooden-houses",
    title: "Interior design ideas for modern wooden houses",
    excerpt: "Natural light, honest textures, and contrasts that create warm spaces with a contemporary feel.",
    category: "Diseño", date: "2026-04-24", displayDate: "24 APR", readingTime: "4 min", image: "/img/modelo-familiar.jpg",
    content: [
      "Wood can take center stage without covering every surface. Pairing it with light walls, stone, black metal, or natural textiles creates contrast and avoids a crowded look.",
      "Large windows strengthen the connection with the landscape and make the grain change character throughout the day. Warm lighting complements this effect at night.",
      "Built-in furniture makes better use of every square meter and keeps the space visually clean.",
    ],
  },
  {
    slug: "best-woods-for-outdoor-use",
    title: "The best woods for outdoor use",
    excerpt: "Durability, stability, and finish: how to choose the right species for each climate and application.",
    category: "Mantenimiento", date: "2026-04-03", displayDate: "03 APR", readingTime: "5 min", image: "/img/modelo-rancho.jpg",
    content: [
      "The choice does not depend on appearance alone. Density, dimensional stability, and natural resistance are essential for façades, decks, and exposed elements.",
      "The construction system also matters: good overhangs, drainage, ventilation, and correct fasteners extend the service life of any species.",
      "The finish must suit the application and local climate. Our team can recommend the right combination for each project.",
    ],
  },
  {
    slug: "wooden-houses-and-sustainable-construction",
    title: "Wooden houses and sustainable construction",
    excerpt: "How a renewable, responsibly managed, and efficient material can reduce a home's impact.",
    category: "Sustentabilidad", date: "2026-03-16", displayDate: "16 MAR", readingTime: "6 min", image: "/img/modelo-compacto.jpg",
    content: [
      "Wood comes from a renewable resource and stores carbon throughout its service life. When responsibly sourced, it offers a lower-impact alternative to more energy-intensive materials.",
      "Prefabrication optimizes cuts and quantities, reduces waste, and limits machinery movement on the site.",
      "Overall sustainability also depends on bioclimatic design, insulation, durability, and the ability to repair components over time.",
    ],
  },
];

export const categoryNames: Record<Noticia["category"], string> = {
  Construcción: "Construction", Diseño: "Design", Mantenimiento: "Maintenance", Sustentabilidad: "Sustainability",
};
