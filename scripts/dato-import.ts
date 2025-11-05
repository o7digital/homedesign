/*
  Imports local JSON into DatoCMS models created by scripts/dato-setup.ts
  - Imports products from data/productos.json
  - Imports woods from data/maderas.json

  Images: this basic importer skips image upload (keeps null). You can
  extend to upload from local/public paths via uploads.createFromUrl.

  Usage:
    DATOCMS_CMA_TOKEN=xxx npx tsx scripts/dato-import.ts
*/

import fs from 'node:fs';
import path from 'node:path';
import { buildClient } from '@datocms/cma-client-node';

type Producto = {
  SKU: string;
  NombreProducto: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Tipo?: string | null;
  Imagen?: string | null;
};

type Madera = {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  img: string;
};

async function importProducts(client: ReturnType<typeof buildClient>) {
  const file = path.join(process.cwd(), 'data', 'productos.json');
  const raw = fs.readFileSync(file, 'utf8');
  const items: Producto[] = JSON.parse(raw);

  const productType = (await client.itemTypes.list()).find((t) => t.api_key === 'product');
  if (!productType) throw new Error('Product model not found, run dato-setup first');

  const existing = await client.items.list({ filter: { type: 'product' }, page: { limit: 500 } });
  const bySku = new Map(existing.map((i) => [i.sku as string, i] as const));

  for (const p of items) {
    const payload: any = {
      item_type: { type: 'item_type', id: productType.id },
      sku: p.SKU,
      nombreProducto: p.NombreProducto,
      descripcion: p.Descripcion,
      precio: p.Precio ?? 0,
      stock: p.Stock ?? 0,
      tipo: p.Tipo ?? null,
      imagen: null,
    };
    const existingItem = bySku.get(p.SKU);
    if (existingItem) {
      await client.items.update(existingItem.id, payload);
    } else {
      await client.items.create(payload);
    }
  }
  console.log(`Imported/updated ${items.length} products`);
}

async function importWoods(client: ReturnType<typeof buildClient>) {
  const file = path.join(process.cwd(), 'data', 'maderas.json');
  const raw = fs.readFileSync(file, 'utf8');
  const items: Madera[] = JSON.parse(raw);

  const woodType = (await client.itemTypes.list()).find((t) => t.api_key === 'wood');
  if (!woodType) throw new Error('Wood model not found, run dato-setup first');

  const existing = await client.items.list({ filter: { type: 'wood' }, page: { limit: 500 } });
  const byCode = new Map(existing.map((i) => [i.code as string, i] as const));

  for (const w of items) {
    const payload: any = {
      item_type: { type: 'item_type', id: woodType.id },
      code: w.id,
      nombre: w.nombre,
      origen: w.origen,
      descripcion: w.descripcion,
      img: null,
    };
    const existingItem = byCode.get(w.id);
    if (existingItem) {
      await client.items.update(existingItem.id, payload);
    } else {
      await client.items.create(payload);
    }
  }
  console.log(`Imported/updated ${items.length} woods`);
}

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN;
  if (!token) throw new Error('Missing DATOCMS_CMA_TOKEN');
  const client = buildClient({ apiToken: token });

  await importProducts(client);
  await importWoods(client);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

