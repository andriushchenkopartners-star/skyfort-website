#!/usr/bin/env node
// scripts/indexnow-ping.mjs
// Pings the IndexNow protocol (Bing, Yandex, Seznam) with a list of URLs
// to request immediate re-indexing. Used after major content drops.
//
// Why this matters (Audit 6 #1, #3, #10): Google has no equivalent
// instant-indexing API in 2026; Bing + Yandex DO honor IndexNow. ChatGPT
// uses Bing for live search, so getting into Bing's index FAST is the
// fastest path to AI-citation surface area. Almost no Canadian financial
// advisor uses IndexNow — competitive advantage.
//
// Setup:
//   1. Generate a 32-char hex key: `openssl rand -hex 16`
//   2. Save as INDEXNOW_KEY environment variable
//   3. Place public/<key>.txt with the same key string as the file body
//      (verifies domain ownership for IndexNow)
//   4. Run: `node scripts/indexnow-ping.mjs`
//
// Without INDEXNOW_KEY set, the script prints what it WOULD ping and
// exits cleanly (useful for CI dry-runs).

const HOST = "sky-fort.ca";
// Key is hosted at https://sky-fort.ca/<KEY>.txt (committed in public/).
// Default falls back to the committed key so the script works without the
// env var; env var can override for key rotation.
const KEY = process.env.INDEXNOW_KEY || "e8331b7d58e3ee0f91d18b681cd28529";

// Pull the live sitemap so the URL list never goes stale — every page in
// the sitemap gets pinged. Falls back to the hardcoded URLS list below if
// the fetch fails.
async function fetchSitemapUrls() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    if (!res.ok) return null;
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return matches.length ? matches : null;
  } catch {
    return null;
  }
}

// Core URLs to ping. Extend this list when adding new pillar pages.
// IndexNow accepts up to 10,000 URLs per request — we keep this focused
// on top-priority pages that matter for SEO + AI search.
const URLS = [
  // Locale homepages
  "https://sky-fort.ca/uk",
  "https://sky-fort.ca/ru",
  "https://sky-fort.ca/en",
  // Trust / verification (YMYL E-E-A-T core)
  "https://sky-fort.ca/uk/pro-mene",
  "https://sky-fort.ca/uk/perevirka",
  "https://sky-fort.ca/uk/porivnyannia",
  "https://sky-fort.ca/uk/finfluencer-compliance",
  "https://sky-fort.ca/uk/eligibility",
  "https://sky-fort.ca/uk/presa",
  // ICP pillars
  "https://sky-fort.ca/uk/dlya-it-fakhivtsiv",
  "https://sky-fort.ca/uk/dlya-mediks",
  "https://sky-fort.ca/uk/dlya-pidpryyemtsiv",
  "https://sky-fort.ca/uk/case-studies",
  // Case studies (composites)
  "https://sky-fort.ca/uk/case-studies/it-fakhivets-rsu-vesting-strategy",
  "https://sky-fort.ca/uk/case-studies/mediks-mpc-incorporation-timeline",
  "https://sky-fort.ca/uk/case-studies/pidpryyemets-lcge-exit-planning",
  // Reference + tools
  "https://sky-fort.ca/uk/slovnyk",
  "https://sky-fort.ca/uk/tt-library",
  "https://sky-fort.ca/uk/calculators/tfsa-growth",
  "https://sky-fort.ca/uk/calculators/financial-freedom",
  "https://sky-fort.ca/uk/calculators/mortgage",
  "https://sky-fort.ca/uk/calculators/rsu-tax",
  "https://sky-fort.ca/uk/calculators/mer-impact",
  "https://sky-fort.ca/uk/calculators/mpc-vs-sole-proprietor",
  // Blog hub + 4 latest pillar posts
  "https://sky-fort.ca/uk/blog",
  "https://sky-fort.ca/uk/blog/csa-ciro-staff-notice-31-369-poyasnennya",
  "https://sky-fort.ca/uk/blog/rsu-vesting-kanada-podatkova-strategiya",
  "https://sky-fort.ca/uk/blog/mpc-vs-sole-proprietor-likari-koly-incorporate",
  "https://sky-fort.ca/uk/blog/lcge-qsbs-purification-roadmap-pidpryyemtsi",
  "https://sky-fort.ca/uk/blog/etf-placement-rrsp-tfsa-fhsa-strategy",
  "https://sky-fort.ca/uk/blog/cesg-maximum-strategy-resp",
  "https://sky-fort.ca/uk/blog/mortgage-stress-test-math-explainer",
];

// Prefer live sitemap (always current); fall back to the curated URLS list.
const sitemapUrls = await fetchSitemapUrls();
const finalUrls = sitemapUrls || URLS;
console.log(
  sitemapUrls
    ? `Loaded ${finalUrls.length} URLs from live sitemap.xml`
    : `Sitemap fetch failed — using ${finalUrls.length} curated fallback URLs`,
);

// IndexNow accepts up to 10,000 URLs per request. We're well under, but
// chunk at 1,000 for safety / cleaner partial-failure reporting.
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Bing accepts IndexNow at api.indexnow.org which fans out to Yandex,
// Seznam, etc. One request hits all participating engines.
const endpoint = "https://api.indexnow.org/IndexNow";

let allOk = true;
for (const [i, batch] of chunk(finalUrls, 1000).entries()) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: batch,
  };
  console.log(`Pinging IndexNow batch ${i + 1} with ${batch.length} URLs…`);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`  ✓ Batch ${i + 1} accepted (HTTP ${res.status}).`);
    } else {
      const text = await res.text();
      console.error(`  ✗ Batch ${i + 1} rejected (HTTP ${res.status}): ${text}`);
      allOk = false;
    }
  } catch (err) {
    console.error(`  ✗ Batch ${i + 1} network error: ${err.message}`);
    allOk = false;
  }
}

if (!allOk) process.exit(1);
console.log("✓ IndexNow ping complete — Bing + Yandex notified.");
