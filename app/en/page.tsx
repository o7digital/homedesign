import type { Metadata } from "next";
import { HomeContent } from "../page";

export const metadata: Metadata = {
  title: "Home Design Marques | Wooden Homes and Custom Furniture Mexico",
  description:
    "Prefabricated wooden homes, custom wood furniture, doors, floors, plywood and premium wood products in Mexico.",
};

export default function EnglishHome() {
  return <HomeContent locale="en" />;
}
