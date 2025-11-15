/**
 * Script pour DUPLIQUER tout le contenu de SANDBOX vers MAIN
 * 
 * Source: main-copy-2025-11-04 (SANDBOX avec 50 produits)
 * Destination: main (PRIMARY - actuellement vide)
 * 
 * Usage:
 * DATOCMS_CMA_TOKEN=your_full_access_token npm run dato:copy-to-main
 */

import { buildClient } from '@datocms/cma-client-node';

const SOURCE_ENV = 'main-copy-2025-11-04';
const TARGET_ENV = undefined; // undefined = primary environment (main)

interface DatoRecord {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, unknown>;
}

async function copyAllContent() {
  const token = process.env.DATOCMS_CMA_TOKEN;
  
  if (!token) {
    console.error('❌ DATOCMS_CMA_TOKEN requis (Full Access)');
    console.log('\n📝 Comment obtenir le token:');
    console.log('   1. DatoCMS > Settings > API Tokens');
    console.log('   2. Create New Token');
    console.log('   3. Name: "Full Access Migration"');
    console.log('   4. Permissions: Full Access ✅');
    console.log('   5. Copy token et mettre dans .env.local\n');
    process.exit(1);
  }

  const sourceClient = buildClient({ 
    apiToken: token,
    environment: SOURCE_ENV 
  });
  
  const targetClient = buildClient({ 
    apiToken: token,
    environment: TARGET_ENV 
  });

  try {
    console.log('🚀 Début de la copie de contenu\n');
    console.log(`📦 Source: ${SOURCE_ENV} (SANDBOX)`);
    console.log(`📍 Destination: main (PRIMARY)\n`);

    // 1. Copier Pagina Home
    console.log('1️⃣  Copie de Pagina Home...');
    try {
      const sourceHome = await sourceClient.items.list({
        filter: { type: 'pagina_home' },
        page: { limit: 100 }
      });
      
      console.log(`   Trouvé ${sourceHome.length} page(s) home`);
      
      for (const item of sourceHome) {
        try {
          await targetClient.items.create({
            item_type: { type: 'item_type', id: item.item_type.id },
            ...item.attributes
          });
          console.log(`   ✅ Copié: ${item.attributes.title || 'Home'}`);
        } catch (e: unknown) {
          const error = e as Error;
          console.log(`   ⚠️  Ignoré (peut-être existe déjà): ${error.message}`);
        }
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.log(`   ⚠️  ${error.message}`);
    }

    // 2. Copier Tipos de Madera
    console.log('\n2️⃣  Copie de Tipos de Madera...');
    try {
      const sourceMaderas = await sourceClient.items.list({
        filter: { type: 'tipo_de_madera' },
        page: { limit: 100 }
      });
      
      console.log(`   Trouvé ${sourceMaderas.length} type(s) de madera`);
      
      for (const item of sourceMaderas) {
        try {
          await targetClient.items.create({
            item_type: { type: 'item_type', id: item.item_type.id },
            ...item.attributes
          });
          console.log(`   ✅ Copié: ${item.attributes.nombre_tipo_madera || 'Madera'}`);
        } catch (e: unknown) {
          const error = e as Error;
          console.log(`   ⚠️  Ignoré: ${error.message}`);
        }
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.log(`   ⚠️  ${error.message}`);
    }

    // 3. Copier Categorias Productos
    console.log('\n3️⃣  Copie de Categorias Productos...');
    try {
      const sourceCats = await sourceClient.items.list({
        filter: { type: 'categoria_productos' },
        page: { limit: 100 }
      });
      
      console.log(`   Trouvé ${sourceCats.length} catégorie(s)`);
      
      for (const item of sourceCats) {
        try {
          await targetClient.items.create({
            item_type: { type: 'item_type', id: item.item_type.id },
            ...item.attributes
          });
          console.log(`   ✅ Copié: ${item.attributes.nombre_categoria || 'Categoria'}`);
        } catch (e: unknown) {
          const error = e as Error;
          console.log(`   ⚠️  Ignoré: ${error.message}`);
        }
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.log(`   ⚠️  ${error.message}`);
    }

    // 4. Copier Productos (50 items)
    console.log('\n4️⃣  Copie de Productos (peut prendre du temps)...');
    try {
      const sourceProducts = await sourceClient.items.list({
        filter: { type: 'producto' },
        page: { limit: 500 }
      });
      
      console.log(`   Trouvé ${sourceProducts.length} produit(s)`);
      
      let copied = 0;
      for (const item of sourceProducts) {
        try {
          await targetClient.items.create({
            item_type: { type: 'item_type', id: item.item_type.id },
            ...item.attributes
          });
          copied++;
          console.log(`   ✅ [${copied}/${sourceProducts.length}] ${item.attributes.titulo || item.attributes.sku || 'Producto'}`);
        } catch (e: unknown) {
          const error = e as Error;
          console.log(`   ⚠️  Erreur: ${error.message}`);
        }
      }
      
      console.log(`\n   ✅ ${copied}/${sourceProducts.length} produits copiés`);
    } catch (e: unknown) {
      const error = e as Error;
      console.log(`   ❌ ${error.message}`);
    }

    // 5. Copier Contacto Formulario
    console.log('\n5️⃣  Copie de Contacto Formulario...');
    try {
      const sourceContact = await sourceClient.items.list({
        filter: { type: 'contacto_formulario' },
        page: { limit: 100 }
      });
      
      console.log(`   Trouvé ${sourceContact.length} formulaire(s)`);
      
      for (const item of sourceContact) {
        try {
          await targetClient.items.create({
            item_type: { type: 'item_type', id: item.item_type.id },
            ...item.attributes
          });
          console.log(`   ✅ Copié: Formulaire de contact`);
        } catch (e: unknown) {
          const error = e as Error;
          console.log(`   ⚠️  Ignoré: ${error.message}`);
        }
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.log(`   ⚠️  ${error.message}`);
    }

    console.log('\n✅ COPIE TERMINÉE!\n');
    console.log('📋 Prochaines étapes:');
    console.log('   1. Vérifier le contenu dans l\'environnement main (PRIMARY)');
    console.log('   2. Mettre à jour lib/datocms.ts pour pointer vers main en production');
    console.log('   3. Déployer la branche main\n');

  } catch (error) {
    console.error('\n❌ Erreur globale:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🚀 DUPLICATION DATOCMS: SANDBOX → MAIN                   ║
║                                                            ║
║  ⚠️  ATTENTION: Cette opération va:                        ║
║     • Copier TOUT le contenu de SANDBOX vers MAIN         ║
║     • Créer des doublons si le contenu existe déjà        ║
║     • Peut prendre plusieurs minutes                      ║
║                                                            ║
║  📦 Éléments à copier:                                     ║
║     • Pagina Home (1 item)                                ║
║     • Tipos de Madera (9 items)                           ║
║     • Categorias Productos                                ║
║     • Productos (~50 items)                               ║
║     • Contacto Formulario (1 item)                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Appuyez sur Ctrl+C pour annuler dans les 5 secondes...
`);

setTimeout(() => {
  copyAllContent();
}, 5000);
