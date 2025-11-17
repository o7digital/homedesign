# 🎯 Guide Gestion des Offres avec DatoCMS

## 📋 Étapes pour configurer les offres dans DatoCMS

### 1. Créer le modèle "Offre" dans DatoCMS

Exécutez ce script pour créer automatiquement le modèle avec tous les champs :

```bash
DATOCMS_CMA_TOKEN=votre_token_ici npm run dato:setup-offres
```

**Note :** Vous devez avoir un token CMA avec droits complets (Full Access)

### 2. Ajouter des offres dans DatoCMS Admin

1. Allez sur https://homedesignmarques.admin.datocms.com
2. Sélectionnez l'environnement approprié (main ou main-copy-2025-11-04)
3. Cliquez sur "Offres" dans le menu
4. Cliquez sur "Create new Offre"
5. Remplissez les champs :
   - **Titre** : Nom de l'offre
   - **Slug** : Se génère automatiquement à partir du titre
   - **Description courte** : Texte bref pour la liste
   - **Description** : Description complète de l'offre
   - **Image** : Upload de l'image de la cabaña
   - **Date de début** : Début de la promotion
   - **Date de fin** : Fin de la promotion
   - **Prix** : Prix final (obligatoire)
   - **Prix original** : Prix avant réduction (optionnel)
   - **Pourcentage de réduction** : Ex: 30 pour -30% (optionnel)
   - **Actif** : Cocher pour activer l'offre
   - **Mis en avant** : Cocher pour mettre en vedette

### 3. Voir les offres sur le site

Les offres sont disponibles à :
- **Liste** : https://votre-site.com/offres
- **Détail** : https://votre-site.com/offres/[slug]

## 🔄 Migration des offres existantes

Si vous voulez migrer les 4 offres actuelles du fichier JSON vers DatoCMS, créez-les manuellement dans l'admin DatoCMS en copiant les données de `/data/offres.json`.

## 📝 Structure des champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| titre | Texte | ✅ | Titre de l'offre |
| slug | Slug | ✅ | URL friendly (auto-généré) |
| description_courte | Texte | ✅ | Description brève |
| description | Texte long | ✅ | Description complète |
| image | Image | ✅ | Photo de la cabaña |
| date_debut | Date | ✅ | Date de début |
| date_fin | Date | ✅ | Date de fin |
| prix | Nombre | ✅ | Prix de l'offre |
| prix_original | Nombre | ❌ | Prix avant réduction |
| pourcentage_reduction | Entier | ❌ | % de réduction (0-100) |
| actif | Booléen | ✅ | Offre active/inactive |
| mis_en_avant | Booléen | ❌ | Mettre en vedette |

## ✅ Fonctionnalités

- ✅ Les offres se récupèrent automatiquement depuis DatoCMS
- ✅ Fallback sur les données JSON si DatoCMS n'est pas disponible
- ✅ Tri automatique : offres mises en avant d'abord
- ✅ Filtrage : seules les offres actives sont affichées
- ✅ Badge de réduction automatique si pourcentage défini
- ✅ Détection des offres expirées

## 🔍 Vérification

Pour vérifier que DatoCMS fonctionne :
1. Visitez `/api/offres` - vous devriez voir `"source": "datocms"`
2. Si vous voyez `"source": "fallback"`, DatoCMS n'est pas configuré ou vide

## 🚀 Déploiement

Après avoir créé le modèle et ajouté des offres :

```bash
git add .
git commit -m "Configurer les offres avec DatoCMS"
git push origin main
```

Le site se redéploiera automatiquement sur Vercel.

---

**Dernière mise à jour :** 17 novembre 2025
