/*
  Creates basic DatoCMS models for Home Design Marques
  - Product: sku, nombreProducto, descripcion, precio, stock, tipo, imagen
  - Wood: code, nombre, origen, descripcion, img

  Usage:
    DATOCMS_CMA_TOKEN=xxx npx tsx scripts/dato-setup.ts
*/

import { buildClient } from '@datocms/cma-client-node';

async function ensureLocale(client: ReturnType<typeof buildClient>, code: string) {
  const existing = await client.locales.list();
  if (existing.find((l) => l.code === code)) return;
  await client.locales.create({ code, name: 'Español', fallback_code: null, is_default: true });
}

async function ensureItemType(client: ReturnType<typeof buildClient>, apiKey: string, name: string) {
  const all = await client.itemTypes.list();
  const found = all.find((t) => t.api_key === apiKey);
  if (found) return found;
  return client.itemTypes.create({ api_key: apiKey, name, draft_mode_active: false });
}

async function ensureField(client: ReturnType<typeof buildClient>, itemTypeId: string, apiKey: string, attrs: any) {
  const fields = await client.fields.list(itemTypeId);
  const found = fields.find((f) => f.api_key === apiKey);
  if (found) return found;
  return client.fields.create(itemTypeId, { api_key: apiKey, ...attrs });
}

async function main() {
  const token = process.env.DATOCMS_CMA_TOKEN;
  if (!token) throw new Error('Missing DATOCMS_CMA_TOKEN');
  const client = buildClient({ apiToken: token });

  // Locale
  await ensureLocale(client, 'es');

  // Product model
  const product = await ensureItemType(client, 'product', 'Product');
  await ensureField(client, product.id, 'sku', {
    label: 'SKU',
    field_type: 'string',
    validators: { unique: {} },
    appeareance: { editor: 'string', parameters: { } },
  });
  await ensureField(client, product.id, 'nombreProducto', {
    label: 'Nombre del producto',
    field_type: 'string',
  });
  await ensureField(client, product.id, 'descripcion', {
    label: 'Descripción',
    field_type: 'text',
  });
  await ensureField(client, product.id, 'precio', {
    label: 'Precio',
    field_type: 'float',
  });
  await ensureField(client, product.id, 'stock', {
    label: 'Stock',
    field_type: 'integer',
  });
  await ensureField(client, product.id, 'tipo', {
    label: 'Tipo',
    field_type: 'string',
  });
  await ensureField(client, product.id, 'imagen', {
    label: 'Imagen',
    field_type: 'file',
  });

  // Use nombreProducto as title field
  await client.itemTypes.update(product.id, { title_field: (await client.fields.list(product.id)).find(f => f.api_key === 'nombreProducto')!.id });

  // Wood model
  const wood = await ensureItemType(client, 'wood', 'Wood');
  await ensureField(client, wood.id, 'code', {
    label: 'Código',
    field_type: 'string',
    validators: { unique: {} },
  });
  await ensureField(client, wood.id, 'nombre', {
    label: 'Nombre',
    field_type: 'string',
  });
  await ensureField(client, wood.id, 'origen', {
    label: 'Origen',
    field_type: 'string',
  });
  await ensureField(client, wood.id, 'descripcion', {
    label: 'Descripción',
    field_type: 'text',
  });
  await ensureField(client, wood.id, 'img', {
    label: 'Imagen',
    field_type: 'file',
  });
  await client.itemTypes.update(wood.id, { title_field: (await client.fields.list(wood.id)).find(f => f.api_key === 'nombre')!.id });

  // Editor UI: optional, we keep defaults
  console.log('DatoCMS models ensured: product, wood');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

