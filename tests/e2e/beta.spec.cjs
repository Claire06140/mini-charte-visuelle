const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.route(/posthog\.com/, (route) => route.abort());
});

test("le premier guide reste non indexé et ouvre le diagnostic", async ({ page }) => {
  await page.goto("/fr/guides/creer-identite-visuelle-entrepreneur/");
  await expect(page).toHaveTitle("Créer son identité visuelle : par où commencer avant Canva ?");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  await expect(page.getByRole("heading", { name: "Créer son identité visuelle quand on est entrepreneur : par où commencer avant Canva ?" })).toBeVisible();
  await page.getByRole("link", { name: "Trouver mon identité visuelle" }).click();
  await expect(page.getByRole("heading", { name: "Quel cap pour ton image ?" })).toBeVisible();
});

test("le guide moodboard reste non indexé et ouvre sa prochaine étape", async ({ page }) => {
  await page.goto("/fr/guides/moodboard-charte-graphique/");
  await expect(page).toHaveTitle("Créer un moodboard de marque et en faire une charte graphique");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  await expect(page.getByRole("heading", { name: "Comment créer un moodboard de marque et le transformer en charte graphique ?" })).toBeVisible();
  await expect(page.getByText("Place Nette", { exact: true }).first()).toBeVisible();
  await page.getByRole("link", { name: "Créer ma direction visuelle" }).click();
  await expect(page.getByRole("heading", { name: "Quel cap pour ton image ?" })).toBeVisible();
});

test("le guide moodboard reste lisible à 390 px sans débordement de page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr/guides/moodboard-charte-graphique/");
  await expect(page.getByRole("heading", { name: "Comment créer un moodboard de marque et le transformer en charte graphique ?" })).toBeVisible();
  await expect(page.locator(".direction-card")).toHaveCount(2);
  await expect(page.locator(".table-scroll")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("la landing ouvre le diagnostic et le parcours renvoie deux pistes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Donne une direction claire à ton image." })).toBeVisible();
  await page.getByRole("link", { name: "Trouver deux directions" }).click();
  await expect(page).toHaveURL(/\/outil\//);
  await expect(page.getByRole("heading", { name: "Quel cap pour ton image ?" })).toBeVisible();

  await page.locator('input[name="perception"][value="premium"]').check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator('input[name="relation"][value="elevate"]').check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator('input[name="energy"][value="balanced"]').check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator('input[name="avoid"][value="loud"]').check();
  await page.getByRole("button", { name: "Voir mes deux pistes" }).click();

  await expect(page.getByRole("heading", { name: "Tes deux directions de départ" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Premium" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Expert" })).toBeVisible();
  await page.getByRole("button", { name: "Fermer et comparer plus tard" }).click();
  await expect(page.getByRole("button", { name: "Comparer A/B" })).toBeEnabled();
  await page.getByRole("button", { name: "Comparer A/B" }).click();
  await expect(page.getByRole("heading", { name: "Quelle piste porte mieux ton message ?" })).toBeVisible();
});

test("un ancien lien racine est redirigé et restauré", async ({ page }) => {
  await page.goto("/?p=expert&b=Marque%20test&h=Une%20preuve%20claire");
  await expect(page).toHaveURL(/\/outil\/\?p=expert/);
  await expect(page.locator("#brandName")).toHaveValue("Marque test");
  await expect(page.locator("#headline")).toHaveValue("Une preuve claire");
});

test("un lien partagé peut être dupliqué", async ({ page }) => {
  await page.goto("/outil/?p=expert&src=share");
  await expect(page.getByText("Direction partagée", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Dupliquer et modifier" }).click();
  await expect(page.getByText("Direction partagée", { exact: true })).toBeHidden();
});

test("l’impression produit le livrable sans ouvrir la boîte système", async ({ page }) => {
  await page.addInitScript(() => { window.print = () => { window.__printCalled = true; }; });
  await page.goto("/outil/?mode=free");
  await page.getByRole("button", { name: "Imprimer / PDF" }).click();
  await expect(page.locator("#printSheet")).toContainText("Checklist d’application");
  await expect.poll(() => page.evaluate(() => window.__printCalled)).toBe(true);
});

test("les questions facultatives sont fermables sur mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/outil/?mode=free");
  await expect(page.getByRole("heading", { name: "Quel support prépares-tu ?" })).toBeVisible();
  await page.getByRole("button", { name: "Ignorer" }).click();
  await expect(page.getByRole("heading", { name: "Quel support prépares-tu ?" })).toBeHidden();
  await expect(page.locator(".app")).toBeVisible();
});
