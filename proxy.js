import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["uk", "ru", "en"];
const DEFAULT_LOCALE = "uk";

// Routes that exist OUTSIDE the [locale] segment (UA-only landings + system files).
// Anything in this list passes through untouched.
const ROOT_PASSTHROUGH = [
  "/tfsa-kalkulyator",
  "/ipoteka-kalhari",
  "/exempt-market-ukrayintsyam",
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

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Pass-through for assets, API, and UA-only landings.
  if (ROOT_PASSTHROUGH.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Asset files (anything with a file extension) — leave alone.
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  // Already starts with a supported locale → pass through.
  const firstSegment = pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return NextResponse.next();
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
