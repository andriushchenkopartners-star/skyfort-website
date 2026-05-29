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
const KEY = process.env.INDEXNOW_KEY;

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

if (!KEY) {
  console.log("[DRY RUN] INDEXNOW_KEY not set. Would ping:");
  console.log(`  Host: ${HOST}`);
  console.log(`  URLs: ${URLS.length}`);
  for (const u of URLS) console.log(`  - ${u}`);
  console.log("\nSet INDEXNOW_KEY env var to actually ping.");
  process.exit(0);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
};

// Bing accepts IndexNow at api.indexnow.org which fans out to Yandex,
// Seznam, etc. One request hits all participating engines.
const endpoint = "https://api.indexnow.org/IndexNow";

console.log(`Pinging IndexNow with ${URLS.length} URLs…`);

try {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ IndexNow accepted (HTTP ${res.status}).`);
  } else {
    const text = await res.text();
    console.error(`✗ IndexNow rejected (HTTP ${res.status}): ${text}`);
    process.exit(1);
  }
} catch (err) {
  console.error("Network error:", err.message);
  process.exit(1);
}
