# Déploiements automatiques via webhooks (DatoCMS → Vercel)

Ce projet lit DatoCMS à l’exécution (CSR), donc un redeploy n’est pas requis pour voir les contenus. Mais si tu veux reproduire la mécanique de lcqc-v2 (déployer à chaque modif), voici le setup.

## 1) Créer des Deploy Hooks Vercel
- Vercel > Project > Settings > Git > Deploy Hooks
- Crée 2 hooks (exemples):
  - Name: `dev`, Branch: `dev`
  - Name: `main`, Branch: `main`
- Copie les URLs et mets-les dans `.env.local`:
```
VERCEL_DEPLOY_HOOK_URL_DEV=https://api.vercel.com/v1/integrations/deploy/xxx
VERCEL_DEPLOY_HOOK_URL_MAIN=https://api.vercel.com/v1/integrations/deploy/yyy
```

## 2) Ajouter un webhook DatoCMS
- DatoCMS > Settings > Webhooks > Add new webhook
- Name: `Deploy Vercel (dev)`
- URL: colle `VERCEL_DEPLOY_HOOK_URL_DEV`
- Events: Record events (Publish/Unpublish/Update/Delete)
- Models: coche `pagina_home`, `tipo_de_madera`, `categoria_productos`, `producto`
- (Optionnel) Ajoute un header pour tracer l’origine: `X-From: datocms`
- Sauvegarde. Répète pour `main` si tu veux déclencher un deploy production.

## 3) Déclencher manuellement (CLI)
- Depuis le repo:
```
npm run deploy:hook:dev
npm run deploy:hook:main
```
Ces scripts appellent le hook avec `fetch` (Node >= 18).

Notes
- Pas de secret nécessaire: Vercel accepte POST anonyme sur le Deploy Hook.
- Ce site fetch Dato côté client: les contenus se voient sans redeploy; les hooks sont utiles si tu veux forcer un rebuild statique ou synchroniser d’autres intégrations.
