// SkyFort brand mark — single source of truth.
// Paths match the official asset in public/icon.svg (viewBox 97×90).
// Color comes from currentColor → set via Tailwind text-* class.

const PATHS = [
  "M27.69 0V55.38C12.41 55.38 0 42.98 0 27.69C0 12.41 12.41 0 27.69 0Z",
  "M34.61 90L34.61 34.62C49.89 34.62 62.3 47.03 62.3 62.31C62.3 77.59 49.89 90 34.61 90Z",
  "M62.31 27.69C47.02 27.69 34.62 15.29 34.62 0H62.31V27.69Z",
  "M96.92 27.69L69.23 0H96.92V27.69Z",
  "M27.69 76.16C27.69 68.51 21.49 62.31 13.84 62.31C6.2 62.31 0 68.51 0 76.16C0 83.8 6.2 90 13.84 90C21.49 90 27.69 83.8 27.69 76.16Z",
  "M96.92 48.47C96.92 40.82 90.72 34.62 83.08 34.62C75.43 34.62 69.23 40.82 69.23 48.47C69.23 56.11 75.43 62.31 83.08 62.31C90.72 62.31 96.92 56.11 96.92 48.47Z",
];

// Wordmark text — SKYFORT.
function Wordmark({ className = "" }) {
  return (
    <span className={`text-lg font-bold tracking-wider text-[var(--color-fg)] ${className}`}>
      SKYFORT
    </span>
  );
}

/**
 * <Logo /> — brand mark.
 * Props:
 *  - variant: "mark" (icon only, default) | "full" (mark + SKYFORT wordmark)
 *  - className: applied to the wrapper; control color via Tailwind text-* utility
 *  - size: "sm" | "md" | "lg" — sets mark height (28 / 36 / 44 px)
 */
export default function Logo({ variant = "mark", size = "md", className = "" }) {
  const heightClass = { sm: "h-6", md: "h-7", lg: "h-9" }[size] || "h-7";
  const colorClass = "text-[var(--color-brand)]";
  const mark = (
    <svg
      viewBox="0 0 97 90"
      className={`${heightClass} w-auto ${colorClass}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SkyFort"
      role="img"
    >
      {PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );

  if (variant === "full") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {mark}
        <Wordmark />
      </div>
    );
  }
  return <div className={className}>{mark}</div>;
}
