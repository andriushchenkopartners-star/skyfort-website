"use client";

// Thin scroll-progress bar for long-form pages (blog). Drives a GPU-only
// scaleX transform from a ref (no React state) so scrolling never triggers a
// re-render. rAF-throttled. Sits above the nav so the 2px brand line reads as
// reading progress along the very top edge.

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={ref}
      className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left scale-x-0 bg-[var(--color-brand)]"
    />
  );
}
