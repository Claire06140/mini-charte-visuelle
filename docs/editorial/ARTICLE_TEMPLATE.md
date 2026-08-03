# Modèle de travail d'un guide — Boussole visuelle

Dernière mise à jour : 2 août 2026.

Ce modèle sert à préparer, rédiger et contrôler un guide. Il ne préjuge pas du
format technique final de la page. Supprimer les consignes entre crochets dans
le livrable.

---

## Fiche éditoriale

```yaml
concept_id: article-X
status: research | outline | approved-outline | draft | review | ready | published
locale: fr-FR
market: France
author: Claire
address: tu
last_keyword_research: YYYY-MM-DD
last_content_review: YYYY-MM-DD

reader_situation: "[Situation concrète, sans nom de persona interne]"
problem: "[Question ou décision à résoudre]"
intent: "[Comprendre | créer | comparer | tester | appliquer]"
promise: "[Résultat réaliste obtenu après lecture]"
product_role: "[Ce que Boussole aide à faire à l'étape suivante]"
article_type: "targeted | method | pillar"
working_word_range: "[ex. 1700-2400 ; budget éditorial, pas quota SEO]"

primary_query: "[Requête principale mesurée ou statut explicite]"
secondary_queries:
  - "[Variante compatible]"
evidence_ids:
  - "[FR-000]"
page_owner: "article-X"
cannibalization_checked_against:
  - "[article-Y]"

seo_title: "[Titre compact]"
h1: "[Titre de lecture, potentiellement plus développé]"
slug: "/fr/guides/[slug]"
meta_description: "[Bénéfice concret et intention]"
excerpt: "[Résumé éditorial de 1 à 2 phrases]"
canonical: "[URL finale ou TODO avant intégration]"

primary_cta_label: "[Action + résultat]"
primary_cta_url: "[Destination vérifiée]"
```

## Décision éditoriale

### Réponse courte

[Répondre en deux à quatre phrases à la question principale. Cette réponse doit
rester valable même si la personne ne poursuit pas sa lecture.]

### Ce que le guide apporte de différent

[Nommer la méthode, l'exemple, la comparaison ou l'outil absent des résultats
génériques.]

### Ce que le guide ne promet pas

[Délimiter le livrable, la portée et les incertitudes.]

### Risque de cannibalisation

[Lister les pages proches, la frontière d'intention et les variantes qui seront
fusionnées dans cette page.]

## Preuves et sources

| Affirmation ou donnée | Type | Source | Date | Emplacement prévu |
|---|---|---|---|---|
| [Volume exact] | Donnée SEO | [Semrush, base et URL] | [date] | Métadonnées de travail uniquement |
| [Définition ou règle externe] | Source primaire | [Institution ou auteur responsable] | [date] | [Section] |
| [Choix de méthode Boussole] | Choix éditorial | `SEO_CONTENT_FOUNDATION.md` | [date] | [Section] |

Ne pas transformer une source de vocabulaire ou un résultat concurrent en
preuve de l'efficacité de la méthode.

## Exemple conducteur

- **Activité ou offre :** [exemple fictif clairement présenté comme tel]
- **Cible et situation :** [problème, critères de choix, alternatives]
- **Proposition et positionnement :** [formulation courte]
- **Perception recherchée :** [mot + relation + énergie]
- **Contre-image :** [ce qu'il faut éviter]
- **Supports testés :** [site, publication, offre]
- **Deux hypothèses éventuelles :** [A et B]
- **Observation utile :** [ce que le test permet d'apprendre]

Utiliser le même exemple dans plusieurs sections lorsque cela rend le
raisonnement plus lisible.

## Plan détaillé

### Introduction

- Situation reconnue : [problème concret].
- Réponse courte : [principe central].
- Promesse de lecture : [ce que la personne saura décider ou faire].

### H2 — [Question ou décision réelle]

- Réponse à apporter :
- Exemple ou preuve :
- Notion à définir :
- Lien interne éventuel :

### H2 — [Étape suivante de la méthode]

- Réponse à apporter :
- Exemple ou comparaison :
- Erreur fréquente :
- Lien interne éventuel :

### H2 — [Application sur un support réel]

- Réponse à apporter :
- Test ou checklist :
- Limite à expliciter :

### H2 — [Que faire ensuite ?]

- Résumer la décision obtenue.
- Montrer les options : faire soi-même, tester davantage, briefer ou déléguer.
- Introduire le CTA principal sans retirer la valeur autonome du guide.

Ajouter ou retirer des sections selon l'intention. Ne pas conserver une section
uniquement parce qu'elle figure dans le modèle.

## Brouillon

```markdown
# [H1]

[Introduction : situation, réponse courte et promesse.]

## [H2 descriptif]

[Développement, exemple et source si nécessaire.]

## [H2 descriptif]

[Développement.]

> **À tester**
> [Question, hypothèse, support et critère d'observation.]

## [H2 d'application]

[Méthode ou checklist.]

## [H2 de prochaine étape]

[Résumé utile et limite.]

[CTA principal : libellé précis et destination vérifiée.]
```

## Maillage

| Rôle | Page | Ancre prévue | État |
|---|---|---|---|
| Prérequis | [URL] | [ancre descriptive] | existe / à publier avant |
| Étape suivante | [URL] | [ancre descriptive] | existe / à publier après |
| Lien entrant | [page à mettre à jour] | [ancre] | TODO |

## Données de publication

### SEO

- Titre SEO :
- H1 :
- Meta description :
- Slug :
- Canonical :
- Locale : `fr-FR`
- Date de publication :
- Date de modification :

### Données structurées

Prévoir `Article` ou `BlogPosting` avec auteur, dates, titre, description et URL
canonique. Ajouter `FAQPage` uniquement si une FAQ réellement visible répond à
des questions utiles. Ne pas générer de questions artificielles pour les
données structurées.

### Visuels

- Visuel principal nécessaire : oui / non
- Rôle pédagogique du visuel :
- Alt : [décrire l'information utile, pas répéter le mot-clé]
- Source et droits :
- Captures à actualiser avant publication :

## Relecture

### Fond

- [ ] La réponse courte correspond à l'intention.
- [ ] Le guide apporte une méthode, un exemple ou une comparaison originale.
- [ ] L'exemple reste cohérent du début à la fin.
- [ ] Les limites du produit et du livrable sont exactes.
- [ ] Les affirmations vérifiables sont sourcées.

### Terminologie et ton

- [ ] Les termes du parcours de marque ne sont pas confondus.
- [ ] Les choix visuels sont présentés comme contextuels et testables.
- [ ] Le tutoiement est constant, adulte et naturel.
- [ ] La voix suit `TONE_GUIDE.md`.
- [ ] Aucun témoignage ou résultat n'est inventé.

### SEO et publication

- [ ] La page propriétaire et la cannibalisation sont contrôlées.
- [ ] Le titre SEO, le H1, le slug et la meta répondent à la même intention.
- [ ] La longueur couvre la méthode, l'exemple et les limites sans remplissage.
- [ ] Les liens et le CTA pointent vers des destinations réelles.
- [ ] Les visuels, sources, canonical et données structurées sont prêts.
- [ ] `BLOG_PROGRESS.md` est mis à jour après validation.

## Décision de validation

- Statut final :
- Points encore ouverts :
- Validé par Claire le :
- Prochaine action :
