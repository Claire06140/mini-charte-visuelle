const test = require("node:test");
const assert = require("node:assert/strict");
const { score } = require("../assets/diagnostic.js");

test("le diagnostic additionne les règles et renvoie deux directions", () => {
  const result = score({ perception: "premium", relation: "elevate", energy: "balanced", avoid: "loud" });
  assert.deepEqual(result.slice(0, 2).map(({ id }) => id), ["premium", "expert"]);
  assert.equal(result[0].score, 6);
});

test("les égalités respectent l’ordre historique des presets", () => {
  assert.deepEqual(score({}).slice(0, 3).map(({ id }) => id), ["rassurant", "expert", "creatif"]);
});

test("la contre-image retire deux points aux directions associées", () => {
  const result = score({ perception: "minimal", avoid: "cold" });
  const minimal = result.find(({ id }) => id === "minimal");
  const expert = result.find(({ id }) => id === "expert");
  assert.equal(minimal.score, 2);
  assert.equal(expert.score, -2);
});
