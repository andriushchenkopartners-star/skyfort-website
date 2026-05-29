#!/usr/bin/env node
// scripts/lighthouse.mjs
// PageSpeed Insights API runner — fetches Core Web Vitals + Lighthouse
// scores for a set of representative URLs against the live site. Free
// API, no auth required (anonymous tier ~25K req/day).
//
// Usage:
//   npm run lighthouse                        # default = sky-fort.ca
//   PSI_KEY=<key> npm run lighthouse          # higher rate limit
//
// Outputs a Markdown summary table you can paste into commit messages
// or share with the owner. Audit 6: addresses CWV recommendation
// without requiring local chromium install.

const ORIGIN = process.env.ORIGIN || "https://sky-fort.ca";
const KEY = process.env.PSI_KEY || "";

const ROUTES = [
  "/uk",
  "/uk/pro-mene",
  "/uk/dlya-it-fakhivtsiv",
  "/uk/dlya-mediks",
  "/uk/dlya-pidpryyemtsiv",
  "/uk/case-studies",
  "/uk/calculators/tfsa-growth",
  "/uk/calculators/mer-impact",
  "/uk/calculators/mpc-vs-sole-proprietor",
  "/uk/blog",
  "/uk/slovnyk",
];

const STRATEGIES = ["mobile", "desktop"];

const PSI_BASE = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function fmtScore(s) {
  if (s == null) return "—";
  return (s * 100).toFixed(0);
}

function fmtMs(v) {
  if (v == null) return "—";
  return Math.round(v) + "ms";
}

async function run(url, strategy) {
  const params = new URLSearchParams({
    url,
    strategy,
    category: "performance",
  });
  if (KEY) params.set("key", KEY);

  const res = await fetch(`${PSI_BASE}?${params}`);
  if (!res.ok) {
    return { error: `HTTP ${res.status}` };
  }
  const json = await res.json();
  if (!json.lighthouseResult) {
    return { error: "no lighthouseResult" };
  }
  const lh = json.lighthouseResult;
  const audits = lh.audits || {};
  const perfScore = lh.categories?.performance?.score;

  return {
    perfScore,
    lcp: audits["largest-contentful-paint"]?.numericValue,
    cls: audits["cumulative-layout-shift"]?.numericValue,
    inp: audits["interaction-to-next-paint"]?.numericValue,
    fcp: audits["first-contentful-paint"]?.numericValue,
    tbt: audits["total-blocking-time"]?.numericValue,
  };
}

async function main() {
  console.log(`\nLighthouse audit — ${ORIGIN}\n`);
  console.log(`| Route | Strategy | Perf | LCP | CLS | INP | FCP | TBT |`);
  console.log(`|---|---|---|---|---|---|---|---|`);

  for (const route of ROUTES) {
    for (const strategy of STRATEGIES) {
      const url = ORIGIN + route;
      const r = await run(url, strategy);
      if (r.error) {
        console.log(`| ${route} | ${strategy} | ERR ${r.error} | — | — | — | — | — |`);
        continue;
      }
      const cls = r.cls != null ? r.cls.toFixed(3) : "—";
      console.log(
        `| ${route} | ${strategy} | ${fmtScore(r.perfScore)} | ${fmtMs(r.lcp)} | ${cls} | ${fmtMs(r.inp)} | ${fmtMs(r.fcp)} | ${fmtMs(r.tbt)} |`,
      );
      // PSI free tier: 1 req/sec. Throttle to be safe.
      await new Promise((res) => setTimeout(res, 1100));
    }
  }

  console.log(
    `\nLegend: Perf = Performance score /100. LCP = Largest Contentful Paint (good <2500ms, poor >4000). CLS = Cumulative Layout Shift (good <0.1, poor >0.25). INP = Interaction to Next Paint (good <200ms, poor >500). FCP = First Contentful Paint. TBT = Total Blocking Time.\n`,
  );
}

main().catch((err) => {
  console.error("Crash:", err);
  process.exit(1);
});
