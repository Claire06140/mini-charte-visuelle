---
name: boussole-keyword-research
description: Rechercher, évaluer et cartographier les opportunités SEO de Boussole visuelle par langue et par marché. Utiliser ce skill pour valider des sujets ou mots-clés, analyser une SERP, détecter la cannibalisation, prioriser les guides, préparer un nouveau marché linguistique ou mettre à jour la cartographie à partir de Semrush, Google Trends ou Search Console.
---

# Recherche de mots-clés — Boussole visuelle

Produire une cartographie traçable des opportunités éditoriales. Séparer les
données mesurées, les observations de SERP et les choix stratégiques. Ne jamais
inventer une métrique absente.

## Charger le contexte

Lire intégralement, dans cet ordre :

1. `../../../SEO_CONTENT_FOUNDATION.md` pour le territoire, les articles et le
   maillage envisagés ;
2. `../../../SEO_EDITORIAL_WORKFLOW.md` pour la définition du potentiel, les
   niveaux de preuve et les règles multilingues ;
3. `../../../docs/editorial/KEYWORD_OPPORTUNITIES.md` s'il existe, afin de
   conserver l'historique et d'éviter les doublons.

Lire ensuite uniquement les pages produit ou documents complémentaires utiles
à la recherche demandée.

## Cadrer la recherche

Fixer avant toute collecte :

- la langue et le pays sous la forme d'une locale, par exemple `fr-FR` ;
- le produit ou la page susceptible de répondre ;
- le type d'intention étudié ;
- la date de recherche ;
- les sources quantitatives réellement disponibles.

Si la langue ou le pays ne sont pas précisés, utiliser le marché actuel du
produit, `fr-FR`, et le signaler. Ne jamais transposer les métriques d'un pays à
un autre.

## Construire les familles de requêtes

1. Partir des problèmes, décisions et formulations de la cible, pas seulement
   des termes du produit.
2. Générer des variantes couvrant compréhension, action, comparaison,
   évaluation et étape suivante.
3. Regrouper les formulations dont les résultats et l'intention sont
   équivalents.
4. Affecter chaque famille à une seule page principale.
5. Signaler les requêtes qui ouvrent un sujet utile mais ne justifient pas une
   page autonome.

Ne pas créer une page par variante. Une page peut couvrir plusieurs requêtes
compatibles ; deux intentions différentes peuvent nécessiter deux pages.

## Collecter les preuves

### Recherche web et SERP

Utiliser la recherche web pour observer :

- l'intention dominante ;
- les formats classés ;
- les acteurs et leur autorité apparente ;
- les formulations récurrentes ;
- les questions associées ;
- les réponses absentes ou superficielles ;
- la proximité entre les SERP de deux requêtes.

Conserver les URL et la date. Une recherche web ne fournit pas à elle seule un
volume de recherche fiable.

### Outils quantitatifs

Si Semrush ou un outil équivalent est disponible, relever la valeur exacte, la
base pays, la date et la formulation testée. Utiliser Google Trends pour des
comparaisons relatives, jamais comme volume absolu. Utiliser Search Console
pour les impressions et clics réellement observés après publication.

Laisser `Volume` et `Difficulty` à `—` lorsqu'aucune source quantitative n'est
disponible.

## Attribuer les niveaux de preuve

Utiliser uniquement les statuts suivants :

- `volume-confirmed`
- `trend-confirmed`
- `serp-gap-confirmed`
- `search-console-confirmed`
- `strategy-backed`
- `needs-recheck`

Ajouter plusieurs statuts séparés par `;` si nécessaire. Un statut
`volume-confirmed` exige une source, un marché et une date explicites.

## Scorer le potentiel

Évaluer sur 100 selon la grille du workflow :

- proximité avec le produit : 25 ;
- accessibilité et lacune de la SERP : 25 ;
- demande observable : 20 ;
- adéquation intention/article : 15 ;
- différenciation : 15.

Le score est comparatif. Ne pas le présenter comme une prévision de trafic.
Lorsque les métriques sont absentes, réduire la composante « demande
observable » et ajouter `needs-recheck` si la formulation doit guider un titre
principal.

## Prendre une décision

Attribuer une décision :

- `keep` : conserver la page ou l'angle ;
- `merge` : intégrer la requête dans une autre page ;
- `reframe` : conserver le besoin en reformulant la page ou son angle ;
- `hold` : attendre davantage de preuves ou un produit plus mûr.

Expliquer toute fusion ou reformulation dans `Notes`. Signaler explicitement la
cannibalisation possible.

## Mettre à jour la cartographie

Écrire dans `../../../docs/editorial/KEYWORD_OPPORTUNITIES.md` en conservant :

- le périmètre et les limites des données ;
- un résumé des décisions par article ;
- une table principale avec les colonnes exactes `ID`, `Locale`, `Query`,
  `Intent`, `Target`, `Evidence`, `Volume`, `Difficulty`, `Score`, `Decision`,
  `Notes` ;
- un registre des sources avec URL et date ;
- les prochaines validations quantitatives ;
- un historique synthétique des changements.

Ne pas remplacer silencieusement une ancienne métrique. Mettre à jour sa date
et sa source, ou conserver l'ancienne valeur dans l'historique si la décision
change.

## Contrôler le résultat

Exécuter :

```bash
python3 .agents/skills/boussole-keyword-research/scripts/validate_keyword_map.py \
  docs/editorial/KEYWORD_OPPORTUNITIES.md
```

Corriger toutes les erreurs. Avant livraison, vérifier aussi :

- aucune métrique sans source ;
- aucune requête en double ;
- un seul propriétaire principal par famille d'intention ;
- les sujets `merge`, `reframe` et `hold` expliqués ;
- la locale visible sur chaque ligne ;
- les conclusions présentées comme provisoires lorsqu'elles reposent seulement
  sur une analyse qualitative.

## Format de restitution

Commencer par les décisions qui changent la stratégie : pages confirmées,
fusions, reformulations et inconnues importantes. Présenter ensuite les
opportunités prioritaires, les limites des données et la prochaine action la
plus légère permettant de réduire l'incertitude.
