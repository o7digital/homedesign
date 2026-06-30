import type { Metadata } from "next";
import { HomeContent } from "../page";

export const metadata: Metadata = {
  title: "Home Design Marques | Wooden Homes and Custom Furniture Mexico",
  description:
    "Prefabricated wooden homes, custom wood furniture, doors, floors, plywood and premium wood products in Mexico.",
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
