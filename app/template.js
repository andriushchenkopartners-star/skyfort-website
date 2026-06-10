// Route-transition wrapper. App Router re-mounts templates on every navigation,
// so the `.route-fade` CSS animation (globals.css) replays as a quick crossfade.
// Opacity-only — never transform/filter — so it can't create a containing block
// that would break the position:fixed nav / WhatsApp button / cookie banner that
// live in layout.js (outside this wrapper) or the sticky blog CTA inside it.
// No-op under prefers-reduced-motion (neutralised globally in globals.css).

export default function Template({ children }) {
  return <div className="route-fade">{children}</div>;
}
