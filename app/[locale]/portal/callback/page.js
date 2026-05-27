// app/[locale]/portal/callback/page.js
// Magic-link callback. Supabase redirects here with ?code=<token> in URL after
// the user clicks the email link. We exchange the code for a session cookie,
// then forward to /portal (which routes onward to onboarding or overview).

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { serverClient } from '../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';

export const dynamic = 'force-dynamic';

export default async function CallbackPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';

  const code = sp?.code;
  const errorParam = sp?.error_description || sp?.error;

  // Single error-path variable. Returning JSX from inside try/catch defeats
  // React error boundaries (the JSX is constructed but rendering errors happen
  // later, outside the try), so we collect any failure into `errorMessage`
  // and render exactly once at the bottom.
  let errorMessage = null;

  if (errorParam) {
    errorMessage = String(errorParam);
  } else if (!code) {
    redirect(`/${safeLocale}/portal/login`);
  } else {
    try {
      const supabase = serverClient(cookies);
      const { error } = await supabase.auth.exchangeCodeForSession(String(code));
      if (error) errorMessage = error.message;
    } catch (err) {
      console.error('[portal/callback] exchange error:', err);
      errorMessage = err.message || 'Unknown error';
    }
  }

  if (errorMessage) {
    return <CallbackError locale={safeLocale} message={errorMessage} />;
  }

  redirect(`/${safeLocale}/portal`);
}

function CallbackError({ locale, message }) {
  const t = portalT(locale);
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          textAlign: 'center',
          background: '#fff',
          border: '1px solid var(--portal-line)',
          borderRadius: 18,
          padding: 32,
        }}
      >
        <h1
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: 'var(--portal-ink)',
            margin: '0 0 8px',
          }}
        >
          {locale === 'uk' ? 'Не вдалось увійти' : locale === 'ru' ? 'Не удалось войти' : 'Sign-in failed'}
        </h1>
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--portal-mute)',
            lineHeight: 1.55,
            marginBottom: 18,
          }}
        >
          {message}
        </p>
        <a
          href={`/${locale}/portal/login`}
          style={{
            display: 'inline-block',
            padding: '10px 16px',
            background: 'var(--portal-ink)',
            color: '#fff',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {t.login.back}
        </a>
      </div>
    </div>
  );
}
