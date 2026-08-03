const assert = require("node:assert/strict");
const test = require("node:test");

test("ignore les commits composés uniquement de fichiers internes", async () => {
  const { shouldSkipBuild } = await import(
    "../scripts/vercel-ignore-build.mjs"
  );

  assert.equal(
    shouldSkipBuild([
      "README.md",
      "SEO_CONTENT_FOUNDATION.md",
      "docs/editorial/BLOG_PROGRESS.md",
      ".agents/skills/boussole-keyword-research/SKILL.md",
      "tests/diagnostic.test.cjs",
    ]),
    true,
  );
});

test("conserve le déploiement dès qu'un fichier public change", async () => {
  const { shouldSkipBuild } = await import(
    "../scripts/vercel-ignore-build.mjs"
  );

  assert.equal(
    shouldSkipBuild(["docs/editorial/BLOG_PROGRESS.md", "index.html"]),
    false,
  );
  assert.equal(shouldSkipBuild(["vercel.json"]), false);
  assert.equal(shouldSkipBuild([]), false);
});
