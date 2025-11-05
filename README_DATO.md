# Admin DatoCMS – Home Design Marques

Cette app Next.js lit aujourd’hui des JSON locaux. On ajoute DatoCMS comme source de vérité, avec un toggle d’activation.

## Vue d’ensemble
- API routes: `app/api/productos/*` et `app/api/maderas/*` requêtent Dato GraphQL et renvoient le même shape que les JSON existants.
- Toggle: `NEXT_PUBLIC_USE_DATO=1` pour activer l’API Dato côté client (sinon fallback JSON).
- Images: Next/Image autorise les domaines `*.datocms-assets.com` dans `next.config.ts`.

## Variables d’environnement
Copier `.env.local.example` vers `.env.local` puis renseigner:
- `DATOCMS_API_TOKEN`: token Read-only (Content Delivery) pour GraphQL
- `DATOCMS_CMA_TOKEN`: token Management (CMA) pour créer schémas et importer (optionnel)
- `NEXT_PUBLIC_USE_DATO=1` pour activer la lecture Dato côté site

## Mise en place Dato (une seule fois)
1) Créer un projet DatoCMS et récupérer un token CMA (Admin) et un token Read‑only.
2) Créer les modèles automatiquement:
```
DATOCMS_CMA_TOKEN=... npm run dato:setup
```
3) Importer les contenus depuis `data/*.json`:
```
DATOCMS_CMA_TOKEN=... npm run dato:import
```
4) Tester les API locales:
- `GET /api/productos`
- `GET /api/productos/HDM6739`
- `GET /api/maderas`
- `GET /api/maderas/parota`

## Activer Dato sur le site
- Mettre `NEXT_PUBLIC_USE_DATO=1` et `DATOCMS_API_TOKEN=...` dans `.env.local`
- Lancer `npm run dev`

## Schéma côté Dato (fourni)
- `pagina_home`: `quienes_somos (text)`, `slider (gallery)`
- `tipo_de_madera`: `nombre_tipo_madera`, `origen`, `descripcion_detallada`, `campo_imagen`, `slug`
- `categoria_productos`: `nombre_categoria`, `slug`, `imagen`, `orden`
- `producto`: `titulo`, `sku`, `categoria_producto` (référence/modular), `imagen (gallery)`, `descripcion`, `precio (string)`, `disponibilidad (bool)`, `slug`, `fecha_creacion`
- `contacto_formulario`: `nombre`, `appellido`, `telefono`, `email`, `comentarios`

Notes:
- L’import d’exemple (scripts) correspond à l’ancien schéma; inutile si ton projet Dato est déjà configuré.
- Le site reste fonctionnel sans Dato (fallback JSON). Avec Dato actif, routes par slug: `/maderas/[slug]`, `/productos/[slug]`.

Déploiement:
- Assure-toi de déployer le dernier commit de `dev` (évite de relancer un ancien build).
