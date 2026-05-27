// app/_lib/hooks.js
// Shared client-only hooks. Use these instead of mount-flag + useEffect patterns —
// they satisfy React 19's `react-hooks/set-state-in-effect` rule by reading
// external state via useSyncExternalStore (the canonical pattern for
// browser-only data like localStorage / sessionStorage / window state).

'use client';

import { useSyncExternalStore } from 'react';

// ─── isMounted ───────────────────────────────────────────────────────────────
// True after hydration; false during SSR. Use to gate client-only UI without
// triggering a hydration mismatch.
//
// Why this is better than `const [m, setM] = useState(false); useEffect(() => setM(true), []);`:
// the old pattern triggers an extra render AND lint flags `setState-in-effect`.
// useSyncExternalStore handles both cleanly: getServerSnapshot returns false
// during SSR, getSnapshot returns true on client. React swaps after hydration.

const noopSubscribe = () => () => {};

export function useIsMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// ─── localStorage ────────────────────────────────────────────────────────────
// Reads a localStorage key reactively. Returns null during SSR and if the key
// is unset or storage is unavailable (private browsing, quota, etc.).
// Subscribes to the `storage` event so cross-tab updates propagate.

function localStorageSubscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useLocalStorage(key) {
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
// Same shape as useLocalStorage but for sessionStorage. Note: sessionStorage
// does NOT fire storage events (that event is cross-tab only and sessionStorage
// is per-tab), so cross-tab sync is impossible by design — the subscribe noop
// is correct, not a bug.

export function useSessionStorage(key) {
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
