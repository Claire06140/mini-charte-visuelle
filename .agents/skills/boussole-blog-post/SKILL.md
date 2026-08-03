---
name: boussole-blog-post
description: Préparer, rédiger, réviser et contrôler les guides éditoriaux de Boussole visuelle à partir d'une opportunité SEO validée. Utiliser ce skill pour créer un brief ou un plan d'article, rédiger un brouillon, produire ses métadonnées et son maillage, vérifier le ton, les sources, la terminologie, la promesse produit et la cannibalisation, ou mettre à jour le suivi éditorial.
---

# Rédiger un guide Boussole visuelle

Produire des contenus utiles, cohérents avec la méthode Boussole et fondés sur
la cartographie SEO du projet. Ne jamais inventer une donnée de demande, une
preuve, un témoignage ou une capacité du produit.

## Charger le contexte

Lire les fichiers suivants avant de décider du plan ou de rédiger :

1. `../../../SEO_CONTENT_FOUNDATION.md` pour la stratégie, les concepts et le
   rôle de chaque article ;
2. `../../../SEO_EDITORIAL_WORKFLOW.md` pour les étapes et critères de passage ;
3. `../../../docs/editorial/CONTENT_RULES.md` pour les règles de fond et de SEO ;
4. `../../../docs/editorial/TONE_GUIDE.md` pour la voix ;
5. `../../../docs/editorial/ARTICLE_TEMPLATE.md` pour le livrable de travail ;
6. `../../../docs/editorial/KEYWORD_OPPORTUNITIES.md` pour les données et la
   page propriétaire de chaque intention ;
7. `../../../docs/editorial/BLOG_PROGRESS.md` pour l'état réel du chantier.

Traiter les fichiers du dépôt comme source de vérité. Ne pas reconstruire le
contexte à partir d'une conversation antérieure.

## Choisir l'article et l'étape

- Suivre l'article et l'étape donnés par l'utilisateur.
- Sans article imposé, choisir le prochain article indiqué comme prêt dans
  `BLOG_PROGRESS.md`.
- Sans étape imposée, produire d'abord un brief et un plan détaillé.
- Ne rédiger l'article complet qu'après validation du plan par Claire, sauf si
  elle demande explicitement un brouillon complet dans la même tâche.
- Ne pas rédiger lorsqu'aucune demande mesurée compatible n'est documentée.
  Une requête exacte sans métrique ne vaut pas zéro, mais elle doit être reliée
  à une famille mesurée, une intention claire et un apport produit avant de
  servir de base à un article.

Lorsqu'une recherche de mots-clés manque, utiliser séparément le skill
`boussole-keyword-research` ou signaler le manque. Ne jamais compléter une
métrique de mémoire.

## Préparer le brief

Dupliquer mentalement la structure de `ARTICLE_TEMPLATE.md`, puis renseigner au
minimum :

- la situation réelle du lecteur et la question à résoudre ;
- l'intention, la requête principale et les identifiants de preuve ;
- la page propriétaire et les frontières avec les articles proches ;
- la réponse courte et l'apport propre à Boussole ;
- un exemple conducteur original ;
- les sources nécessaires ;
- le titre SEO, le H1, le slug et la meta description ;
- le maillage entrant et sortant ;
- un seul CTA principal, cohérent avec l'étape du parcours.

Consulter le web lorsque la SERP actuelle, une donnée changeante ou une source
externe est nécessaire. Privilégier les sources primaires et associer chaque
chiffre à son marché et à sa date.

## Faire valider le plan

Présenter un plan suffisamment précis pour permettre à Claire de juger :

1. l'angle et la réponse centrale ;
2. la progression des H2 ;
3. l'exemple conducteur ;
4. la différence avec les autres pages ;
5. la place du produit et le CTA ;
6. les points encore ouverts.

Ne pas masquer une incertitude éditoriale sous une formulation générique.
Attendre la validation avant le brouillon complet, sauf instruction contraire.

## Rédiger

Appliquer `CONTENT_RULES.md` et `TONE_GUIDE.md` dès le premier jet.

- Répondre à la question principale dès le début.
- Employer le tutoiement en français, avec une proximité adulte et sans
  familiarité forcée.
- Rendre le guide utile sans clic vers l'outil.
- Dérouler une décision ou une méthode, pas une collection de définitions.
- Utiliser un exemple suivi avec un contenu et un support concrets.
- Présenter les directions visuelles comme des hypothèses contextuelles à
  comparer et tester.
- Distinguer persona, proposition de valeur, positionnement, intention de
  perception, identité visuelle, moodboard, mini-charte et charte graphique.
- Ne pas attribuer une signification universelle aux couleurs, polices ou
  styles.
- Délimiter honnêtement ce que le livrable et le produit permettent.

Utiliser la fourchette de travail correspondant au type de guide dans
`CONTENT_RULES.md`. La traiter comme un budget de profondeur, jamais comme un
quota SEO : arrêter lorsque la question est traitée avec la méthode, l'exemple,
les limites et la prochaine étape nécessaires.

## Réviser et livrer

Effectuer la checklist complète de `CONTENT_RULES.md` et
`ARTICLE_TEMPLATE.md`, puis signaler clairement :

- le statut du contenu ;
- les données utilisées et celles qui manquent encore ;
- les sources à conserver ;
- les dépendances de maillage ou de publication ;
- les décisions qui nécessitent encore Claire.

Mettre à jour `BLOG_PROGRESS.md` uniquement lorsqu'une étape a réellement été
franchie. Ne pas publier, intégrer au site, committer ou pousser les fichiers
sans demande explicite.

## Format de sortie par défaut

- **Recherche incomplète :** manque précis, conséquence et prochaine requête à
  mesurer.
- **Préparation :** fiche éditoriale condensée, plan détaillé, maillage, CTA et
  questions de validation.
- **Rédaction :** brouillon Markdown, métadonnées séparées, sources et points à
  relire.
- **Révision :** problèmes classés par importance, corrections proposées,
  checklist et nouveau statut.
