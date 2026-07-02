import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import NoticiasGrid from "./NoticiasGrid";
import { noticias } from "./data";

export const metadata: Metadata = {
  title: "Noticias sobre casas de madera | Home Design Marques",
  description: "Consejos, tendencias y guías sobre casas prefabricadas de madera, diseño, mantenimiento y construcción sustentable en México.",
  alternates: { canonical: "/noticias" },
};

export default function NoticiasPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white pt-48 text-stone-950">
        <section className="border-b border-stone-200 bg-[#f5f0e8] px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-800">Ideas que construyen</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Noticias</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">Inspiración, consejos y conocimiento para diseñar, construir y cuidar una casa de madera hecha para durar.</p>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16"><NoticiasGrid noticias={noticias} /></section>
      </main>
      <SiteFooter />
    </>
  );
}
