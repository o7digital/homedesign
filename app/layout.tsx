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
  title: "Home Design Marques | Venta y Fabricación de Casas de Madera Prefabricadas México",
  description: "Venta y fabricación de casas de madera prefabricadas en México. Muebles y mobiliario de madera para casas y oficinas. Puertas, pisos, triplay. Servicio en CDMX y toda la República Mexicana. Diseño moderno y sustentable.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  keywords: [
    // Casas prefabricadas - Intención comercial
    "venta casas de madera México",
    "fabricación casas prefabricadas",
    "casas de madera prefabricadas México",
    "construcción casas de madera CDMX",
    "venta casas ecológicas México",
    "casas modulares de madera",
    
    // Mobiliario y productos - Intención comercial + localización
    "venta mobiliario madera CDMX",
    "fabricación muebles de madera México",
    "muebles madera para oficinas",
    "mobiliario de madera para casas",
    "carpintería fina México",
    
    // Productos específicos
    "venta puertas de madera México",
    "fabricación puertas madera CDMX",
    "pisos de madera natural",
    "venta triplay México",
    "madera barnizada",
    "escaleras de madera",
    
    // Tipos de madera - Productos comerciales
    "madera de pino México",
    "madera de cedro CDMX",
    "madera de encino",
    "madera de nogal",
    "productos madera premium",
    
    // Servicios y valores
    "construcción sustentable México",
    "viviendas ecológicas",
    "diseño casas modernas madera",
    "carpintería a medida CDMX",
    
    // Marca
    "Home Design Marques",
    "Home Design Marques México",
  ],
  authors: [{ name: "Home Design Marques" }],
  openGraph: {
    title: "Home Design Marques | Venta y Fabricación de Casas de Madera México",
    description: "Fabricación y venta de casas prefabricadas de madera, mobiliario y productos de madera en México. Servicio en CDMX y toda la República.",
    type: "website",
    locale: "es_MX",
    siteName: "Home Design Marques",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Design Marques | Casas y Muebles de Madera México",
    description: "Venta y fabricación de casas prefabricadas, mobiliario y productos de madera en CDMX y México",
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
