#!/usr/bin/env node
// scripts/validate-jsonld.mjs
// Static JSON-LD validator for SkyFort. Crawls the deployed site or local
// build URLs, parses every `<script type="application/ld+json">`, and
// validates each one. Catches broken / drifted JSON-LD before Google Rich
// Results Test would.
//
// Usage:
//   node scripts/validate-jsonld.mjs                 # validates https://sky-fort.ca
//   node scripts/validate-jsonld.mjs http://localhost:3000   # validates local build
//
// Audit 5 #11 (Batch 9): pre-commit / pre-deploy schema sanity check.

const ORIGIN = process.argv[2] || "https://sky-fort.ca";

// Representative sample of routes that emit JSON-LD. Each batch should
// add new pages here. Order = priority (first errors halt early).
const ROUTES = [
  // Locale homepages
  "/uk",
  "/ru",
  "/en",
  // YMYL trust
  "/uk/pro-mene",
  "/uk/perevirka",
  "/uk/porivnyannia",
  "/uk/eligibility",
  "/uk/finfluencer-compliance",
  // ICP pillars
  "/uk/dlya-it-fakhivtsiv",
  "/uk/dlya-mediks",
  "/uk/dlya-pidpryyemtsiv",
  // Cases + reference
  "/uk/case-studies",
  "/uk/case-studies/it-fakhivets-rsu-vesting-strategy",
  "/uk/case-studies/mediks-mpc-incorporation-timeline",
  "/uk/case-studies/pidpryyemets-lcge-exit-planning",
  "/uk/tt-library",
  "/uk/slovnyk",
  // Calculators
  "/uk/calculators/rsu-tax",
  "/uk/calculators/tfsa-growth",
  "/uk/calculators/mer-impact",
  "/uk/calculators/mpc-vs-sole-proprietor",
  // Blog
  "/uk/blog",
  "/uk/blog/csa-ciro-staff-notice-31-369-poyasnennya",
  "/uk/blog/rsu-vesting-kanada-podatkova-strategiya",
  "/uk/blog/etf-placement-rrsp-tfsa-fhsa-strategy",
  "/uk/blog/cesg-maximum-strategy-resp",
  "/uk/blog/t1135-foreign-property-newcomer",
  "/uk/blog/newcomer-first-year-tax-mistakes",
  // Programmatic
  "/uk/services/tfsa/calgary",
];

// Required properties per @type. Aligned with Schema.org spec + Google
// Rich Results requirements (the latter being stricter — included where
// known).
const REQUIRED_BY_TYPE = {
  Article: ["headline"],
  FAQPage: ["mainEntity"],
  // Google Rich Results for video want: name, description, thumbnailUrl,
  // uploadDate. Our validator checks the spec minimum.
  VideoObject: ["name", "uploadDate", "thumbnailUrl"],
  WebPage: [], // Speakable parent — speakable property is optional
  Person: ["name"],
  Organization: ["name"],
  FinancialService: ["name"],
  LocalBusiness: ["name"],
  HowTo: ["name", "step"],
  DefinedTermSet: ["hasDefinedTerm"],
  DefinedTerm: ["name", "description"],
  Service: ["name"],
  MedicalWebPage: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  ItemList: ["itemListElement"],
  WebApplication: ["name"],
  Quiz: ["name"],
  Question: ["name", "acceptedAnswer"],
  // Batch 14 additions for completeness
  Course: ["name", "description", "provider"],
  Event: ["name", "startDate", "location"],
  Product: ["name"],
  Recipe: ["name", "recipeIngredient", "recipeInstructions"],
  Review: ["reviewRating", "author"],
  Rating: ["ratingValue"],
  AggregateRating: ["ratingValue", "ratingCount"],
  Answer: ["text"],
  ListItem: ["position"],
  ImageObject: ["url"],
  Occupation: ["name"],
  EducationalOccupationalCredential: ["credentialCategory"],
  PostalAddress: ["addressLocality", "addressCountry"],
  ContactPoint: ["telephone"],
  Place: ["name"],
  Country: ["name"],
  AdministrativeArea: ["name"],
  CreativeWork: ["name"],
  SpeakableSpecification: ["cssSelector"],
  InteractionCounter: ["interactionType"],
  WatchAction: [],
  Offer: ["price", "priceCurrency"],
  OfferCatalog: ["name"],
  Brand: ["name"],
  Thing: ["name"],
  MedicalAudience: [],
  Audience: ["audienceType"],
  GeoCoordinates: ["latitude", "longitude"],
  OpeningHoursSpecification: ["opens", "closes"],
  SearchAction: ["target"],
  WebSite: ["url"],
};

function getContextString(ctx) {
  if (!ctx) return "";
  if (typeof ctx === "string") return ctx;
  if (Array.isArray(ctx)) return ctx.map(getContextString).join(" ");
  if (typeof ctx === "object") return JSON.stringify(ctx);
  return "";
}

function validateNode(node, route, errors, opts = { requireContext: true }) {
  if (!node || typeof node !== "object") return;
  // @graph wrapper — children inherit parent's @context per JSON-LD spec.
  if (Array.isArray(node["@graph"])) {
    const ctxStr = getContextString(node["@context"]);
    if (!ctxStr || !ctxStr.includes("schema.org")) {
      errors.push(`[${route}] @graph parent missing schema.org @context: ${ctxStr || "(empty)"}`);
    }
    for (const child of node["@graph"]) {
      validateNode(child, route, errors, { requireContext: false });
    }
    return;
  }
  if (opts.requireContext) {
    const ctxStr = getContextString(node["@context"]);
    if (!ctxStr || !ctxStr.includes("schema.org")) {
      errors.push(`[${route}] missing or non-schema.org @context: ${ctxStr || "(empty)"}`);
    }
  }
  const t = node["@type"];
  if (!t) {
    errors.push(`[${route}] missing @type`);
    return;
  }
  const types = Array.isArray(t) ? t : [t];
  for (const ty of types) {
    const required = REQUIRED_BY_TYPE[ty];
    if (!required) continue;
    for (const prop of required) {
      if (node[prop] === undefined || node[prop] === null) {
        errors.push(`[${route}] @type=${ty} missing required prop "${prop}"`);
      }
    }
  }
}

function extractJsonLd(html) {
  const re = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

async function main() {
  const errors = [];
  let scriptCount = 0;
  for (const route of ROUTES) {
    const url = ORIGIN + route;
    let html;
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) {
        errors.push(`[${route}] HTTP ${res.status}`);
        continue;
      }
      html = await res.text();
    } catch (err) {
      errors.push(`[${route}] fetch failed: ${err.message}`);
      continue;
    }
    const scripts = extractJsonLd(html);
    if (scripts.length === 0) {
      errors.push(`[${route}] no JSON-LD scripts found (unexpected — every page should have at least site-wide LocalBusiness)`);
      continue;
    }
    for (const raw of scripts) {
      scriptCount++;
      let node;
      try {
        node = JSON.parse(raw);
      } catch (err) {
        errors.push(`[${route}] JSON parse error: ${err.message}`);
        continue;
      }
      validateNode(node, route, errors);
    }
  }

  console.log(`Scanned ${ROUTES.length} routes, ${scriptCount} JSON-LD blocks. Found ${errors.length} issues.`);
  if (errors.length > 0) {
    for (const e of errors.slice(0, 50)) console.log("  " + e);
    if (errors.length > 50) console.log(`  ... and ${errors.length - 50} more`);
    process.exit(1);
  }
  console.log("✓ All JSON-LD blocks valid.");
}

main().catch((err) => {
  console.error("Validator crashed:", err);
  process.exit(1);
});
