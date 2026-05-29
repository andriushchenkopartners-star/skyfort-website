// Centralized event tracking. Safe to call before GA loads — events queue in dataLayer.
// Use these helpers everywhere instead of calling gtag directly.

// Global gtag/clarity types — narrow declarations for the two surfaces we use.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type EventParams = Record<string, unknown>;

export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  // Microsoft Clarity custom event (it auto-tracks most things, but custom tags help segmentation)
  if (typeof window.clarity === "function") {
    window.clarity("set", eventName, JSON.stringify(params));
  }
}

// ─── Named events (canonical list — keep in sync with CLAUDE.md taxonomy) ────

export const trackBookCallClick = (source = "unknown") =>
  track("book_call_click", { source });

export const trackGuideDownload = (guideFile: string, source = "homepage") =>
  track("guide_download", { guide_file: guideFile, source });

export const trackCalculatorRun = (calculator: string, params: EventParams = {}) =>
  track("calculator_run", { calculator, ...params });

export const trackLangSwitch = (from: string, to: string) =>
  track("lang_switch", { from, to });

export const trackFormSubmit = (formId: string, result = "success") =>
  track("form_submit", { form_id: formId, result });

export const trackEmailCapture = (source: string, leadMagnet: string | null = null) =>
  track("email_capture", { source, lead_magnet: leadMagnet });

// TikTok funnel events
export const trackTtLandingView = (utmCampaign = "bio") =>
  track("tt_landing_view", { utm_campaign: utmCampaign });

export const trackTtCtaClick = (cta: string) =>
  track("tt_cta_click", { cta }); // cta = book | guide | calculator | whatsapp

// ─── CRO: scroll-depth + CTA position events ─────────────────────────────────
// Audit 5 #7 (CRO instrumentation). Use ScrollDepthTracker component which
// fires these at 25 / 50 / 75 / 100 % of page scrolled. `page` should be a
// short slug like "dlya-it-fakhivtsiv" or "finfluencer-compliance" so GA4
// dimensions stay clean.
export const trackScrollDepth = (page: string, pct: number) =>
  track("scroll_depth", { page, percent: pct });

// CTA position tracking on long pillar pages.
//   position = "hero" | "mid" | "footer" | "sticky"
//   cta      = "book_call" | "eligibility_check" | "email_capture"
export const trackCtaPosition = (page: string, position: string, cta: string) =>
  track("cta_position_click", { page, position, cta });

// Site search events.
export const trackSearchOpen = (source = "kbd") => track("search_open", { source });
export const trackSearchQuery = (query: string, resultCount: number) =>
  track("search_query", { query, result_count: resultCount });
export const trackSearchClick = (query: string, url: string, position: number) =>
  track("search_click", { query, url, position });

// ─── UTM helpers ─────────────────────────────────────────────────────────────

// Persist UTM params to sessionStorage on first visit, so attribution survives navigation.
export function captureUtmsOnLoad(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(key);
    if (v) utms[key] = v;
  }
  if (Object.keys(utms).length === 0) return;
  try {
    sessionStorage.setItem("skyfort_utms", JSON.stringify(utms));
  } catch {}
}

export function getStoredUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("skyfort_utms") || "{}");
  } catch {
    return {};
  }
}

// Append stored UTMs to a URL (so e.g. Calendly link keeps the source attribution).
export function withUtms(url: string): string {
  const utms = getStoredUtms();
  if (Object.keys(utms).length === 0) return url;
  try {
    const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "https://sky-fort.ca");
    for (const [k, v] of Object.entries(utms)) {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return url;
  }
}
