import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export default function PrivacyNoticePage() {
  return (
    <div className="bg-[#fefaf3] font-sans min-h-screen">
      <SiteHeader locale="en" />
      <main className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md pt-8 mt-[230px]">
        <h1 className="text-3xl font-bold text-[#5d3b2d] mb-6">Privacy Notice</h1>
        <p className="mb-4 text-gray-800 leading-relaxed">
          At <strong>Home Design Marques</strong>, we respect and protect the
          privacy of our clients and website visitors. This notice explains how
          we collect, use and protect personal information submitted through our
          contact, quote or purchase forms.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Information we collect</h2>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800">
          <li>First and last name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Address, when needed for a quote or delivery</li>
          <li>Comments and messages voluntarily submitted</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Use of information</h2>
        <p className="mb-4 text-gray-800">
          We use this information to answer requests, prepare quotes, provide
          support, manage administrative processes and send updates only when
          authorized.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#5d3b2d]">Contact</h2>
        <p className="mb-4 text-gray-800">
          To request access, correction or deletion of your personal data, please
          contact us through the website form.
        </p>
        <Link href="/en" className="text-[#5d3b2d] font-bold hover:underline">
          ← Back to home
        </Link>
      </main>
      <SiteFooter locale="en" />
    </div>
  );
}
