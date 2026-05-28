# SkyFort — repo guide for Claude

## What this is

Personal site of **Andrii Andriushchenko**, Licensed Dealing Representative (NRD #4575551) registered with **Axcess Capital Advisors Inc.** (Exempt Market Dealer). Domain: **sky-fort.ca**.

Target audience: Ukrainian/Russian-speaking newcomers and diaspora in Canada (AB primary, BC, ON). Three content languages: Ukrainian (primary), Russian, English.

## Regulatory constraints — MUST follow on every change

This site is operated by a registered Dealing Representative under an EMD. Everything is **educational**, never advice.

- **Never** state or imply specific return percentages for any specific investment.
- **Never** make personal recommendations on the site ("you should buy X"). Always frame as frameworks/concepts.
- **Always** include the disclaimer in footer (already present in `t.<lang>.footer.disclaimer`).
- **Always** keep the NRD number (#4575551) and firm name (Axcess Capital Advisors Inc.) accessible — currently in `app/layout.js` JSON-LD and `/pro-mene`.
- Lookup link for verification: `https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx` (NRD search).
- Historical broad-market figures (e.g., "7–12% historical ETF return") are OK with source attribution.

When in doubt, prefer educational framing: "How TFSA works" not "Use this TFSA strategy".

## Tech stack

- **Next.js 16.2.6** App Router, **React 19**, JavaScript (no TypeScript yet — planned Phase 5).
- **Tailwind CSS v4** via `@tailwindcss/postcss`. Theme tokens in `app/globals.css` under `@theme inline`. No `tailwind.config.js` (v4 pattern).
- **Manrope** font (Google Fonts, cyrillic subset) via `next/font/google` in `app/layout.js`.
- **lucide-react** for icons. **recharts** for charts (lazy-load on calculator pages only).
- Deploys assumed to Vercel.

## Project structure

```
app/
  layout.js                  # root html, metadata, JSON-LD (FinancialService + LocalBusiness)
  globals.css                # design tokens (@theme inline) + utility classes
  Nav.jsx                    # fixed burger nav (locale-aware)
  sitemap.js                 # multilingual sitemap with hreflang
  robots.js                  # robots.txt (AI crawlers allowed: GPTBot, ClaudeBot, PerplexityBot)
  manifest.webmanifest       # PWA manifest

  api/
    lead/route.js            # legacy lead capture
    email-subscribe/route.js # Brevo subscription (lead magnets)
    consultation/route.js    # Calendly booking events
    topic-request/route.js   # "suggest a topic" form
    portal/                  # portal auth + admin push endpoints
    admin/                   # admin-only ops

  [locale]/                  # uk | ru | en — Phase 2 DONE (param-based, no next-intl pkg)
    layout.js                # validates locale, sets canonical + hreflang via generateMetadata
    page.js                  # homepage (client component, uses dictionary)
    pro-mene/                # about page (+about-client.jsx, FAQ schema)
    perevirka/               # "Verify me in 3 minutes" YMYL trust page (audit 3.5)
    porivnyannia/            # EMD vs CIRO vs Insurance comparison (audit 3.12)
    presa/                   # Press / Media page with Person + Org JSON-LD (audit 3.20)
    eligibility/             # Eligible/Accredited Investor 4-Q self-check (audit 3.3)
                             # Quiz client component + server JSON-LD wrapper.
    contact/  privacy/  cookies/   # added in cookie-consent batch
    services/                # service+city programmatic pages (Phase 2 SEO)
    calculators/{tfsa-growth,mortgage,financial-freedom}/
    blog/  blog/[slug]/      # MDX blog hub (8 posts × 3 locales, author byline + Article JSON-LD)
    resources/               # gated PDF library (noindex)
    links/                   # external links
    tt/                      # TikTok bio-link landing (Phase 3.10)
    portal/                  # client portal (Phase 5 — invitation-only dashboard)
    admin/portal/            # admin tools for Andrii (Phase 4 portal)
    *opengraph-image.js      # dynamic Satori-rendered OG cards on every key
                             # route (homepage, calc, /pro-mene, /tt, /perevirka,
                             # /porivnyannia, /presa, service×city, blog post)

  # Legacy SEO landings (Ukrainian-only, keyword-targeted, NOT under [locale]).
  # Keep their own canonical; do not duplicate under /uk.
  exempt-market-ukrayintsyam/page.js
  ipoteka-kalhari/page.js
  tfsa-kalkulyator/page.js

  _components/               # shared atoms — Button, Card, Section, Container, Heading,
                             # Eyebrow, Breadcrumbs, Logo, LangSwitcher, CookieConsent,
                             # EmailCaptureForm, StickyBlogCTA, TrustBar, WhatsAppButton,
                             # TopicSuggestForm, FaqJsonLd, TikTokIcon, portal/*
  _sections/                 # homepage sections — Hero, Stats, About, Guides, CalcPromo,
                             # MortgagePromo, FireCalcPromo, Steps, Faq, Testimonials,
                             # FinalCta, Footer, HomeNav
  _i18n/
    dictionary.js            # main t = { uk, ru, en } + SUPPORTED_LOCALES + resolveLocale
    portal-dictionary.js     # portal-specific strings
    config.js                # locale constants
  _data/                     # static data (testimonials, etc.)
  _lib/
    hooks.js                 # useIsMounted / useLocalStorage / useSessionStorage
                             # — useSyncExternalStore-based, replaces mount-flag
                             # + setState-in-effect anti-pattern.
    analytics.js             # GA4 + Clarity `track()` + named event helpers
    blog.js                  # MDX frontmatter loader
    services-cities.js       # service × city programmatic SEO config
    portal/                  # Supabase, formatters, portal constants

public/
  andrii.jpg                 # portrait — optimized 1500×2000 @ 304KB (was 2MB)
  andrii.webp                # WebP variant @ 207KB
  andrii-thumb.jpg / .webp   # 400×533 thumbnail for avatars
  calgary-hero.webp          # hero background
  freedom-cta.webp           # CTA background
  og-image.png               # default OG fallback (blog uses dynamic — see below)
  icon.svg                   # site icon (rendered at runtime via next/image)
  icon-email.png             # 194×180 PNG version for email signatures (Outlook
                             # silently fails on SVG)
  favicon.ico
  llms.txt                   # AI crawler manifest
```

## Design system — single source of truth

All design tokens live in `app/globals.css` under `:root` and exposed to Tailwind via `@theme inline`. **Never hardcode hex colors in JSX.** If a value is missing, add a token in `globals.css` first.

### Brand color

**Single brand blue**: `#2D73E3` (token `--color-brand` / Tailwind class `bg-brand`, `text-brand`).

### Accent gold (calculator highlight)

`--color-accent: #ffb627` + `--color-accent-hover: #ffd066` exposed as
Tailwind `bg-accent`, `text-accent`, `border-accent`, `bg-accent-hover`.
The two remaining `color: "#FFB627"` literals are intentional — they're
inside recharts data arrays, and recharts can't read CSS variables.

### React 19 patterns

Two new rules in `eslint-plugin-react-hooks` are now strictly enforced:
- `react-hooks/set-state-in-effect` — calling setState synchronously in a
  useEffect triggers cascading renders. Use `useSyncExternalStore` for
  external state (localStorage / sessionStorage / `is-this-mounted`). Shared
  hooks for these patterns live in `app/_lib/hooks.js`.
- `react-hooks/purity` — variables declared in the component body cannot be
  reassigned during the render phase, and impure functions (Math.random,
  Date.now) cannot run during render. Move accumulators to `reduce(...)` and
  extract impure helpers to module scope.

### Spacing, type scale, radii, shadows
See `app/globals.css` for the canonical list. Use Tailwind utilities that resolve to these tokens (e.g., `text-display-lg`, `rounded-lg`, `shadow-card`).

## i18n model

**Implemented** (Phase 2 — DONE, without `next-intl` package): `[locale]` segment routing with `uk | ru | en`. Each page reads `params.locale`, resolves via `resolveLocale()` from `app/_i18n/dictionary.js`, picks strings from `dictionary[locale]`. Unsupported locales 404 via `notFound()` in `[locale]/layout.js`.

- URLs: `/uk/...`, `/ru/...`, `/en/...`. Root `/` 308-redirects to `/uk` (middleware or layout-level — check `middleware.js` if present, otherwise next.config redirects).
- `[locale]/layout.js` sets correct per-page `canonical: /${locale}` and full `languages` hreflang map via `generateMetadata`.
- Root `app/layout.js` defaults to `/uk` (used only by legacy SEO landings + API routes, not by `[locale]` tree).
- Language switcher: `_components/LangSwitcher.jsx` rewrites the current path to the chosen locale; persists nothing in localStorage anymore (URL is source of truth).
- Dictionary structure: `dictionary[locale]` is the top-level shape — every key under it is the same across locales. UK is the source; RU/EN are translations.

When adding strings: add UK first, then RU + EN. Never let a locale silently fall back — the schema check in `resolveLocale` would mask a bug.

## Content philosophy (organic + TikTok funnel)

**TikTok is the #1 organic channel** — already converted multiple clients including one large. The whole site is the bottom of the TikTok funnel.

- `/tt` (and `/uk/tt`, `/ru/tt`, `/en/tt`) is the bio-link landing for TikTok. Optimize for mobile, ≤200ms TTFB, single primary CTA above the fold.
- Every external link from TikTok → site should carry UTMs: `?utm_source=tiktok&utm_medium=organic&utm_campaign=<video-or-bio>`.
- Blog posts (Phase 3) draw from TikTok transcripts (Whisper → Claude → MDX). 5–10 short videos on one topic = one pillar article.
- Calculators are SEO-friendly landings with shareable results (Phase 5: programmatic SEO for parameter variants).

## Analytics & tracking

(Set up in Phase 0)
- **GA4** — env var `NEXT_PUBLIC_GA_ID` consumed in `app/layout.js`.
- **Microsoft Clarity** — env var `NEXT_PUBLIC_CLARITY_ID`.
- **Search Console** — verified via meta tag in `app/layout.js:54`.
- Event taxonomy: `book_call_click`, `guide_download`, `calculator_run`, `lang_switch`, `form_submit`, `tt_landing_view`, `tt_cta_*_click`, `email_capture`.

## Lead routes (current)

- `/api/lead` — POST, legacy form capture.
- `/api/email-subscribe` — POST, Brevo subscription with lead-magnet tagging (used by `EmailCaptureForm`).
- `/api/consultation` — POST, Calendly booking event echo for analytics.
- `/api/topic-request` — POST, "suggest a topic" form.
- `/api/portal/*` — auth + client-facing portal API.
- `/api/admin/*` — admin-only ops (push doc / message / todo to a client).
- Calendly: `https://calendly.com/andriushchenko-partners/new-meeting`.
- Contact: `+1-403-397-2553` · `andrii@sky-fort.ca`.

## Phase status (snapshot)

- **Phase 0** — analytics: GA4 + Clarity env-driven in `app/layout.js`, Search Console verified. DONE.
- **Phase 1** — design system + component extraction. DONE. Accent gold token migrated; lint baseline at 0 errors / 0 warnings.
- **Phase 2** — `[locale]` routing + hreflang + sitemap. DONE.
  - Programmatic service+city pages under `[locale]/services/` (72 URLs across 3 locales).
  - **FAQ schema** (FAQPage JSON-LD + visible `<details>` accordion via `_components/StaticFaq.jsx`) on all 3 calculator pages, `/contact`, `/services/*`, `/pro-mene`, `/porivnyannia`, and the homepage (12 questions in 3 langs).
  - **Dynamic OG images** for blog posts, homepage, all 3 calculators, /pro-mene, /tt, /perevirka, /porivnyannia, /presa, and service×city — all via shared `_lib/og-card.jsx` brandCard() helper. Twitter falls back to OG so one card serves both.
  - **RelatedLinks** (`_components/RelatedLinks.jsx`) for cross-page internal linking on calculators.
  - **YMYL trust pages** — `/perevirka` (4-step verification walkthrough) + `/porivnyannia` (EMD vs CIRO vs Insurance comparison) + `/presa` (press/media page with Person+Org JSON-LD).
  - Performance: andrii.jpg 2MB → 304KB, freedom-cta.webp 472K → 418K, recharts lazy-loaded via next/dynamic, GA/Clarity/Calendly preconnected.
  - Sitemap uses `git log -1 --format=%cI` per source file for real lastModified.
  - Footer carries finfluencer disclosure per Joint CSA/CIRO Staff Notice 31-369.
- **Phase 3** — blog hub: scaffolded (`[locale]/blog/`, `[locale]/blog/[slug]/`, `app/blog/rss.xml/`). 8 pillar posts in UA + RU, EN partial. Sitemap + dynamic OG + JSON-LD all wired.
- **Phase 3.10** — TikTok bio-link `/tt`. DONE.
- **Phase 4** — email capture + lead nurture: `EmailCaptureForm` + Brevo wired. Testimonials section + Review schema live. Cookie consent banner + `/contact`, `/privacy`, `/cookies` (3 locales). Sticky blog CTA. DONE.
- **Phase 5** — TypeScript migration + programmatic SEO for calculator parameter variants. NOT STARTED.
- **Phase 5.5 / Client Portal** — invitation-only `/uk/portal` dashboard with admin push tools. DONE for Phase 5; Phase 6 (email notifications via Brevo/Resend) planned.
- **GBP / Local SEO** — copy ready (3 langs), enhanced LocalBusiness JSON-LD in root layout. Awaiting Andrii to paste into Google Business Profile.

## Style for this repo

- Edit existing files when possible; don't sprout new abstractions.
- No `.md` files outside docs/ unless the user asks.
- Ukrainian UI copy is the source; ru and en are translations. Keep wording neutral and educational.
- Match existing code patterns (App Router, JS, Tailwind classes, lucide icons).
- File naming: PascalCase for components (`Button.jsx`), kebab-case for routes (`tfsa-growth/page.js`).

## Common commands

```bash
npm run dev     # localhost:3000
npm run build
npm run start
npm run lint
```

## Plan reference

Full multi-phase plan lives at `/Users/aandriushchenko/.claude/plans/enchanted-waddling-puffin.md`. Refer to it for context on why a given change is being made.
