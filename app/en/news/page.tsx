import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import NewsGrid from "./NewsGrid";
import { news } from "./data";

export const metadata: Metadata = {
  title: "Wooden house news | Home Design Marques",
  description: "Advice, trends, and guides about prefabricated wooden houses, design, maintenance, and sustainable construction in Mexico.",
  alternates: { canonical: "/en/news", languages: { es: "/noticias", en: "/en/news" } },
};

export default function NewsPage() {
  return <><SiteHeader locale="en" /><main className="bg-white pt-48 text-stone-950"><section className="border-b border-stone-200 bg-[#f5f0e8] px-6 py-20 text-center"><p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-800">Ideas that build</p><h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">News</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">Inspiration, advice, and expertise for designing, building, and caring for a wooden house made to last.</p></section><section className="mx-auto max-w-6xl px-6 py-16"><NewsGrid news={news} /></section></main><SiteFooter locale="en" /></>;
}
