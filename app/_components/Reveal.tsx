"use client";

// Scroll-reveal wrapper. Adds `.is-visible` once the element scrolls into view,
// then disconnects (reveal-once). Pairs with the `.reveal` / `.reveal-stagger`
// classes in globals.css. Toggles a class via ref — no React state — so it stays
// clear of the repo's react-hooks/set-state-in-effect rule. Falls back to
// instantly visible when motion is reduced or IntersectionObserver is absent.

import { useEffect, useRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export default function Reveal({ className = "reveal", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
