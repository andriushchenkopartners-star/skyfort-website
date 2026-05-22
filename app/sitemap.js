export default function sitemap() {
  const base = "https://sky-fort.ca";
  const pages = [
    "",
    "/pro-mene",
    "/calculators/tfsa-growth",
    "/calculators/financial-freedom",
    "/calculators/mortgage",
    "/tfsa-kalkulyator",
    "/exempt-market-ukrayintsyam",
    "/ipoteka-kalhari",
    "/links",
  ];
  return pages.map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
