# Procédure de nettoyage Git pour gros fichiers (.next)

## Contexte
Si le push échoue à cause de fichiers trop volumineux (ex : `.next/cache/webpack/*.pack`), il faut nettoyer l’historique Git.

## Étapes à suivre

### 1. Installer BFG Repo-Cleaner
- Sur Mac :
  ```
  brew install bfg
  ```
- Sur Linux :
  ```
  sudo apt-get install bfg
  ```
- Sur Windows : Télécharger sur https://rtyley.github.io/bfg-repo-cleaner/

### 2. Nettoyer le dépôt
- Fermez VS Code et ouvrez un terminal dans le dossier du projet.
- Exécutez :
  ```
  bfg --delete-files '*.pack'
  git reflog expire --expire=now --all && git gc --prune=now --aggressive
  git push --force
  ```

### 3. Vérifier le .gitignore
- Assurez-vous que `.next/` est bien présent dans `.gitignore` pour éviter que le problème ne revienne.

### 4. Reprendre le travail
- Rouvrez VS Code et continuez normalement.
- Si besoin, relancez un build avec :
  ```
  npm run build
  ```

## Ressources
- [BFG Repo-Cleaner Documentation](https://rtyley.github.io/bfg-repo-cleaner/)
- [GitHub : Fichiers volumineux](https://docs.github.com/fr/repositories/working-with-files/managing-large-files/removing-files-from-git-history)

---

**En cas de problème, contactez le support technique ou un développeur Git expérimenté.**

**Dernière mise à jour : 19/10/2025**

# Journal de nettoyage et restauration Git

## Append – 20/10/2025

- Problème de build Vercel causé par l’import manquant du module `sanity/cli` dans `sanity.cli.ts`.
- Correction : installation du package `sanity` avec la commande `npm install sanity`.
- Après installation, le build Next.js passe sans erreur et la CLI Sanity fonctionne.
- Recommandation : toujours vérifier les imports et installer les dépendances nécessaires après restauration ou migration.
- Étapes :
  1. Restaurer le site et l’admin si besoin.
  2. Lancer `npm install` puis `npm install sanity`.
  3. Tester le site en local (`npm run dev`) et le build (`npm run build`).
  4. Commit & push si tout est OK.

## Append – 20/10/2025 (suite)

- Problème de build Next.js causé par l’import manquant du module `@sanity/vision` dans `sanity.config.ts`.
- Correction : installation du package `@sanity/vision` avec la commande `npm install @sanity/vision`.
- Nouvelle erreur sur l’import du module `next-sanity` dans `sanity/lib/client.ts`.
- Correction : installation du package `next-sanity` avec la commande `npm install next-sanity`.
- Après ces installations, le build Next.js passe sans erreur et toutes les routes sont générées correctement.
- Recommandation : installer tous les modules Sanity nécessaires après restauration ou migration.

## Append – 20/10/2025 (suite Sanity)

- Pour lancer Sanity Studio en local :
  1. Utiliser la commande `npx sanity start`.
  2. Si le build de production est absent, lancer d’abord `npx sanity build` puis `npx sanity start`.
  3. Sanity propose de démarrer le serveur de développement si besoin (répondre "Y").
- Vérifier le bon fonctionnement de l’admin dans le navigateur.
- Recommandation : toujours builder le studio avant de lancer le serveur en production.

## Append – 20/10/2025 (variables d’environnement Sanity)

- Erreur Sanity Studio : `Missing environment variable: NEXT_PUBLIC_SANITY_DATASET`.
- Correction : créer un fichier `.env.local` à la racine du projet (top racine, même niveau que `package.json`).
- Exemple de contenu à ajouter :
  ```env
  NEXT_PUBLIC_SANITY_PROJECT_ID=ton_project_id
  NEXT_PUBLIC_SANITY_DATASET=ton_dataset
  ```
  Remplacer par les valeurs de ton projet Sanity.
- Relancer Sanity Studio avec `npx sanity start`.
- Recommandation : ne jamais versionner `.env.local` (ajouter à `.gitignore`).

## Append – 20/10/2025 (tests Vercel)

- Après commit et push, test du déploiement sur Vercel pour vérifier la prise en compte des variables d’environnement Sanity.
- Sur Vercel, il faut ajouter dans les paramètres du projet :
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=m0zbhrxo`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
- Ces variables doivent être définies dans le dashboard Vercel (Settings > Environment Variables) pour que le build et Sanity Studio fonctionnent en production.
- Si l’erreur persiste sur Vercel, vérifier la présence et la valeur des variables dans le dashboard.
- Documentation mise à jour à chaque étape pour assurer le suivi et la traçabilité.

## Append – 20/10/2025 (erreur inattendue Vercel)

- Le build Vercel s’est déroulé sans erreur de compilation, toutes les pages ont été générées correctement.
- Une erreur inattendue est survenue lors du déploiement final : “An unexpected error happened when running this build. We have been notified of the problem. This may be a transient error. If the problem persists, please contact Vercel Support https://vercel.com/help”.
- Actions recommandées :
  - Attendre et relancer le déploiement (erreur potentiellement temporaire côté Vercel).
  - Si le problème persiste, contacter le support Vercel avec le log complet.
  - Vérifier la configuration du projet et la présence de tous les fichiers nécessaires.
- Documentation mise à jour pour assurer le suivi et la traçabilité du projet.

Modifications documentées par GitHub Copilot.
