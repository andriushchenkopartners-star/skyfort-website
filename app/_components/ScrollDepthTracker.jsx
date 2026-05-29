// app/_components/ScrollDepthTracker.jsx
// Client-only widget that fires scroll_depth GA4 events at 25/50/75/100%
// of page scroll. Drop into any long page (ICP pillars, blog posts, slovnyk)
// to know which sections users actually reach.
//
// Each threshold fires AT MOST ONCE per page-view (Set tracks crossed
// thresholds). Listener is `passive: true` so it doesn't block scrolling.
//
// Usage:
//   <ScrollDepthTracker page="dlya-it-fakhivtsiv" />

"use client";

import { useEffect } from "react";
import { trackScrollDepth } from "../_lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export default function ScrollDepthTracker({ page }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!page) return;

    const fired = new Set();

    function onScroll() {
      const doc = document.documentElement;
      const scrolled = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight || doc.clientHeight;
      const full = doc.scrollHeight - viewport;
      if (full <= 0) return;
      const pct = Math.min(100, Math.round((scrolled / full) * 100));

      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackScrollDepth(page, t);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once on mount in case page is short and already 100% visible.
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  return null;
}
