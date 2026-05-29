// app/_lib/use-url-state.js
// Calculator share-URL hook. Reads initial values from URL search params
// on mount, then on every state change writes back to URL via
// history.replaceState (no navigation, no scroll).
//
// Per Audit 7 #8 / Section 3 #3 — model used by engaging-data /
// Ratehub / WOWA. Users diff scenarios by sharing a URL like
// /calculators/mer-impact?monthly=500&years=30&rate=8&highMer=2 — each
// shared link is a natural backlink + adds extractable JSON for AI.
//
// Usage in a calculator component:
//   const [monthly, setMonthly] = useUrlState("monthly", 500, "number");
//   const [years, setYears] = useUrlState("years", 30, "number");
//   ...
//   <button onClick={copyShareUrl}>Copy my link</button>

"use client";

import { useEffect, useState, useCallback } from "react";

function parseValue(raw, type) {
  if (raw === null || raw === undefined) return null;
  if (type === "number") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  if (type === "boolean") return raw === "true" || raw === "1";
  return raw;
}

function readInitial(key, defaultValue, type) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);
    const parsed = parseValue(raw, type);
    return parsed !== null && parsed !== undefined ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Single shared queue so multiple useUrlState hooks coalesce into one
// history.replaceState call per microtask (cheap; avoids hammering URL).
let pendingUpdate = null;
function scheduleUrlSync(updateFn) {
  pendingUpdate = updateFn;
  queueMicrotask(() => {
    if (pendingUpdate === updateFn && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      updateFn(params);
      const next = params.toString();
      const newUrl =
        window.location.pathname + (next ? "?" + next : "") + window.location.hash;
      try {
        window.history.replaceState({}, "", newUrl);
      } catch {}
    }
    pendingUpdate = null;
  });
}

export function useUrlState(key, defaultValue, type = "string") {
  // SSR-safe lazy init from URL.
  const [value, setValueState] = useState(() => readInitial(key, defaultValue, type));

  const setValue = useCallback(
    (next) => {
      setValueState(next);
      scheduleUrlSync((params) => {
        const stringified =
          typeof next === "boolean" ? String(next) : String(next ?? "");
        if (stringified === "" || stringified === String(defaultValue)) {
          // Don't write defaults to the URL — keeps shared links short.
          params.delete(key);
        } else {
          params.set(key, stringified);
        }
      });
    },
    [key, defaultValue],
  );

  // Rare cross-tab / back-button sync: if URL changes (browser back),
  // read back into state. Listening to popstate is sufficient — Next.js
  // router pushState fires it too.
  useEffect(() => {
    if (typeof window === "undefined") return;
    function onPop() {
      const current = readInitial(key, defaultValue, type);
      setValueState(current);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [key, defaultValue, type]);

  return [value, setValue];
}

// Returns the current absolute URL (with current search params) for
// "Copy link" / Share button handlers.
export function getShareUrl() {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname + window.location.search;
}

// Convenience: copy the current shareable URL to clipboard. Resolves to
// true on success, false on failure (e.g. user denied clipboard permission).
export async function copyShareUrl() {
  const url = getShareUrl();
  if (!url) return false;
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
