import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "dist");

if (
  path.basename(outputDirectory) !== "dist" ||
  path.dirname(outputDirectory) !== projectRoot
) {
  throw new Error("Refus de nettoyer un dossier de sortie inattendu.");
}

const requiredEntries = [
  "index.html",
  "confidentialite.html",
  "assets",
  "outil",
];
const optionalEntries = [
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "site.webmanifest",
  "fr",
  "en",
  "es",
];

async function copyEntry(entry, required) {
  const source = path.join(projectRoot, entry);
  const destination = path.join(outputDirectory, entry);

  try {
    await stat(source);
  } catch (error) {
    if (!required && error?.code === "ENOENT") return;
    throw error;
  }

  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of requiredEntries) {
  await copyEntry(entry, true);
}

for (const entry of optionalEntries) {
  await copyEntry(entry, false);
}

console.log(`Site statique préparé dans ${outputDirectory}`);
