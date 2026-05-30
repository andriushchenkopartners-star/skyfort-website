"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ElementType, ReactNode, Ref } from "react";

// Variants resolved to Tailwind utility classes that reference design tokens (globals.css).
type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg" | "xl";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand)] text-[var(--color-fg)] hover:bg-[var(--color-brand-hover)] " +
    "shadow-[var(--shadow-card)]",
  secondary:
    "bg-transparent text-[var(--color-fg)] border border-[var(--color-border-strong)] " +
    "hover:border-[var(--color-brand)] hover:text-[var(--color-brand-hover)]",
  ghost:
    "bg-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] " +
    "hover:bg-[var(--color-bg-elevated)]",
  accent:
    "bg-[var(--color-accent)] text-[var(--color-fg-inverse)] hover:opacity-90 " +
    "shadow-[var(--shadow-card)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-md gap-1.5",
  md: "h-11 px-5 text-base rounded-lg gap-2",
  lg: "h-13 px-7 text-lg rounded-lg gap-2.5",
  xl: "h-15 px-8 text-lg rounded-xl gap-3",
};

const BASE =
  "inline-flex items-center justify-center font-semibold whitespace-nowrap " +
  "transition-colors duration-150 ease-out " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-none";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  size?: Size;
  icon?: ElementType;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "right",
    loading = false,
    disabled = false,
    href,
    target,
    rel,
    type = "button",
    className = "",
    onClick,
    ...rest
  },
  ref
) {
  const classes = [BASE, VARIANTS[variant] || VARIANTS.primary, SIZES[size] || SIZES.md, className]
    .filter(Boolean)
    .join(" ");

  const iconNode = Icon ? <Icon size={size === "sm" ? 14 : 16} aria-hidden="true" /> : null;
  const content = (
    <>
      {Icon && iconPosition === "left" && iconNode}
      <span>{loading ? "…" : children}</span>
      {Icon && iconPosition === "right" && iconNode}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const linkRel = isExternal ? (rel || "noopener noreferrer") : rel;
    if (isExternal) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          target={target || "_blank"}
          rel={linkRel}
          className={classes}
          onClick={onClick}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={linkRel}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
