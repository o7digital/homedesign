import { MetadataRoute } from 'next'
import productosData from '../data/productos.json'
import maderasData from '../data/maderas.json'

interface Producto {
  SKU: string;
  Slug?: string | null;
}

interface MaderaItem {
  id: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homedesignmarques.com'
  
  const productos = productosData as unknown as Producto[];
  const maderas = maderasData as unknown as MaderaItem[];

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
      url: `${baseUrl}/offres`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Pages de maderas dynamiques
  const maderasPages: MetadataRoute.Sitemap = maderas.map((madera) => ({
    url: `${baseUrl}/maderas/${madera.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Pages de productos dynamiques
  const productosPages: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/productos/${producto.Slug || producto.SKU}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...maderasPages, ...productosPages];
}
