const VARIANTS = {
  default:
    "bg-[var(--color-bg-card)] border border-[var(--color-border)]",
  glow:
    "bg-[var(--color-bg-card)] border border-[var(--color-border)] " +
    "card-glow",
  elevated:
    "bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] " +
    "shadow-[var(--shadow-elevated)]",
  outline:
    "bg-transparent border border-[var(--color-border-strong)]",
};

const PADDINGS = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

const RADII = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
};

export default function Card({
  as: Tag = "div",
  variant = "default",
  padding = "md",
  radius = "lg",
  className = "",
  children,
  ...rest
}) {
  const classes = [
    VARIANTS[variant] || VARIANTS.default,
    PADDINGS[padding] ?? PADDINGS.md,
    RADII[radius] ?? RADII.lg,
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
