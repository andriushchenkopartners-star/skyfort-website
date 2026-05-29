#!/usr/bin/env node
// scripts/convert-images.mjs
// Convert all .jpg / .jpeg / .png in public/ to .webp (and optionally
// .avif if `--avif` flag passed). Skips files that already have a .webp
// sibling. Uses sharp if installed; falls back to listing recommendations
// if not.
//
// Why: legacy images are JPEG, but modern formats (WebP, AVIF) save
// 25-50% bytes for equivalent visual quality. Better LCP scores +
// faster on slow connections.
//
// Usage:
//   npm install --save-dev sharp   # one-time
//   node scripts/convert-images.mjs           # webp only
//   node scripts/convert-images.mjs --avif    # webp + avif

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(REPO_ROOT, "public");
const WITH_AVIF = process.argv.includes("--avif");

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error(
    "✗ sharp not installed. Run: npm install --save-dev sharp\n",
  );
  console.log("Without sharp, here's what WOULD be converted:");
  await listCandidates();
  process.exit(1);
}

const EXTS = [".jpg", ".jpeg", ".png"];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function listCandidates() {
  for await (const file of walk(PUBLIC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (EXTS.includes(ext)) {
      const stats = await stat(file);
      console.log(`  ${path.relative(REPO_ROOT, file)} (${Math.round(stats.size / 1024)}KB)`);
    }
  }
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (!EXTS.includes(ext)) return null;

  const dir = path.dirname(srcPath);
  const base = path.basename(srcPath, ext);
  const webpPath = path.join(dir, `${base}.webp`);
  const avifPath = path.join(dir, `${base}.avif`);

  let convertedWebp = false;
  let convertedAvif = false;

  // WebP
  try {
    await stat(webpPath);
    // exists — skip
  } catch {
    await sharp(srcPath).webp({ quality: 80 }).toFile(webpPath);
    convertedWebp = true;
  }

  // AVIF (optional)
  if (WITH_AVIF) {
    try {
      await stat(avifPath);
    } catch {
      await sharp(srcPath).avif({ quality: 60 }).toFile(avifPath);
      convertedAvif = true;
    }
  }

  return { srcPath, convertedWebp, convertedAvif };
}

async function main() {
  console.log(`\nScanning ${PUBLIC_DIR} for ${EXTS.join("/")} files…\n`);
  let converted = 0;
  let skipped = 0;
  for await (const file of walk(PUBLIC_DIR)) {
    const res = await convertOne(file);
    if (!res) continue;
    if (res.convertedWebp || res.convertedAvif) {
      console.log(
        `  ✓ ${path.relative(REPO_ROOT, file)} → ${[
          res.convertedWebp && "webp",
          res.convertedAvif && "avif",
        ]
          .filter(Boolean)
          .join(" + ")}`,
      );
      converted++;
    } else {
      skipped++;
    }
  }
  console.log(`\nDone. ${converted} converted, ${skipped} skipped (already had .webp/.avif).`);
  console.log("\nUsage in Next.js: import the .webp variant where you'd use .jpg.");
}

main().catch((err) => {
  console.error("Crash:", err);
  process.exit(1);
});
