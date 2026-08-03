import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ignoredPathPatterns = [
  /^\.agents\//,
  /^docs\/editorial\//,
  /^README\.md$/,
  /^SEO_CONTENT_FOUNDATION\.md$/,
  /^SEO_EDITORIAL_WORKFLOW\.md$/,
  /^tests\//,
  /^playwright\.config\.cjs$/,
  /^\.gitignore$/,
];

export function shouldSkipBuild(changedFiles) {
  return (
    changedFiles.length > 0 &&
    changedFiles.every((file) =>
      ignoredPathPatterns.some((pattern) => pattern.test(file)),
    )
  );
}

export function getChangedFiles() {
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "HEAD^", "HEAD"],
    { encoding: "utf8" },
  );

  return output
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

export function runIgnoreStep() {
  try {
    const changedFiles = getChangedFiles();

    if (shouldSkipBuild(changedFiles)) {
      console.log("Déploiement ignoré : changements internes uniquement.");
      return 0;
    }

    console.log("Déploiement requis : un fichier public ou de configuration a changé.");
    return 1;
  } catch (error) {
    console.warn(
      "Comparaison Git indisponible ; le déploiement est conservé par sécurité.",
      error?.message ?? error,
    );
    return 1;
  }
}

const currentFile = fileURLToPath(import.meta.url);
const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (currentFile === invokedFile) {
  process.exit(runIgnoreStep());
}
