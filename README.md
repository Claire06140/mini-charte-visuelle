# Boussole visuelle

Bêta publique et gratuite pour transformer un positionnement en direction visuelle claire, comparable et partageable.

## Fichiers

- `index.html` : landing page et redirection des anciens liens.
- `outil/index.html` : diagnostic, éditeur, comparaison A/B, impression et partage.
- `assets/analytics.js` : liste blanche des événements PostHog.
- `confidentialite.html` : information sur la mesure d’audience.
- `fr/guides/creer-identite-visuelle-entrepreneur/` : premier guide intégré en
  relecture publique, avec `noindex` et hors sitemap.
- `assets/guides.css` : styles partagés des futurs guides.
- `SEO_CONTENT_FOUNDATION.md` : stratégie éditoriale, briefs des huit articles et maillage interne.
- `SEO_EDITORIAL_WORKFLOW.md` : recherche de mots-clés, production des articles, skills prévus et préparation multilingue.
- `docs/editorial/KEYWORD_OPPORTUNITIES.md` : première cartographie française, niveaux de preuve et décisions par article.
- `docs/editorial/CONTENT_RULES.md` : règles de fond, de preuve, de SEO et limites de la promesse.
- `docs/editorial/TONE_GUIDE.md` : voix éditoriale V0 de Boussole visuelle.
- `docs/editorial/ARTICLE_TEMPLATE.md` : modèle réutilisable du brief à la validation.
- `docs/editorial/BLOG_PROGRESS.md` : état de la phase éditoriale, décisions actées et ordre de reprise pour les autres agents.
- `docs/editorial/briefs/` : briefs et plans détaillés à valider avant rédaction ; l'article 4 y est préparé.
- `.agents/skills/boussole-keyword-research/` : skill projet pour rechercher, scorer et maintenir la cartographie SEO.
- `.agents/skills/boussole-blog-post/` : skill projet pour préparer, rédiger et contrôler les guides.
- `vercel.json` : build public en liste blanche et Ignored Build Step versionné.
- `scripts/build-static.mjs` : prépare uniquement les fichiers publics dans `dist`.
- `scripts/vercel-ignore-build.mjs` : annule les builds liés aux seuls changements internes.

La stratégie et les documents éditoriaux sont versionnés avec le code afin de
pouvoir être repris par d'autres agents. Le build Vercel exécute
`scripts/build-static.mjs` et ne publie que les fichiers publics dans `dist`.
La configuration `ignoreCommand` de `vercel.json` exécute
`scripts/vercel-ignore-build.mjs` et annule en plus les builds dont le commit ne
modifie que la documentation interne, les skills ou les tests.
`.vercelignore` conserve la même séparation pour les déploiements lancés depuis
la CLI.

## Hébergement

### Vercel

Le site est lié au projet Vercel `mini-charte-visuelle`. Pour reproduire la configuration :

1. Importer un repo GitHub qui contient le dossier `mini-charte-generator`.
2. Configurer :
   - Framework Preset : `Other`
   - Root Directory : `mini-charte-generator`
   - conserver les valeurs versionnées dans `vercel.json` ;
   - Build Command : `node scripts/build-static.mjs` ;
   - Output Directory : `dist` ;
   - Ignored Build Step : fourni par `ignoreCommand` dans `vercel.json`.
3. Déployer.

### GitHub Pages

1. Mettre le dossier `mini-charte-generator` dans un repo GitHub.
2. Aller dans `Settings > Pages`.
3. Choisir `Deploy from a branch`.
4. Sélectionner la branche, puis le dossier `/mini-charte-generator` si proposé.

Si GitHub Pages ne propose pas ce dossier directement, placer `index.html` à la racine du repo ou utiliser Vercel.

### Configuration PostHog

Le projet EU `Boussole visuelle` (ID `238379`) est dédié à cette bêta. Le mode cookieless serveur y est activé. Le tableau `Boussole visuelle — Bêta` (ID `866551`) contient le premier entonnoir d’activation. Le token public est déjà déclaré dans la landing et l’outil :

```html
<meta name="posthog-token" content="phc_qJ7mUgbRXFHkSX7HMUzNRSob5SPctNGoqVYNBSsrA6Rv">
```

Ce token de projet est conçu pour être public. Aucun secret personnel PostHog n’est présent dans le code. Sans token, toute la bêta reste fonctionnelle et la couche de mesure se comporte comme un no-op.

### Tests et aperçu local

Installer les dépendances de test puis lancer :

```bash
pnpm install
pnpm test
pnpm test:e2e
```

Pour un aperçu manuel :

Ouvrir directement `index.html` dans un navigateur, ou lancer :

```bash
python3 -m http.server 4173
```

Puis ouvrir `http://localhost:4173/`.
