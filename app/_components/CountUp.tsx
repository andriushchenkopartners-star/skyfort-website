"use client";

// Counts numbers up from 0 → their value when scrolled into view. Writes to
// textContent via a ref (no React state) to stay clear of the repo's
// react-hooks/set-state-in-effect rule and to keep it paint-cheap. Range- and
// prefix/suffix-safe: "$109K", "7–12%", "від $5K" each animate their numeric
// runs while preserving the surrounding characters. Honors prefers-reduced-
// motion and SSRs the final value (correct for no-JS + crawlers, zero CLS).

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: string;
  durationMs?: number;
  className?: string;
}

function scaleNumbers(value: string, progress: number): string {
  return value.replace(/\d+(?:\.\d+)?/g, (n) => {
    const dot = n.indexOf(".");
    const decimals = dot === -1 ? 0 : n.length - dot - 1;
    const scaled = parseFloat(n) * progress;
    return decimals > 0 ? scaled.toFixed(decimals) : String(Math.round(scaled));
  });
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({ value, durationMs = 1100, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined" || !/\d/.test(value)) {
      return; // leave the SSR'd final value untouched
    }

    el.textContent = scaleNumbers(value, 0);

    let raf = 0;
    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        el.textContent = scaleNumbers(value, easeOutExpo(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
