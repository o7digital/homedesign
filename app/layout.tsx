import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Design Marques | Casas de Madera Prefabricadas en México",
  description: "Especialistas en casas de madera prefabricadas y productos de madera de alta calidad en México. Viviendas ecológicas, sustentables y con diseño moderno. Pino, cedro, encino y más.",
  keywords: [
    "casas de madera",
    "casas prefabricadas México",
    "viviendas de madera",
    "construcción sustentable",
    "casas ecológicas",
    "madera pino",
    "madera cedro",
    "productos madera México",
    "Home Design Marques",
  ],
  authors: [{ name: "Home Design Marques" }],
  openGraph: {
    title: "Home Design Marques | Casas de Madera Prefabricadas",
    description: "Viviendas de madera ecológicas y sustentables con diseño moderno en México",
    type: "website",
    locale: "es_MX",
    siteName: "Home Design Marques",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Design Marques | Casas de Madera Prefabricadas",
    description: "Viviendas de madera ecológicas y sustentables con diseño moderno en México",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
