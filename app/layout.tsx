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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Home Design Marques",
    "image": "https://homedesignmarques.com/logo-transparent.png",
    "@id": "https://homedesignmarques.com",
    "url": "https://homedesignmarques.com",
    "telephone": "+52-55-1234-5678",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "postalCode": "",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.4326,
      "longitude": -99.1332
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/homedesignmarques",
      "https://www.instagram.com/homedesignmarques",
      "https://www.tiktok.com/@homedesignmarques"
    ],
    "description": "Venta y fabricación de casas de madera prefabricadas en México. Muebles y mobiliario de madera para casas y oficinas. Puertas, pisos, triplay. Servicio en CDMX y toda la República Mexicana.",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 19.4326,
        "longitude": -99.1332
      },
      "geoRadius": "500000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Productos de Madera",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Casas Prefabricadas",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Casas de Madera Prefabricadas",
                "description": "Fabricación y venta de casas prefabricadas de madera tipo inglés, ecológicas y sustentables",
                "category": "Construcción",
                "brand": {
                  "@type": "Brand",
                  "name": "Home Design Marques"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Mobiliario y Productos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Muebles de Madera",
                "description": "Mobiliario de madera para casas y oficinas, carpintería fina a medida",
                "category": "Mobiliario"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Puertas de Madera",
                "description": "Fabricación y venta de puertas de madera natural, barnizada y lacada",
                "category": "Carpintería"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pisos de Madera",
                "description": "Pisos de madera natural para interiores y exteriores",
                "category": "Revestimientos"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Triplay y Materiales",
                "description": "Venta de triplay, tableros y materiales de madera premium",
                "category": "Materiales"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Maderas Premium",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Madera de Pino",
                "description": "Madera de pino de alta calidad, origen México",
                "category": "Maderas"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Madera de Cedro",
                "description": "Madera de cedro premium, resistente y aromática",
                "category": "Maderas"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Madera de Encino",
                "description": "Madera de encino robusto y durable",
                "category": "Maderas"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
