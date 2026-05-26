// app/_lib/portal/auth.js
// SkyFort Client Portal — server-side auth helpers.
//
// Used by:
//   - app/[locale]/portal/layout.js (auth guard)
//   - app/api/portal/* route handlers
//   - Server components in /portal/*

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { serverClient } from './supabase';

const ADVISOR_EMAIL = 'andrii@sky-fort.ca';

/**
 * Get the currently authenticated Supabase user, or null if not logged in.
 * Safe to call from server components and route handlers.
 */
export async function getCurrentUser() {
  const supabase = serverClient(cookies);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

/**
 * Get the user OR redirect to login. Use in protected server components.
 * `locale` is the URL locale segment ('uk' | 'ru' | 'en').
 */
export async function requireUser(locale = 'uk') {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/portal/login`);
  }
  return user;
}

/**
 * Get the portal_clients row for the current user (or null).
 * Used to check onboarding state, fetch initials/preferred_lang, etc.
 */
export async function getCurrentClient() {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = serverClient(cookies);
  const { data, error } = await supabase
    .from('portal_clients')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  if (error) {
    console.error('[portal/auth] failed to load portal_clients:', error);
    return null;
  }
  return data;
}

/**
 * Require user + client row. Redirects to:
 *   - /portal/login if not authenticated
 *   - /portal/onboarding if no portal_clients row OR onboarding_completed_at is null
 *
 * Returns { user, client } when both are present and onboarding is complete.
 */
export async function requireOnboardedClient(locale = 'uk') {
  const user = await requireUser(locale);
  const supabase = serverClient(cookies);
  const { data: client } = await supabase
    .from('portal_clients')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!client || !client.onboarding_completed_at) {
    redirect(`/${locale}/portal/onboarding`);
  }
  return { user, client };
}

/**
 * Check whether the current user is the advisor (Andrii).
 * Used by /uk/admin/portal/* routes.
 */
export async function isAdvisor() {
  const user = await getCurrentUser();
  if (!user) return false;
  return user.email?.toLowerCase() === ADVISOR_EMAIL;
}

/**
 * Require advisor access — redirects to /uk if not Andrii.
 */
export async function requireAdvisor(locale = 'uk') {
  const ok = await isAdvisor();
  if (!ok) redirect(`/${locale}`);
}

export const ADVISOR = {
  email: ADVISOR_EMAIL,
  name: 'Andrii Andriushchenko',
  initials: 'AA',
  nrd: '4575551',
  firm: 'Axcess Capital Advisors Inc.',
  title: {
    en: 'Licensed Dealing Representative',
    ru: 'Лицензированный консультант',
    uk: 'Ліцензований консультант',
  },
  jurisdictions: ['Alberta', 'British Columbia', 'Ontario'],
  languages: ['EN', 'UK', 'RU'],
  phone: '+1-403-397-2553',
  calendly: 'https://calendly.com/andriushchenko-partners/new-meeting',
};
