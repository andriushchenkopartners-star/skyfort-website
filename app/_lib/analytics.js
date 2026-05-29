// Centralized event tracking. Safe to call before GA loads — events queue in dataLayer.
// Use these helpers everywhere instead of calling gtag directly.

export function track(eventName, params = {}) {
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

export const trackGuideDownload = (guideFile, source = "homepage") =>
  track("guide_download", { guide_file: guideFile, source });

export const trackCalculatorRun = (calculator, params = {}) =>
  track("calculator_run", { calculator, ...params });

export const trackLangSwitch = (from, to) =>
  track("lang_switch", { from, to });

export const trackFormSubmit = (formId, result = "success") =>
  track("form_submit", { form_id: formId, result });

export const trackEmailCapture = (source, leadMagnet = null) =>
  track("email_capture", { source, lead_magnet: leadMagnet });

// TikTok funnel events
export const trackTtLandingView = (utmCampaign = "bio") =>
  track("tt_landing_view", { utm_campaign: utmCampaign });

export const trackTtCtaClick = (cta) =>
  track("tt_cta_click", { cta }); // cta = book | guide | calculator | whatsapp

// ─── CRO: scroll-depth + CTA position events ─────────────────────────────────
// Audit 5 #7 (CRO instrumentation). Use ScrollDepthTracker component which
// fires these at 25 / 50 / 75 / 100 % of page scrolled. `page` should be a
// short slug like "dlya-it-fakhivtsiv" or "finfluencer-compliance" so GA4
// dimensions stay clean.
export const trackScrollDepth = (page, pct) =>
  track("scroll_depth", { page, percent: pct });

// CTA position tracking on long pillar pages. Lets us A/B which CTA
// position (hero / mid / footer / sticky-bar) converts best.
//   position = "hero" | "mid" | "footer" | "sticky"
//   cta      = "book_call" | "eligibility_check" | "email_capture"
export const trackCtaPosition = (page, position, cta) =>
  track("cta_position_click", { page, position, cta });

// ─── UTM helpers ─────────────────────────────────────────────────────────────

// Persist UTM params to sessionStorage on first visit, so attribution survives navigation.
export function captureUtmsOnLoad() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(key);
    if (v) utms[key] = v;
  }
  if (Object.keys(utms).length === 0) return;
  try {
    sessionStorage.setItem("skyfort_utms", JSON.stringify(utms));
  } catch {}
}

export function getStoredUtms() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("skyfort_utms") || "{}");
  } catch {
    return {};
  }
}

// Append stored UTMs to a URL (so e.g. Calendly link keeps the source attribution).
export function withUtms(url) {
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
