// app/_components/SiteSearch.tsx
// Client-side site search modal. Triggered by Cmd/Ctrl+K or '/' keyboard
// shortcut, or by an external button (passed as `triggerRef` from Nav).
//
// Architecture:
//   - Fetches /api/search-index on first open (cached browser-side)
//   - Filters docs client-side using simple substring + word-prefix match
//     across title + description + pillar fields, scored by:
//       - exact title match: +100
//       - title contains query: +50
//       - description contains: +20
//       - pillar contains: +10
//     This keeps the dependency footprint at zero (no fuse.js / lunr) and
//     works perfectly well for ~100 docs.
//
// Audit 6: addresses the "site search" UX gap without taking on Pagefind's
// build-pipeline complexity.

"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { trackSearchOpen, trackSearchQuery, trackSearchClick } from "../_lib/analytics";

type Locale = "uk" | "ru" | "en";

interface SearchDoc {
  url: string;
  title: string;
  description?: string;
  pillar?: string;
}

interface SearchCopy {
  placeholder: string;
  empty: string;
  esc: string;
  kbd: string;
  results: string;
}

function scoreDoc(doc: SearchDoc, q: string): number {
  const ql = q.toLowerCase();
  const title = (doc.title || "").toLowerCase();
  const desc = (doc.description || "").toLowerCase();
  const pillar = (doc.pillar || "").toLowerCase();
  if (!ql) return 0;
  let score = 0;
  if (title === ql) score += 100;
  if (title.includes(ql)) score += 50;
  if (desc.includes(ql)) score += 20;
  if (pillar.includes(ql)) score += 10;
  // Multi-word: split query into words and reward when each appears.
  if (ql.includes(" ")) {
    const words = ql.split(/\s+/).filter(Boolean);
    let allFound = true;
    for (const w of words) {
      if (!title.includes(w) && !desc.includes(w)) {
        allFound = false;
        break;
      }
    }
    if (allFound) score += 25;
  }
  return score;
}

const COPY: Record<Locale, SearchCopy> = {
  uk: { placeholder: "Шукати по сайту…", empty: "Нічого не знайдено для", esc: "Esc — закрити", kbd: "/ — відкрити", results: "результат(ів)" },
  ru: { placeholder: "Искать по сайту…", empty: "Ничего не найдено для", esc: "Esc — закрыть", kbd: "/ — открыть", results: "результат(ов)" },
  en: { placeholder: "Search the site…", empty: "Nothing found for", esc: "Esc to close", kbd: "/ to open", results: "results" },
};

function detectLocale(): Locale {
  if (typeof window === "undefined") return "uk";
  const path = window.location.pathname;
  if (path.startsWith("/ru")) return "ru";
  if (path.startsWith("/en")) return "en";
  return "uk";
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const locale = typeof window !== "undefined" ? detectLocale() : "uk";
  const c = COPY[locale] || COPY.uk;

  // Keyboard shortcut: Cmd/Ctrl+K or '/' opens search.
  // Also responds to a 'skyfort:open-search' custom event so other UI
  // (Nav burger, in-page buttons) can open the modal without a ref.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault();
        if (!open) trackSearchOpen("kbd");
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    function onEvt() {
      if (!open) trackSearchOpen("button");
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("skyfort:open-search", onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("skyfort:open-search", onEvt);
    };
  }, [open]);

  // Fetch index on first open.
  // React 19's `react-hooks/set-state-in-effect` rule flags setState in
  // Promise chains, but client-side data fetching on user interaction
  // is the canonical pattern here — there's no Server Component path
  // because the modal is purely client UI. AbortController guards against
  // unmount races.
  useEffect(() => {
    if (!open || docs !== null) return;
    const ctrl = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("/api/search-index", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        if (ctrl.signal.aborted) return;
        setDocs(data.docs || []);
        setLoading(false);
      })
      .catch(() => {
        if (ctrl.signal.aborted) return;
        setLoading(false);
      });
    return () => ctrl.abort();
  }, [open, docs]);

  // Focus the input when opened.
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim() || !docs) return [];
    const q = query.trim();
    return docs
      .map((d) => ({ doc: d, score: scoreDoc(d, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query, docs]);

  // Fire analytics on each non-empty query change, debounced via the
  // controlled-input nature (one event per state update).
  useEffect(() => {
    if (!query.trim()) return;
    const id = setTimeout(() => {
      trackSearchQuery(query.trim(), results.length);
    }, 600);
    return () => clearTimeout(id);
  }, [query, results.length]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className="fixed inset-0 z-[1100] flex items-start justify-center bg-black/70 backdrop-blur-sm pt-[10vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#161616] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-white/50" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.placeholder}
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-white/50" aria-hidden="true" />}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && query.trim() ? (
            <p className="px-4 py-8 text-center text-sm text-white/55">
              {c.empty} <span className="font-mono text-white/85">&ldquo;{query}&rdquo;</span>
            </p>
          ) : results.length > 0 ? (
            <>
              <p className="px-3 pb-2 pt-1 text-xs uppercase tracking-wider text-white/40">
                {results.length} {c.results}
              </p>
              <ul>
                {results.map((r, i) => (
                  <li key={r.doc.url}>
                    <a
                      href={r.doc.url}
                      onClick={() => trackSearchClick(query, r.doc.url, i + 1)}
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white truncate">{r.doc.title}</p>
                          <p className="mt-0.5 text-xs text-white/55 line-clamp-2">{r.doc.description}</p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]/80">
                            {r.doc.pillar} · {r.doc.url}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-white/30" aria-hidden="true" />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-white/40">
          <span>{c.kbd}</span>
          <span>{c.esc}</span>
        </div>
      </div>
    </div>
  );
}
