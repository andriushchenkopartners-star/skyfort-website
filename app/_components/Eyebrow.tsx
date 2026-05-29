// Eyebrow — small uppercase label that sits above a heading.

import type { ElementType, ReactNode, HTMLAttributes } from "react";

type Tone = "brand" | "muted";

interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}

export default function Eyebrow({
  as: Tag = "div",
  tone = "brand",
  className = "",
  children,
  ...rest
}: EyebrowProps) {
  const color =
    tone === "muted" ? "text-[var(--color-fg-subtle)]" : "text-[var(--color-brand)]";
  const classes = [
    "text-[var(--text-caption)] leading-[var(--text-caption--line-height)]",
    "uppercase tracking-[var(--text-caption--letter-spacing)] font-semibold",
    color,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
