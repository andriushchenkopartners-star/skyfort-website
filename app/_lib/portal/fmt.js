// app/_lib/portal/fmt.js
// SkyFort Client Portal — number formatting (CAD-first).

/**
 * Format a number as CAD currency.
 *   fmtMoney(1234.5)            → "$1,234.50"
 *   fmtMoney(1234.5, 'uk-UA')   → "1 234,50 CA$"
 *   fmtMoney(1234567, 'en-CA', true) → "$1.2M"
 */
export function fmtMoney(n, locale = 'en-CA', short = false) {
  if (n == null || isNaN(n)) return '—';
  if (short && Math.abs(n) >= 1000) {
    if (Math.abs(n) >= 1e6) {
      return (
        new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'CAD',
          maximumFractionDigits: 1,
        })
          .format(n / 1e6)
          .replace(/ /g, ' ') + 'M'
      );
    }
    if (Math.abs(n) >= 10_000) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0,
      }).format(n);
    }
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/**
 * Format as a signed percent.
 *   fmtPct(9.4)   → "+9.40%"
 *   fmtPct(-2.1)  → "-2.10%"
 *   fmtPct(12.8)  → "+12.8%" (1 decimal at >=10)
 */
export function fmtPct(n, signed = true) {
  if (n == null || isNaN(n)) return '—';
  const s = signed && n > 0 ? '+' : '';
  const decimals = Math.abs(n) >= 10 ? 1 : 2;
  return s + n.toFixed(decimals) + '%';
}

/**
 * Format an integer.
 */
export function fmtNumber(n, locale = 'en-CA', decimals = 0) {
  if (n == null || isNaN(n)) return '—';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Format a date as e.g. "26 May 2026".
 */
export function fmtDate(iso, locale = 'en-CA') {
  if (!iso) return '—';
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Derive 2-letter initials from a full name.
 *   initialsFromName("Anna Kovalenko") → "AK"
 *   initialsFromName("Andrii")         → "AN"
 */
export function initialsFromName(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}
