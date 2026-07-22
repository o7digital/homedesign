import type { Offre } from "@/types/offre";

export const offerTranslations: Record<
  string,
  Pick<Offre, "titre" | "description" | "descriptionCourte">
> = {
  "promo-cabanas-noviembre": {
    titre: "Special Wood Cabin Promotion",
    descriptionCourte: "Up to 30% off three-bedroom English-style cabins",
    description:
      "Take advantage of our special offer on three-bedroom English-style cabins. Premium wood construction with luxury finishes.\n\nIncludes:\n- Main bedroom with jacuzzi\n- Space for a king-size bed\n- Two bedrooms with shared bathroom\n- Service bathroom\n- Two levels\n- Cistern and solar water heater\n- Porsche kitchen\n\nOptional: Study or TV room. Delivery in 90 days.",
  },
  "oferta-cabana-chimenea-diciembre": {
    titre: "December Offer - Cabin with Stone Fireplace",
    descriptionCourte: "Cabin with two stone fireplaces - Perfect for winter",
    description:
      "Perfect for enjoying winter in style. English-style cabin with two natural stone fireplaces.\n\nFeatures:\n- Two stone fireplaces\n- Three spacious bedrooms\n- Main bedroom with jacuzzi\n- Service bathroom\n- Equipped Porsche kitchen\n- Solar water heater included\n- 10,000-liter cistern\n\nFinancing available up to 24 months with no interest.",
  },
  "fin-ano-cabanas": {
    titre: "Year-End Special - Premium Cabins",
    descriptionCourte: "Last chance of the year - Premium English-style cabins",
    description:
      "The last opportunity of the year to purchase your wood cabin with a special discount.\n\nPremium model includes:\n- Classic English-style architecture\n- Three spacious bedrooms\n- Jacuzzi in the main bedroom\n- Two-level construction\n- Eco-friendly installations with solar water heater\n- Luxury Porsche kitchen\n- Premium wood finishes\n\nScheduled delivery: March 2026. 30% down payment to reserve.",
  },
  "pack-familiar-noviembre": {
    titre: "Family Package - English-Style Cabin",
    descriptionCourte: "Complete family package - Cabin with stone fireplace",
    description:
      "Ideal for families looking for a welcoming space surrounded by nature.\n\nFamily Package benefits:\n- Spacious design for the whole family\n- Three comfortable bedrooms\n- Optimized shared bathroom\n- Additional service bathroom\n- Stone fireplace for cold nights\n- Fully equipped kitchen\n- Cistern installation included\n- Eco-friendly solar water heater\n\nSpecial price valid only in November. Includes personalized consulting and construction plans.",
  },
};
