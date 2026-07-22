import type { Metadata } from "next";
import { HomeContent } from "../page";

export const metadata: Metadata = {
  title: "Home Design Marques | Wooden Homes and Custom Furniture Mexico",
  description:
    "Prefabricated wooden homes, custom wood furniture, doors, floors, plywood and premium wood products in Mexico.",
  keywords: [
    "wooden homes Mexico",
    "prefabricated wooden homes",
    "prefabricated wooden homes Mexico",
    "wooden house construction Mexico City",
    "eco-friendly homes Mexico",
    "modular wooden homes",
    "wood cabins Mexico",
    "custom wood furniture Mexico",
    "wood office furniture",
    "wood furniture for homes",
    "fine woodworking Mexico",
    "wooden doors Mexico",
    "natural wood flooring",
    "plywood Mexico",
    "wooden stairs",
    "pine wood Mexico",
    "cedar wood Mexico",
    "oak wood",
    "walnut wood",
    "parota wood",
    "premium wood products",
    "sustainable construction Mexico",
    "modern wooden home design",
    "custom carpentry Mexico",
    "Home Design Marques Mexico",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "es-MX": "/",
      "en": "/en",
    },
  },
  openGraph: {
    title: "Home Design Marques | Wooden Homes and Custom Furniture Mexico",
    description: "Prefabricated wooden homes and custom wood products in Mexico.",
    url: "/en",
    locale: "en_US",
  },
};

export default function EnglishHome() {
  return <HomeContent locale="en" />;
}
