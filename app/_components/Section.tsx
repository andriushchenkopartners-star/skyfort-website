// Section — consistent vertical rhythm + semantic landmark + optional aria-labelledby.
// Use one per major page section; nest <Container> inside for width constraints.

import type { ElementType, ReactNode, HTMLAttributes } from "react";

type Spacing = "none" | "sm" | "md" | "lg" | "xl";
type Background = "default" | "card" | "elevated";

const SPACING: Record<Spacing, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

const BACKGROUNDS: Record<Background, string> = {
  default: "",
  card: "bg-[var(--color-bg-card)]",
  elevated: "bg-[var(--color-bg-elevated)]",
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: Spacing;
  background?: Background;
  id?: string;
  ariaLabelledBy?: string;
  className?: string;
  children?: ReactNode;
}

export default function Section({
  as: Tag = "section",
  spacing = "md",
  background = "default",
  id,
  ariaLabelledBy,
  className = "",
  children,
  ...rest
}: SectionProps) {
  const classes = [
    "relative",
    SPACING[spacing] ?? SPACING.md,
    BACKGROUNDS[background] ?? "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag id={id} aria-labelledby={ariaLabelledBy} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
