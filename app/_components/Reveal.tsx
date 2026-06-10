"use client";

// Scroll-reveal wrapper. Adds `.is-visible` once the element scrolls into view,
// then disconnects (reveal-once). Pairs with the `.reveal` / `.reveal-stagger`
// classes in globals.css. Polymorphic via `as` so the stagger can sit on a real
// grid/list element (its direct children are what cascade). Toggles the class
// via a ref — no React state — to stay clear of the repo's
// react-hooks/set-state-in-effect rule. Falls back to instantly visible when
// motion is reduced or IntersectionObserver is absent.

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";

interface RevealProps {
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export default function Reveal({
  as: Tag = "div",
  stagger = false,
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

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

  const base = stagger ? "reveal-stagger" : "reveal";
  const cls = className ? `${base} ${className}` : base;

  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
