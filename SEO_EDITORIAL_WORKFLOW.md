# Système de recherche et de production éditoriale — Boussole visuelle

Dernière mise à jour : 2 août 2026.

## 1. Décision

Boussole visuelle utilisera un système éditorial léger, versionné avec le
produit, plutôt qu'une accumulation de prompts ou de skills SEO génériques.

Le système séparera deux tâches qui ne demandent pas les mêmes preuves :

1. **choisir les opportunités éditoriales** à partir de la demande, de la SERP,
   de la concurrence et de leur proximité avec le produit ;
2. **rédiger et publier un article** à partir d'un brief dont l'intention et le
   rôle dans le parcours sont déjà validés.

La stratégie et les huit briefs restent définis dans
[`SEO_CONTENT_FOUNDATION.md`](SEO_CONTENT_FOUNDATION.md). Le présent document
décrit le processus permettant de les vérifier, les produire et les faire
évoluer.

Le site est lancé en français, mais le système ne doit pas supposer que le
produit restera francophone. La règle est donc : **marché français en premier,
architecture éditoriale et technique compatible avec plusieurs langues**.

## 2. État actuel et manque à combler

Le socle actuel permet déjà de définir :

- le territoire éditorial propre au produit ;
- les principales intentions de recherche ;
- huit angles différenciés ;
- un ordre de publication et un maillage interne ;
- les limites de la promesse et les CTA pertinents.

La cartographie associe maintenant une analyse qualitative à onze repères
quantitatifs Semrush. Elle permet de lancer les deux premiers articles sans
prétendre que toutes les formulations prévues sont définitivement les
meilleures opportunités SEO. Les longues traînes restantes seront vérifiées
ponctuellement, puis Search Console apportera les données réelles après
publication.

Une recherche web classique peut déterminer l'intention, les acteurs présents,
le type de page attendu et les lacunes des résultats. Elle ne doit pas être
utilisée pour inventer un volume de recherche.

## 3. Définition d'un mot-clé « à fort potentiel »

Le potentiel ne se réduit pas au volume mensuel. Une requête large comme
« identité visuelle » peut attirer davantage de recherches tout en étant trop
concurrentielle, trop générale et peu susceptible d'amener vers l'outil.

Une opportunité est évaluée sur cinq dimensions :

| Dimension | Question |
|---|---|
| Demande observable | Existe-t-il un volume, une tendance, des questions associées ou des impressions réelles ? |
| Accessibilité | Le site peut-il raisonnablement apporter une meilleure réponse que les pages déjà classées ? |
| Intention | La personne cherche-t-elle une réponse compatible avec le contenu envisagé ? |
| Proximité produit | La requête mène-t-elle naturellement vers une décision que Boussole visuelle aide à prendre ? |
| Différenciation | Avons-nous une méthode, un exemple, un outil ou un point de vue que les résultats actuels ne proposent pas ? |

Le score de priorité sera établi sur 100 :

- proximité avec le produit : 25 points ;
- accessibilité et lacune de la SERP : 25 points ;
- demande observable : 20 points ;
- adéquation entre intention et article : 15 points ;
- différenciation éditoriale : 15 points.

Ce score sert à comparer les opportunités entre elles. Il ne prétend pas prédire
une position ou un volume de trafic.

## 4. Niveaux de preuve

Chaque donnée ou décision de la cartographie des requêtes portera un statut :

| Statut | Signification |
|---|---|
| `volume-confirmed` | Le volume et la zone géographique proviennent d'un outil de données SEO identifié et daté. |
| `trend-confirmed` | Une tendance ou une comparaison relative est visible dans Google Trends. |
| `serp-gap-confirmed` | L'analyse des résultats montre une intention claire et une lacune éditoriale documentée. |
| `search-console-confirmed` | Des impressions ou clics réels sont observés pour le domaine. |
| `strategy-backed` | Le sujet est justifié par la méthode, le produit ou une question utilisateur, sans preuve de volume. |
| `needs-recheck` | La formulation ou la donnée reste trop incertaine pour guider un titre ou créer une page séparée. |

Une valeur absente reste vide. Le système ne transformera jamais une estimation
qualitative en donnée chiffrée.

## 5. Premier sprint de recherche

Avant de rédiger le premier article, un sprint ponctuel évalue environ 25 à
40 formulations issues des huit briefs. Sa première passe qualitative a été
réalisée le 1er août 2026 avec 37 requêtes françaises. La passe quantitative
a commencé le même jour avec neuf repères Semrush sur trois familles. Une
deuxième passe, le 2 août, a confirmé deux formulations exactes autour du
passage du moodboard à l'identité applicable. Elle reste à compléter sur les
autres formulations prioritaires, sans lancer d'essai payant.

### Étapes

1. Générer des familles de requêtes à partir des sujets, du vocabulaire de la
   cible et des étapes du parcours.
2. Examiner les résultats français : intention dominante, formats classés,
   acteurs présents, questions associées et angles non couverts.
3. Comparer les formulations proches dans Google Trends lorsque le volume le
   permet.
4. Si un accès est disponible, relever dans Semrush ou un outil équivalent le
   volume, la difficulté, l'intention, la tendance et les variantes.
5. Affecter chaque requête à une seule page principale pour éviter la
   cannibalisation.
6. Scorer et classer les opportunités.
7. Décider pour chaque article : `keep`, `merge`, `reframe` ou `hold`.

### Livrable

Le sprint produira `docs/editorial/KEYWORD_OPPORTUNITIES.md` avec au minimum :

| Champ | Contenu attendu |
|---|---|
| `locale` | Langue et marché, par exemple `fr-FR`. |
| `query` | Formulation observée ou testée. |
| `intent` | Information, action, comparaison, création ou autre intention explicitée. |
| `target_page` | Article ou page produit responsable de la requête. |
| `volume` / `difficulty` | Valeur, source, marché et date, ou champ vide. |
| `evidence_status` | Un ou plusieurs statuts de preuve. |
| `product_fit` | Lien concret entre la requête et la valeur de Boussole visuelle. |
| `serp_gap` | Ce que la page apportera de différent. |
| `priority_score` | Score comparatif sur 100. |
| `decision` | `keep`, `merge`, `reframe` ou `hold`. |

Un abonnement SEO permanent n'est pas nécessaire pour ce premier socle. Un
sprint ponctuel et un export suffisent ; Search Console prendra ensuite le
relais avec les données réelles du site.

## 6. Skill `boussole-keyword-research`

Ce skill sera chargé de créer et de maintenir la cartographie des opportunités.
Il devra :

- lire le socle SEO et la cartographie existante avant toute recherche ;
- préciser la langue, le pays et le type de page étudiés ;
- séparer données mesurées, observation de SERP et jugement stratégique ;
- regrouper les variantes qui partagent la même intention ;
- détecter les chevauchements entre les huit articles ;
- expliquer les décisions de maintien, fusion, reformulation ou attente ;
- conserver la source et la date de chaque donnée ;
- refuser d'inventer un volume, une difficulté ou une tendance.

Il sera utilisé au lancement du socle, puis ponctuellement lorsque Search
Console ou un nouveau marché apporte suffisamment de données.

## 7. Skill `boussole-blog-post`

Ce skill sera utilisé pour produire un article à partir d'une opportunité et
d'un brief approuvés.

### Processus obligatoire

1. Lire le socle SEO, la ligne correspondante de la cartographie et les règles
   éditoriales.
2. Reformuler le problème précis auquel l'article doit répondre.
3. Vérifier les sources, les résultats actuels et le contenu interne existant.
4. Préparer le plan, les exemples, le maillage et le CTA.
5. Rédiger une réponse utile même sans utiliser immédiatement l'outil.
6. Produire le titre, la meta description, le slug, l'extrait et les données de
   publication.
7. Contrôler la terminologie, les promesses, les sources, la lisibilité, le
   maillage et le risque de cannibalisation.
8. Mettre à jour le suivi éditorial après intégration et validation.

### Garde-fous de rédaction

- Ne pas répéter mécaniquement le mot-clé dans chaque niveau de titre.
- Utiliser la fourchette de profondeur liée au type de guide sans la traiter
  comme un quota ou un facteur de classement.
- Ne pas attribuer une psychologie universelle aux couleurs et typographies.
- Employer « direction », « hypothèse », « test », « première version » ou
  « base de travail » lorsque le résultat n'est pas une charte définitive.
- Distinguer cible, proposition de valeur, positionnement, identité de marque,
  identité visuelle, charte graphique et image de marque.
- Ne pas présenter Boussole visuelle comme un remplacement automatique du
  travail d'un designer.
- Donner des exemples originaux, concrets et applicables à un support réel.
- Utiliser un seul CTA principal, cohérent avec l'étape suivante du parcours.

## 8. Ce qui sera repris du workflow `create-blog-post`

Le workflow utilisé par Happy Diabetes fournit une bonne architecture de
production, mais ne doit pas être copié en bloc.

| À reprendre | À simplifier ou écarter |
|---|---|
| Documents séparés pour stratégie, voix, modèles et règles | Le monolithe de plusieurs centaines de lignes |
| Recherche et plan avant la rédaction | Les volumes estimés depuis une simple recherche web |
| Vérification des sources et affirmations | Les contraintes médicales propres à Happy Diabetes |
| Maillage, CTA et métadonnées préparés avec l'article | Notion, base de données et seed spécifiques à l'autre produit |
| Checklist avant livraison | Les répétitions mécaniques de mots-clés |
| Suivi du statut et rétroaction après publication | Le trilinguisme automatique et la production simultanée de traductions |

Le skill principal restera court et orientera vers des références ciblées selon
l'étape. Les règles vivront dans le dépôt afin de rester lisibles, modifiables
et versionnées avec le produit.

## 9. Fichiers éditoriaux

```text
SEO_CONTENT_FOUNDATION.md
SEO_EDITORIAL_WORKFLOW.md
docs/editorial/
    KEYWORD_OPPORTUNITIES.md       # créé
    CONTENT_RULES.md               # créé : fond, SEO, preuves et garde-fous
    TONE_GUIDE.md                  # créé : première voix à valider sur le premier guide
    ARTICLE_TEMPLATE.md            # créé : brief, plan, brouillon et contrôle
    BLOG_PROGRESS.md               # créé : état, décisions et relais entre agents
    briefs/
        article-4-creer-identite-visuelle-entrepreneur.md  # plan à valider
.agents/skills/
    boussole-keyword-research/     # créé et validé
        SKILL.md
    boussole-blog-post/            # créé et validé
        SKILL.md
```

Les documents du projet seront la source de vérité. Les skills orchestreront
leur lecture et leur application sans dupliquer toute la stratégie.

## 10. Préparation multilingue

### Principe

Le français sert de premier marché de validation, pas de limite permanente. Les
contenus en anglais, espagnol ou dans une autre langue ne seront pas de simples
traductions SEO des pages françaises.

Chaque marché devra valider :

- les mots réellement employés ;
- l'intention associée à ces mots ;
- les concurrents et formats présents dans ses résultats ;
- les exemples et références culturellement compréhensibles ;
- le lien entre la requête locale et le produit.

Une requête prioritaire en français peut être inexistante, trop concurrentielle
ou formulée autrement dans un autre pays.

### Modèle de contenu à prévoir

Chaque article devra pouvoir distinguer :

- un identifiant conceptuel stable ;
- la `locale` et le marché visé ;
- un titre, un slug, une meta description et un contenu propres à la langue ;
- les liens internes de la même langue ;
- une URL canonique et les alternatives linguistiques ;
- la date de dernière recherche locale.

Avant de publier le premier guide, il faudra décider de la structure d'URL
multilingue. La solution privilégiée sera une structure explicite et stable,
par exemple `/fr/guides/...`, `/en/guides/...` et `/es/guides/...`, accompagnée
des balises `hreflang` appropriées. Ce choix reste à implémenter et devra tenir
compte des URL françaises déjà publiques afin d'éviter des redirections
inutiles.

### Ordre recommandé

1. Valider le parcours et les premiers contenus en français.
2. Observer les usages produit et les requêtes Search Console.
3. Choisir le deuxième marché à partir de signaux concrets, pas uniquement de
   la facilité de traduction.
4. Faire un nouveau sprint de mots-clés dans ce marché.
5. Adapter les meilleurs concepts et créer, si nécessaire, des pages propres à
   ce marché.

L'interface, l'analytics et les contenus devront plus tard accepter une
propriété de langue ou de marché en liste fermée, sans collecter de texte libre.
Cette évolution est préparée ici, mais reste hors du périmètre de la bêta
française actuelle.

## 11. Boucle d'apprentissage après publication

Après indexation :

1. Search Console mesure les requêtes, impressions, clics et pages associées.
2. Les requêtes inattendues sont classées par intention et proximité produit.
3. Les pages à impressions mais faible clic sont examinées pour leur titre et
   leur adéquation à l'intention.
4. Les chevauchements entre pages sont corrigés par consolidation ou maillage.
5. PostHog mesure si le contenu conduit à l'ouverture de l'outil et aux actions
   de valeur, sans attribuer un parcours individuel sur plusieurs jours.
6. La cartographie des opportunités et les briefs sont mis à jour avec les
   preuves observées.

La première version des huit articles est donc une hypothèse éditoriale
instrumentée, pas un calendrier figé.
