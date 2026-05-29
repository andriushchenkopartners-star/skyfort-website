import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["uk", "ru", "en"];
const DEFAULT_LOCALE = "uk";

// Routes that exist OUTSIDE the [locale] segment (UA-only landings + system files).
// Anything in this list passes through untouched.
const ROOT_PASSTHROUGH = [
  "/tfsa-kalkulyator",
  "/ipoteka-kalhari",
  "/exempt-market-ukrayintsyam",
  "/blog/rss.xml",
  "/consult.html",
  "/api",
  "/_next",
  "/favicon.ico",
  "/icon.svg",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/og-image.png",
  "/andrii.jpg",
  "/calgary-hero.webp",
  "/freedom-cta.webp",
  "/llms.txt",
];

function pickLocale(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";");
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), q: isNaN(q) ? 1 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const short = tag.slice(0, 2);
    if (SUPPORTED_LOCALES.includes(short)) return short;
  }
  return DEFAULT_LOCALE;
}

// Helper — always pass through with the pathname header attached, so the
// root layout can render the correct <html lang> per locale. Without this,
// /ru and /en would still ship with the hardcoded lang="uk" (caught by the
// 3rd re-audit). Adding the header costs nothing — it's a single .set()
// on a Headers clone.
function passWithLangHeader(request) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

// Audit 7 #2: legacy SkyFort Estate URLs that Google still has indexed.
// Returning **410 Gone** (instead of 404) signals "permanently removed,
// please de-index" to Googlebot, which speeds up removal vs 404's
// "maybe-temporary" semantics. Owner can also file GSC Removals — 410
// makes those approvals faster.
//
// Match prefixes (RegExp source kept readable):
const LEGACY_GONE_PATTERNS = [
  /^\/agent(\/|$)/,
  /^\/property(\/|$)/,
  /^\/listings?(\/|$)/,
  /^\/mls(\/|$)/,
];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Legacy Estate URLs → 410 Gone. Crawlers de-index faster than on 404.
  if (LEGACY_GONE_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="uk"><head><title>410 Gone — SkyFort Wealth</title><meta name="robots" content="noindex"/></head><body style="font-family:sans-serif;max-width:640px;margin:80px auto;padding:0 20px;color:#fafafa;background:#191919"><h1 style="color:#2D73E3">410 — Сторінку видалено</h1><p>Це посилання вело на стару версію сайту (SkyFort Estate, real-estate). Поточний сайт — фінансові послуги SkyFort Wealth.</p><p><a href="/" style="color:#2D73E3">→ На головну SkyFort Wealth</a></p></body></html>`,
      { status: 410, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  // Pass-through for assets, API, and UA-only landings.
  if (ROOT_PASSTHROUGH.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return passWithLangHeader(request);
  }

  // Asset files (anything with a file extension) — leave alone (no need for
  // lang header on static files).
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  // Already starts with a supported locale → pass through with lang header.
  const firstSegment = pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return passWithLangHeader(request);
  }

  // Legacy URL redirects (old multilingual pages → /uk equivalent).
  // The default redirect preserves the path and forces uk; if user has a
  // language cookie/header preference, honor it.
  const detectedLocale = pickLocale(request.headers.get("accept-language"));
  const targetLocale = detectedLocale;

  const newUrl = request.nextUrl.clone();
  if (pathname === "/" || pathname === "") {
    newUrl.pathname = `/${targetLocale}`;
  } else {
    newUrl.pathname = `/${targetLocale}${pathname}`;
  }
  return NextResponse.redirect(newUrl, { status: 308 }); // 308 = permanent + preserve method
}

export default proxy;

export const config = {
  // Match everything except Next internals and static files (we re-check inside).
  matcher: ["/((?!_next/static|_next/image|_vercel).*)"],
};
