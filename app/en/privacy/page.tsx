import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Notice | Home Design Marques",
  description: "Learn how Home Design Marques collects, uses and protects personal information.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      "es-MX": "/aviso-privacidad",
      "en": "/en/privacy",
    },
  },
};

export default function PrivacyNotice() {
  return (
    <>
      <main className="bg-[#fefaf3] min-h-screen p-8">
        <article className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md text-gray-800">
          <h1 className="text-3xl font-bold text-[#5d3b2d] mb-6">Privacy Notice</h1>
          <p className="mb-4">
            Home Design Marques respects and protects the privacy of its customers and website visitors.
            This notice explains how we collect, use and protect your personal information.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Information we collect</h2>
          <p className="mb-4">
            We may collect your name, telephone number, email address, postal address, and information
            voluntarily submitted through our contact or quotation forms.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">How we use information</h2>
          <p className="mb-4">
            We use this information to answer requests, prepare quotations, provide customer support,
            manage billing, and send marketing communications only when authorized.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Your rights</h2>
          <p className="mb-4">
            You may request access to, correction or deletion of your personal data, or object to its use,
            by emailing{" "}
            <a className="text-[#5d3b2d] underline" href="mailto:contacto@homedesignmarquez.com">
              contacto@homedesignmarquez.com
            </a>.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Information security</h2>
          <p className="mb-4">
            We use reasonable technical, administrative and physical safeguards to protect personal
            information from unauthorized access, loss, alteration or disclosure.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Updates</h2>
          <p className="mb-4">
            We may update this notice to reflect legal or operational changes. The current version will
            remain available on this website.
          </p>
          <p className="mt-8 text-sm text-gray-600">Last updated: June 2026</p>
          <Link href="/en" className="mt-10 inline-block bg-[#5d3b2d] text-white px-6 py-2 rounded-lg">
            ← Back to home
          </Link>
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
