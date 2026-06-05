import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Frequently asked questions | Home Design Marques",
  description:
    "Frequently asked questions about prefabricated wooden homes, custom furniture, wood types, quotes, delivery and maintenance.",
};

const questions = [
  ["What does Home Design Marques manufacture?", "We manufacture and sell wood solutions for homes, interiors and special projects: prefabricated wooden homes, doors, floors, stairs, home and office furniture, plywood, boards and custom carpentry."],
  ["Are wooden homes prefabricated or custom made?", "We can work from base models to speed up the quote and production process, or develop a custom design when the land, layout or architectural style requires it."],
  ["What do you need to quote a wooden home?", "We need the project location, approximate dimensions, number of rooms and bathrooms, intended use, preferred style and any plans or reference images you already have."],
  ["Do you make office furniture?", "Yes. We design and manufacture desks, bookcases, doors, closets, shelves, counters, reception furniture and custom pieces for homes, offices and commercial spaces."],
  ["Which wood types do you recommend?", "It depends on the use. Pine is often considered for efficient structural solutions, while woods such as parota, walnut, ash, teak, maple or chestnut can be used for stronger visual finishes depending on availability and budget."],
  ["Does wood require maintenance?", "Yes. Wood is a natural material. Exterior pieces should be checked periodically for sealers, varnishes or protective treatments, especially with direct sun, humidity or rain."],
  ["Can wooden homes handle rain, humidity and temperature changes?", "A well-designed wooden home can perform well in different climates when structure, treatment, insulation, ventilation and moisture protection are specified correctly."],
  ["Do you deliver or install outside Mexico City?", "We can review projects in Mexico City, Estado de Mexico and other areas in Mexico. Feasibility depends on product type, distance, access and site conditions."],
  ["How long does production take?", "Timing depends on scope, dimensions, wood availability, design complexity, finishes, number of pieces and installation schedule. We provide an estimated timeline with the quote."],
  ["How can I request a quote?", "Use the contact form or WhatsApp. Include your name, city, project type, approximate dimensions, photos of the space and style references when available."],
];

export default function EnglishQuestionsPage() {
  return (
    <div className="bg-[#fefaf3] font-sans flex flex-col min-h-screen">
      <SiteHeader locale="en" />
      <main className="pt-[210px]">
        <section className="max-w-[1100px] mx-auto px-6 pb-4">
          <p className="text-sm uppercase tracking-[0.18em] text-[#8b6a3f] font-semibold">
            Home Design Marques
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5d3b2d] mt-3">
            Frequently asked questions
          </h1>
          <p className="text-gray-700 mt-5 max-w-3xl leading-7">
            Answers about wooden homes, custom furniture, materials, timelines,
            delivery, maintenance and quotes.
          </p>
        </section>
        <section className="max-w-[1100px] mx-auto px-6 py-8">
          <div className="bg-[#fff2e6] rounded-xl shadow-md p-6 md:p-10">
            {questions.map(([question, answer]) => (
              <article key={question} className="border-b border-[#d7bea1] last:border-b-0 py-6 first:pt-0 last:pb-0">
                <h2 className="text-xl md:text-2xl font-bold text-[#5d3b2d]">{question}</h2>
                <p className="mt-3 text-gray-800 leading-7">{answer}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="max-w-[1100px] mx-auto px-6 pb-8">
          <div className="bg-black text-white p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold">Have another question?</h2>
              <p className="text-gray-300 mt-2">Tell us what you want to build and we will guide you.</p>
            </div>
            <Link href="/en/#contacto" className="bg-yellow-400 text-black font-bold px-5 py-3 rounded hover:bg-yellow-500 transition text-center">
              Contact us
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </div>
  );
}
