const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");

function loadAnalytics() {
  const code = fs.readFileSync(require.resolve("../assets/analytics.js"), "utf8");
  const context = {
    window: {},
    document: { readyState: "loading", addEventListener() {} },
    URLSearchParams,
    Object,
    Set
  };
  vm.runInNewContext(code, context);
  return context.window.BoussoleAnalytics;
}

test("la couche analytics rejette les événements inconnus", () => {
  assert.equal(loadAnalytics().clean("brand_text_entered", { text: "Secret" }), null);
});

test("la couche analytics ne conserve que les propriétés fermées autorisées", () => {
  const analytics = loadAnalytics();
  const clean = analytics.clean("preset_selected", {
    preset: "expert",
    origin: "manual",
    brand: "Information privée",
    $current_url: "https://example.test/?b=Secret"
  });
  assert.deepEqual(JSON.parse(JSON.stringify(clean)), { preset: "expert", origin: "manual" });
});

test("les valeurs hors liste sont supprimées", () => {
  const analytics = loadAnalytics();
  assert.deepEqual(JSON.parse(JSON.stringify(analytics.clean("preview_viewed", { preview: "secret-preview" }))), {});
});

test("l'origine fermée guide est acceptée sans transmettre le contenu", () => {
  const analytics = loadAnalytics();
  const clean = analytics.clean("tool_opened", {
    entry: "guide",
    mode: "diagnostic",
    article: "un texte qui ne doit pas partir"
  });
  assert.deepEqual(JSON.parse(JSON.stringify(clean)), { entry: "guide", mode: "diagnostic" });
});
