import { MetadataRoute } from 'next'
import productosData from '../data/productos.json'
import maderasData from '../data/maderas.json'
import offresData from '../data/offres.json'
import { noticias } from './noticias/data'

interface Producto {
  SKU: string;
  Slug?: string | null;
}

interface MaderaItem {
  id: string;
}

interface OffreItem {
  slug: string;
  dateFin?: string | null;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homedesignmarques.com'
  
  const productos = productosData as unknown as Producto[];
  const maderas = maderasData as unknown as MaderaItem[];
  const offres = offresData as unknown as OffreItem[];

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/aviso-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/preguntas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/preguntas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/offres`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/noticias`,
          en: `${baseUrl}/en/news`,
        },
      },
    },
    {
      url: `${baseUrl}/en/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/noticias`,
          en: `${baseUrl}/en/news`,
        },
      },
    },
  ];

  // Pages de maderas dynamiques
  const maderasPages: MetadataRoute.Sitemap = maderas.map((madera) => ({
    url: `${baseUrl}/maderas/${madera.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/maderas/${madera.id}`,
        en: `${baseUrl}/en/wood/${madera.id}`,
      },
    },
  }));

  const englishWoodPages: MetadataRoute.Sitemap = maderas.map((madera) => ({
    url: `${baseUrl}/en/wood/${madera.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/maderas/${madera.id}`,
        en: `${baseUrl}/en/wood/${madera.id}`,
      },
    },
  }));

  // Pages de productos dynamiques
  const productosPages: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/productos/${producto.Slug || producto.SKU}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/productos/${producto.Slug || producto.SKU}`,
        en: `${baseUrl}/en/products/${producto.Slug || producto.SKU}`,
      },
    },
  }));

  const englishProductPages: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/en/products/${producto.Slug || producto.SKU}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/productos/${producto.Slug || producto.SKU}`,
        en: `${baseUrl}/en/products/${producto.Slug || producto.SKU}`,
      },
    },
  }));

  const offresPages: MetadataRoute.Sitemap = offres.map((offre) => ({
    url: `${baseUrl}/offres/${offre.slug}`,
    lastModified: offre.dateFin ? new Date(offre.dateFin) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/offres/${offre.slug}`,
        en: `${baseUrl}/en/offers/${offre.slug}`,
      },
    },
  }));

  const englishOfferPages: MetadataRoute.Sitemap = offres.map((offre) => ({
    url: `${baseUrl}/en/offers/${offre.slug}`,
    lastModified: offre.dateFin ? new Date(offre.dateFin) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/offres/${offre.slug}`,
        en: `${baseUrl}/en/offers/${offre.slug}`,
      },
    },
  }));

  const noticiasPages: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${baseUrl}/noticias/${noticia.slug}`,
    lastModified: new Date(noticia.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...maderasPages,
    ...englishWoodPages,
    ...productosPages,
    ...englishProductPages,
    ...offresPages,
    ...englishOfferPages,
    ...noticiasPages,
  ];
}
