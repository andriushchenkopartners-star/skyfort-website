// app/_components/StickyCta.tsx
// Sticky "Book a call" bar that appears after the user has scrolled past
// 50% of a long pillar page. Pairs with ScrollDepthTracker for full
// attribution: we know which 50%-readers convert via the sticky CTA
// vs the hero CTA vs the footer CTA.
//
// Fires `cta_position_click` with position="sticky" when clicked.
// Use trackCtaPosition() from analytics.js with page="<slug>" so dashboard
// can A/B test which CTA placement converts best per audience.
//
// Usage on a pillar page:
//   <StickyCta locale={locale} page="dlya-it-fakhivtsiv" />
//
// Hides if user dismisses (sessionStorage flag) so it doesn't nag.

"use client";

import { useEffect, useState } from "react";
import { trackCtaPosition } from "../_lib/analytics";
import { useSessionStorage } from "../_lib/hooks";

type Locale = "uk" | "ru" | "en";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY: Record<Locale, { cta: string; dismiss: string }> = {
  uk: { cta: "Безкоштовний дзвінок", dismiss: "Сховати" },
  ru: { cta: "Бесплатный звонок", dismiss: "Скрыть" },
  en: { cta: "Free discovery call", dismiss: "Hide" },
};

export default function StickyCta({ locale = "uk", page }: { locale?: Locale; page?: string }) {
  const [visible, setVisible] = useState(false);
  // useSessionStorage is useSyncExternalStore-based — React 19 rule
  // `react-hooks/set-state-in-effect` forbids setting React state in an
  // effect when reading external storage, so we use the dedicated hook.
  const dismissedFlag = useSessionStorage(`sf_sticky_dismissed_${page}`);
  // Optimistic local flag — once user clicks dismiss in this render-tree,
  // we want immediate hiding without waiting for the next sessionStorage
  // tick. Set in a click handler (not in an effect), so the lint rule is
  // satisfied.
  const [localDismissed, setLocalDismissed] = useState(false);
  const dismissed = localDismissed || dismissedFlag === "1";

  // Scroll listener — show at >=50% scrolled, hide otherwise.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed) return;

    function onScroll() {
      const doc = document.documentElement;
      const scrolled = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight || doc.clientHeight;
      const full = doc.scrollHeight - viewport;
      if (full <= 0) return;
      const pct = (scrolled / full) * 100;
      setVisible(pct >= 50);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  const t = COPY[locale] || COPY.uk;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[990] flex justify-center pointer-events-none px-3 pb-3 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--color-brand)]/50 bg-[#161616]/95 px-3 py-2 shadow-2xl backdrop-blur-md sm:gap-3 sm:px-4">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => page && trackCtaPosition(page, "sticky", "book_call")}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2 text-xs font-bold text-white transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-95 sm:px-5 sm:text-sm"
        >
          {t.cta} →
        </a>
        <button
          type="button"
          onClick={() => {
            setLocalDismissed(true);
            try {
              sessionStorage.setItem(`sf_sticky_dismissed_${page}`, "1");
            } catch {}
          }}
          aria-label={t.dismiss}
          className="rounded-full px-3 py-1 text-xs font-semibold text-white/60 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
