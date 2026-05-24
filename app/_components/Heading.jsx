// Heading — separates semantic level (h1..h6) from visual size.
// Pass `level` for semantics (default h2), `visual` for which type-scale token to apply.

const VISUAL = {
  "display-xl":
    "text-[var(--text-display-xl)] leading-[var(--text-display-xl--line-height)] " +
    "tracking-[var(--text-display-xl--letter-spacing)] font-extrabold",
  "display-lg":
    "text-[var(--text-display-lg)] leading-[var(--text-display-lg--line-height)] " +
    "tracking-[var(--text-display-lg--letter-spacing)] font-extrabold",
  "display-md":
    "text-[var(--text-display-md)] leading-[var(--text-display-md--line-height)] " +
    "tracking-[var(--text-display-md--letter-spacing)] font-extrabold",
  "heading-lg":
    "text-[var(--text-heading-lg)] leading-[var(--text-heading-lg--line-height)] " +
    "tracking-[var(--text-heading-lg--letter-spacing)] font-bold",
  "heading-md":
    "text-[var(--text-heading-md)] leading-[var(--text-heading-md--line-height)] font-bold",
  "heading-sm":
    "text-[var(--text-heading-sm)] leading-[var(--text-heading-sm--line-height)] font-semibold",
};

export default function Heading({
  level = 2,
  visual = "heading-lg",
  className = "",
  id,
  children,
  ...rest
}) {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
  const classes = [VISUAL[visual] || VISUAL["heading-lg"], "text-[var(--color-fg)]", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag id={id} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
