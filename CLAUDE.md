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
  layout.js                  # root html, metadata, JSON-LD (FinancialService)
  page.js                    # homepage (currently monolithic ~1200 lines — refactor in Phase 1)
  globals.css                # design tokens (@theme inline) + utility classes
  Nav.jsx                    # fixed burger nav (still has inline <style> — refactor in Phase 1)
  sitemap.js                 # static sitemap (Phase 2: multilingual rebuild)
  robots.js                  # robots.txt (AI crawlers allowed: GPTBot, ClaudeBot, PerplexityBot)
  manifest.webmanifest       # PWA manifest

  api/lead/route.js          # lead capture endpoint

  calculators/{tfsa-growth,mortgage,financial-freedom}/page.js
  pro-mene/page.js + about-client.jsx
  resources/                 # gated document library (noindex required)
  links/                     # external links page
  exempt-market-ukrayintsyam/
  ipoteka-kalhari/
  tfsa-kalkulyator/

  _components/               # (created in Phase 1) Button, Card, Section, Container, Heading, ...
  _sections/                 # (Phase 1) HeroSection, GuidesSection, ...
  _i18n/dictionary.js        # (Phase 1) extracted t = { uk, ru, en } from page.js

  tt/                        # (Phase 3.10) TikTok bio-link landing

public/
  andrii.jpg                 # portrait
  calgary-hero.webp          # hero background
  freedom-cta.webp           # CTA background
  og-image.png               # default OG image
  icon.svg, favicon.ico
```

## Design system — single source of truth

All design tokens live in `app/globals.css` under `:root` and exposed to Tailwind via `@theme inline`. **Never hardcode hex colors in JSX.** If a value is missing, add a token in `globals.css` first.

### Brand color

**Single brand blue**: `#2D73E3` (token `--color-brand` / Tailwind class `bg-brand`, `text-brand`).

Known drift to fix on touch (older code):
- `#2563EB` (in `app/page.js` Logo component) → replace with `text-brand`
- `#2f6bff`, `#4f86ff` (in `app/Nav.jsx` inline styles) → replace with `--color-brand` / `--color-brand-hover`
- `#FFB627` (accent gold, in some calculators) → use `--color-accent` token if kept

### Spacing, type scale, radii, shadows
See `app/globals.css` for the canonical list. Use Tailwind utilities that resolve to these tokens (e.g., `text-display-lg`, `rounded-lg`, `shadow-card`).

## i18n model

**Current** (legacy, until Phase 2 completes): client-side `t = { uk, ru, en }` object per page, language switch via `localStorage` and `navigator.language`. Single URL `/` serves all languages.

**Target** (Phase 2 — `next-intl` + `[locale]` segments):
```
app/
  [locale]/
    layout.js
    page.js
    pro-mene/page.js          # OR localized: about / obo-mne
    calculators/...
```
URLs become `/uk/...`, `/ru/...`, `/en/...`. Old URLs must 301 to new (`next.config.mjs` `redirects()`).

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

- `/api/lead` (`app/api/lead/route.js`) — POST captures form submissions. Phase 4: extend to email subscription + Brevo/Resend integration.
- Calendly: `https://calendly.com/andriushchenko-partners/new-meeting`.
- Contact: `+1-403-397-2553` · `andrii@sky-fort.ca`.

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
