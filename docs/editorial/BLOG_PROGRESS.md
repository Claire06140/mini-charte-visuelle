# Suivi éditorial et relais entre agents — Boussole visuelle

Dernière mise à jour : 5 août 2026.

## Objet

Ce fichier indique où reprendre le travail sans dépendre de l'historique d'une
conversation. Il ne remplace pas la stratégie ni la cartographie.

Tout agent intervenant sur les guides doit lire, dans cet ordre :

1. [`../../SEO_CONTENT_FOUNDATION.md`](../../SEO_CONTENT_FOUNDATION.md) ;
2. [`../../SEO_EDITORIAL_WORKFLOW.md`](../../SEO_EDITORIAL_WORKFLOW.md) ;
3. [`CONTENT_RULES.md`](CONTENT_RULES.md) ;
4. [`TONE_GUIDE.md`](TONE_GUIDE.md) ;
5. [`ARTICLE_TEMPLATE.md`](ARTICLE_TEMPLATE.md) ;
6. [`KEYWORD_OPPORTUNITIES.md`](KEYWORD_OPPORTUNITIES.md) ;
7. le présent fichier.

## État de la phase éditoriale

**Phase actuelle :** les brouillons des articles 4, 8 et 1 sont intégrés sur
leurs URL de relecture avec `noindex`. Le troisième guide adopte volontairement
un format ciblé afin que Claire puisse comparer trois cas avant d'ajuster le
processus éditorial. Aucun guide n'est encore prêt à être indexé.

| Élément | État | Prochaine action |
|---|---|---|
| Territoire éditorial et parcours | Prêt | Le respecter dans tous les briefs. |
| Cartographie fr-FR | Première version validée | Compléter seulement les requêtes qui peuvent encore modifier un titre ou une page. |
| Skill de recherche de mots-clés | Créé et validé | Le réutiliser pour Semrush, SERP et Search Console. |
| Règles de contenu | Créées | Les appliquer dès le brief, pas seulement à la relecture. |
| Voix et ton de Claire | Validés sur le plan | Tutoiement direct mais adulte retenu ; le contrôler à nouveau sur le premier brouillon. |
| Modèle d'article | Créé | L'utiliser pour chaque brief et conserver les écarts utiles observés à la relecture. |
| Skill de rédaction | Créé et validé | L'invoquer avec `$boussole-blog-post` pour chaque nouveau guide. |
| Architecture `/fr/guides/` | Partiellement implémentée | Trois routes existent ; créer l'index, finaliser les canonical et préparer le sitemap avant indexation. |
| Premier article | Brouillon intégré, statut `review` | Claire relit la page publique non indexée ; intégrer ses retours avant le statut `ready`. |
| Deuxième article | Brouillon intégré, statut `review` | Claire relit la page et compare ses forces et faiblesses avec l'article 4. |
| Troisième article | Brouillon ciblé intégré, statut `review` | Comparer son rythme, sa densité et sa structure aux deux guides piliers avant de modifier le workflow. |

## Automation quotidienne Semrush

- **Nom Codex :** `Compléter la recherche Semrush de Boussole`.
- **Identifiant :** `compl-ter-la-recherche-semrush-de-boussole`.
- **Fréquence :** tous les jours à 12 h 30, heure locale Europe/Paris.
- **Périmètre :** recherche Semrush `fr-FR`, mise à jour de la cartographie et
  du présent suivi, puis exécution du validateur.
- **Premier lot :** `créer son identité visuelle soi-même`, `identité visuelle
  entrepreneur` et `par où commencer son identité visuelle`.
- **Limite volontaire :** huit nouvelles requêtes maximum par exécution afin de
  conserver une marge sur le quota gratuit.
- **Interdictions :** aucun essai, abonnement, projet Semrush, contournement de
  quota, rédaction automatique, commit ou push.
- **Règle de passage :** l'automation peut seulement déclarer un article « prêt
  pour plan détaillé » lorsque la demande mesurée, l'intention et le lien
  produit sont documentés. Le plan, la rédaction et la publication restent des
  tâches séparées.
- **Dernière exécution :** le 5 août 2026, huit requêtes prioritaires ont été
  vérifiées sur la base France, ordinateur. `brief identité visuelle` affiche
  20 recherches mensuelles et une difficulté `n/a`, ce qui renforce le parcours
  pré-brief de l'article 8 sans créer de page. La variante `générateur de charte
  graphique gratuit` affiche aussi 20, mais reste hors promesse et en `hold`.
  Les autres formulations renvoient `n/a` ou aucune donnée. Aucun essai ni
  aucune actualisation payante n'a été lancé ; l'ordre éditorial ne change pas.

Si Semrush demande une authentification, l'automation doit s'arrêter et le
signaler au lieu d'utiliser une autre source pour inventer des métriques.

La documentation interne est destinée à GitHub mais pas au site public. Le
build Vercel copie une liste blanche de fichiers publics dans `dist` et son
`ignoreCommand` annule les builds ne contenant que des changements éditoriaux,
de skills ou de tests.

## Décisions actées

- Marché de départ : `fr-FR`. Les métriques françaises ne sont pas transposées
  à un autre pays.
- Le contenu accompagne le passage cible → proposition de valeur →
  positionnement → perception → direction visuelle → règles applicables.
- Boussole visuelle produit une direction argumentée et testable, pas un logo
  final ni une charte graphique professionnelle exhaustive.
- Les articles 3 et 7 ne sont pas prioritaires comme pages autonomes : l'article
  3 est d'abord fusionné aux articles 2 et 4 ; l'article 7 à l'article 6.
- L'automatisation aide à rechercher, structurer et contrôler. Elle ne sert pas
  à publier en volume des textes génériques.
- Structure d'URL privilégiée pour préparer le multilingue : `/fr/guides/...`.

## Ordre de production actuel

1. Article 4 — créer son identité visuelle avant Canva.
2. Article 8 — créer un moodboard de marque et le transformer en charte
   graphique.
3. Article 1 — distinguer identité de marque, identité visuelle et charte,
   avancé pour tester le workflow sur une question ciblée.
4. Article 5 — traduire son positionnement en direction visuelle.
5. Article 2 — persona, proposition de valeur, positionnement et perception.
6. Article combiné 6 + 7 — choisir et tester une direction.
7. Réévaluer l'article 3 avec les premières données Search Console.

Cet ordre n'est pas un calendrier de publication automatique. Les trois
premiers articles sont maintenant en relecture ; l'article 5 reste le prochain
sujet prévu après la comparaison du processus.

## Article 4 — premier article en relecture

- **Brief et plan :**
  [`briefs/article-4-creer-identite-visuelle-entrepreneur.md`](briefs/article-4-creer-identite-visuelle-entrepreneur.md),
  statut `outline`, prêt à valider.

- **Rôle :** page pilier pratique et principale porte d'entrée vers l'outil.
- **Angle :** ce qu'il faut décider avant d'ouvrir Canva et de choisir des
  couleurs ou des modèles.
- **Signal principal mesuré :** `création identité visuelle`, 1 000 recherches
  mensuelles, KD 19, Semrush France, 1er août 2026.
- **Signal secondaire mesuré :** `comment créer une identité visuelle`, 70,
  KD 17.
- **Titre de travail :** « Créer son identité visuelle quand on est
  entrepreneur : par où commencer avant Canva ? »
- **Validation quantitative complémentaire :** les trois formulations
  `créer son identité visuelle soi-même`, `identité visuelle entrepreneur` et
  `par où commencer son identité visuelle` ont été revérifiées le 3 août.
  Semrush ne fournit aucune métrique exploitable avec l'accès actuel et réserve
  l'actualisation à Pro. Ne pas interpréter `n/a` comme zéro ni répéter cette
  vérification quotidiennement. Le brief reste étayé par les deux signaux
  mesurés de la famille et n'est pas bloqué.
- **CTA principal :** « Trouver mon identité visuelle » avec Boussole visuelle.
  Ce libellé exprime le bénéfice attendu ; le texte environnant conserve la
  limite de promesse sur le livrable.

## Article 8 — décision consolidée

- **Brief et plan :**
  [`briefs/article-8-moodboard-charte-graphique.md`](briefs/article-8-moodboard-charte-graphique.md),
  statut `review`, validé puis intégré.
- **Brouillon source :**
  [`drafts/article-8-moodboard-charte-graphique.md`](drafts/article-8-moodboard-charte-graphique.md).
- **URL de relecture :** `/fr/guides/moodboard-charte-graphique/`, avec
  `noindex, follow` et hors sitemap.

- **Titre retenu :** « Comment créer un moodboard de marque et le transformer
  en charte graphique ? »
- **Slug prévu :** `/fr/guides/moodboard-charte-graphique`.
- **Double intention :** constituer un moodboard guidé par le positionnement,
  puis en extraire une direction et des règles applicables.
- **Données Semrush France :**
  - `comment créer un moodboard` : 260, KD 26 ;
  - `comment faire un moodboard` : 320, KD 32 ;
  - `moodboard charte graphique` : 50, KD non disponible ;
  - `moodboard identité visuelle` : 20, KD non disponible.
- **Requêtes conversationnelles sans métrique disponible :** `que faire après
  un moodboard`, `passer du moodboard à la charte graphique` et `différence
  moodboard charte graphique`.
- **Décision anti-cannibalisation :** toutes ces formulations appartiennent à
  l'article 8. Ne pas créer un guide générique distinct sur le moodboard.
- **Limite de promesse :** expliquer le passage par une décision de direction,
  des tests et des règles. Ne pas laisser entendre qu'une collection d'images
  devient automatiquement une charte complète.
- **Angle proposé :** passer de l'inspiration à des décisions testables, avec
  une table explicite entre références, intention et règles d'application.
- **Exemple proposé :** Place Nette, activité fictive d'organisation de la
  maison, comparant une direction Rassurante et une direction Premium sur le
  même contenu.
- **CTA proposé :** « Créer ma direction visuelle », vers le diagnostic avec
  l'origine analytics fermée `guide`.

## Article 1 — troisième article en relecture

- **Brief et plan :**
  [`briefs/article-1-identite-marque-visuelle-charte-graphique.md`](briefs/article-1-identite-marque-visuelle-charte-graphique.md),
  statut `review`.
- **Brouillon source :**
  [`drafts/article-1-identite-marque-visuelle-charte-graphique.md`](drafts/article-1-identite-marque-visuelle-charte-graphique.md).
- **URL de relecture :**
  `/fr/guides/identite-marque-visuelle-charte-graphique/`, avec
  `noindex, follow`, hors sitemap et sans lien entrant visible depuis les pages
  existantes.
- **Rôle :** carte conceptuelle et ordre de construction entre identité de
  marque, identité visuelle, charte graphique et image de marque.
- **Signal principal mesuré :** `différence entre identité visuelle et charte
  graphique`, 20 recherches mensuelles, KD `n/a`, Semrush France, ordinateur,
  4 août 2026.
- **Format testé :** guide ciblé d'environ 1 600 mots utiles, avec une table de
  notions et un exemple compact à la place d'un long cas conducteur.
- **Exemple :** Bureau Clair, activité fictive d'accompagnement administratif,
  montrant quatre livrables distincts sans simuler de résultat client.
- **CTA :** « Trouver mon identité visuelle », vers le diagnostic avec
  l'origine analytics fermée `guide`.
- **Décision anti-cannibalisation :** l'article 1 possède les différences de
  vocabulaire et l'ordre général. Les méthodes détaillées restent aux articles
  4, 5 et 8.

## Étapes éditoriales immédiates

1. Relire les trois URL de relecture et noter séparément ce qui relève du fond,
   du ton, de la structure de page et du workflow.
2. Comparer les deux guides piliers à l'article 1 ciblé : nécessité de
   l'exemple conducteur, longueur, nombre de composants et densité des sources.
3. Modifier `CONTENT_RULES.md`, `ARTICLE_TEMPLATE.md` ou le skill uniquement
   lorsque le même enseignement est confirmé par plusieurs articles, ou quand
   le troisième cas révèle une règle trop rigide.
4. Intégrer les retours sans retirer `noindex` pendant la relecture.
5. Valider la biographie, le domaine et les canonical avant de décider du
   statut `ready` et d'une éventuelle indexation.

## Étapes entre brouillon et publication

1. Vérifier les affirmations et sources, la terminologie et la valeur originale.
2. Contrôler le chevauchement avec les autres guides et préparer le maillage.
3. Produire titre SEO, H1, meta description, slug, extrait et données
   structurées.
4. Faire une relecture humaine du ton et des exemples.
5. Intégrer l'article dans `/fr/guides/` avec canonical, sitemap et liens vers
   l'outil.
6. QA mobile et desktop, puis publication.
7. Vérifier l'indexation dans Search Console et mesurer le passage guide → outil
   avec PostHog.

## Définition de « prêt à publier »

Un guide est prêt lorsque :

- il répond utilement à l'intention sans exiger l'utilisation de l'outil ;
- il contient au moins une méthode, un exemple ou une comparaison originale ;
- ses affirmations vérifiables sont sourcées ;
- il distingue direction visuelle, identité visuelle et charte graphique ;
- il n'exagère pas le livrable de Boussole visuelle ;
- il possède un seul CTA principal ;
- ses métadonnées, son maillage, son rendu mobile et son URL sont vérifiés ;
- son statut et sa date sont mis à jour dans ce fichier.

## Journal

- 2026-08-02 — Création du suivi transmissible. Recherche Semrush et arbitrage
  sur l'article moodboard consignés. Phase suivante : système de rédaction,
  validation légère de l'article 4, puis premier plan détaillé.
- 2026-08-02 — Les trois requêtes de l'article 4 ont été ouvertes dans Semrush,
  mais la limite gratuite quotidienne a masqué leurs métriques. Elles restent à
  vérifier sans bloquer la suite.
- 2026-08-02 — Configuration Vercel préparée : build public dans `dist`,
  documentation exclue de l'artefact et Ignored Build Step pour les commits
  internes. La configuration deviendra active après commit et push.
- 2026-08-02 — Automation Codex quotidienne créée pour reprendre la recherche
  Semrush à 12 h 30, huit requêtes maximum, sans rédaction ni publication.
- 2026-08-02 — Système de rédaction créé : règles de contenu, première version du guide de ton,
  modèle de guide et skill `$boussole-blog-post`. Prochaine étape : brief et
  plan détaillé de l'article 4, puis validation humaine avant rédaction.
- 2026-08-02 — Voix repensée après recherche : tutoiement éditorial adulte,
  remplacement de `V0` dans les contenus publics, contextualisation de
  « irrésistible » et « révéler », et fourchettes de 1 200 à 3 000 mots selon
  le type de guide. L'interface actuelle reste à harmoniser avant publication.
- 2026-08-02 — Brief et plan détaillé de l'article 4 créés avec `$boussole-blog-post` :
  angle « décider avant de décorer », exemple fictif Experte / Accessible,
  maillage, sources, métadonnées, visuels et dépendances de publication. Statut
  `outline` en attente de validation par Claire ; aucun brouillon rédigé.
- 2026-08-03 — Automation Semrush : les trois longues traînes prioritaires de
  l'article 4 ont été vérifiées sur France/ordinateur, sans métrique
  exploitable. L'actualisation est réservée à Pro ; aucun essai n'a été lancé.
  L'article 4 reste prêt à valider grâce aux signaux mesurés de sa famille. Le
  prochain lot quantitatif porte sur l'article 5 ; aucun article n'a été rédigé.
- 2026-08-03 — Claire a validé les cinq décisions du plan de l'article 4 :
  angle, exemple conducteur, titre, voix et signature. CTA remplacé par
  « Trouver mon identité visuelle », plus orienté bénéfice. Le brief passe à
  `approved-outline` ; la prochaine étape est la rédaction contrôlée du premier
  brouillon, sans publication automatique.
- 2026-08-03 — Premier brouillon de l'article 4 rédigé et intégré à l'URL
  `/fr/guides/creer-identite-visuelle-entrepreneur/`. La page porte
  `noindex, follow`, reste absente du sitemap et affiche son statut de guide en
  relecture. Le CTA mène au diagnostic avec l'origine analytics fermée `guide`.
  QA locale desktop/mobile et relecture humaine par Claire requises avant tout
  passage à `ready` ou indexation.
- 2026-08-04 — Automation Semrush : huit requêtes supplémentaires vérifiées sur
  France/ordinateur. La formulation mesurée `différence entre identité visuelle
  et charte graphique` (20, KD `n/a`) devient l'expression principale de la
  famille article 1, sans nouvelle page ni changement d'ordre. Les autres
  formulations affichent `n/a` ou aucune donnée ; aucune métrique n'a été
  inventée et aucun essai payant n'a été lancé.
- 2026-08-05 — Automation Semrush : huit requêtes prioritaires vérifiées sur
  France/ordinateur. `brief identité visuelle` (20, KD `n/a`) confirme une
  section pré-brief dans l'article 8. La variante `générateur de charte
  graphique gratuit` (20, KD `n/a`) reste en attente car elle dépasse la
  promesse de Boussole visuelle. Aucun titre, regroupement ni ordre de
  production ne change ; aucun essai payant n'a été lancé.
- 2026-08-05 — Brief et plan détaillé de l'article 8 créés avec
  `$boussole-blog-post`. L'angle relie les références aux décisions testables,
  avec l'exemple fictif Place Nette, un pré-brief complet et le CTA proposé
  « Créer ma direction visuelle ». Statut `outline` en attente de validation
  par Claire ; aucun brouillon rédigé ni publié.
- 2026-08-05 — Claire a validé les cinq décisions de l'article 8. Le brouillon
  source a été rédigé puis intégré à `/fr/guides/moodboard-charte-graphique/`
  avec `noindex, follow`, hors sitemap et avec le CTA « Créer ma direction
  visuelle ». Statut `review` ; la prochaine étape est une comparaison humaine
  des deux premiers articles avant d'ajuster le processus de rédaction.
- 2026-08-05 — L'article 1 a été avancé avant l'article 5 afin de fournir un
  troisième cas réellement différent pour l'évaluation du workflow. Son brief,
  son brouillon ciblé et sa page de relecture ont été créés à partir de FR-042
  et des familles mesurées `identité visuelle` et `charte graphique`. La page
  `/fr/guides/identite-marque-visuelle-charte-graphique/` reste en
  `noindex, follow`, hors sitemap et sans lien entrant visible. Aucun changement
  définitif du skill ou des règles éditoriales n'est appliqué avant la
  comparaison des trois guides.
