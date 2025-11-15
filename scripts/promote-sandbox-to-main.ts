/**
 * Script pour promouvoir/dupliquer le contenu du SANDBOX vers MAIN
 * 
 * ATTENTION: Ce script va écraser le contenu de l'environnement MAIN
 * avec le contenu de l'environnement SANDBOX (main-copy-2025-11-04)
 * 
 * Usage:
 * DATOCMS_CMA_TOKEN=your_token npm run dato:promote
 */

import { buildClient } from '@datocms/cma-client-node';

const SANDBOX_ENV = 'main-copy-2025-11-04';
const MAIN_ENV = 'main'; // ou laisser vide pour l'environnement primaire

async function promoteSandboxToMain() {
  const token = process.env.DATOCMS_CMA_TOKEN;
  
  if (!token) {
    console.error('❌ DATOCMS_CMA_TOKEN est requis');
    console.log('📝 Obtenir le token: DatoCMS > Settings > API Tokens > Create New (Full Access)');
    process.exit(1);
  }

  const client = buildClient({ apiToken: token });

  try {
    console.log('🔍 Vérification des environnements...\n');

    // 1. Lister les environnements
    const environments = await client.environments.list();
    console.log('📋 Environnements disponibles:');
    environments.forEach(env => {
      console.log(`   - ${env.id} (primary: ${env.meta.primary_environment})`);
    });
    console.log('');

    // 2. Trouver l'environnement SANDBOX
    const sandboxEnv = environments.find(e => e.id === SANDBOX_ENV);
    if (!sandboxEnv) {
      console.error(`❌ Environnement SANDBOX "${SANDBOX_ENV}" non trouvé`);
      process.exit(1);
    }

    console.log(`✅ Environnement SANDBOX trouvé: ${SANDBOX_ENV}\n`);

    // 3. Vérifier si on peut promouvoir
    console.log('⚠️  ATTENTION: Cette opération va:');
    console.log(`   1. Dupliquer le contenu de "${SANDBOX_ENV}"`);
    console.log(`   2. Écraser le contenu de l'environnement MAIN`);
    console.log(`   3. Cette action peut être irréversible\n`);

    console.log('💡 Options disponibles:\n');
    console.log('Option A - Promotion automatique (si DatoCMS le supporte):');
    console.log('   DatoCMS > Environments > main-copy-2025-11-04 > "Promote to primary"\n');

    console.log('Option B - Fork inverse (créer un nouvel environnement depuis SANDBOX):');
    console.log('   1. Créer un fork de main-copy-2025-11-04');
    console.log('   2. Le nommer "main-production" ou similaire');
    console.log('   3. Mettre à jour le code pour pointer vers ce nouvel environnement\n');

    console.log('Option C - Export/Import manuel:');
    console.log('   1. Exporter le contenu depuis main-copy-2025-11-04');
    console.log('   2. Importer dans l\'environnement main');
    console.log('   (Nécessite plus de développement)\n');

    console.log('📚 Documentation DatoCMS:');
    console.log('   https://www.datocms.com/docs/content-management-api/resources/environment\n');

    console.log('⚠️  IMPORTANT: Avant de continuer:');
    console.log('   1. Faire un backup de l\'environnement MAIN si possible');
    console.log('   2. Vérifier que SANDBOX contient tout le contenu voulu');
    console.log('   3. Consulter la documentation DatoCMS pour la meilleure méthode\n');

    // NOTE: La promotion automatique dépend du plan DatoCMS
    // Pour l'instant, on affiche les instructions
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

promoteSandboxToMain();
