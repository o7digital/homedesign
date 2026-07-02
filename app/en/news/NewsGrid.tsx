"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Noticia } from "../../noticias/data";
import { categoryNames } from "./data";

export default function NewsGrid({ news }: { news: Noticia[] }) {
  const categories = ["All", ...Array.from(new Set(news.map((item) => categoryNames[item.category])))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? news : news.filter((item) => categoryNames[item.category] === active);
  return <>
    <div className="mb-12 flex flex-wrap justify-center gap-2" aria-label="Filter news by category">
      {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition ${active === category ? "border-black bg-black text-white" : "border-stone-300 hover:border-black"}`}>{category}</button>)}
    </div>
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {visible.map((item) => <article key={item.slug} className="group border-b border-stone-200 pb-8">
        <Link href={`/en/news/${item.slug}`} className="relative block aspect-[16/10] overflow-hidden rounded-3xl bg-stone-100"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">{item.displayDate}</span></Link>
        <div className="mt-5 flex items-center gap-2 text-sm text-stone-500"><span>Home Design Marques team</span><span>·</span><span>{item.readingTime} read</span></div>
        <div className="mt-3 flex items-start gap-4"><div className="flex-1"><p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-700">{categoryNames[item.category]}</p><h2 className="text-2xl font-bold leading-tight"><Link href={`/en/news/${item.slug}`}>{item.title}</Link></h2></div><Link href={`/en/news/${item.slug}`} aria-label={`Read ${item.title}`} className="mt-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xl text-white transition group-hover:-rotate-45">↗</Link></div>
        <p className="mt-4 leading-7 text-stone-600">{item.excerpt}</p>
      </article>)}
    </div>
  </>;
}
