// app/_lib/portal/constants.js
// SkyFort Client Portal — design tokens and shared constants.

// Portal palette (extends globals.css with portal-specific tones).
// Mirrors what's in the artifact; mapped to brand for consistency.
export const PORTAL_COLORS = {
  blue: '#2D73E3',          // matches --color-brand
  blueInk: '#1956c4',
  blueSoft: '#e8f0fd',
  ink: '#0b0d10',
  ink2: '#1a1d22',
  ink3: '#2a2e35',
  paper: '#f6f4ef',
  paper2: '#ecebe5',
  line: '#e3e1da',
  lineStrong: '#cbc9c1',
  mute: '#6b6b66',
  positive: '#1f8a5b',
  negative: '#c34a3a',
  warn: '#b7791f',
};

// Account type → accent color (for cards, dots, allocation legend).
export const ACCOUNT_COLORS = {
  tfsa: PORTAL_COLORS.blue,
  rrsp: PORTAL_COLORS.ink,
  fhsa: PORTAL_COLORS.positive,
  exempt: PORTAL_COLORS.warn,
  re: PORTAL_COLORS.mute,
  other: PORTAL_COLORS.lineStrong,
};

// Allowed account types (matches CHECK constraint in portal_schema.sql).
export const ACCOUNT_TYPES = ['tfsa', 'rrsp', 'fhsa', 'exempt', 're', 'other'];

// Allowed goal keys.
export const GOAL_KEYS = ['house', 'retire', 'emergency', 'custom'];

// Allowed activity kinds.
export const ACTIVITY_KINDS = ['dep', 'div', 'purchase', 'sale', 'fx', 'fee', 'other'];

// Allowed todo statuses.
export const TODO_STATUSES = ['open', 'done', 'dismissed'];

// Greeting picker based on local hour.
export function greetingKey(hour) {
  if (hour < 12) return 'greeting_morning';
  if (hour < 18) return 'greeting_afternoon';
  return 'greeting_evening';
}
