// app/_lib/hooks.ts
// Shared client-only hooks. Use these instead of mount-flag + useEffect patterns —
// they satisfy React 19's `react-hooks/set-state-in-effect` rule by reading
// external state via useSyncExternalStore (the canonical pattern for
// browser-only data like localStorage / sessionStorage / window state).

'use client';

import { useSyncExternalStore } from 'react';

// ─── isMounted ───────────────────────────────────────────────────────────────
// True after hydration; false during SSR. Use to gate client-only UI without
// triggering a hydration mismatch.

const noopSubscribe = (): (() => void) => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// ─── localStorage ────────────────────────────────────────────────────────────
// Reads a localStorage key reactively. Returns null during SSR and if the key
// is unset or storage is unavailable. Subscribes to the `storage` event so
// cross-tab updates propagate.

function localStorageSubscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useLocalStorage(key: string): string | null {
  return useSyncExternalStore(
    localStorageSubscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

// ─── sessionStorage ──────────────────────────────────────────────────────────
// sessionStorage does NOT fire storage events (cross-tab only, sessionStorage
// is per-tab) — the subscribe noop is correct.

export function useSessionStorage(key: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}
