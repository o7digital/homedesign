import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { noticias } from "../data";

export function generateStaticParams() { return noticias.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = noticias.find((noticia) => noticia.slug === slug);
  return item ? { title: `${item.title} | Home Design Marques`, description: item.excerpt, alternates: { canonical: `/noticias/${slug}` } } : {};
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = noticias.find((noticia) => noticia.slug === slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="bg-white pt-48 text-stone-950">
        <article>
          <header className="mx-auto max-w-4xl px-6 py-16 text-center">
            <Link href="/noticias" className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800 hover:underline">← Todas las noticias</Link>
            <p className="mt-8 text-sm text-stone-500">{item.category} · {item.displayDate} · {item.readingTime} de lectura</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">{item.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-stone-600">{item.excerpt}</p>
          </header>
          <div className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden rounded-3xl bg-stone-100">
            <Image src={item.image} alt={item.title} fill priority className="object-cover" sizes="100vw" />
          </div>
          <div className="mx-auto max-w-3xl px-6 py-14 text-lg leading-9 text-stone-700">
            {item.content.map((paragraph) => <p key={paragraph} className="mb-7">{paragraph}</p>)}
            <div className="mt-12 rounded-3xl bg-[#f5f0e8] p-8 text-center">
              <h2 className="text-2xl font-bold text-stone-950">¿Tienes un proyecto en mente?</h2>
              <p className="mt-3">Cuéntanos qué casa quieres construir y te ayudaremos a definir el siguiente paso.</p>
              <Link href="/#contacto" className="mt-6 inline-block rounded-full bg-black px-7 py-3 font-bold text-white hover:bg-stone-800">Hablar con nuestro equipo</Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
