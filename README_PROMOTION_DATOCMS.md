# 🚀 Promotion SANDBOX → MAIN (DatoCMS)

Guide pour promouvoir le contenu de l'environnement SANDBOX (`main-copy-2025-11-04`) vers l'environnement MAIN de production.

## 🎯 Objectif

- **Source:** `main-copy-2025-11-04` (SANDBOX - utilisé avec branche dev)
- **Destination:** `main` (PRODUCTION - pour branche main du site)

---

## ✅ Méthode Recommandée: Via l'Interface DatoCMS

### Étapes:

1. **Connexion à DatoCMS Admin**
   ```
   https://homedesignmarques.admin.datocms.com
   ```

2. **Accéder aux Environnements**
   - Cliquer sur le menu des environnements (en haut à droite)
   - Actuellement sur: `main-copy-2025-11-04 (SANDBOX)`

3. **Chercher l'option de Promotion**
   
   Selon votre plan DatoCMS, vous aurez l'une de ces options:

   **Option A - Promote to Primary (Si disponible):**
   - Sélectionner `main-copy-2025-11-04`
   - Chercher bouton **"Promote to primary environment"**
   - Confirmer l'action
   - ✅ Le contenu sera copié vers MAIN

   **Option B - Fork Management:**
   - Settings > Environments
   - Fork `main-copy-2025-11-04` vers un nouvel environnement
   - Le nommer `main-production-2025-11-15`
   - Mettre à jour le code pour pointer vers ce nouvel environnement

4. **Vérification**
   - Aller dans l'environnement MAIN
   - Vérifier que tous les contenus sont présents
   - Vérifier Pagina Home, Productos, Tipos de Madera

---

## 🔧 Méthode Alternative: Via Script (Si l'interface ne suffit pas)

### Prérequis:

1. **Token CMA avec accès complet:**
   - DatoCMS > Settings > API Tokens
   - Create New Token
   - Nom: "Migration SANDBOX to MAIN"
   - Permissions: **Full Access** (Read + Write)
   - Copier le token

2. **Ajouter dans `.env.local`:**
   ```bash
   DATOCMS_CMA_TOKEN=votre_token_ici
   ```

### Exécution:

```bash
npm run dato:promote
```

Ce script va:
- ✅ Lister les environnements disponibles
- ✅ Afficher les options de promotion
- ⚠️ Demander confirmation avant toute action destructive

---

## 📋 Checklist Avant Promotion

Avant de promouvoir SANDBOX → MAIN, vérifier:

- [ ] Tous les contenus sont corrects dans SANDBOX
- [ ] Les images sont toutes uploadées
- [ ] Les produits ont des prix et descriptions
- [ ] Jorge Armando a validé tout le contenu
- [ ] Backup de l'environnement MAIN (si contenu important)
- [ ] Token CMA disponible avec droits Full Access

---

## 🔄 Après la Promotion

### 1. Mettre à jour le code pour la branche `main`

Créer un fichier de config pour la production:

**Fichier: `lib/datocms.ts`**

Modifier pour pointer vers MAIN en production:

```typescript
// Pour la branche main (production)
const FORCED_DATO_ENV = process.env.NODE_ENV === 'production' 
  ? undefined  // Utilise l'environnement primaire (main)
  : 'main-copy-2025-11-04';  // SANDBOX pour dev
```

### 2. Variables d'environnement Vercel

**Pour la branche MAIN (production):**
```
DATOCMS_API_TOKEN=653be312df6b4ae20b3b566ac32768
NEXT_PUBLIC_USE_DATO=1
DATOCMS_ENVIRONMENT=main
```

**Pour la branche DEV:**
```
DATOCMS_API_TOKEN=653be312df6b4ae20b3b566ac32768
NEXT_PUBLIC_USE_DATO=1
DATOCMS_ENVIRONMENT=main-copy-2025-11-04
```

### 3. Tester

1. Déployer la branche main
2. Vérifier que le contenu apparaît correctement
3. Tester toutes les pages:
   - Page d'accueil
   - Tipos de Madera
   - Productos
   - Contacto

---

## 🆘 Problèmes Courants

### ❌ "Cannot promote environment"

**Cause:** Plan DatoCMS ne supporte pas la promotion automatique

**Solution:**
1. Créer un nouveau fork depuis SANDBOX
2. Mettre à jour le code pour pointer vers ce fork
3. Ou: Exporter/Importer manuellement les contenus

### ❌ "Missing permissions"

**Cause:** Token CMA n'a pas les droits suffisants

**Solution:**
1. Créer un nouveau token avec **Full Access**
2. Mettre à jour `DATOCMS_CMA_TOKEN` dans `.env.local`

### ❌ "Environment not found"

**Cause:** Nom d'environnement incorrect

**Solution:**
1. Vérifier le nom exact dans DatoCMS Admin
2. Mettre à jour `FORCED_DATO_ENV` dans le code

---

## 📚 Ressources

- **Documentation Environments:** https://www.datocms.com/docs/content-management-api/resources/environment
- **CMA Client:** https://www.datocms.com/docs/content-management-api
- **Support DatoCMS:** support@datocms.com

---

## 📝 Workflow Final Recommandé

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. Développement & Tests                       │
│     ├─ Branche: dev                            │
│     ├─ DatoCMS: main-copy-2025-11-04 (SANDBOX) │
│     └─ Jorge modifie et teste                  │
│                                                 │
│  2. Validation                                  │
│     └─ Vérifier tout le contenu                │
│                                                 │
│  3. Promotion                                   │
│     └─ SANDBOX → MAIN (via DatoCMS Admin)      │
│                                                 │
│  4. Déploiement Production                      │
│     ├─ Branche: main                           │
│     ├─ DatoCMS: main (environnement primaire)  │
│     └─ Site en ligne pour les clients          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**Dernière mise à jour:** 15 novembre 2025  
**Auteur:** Équipe technique Home Design Marques
