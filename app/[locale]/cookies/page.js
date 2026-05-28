// app/[locale]/cookies/page.js
// Cookie policy — short, scannable, with browser-level opt-out instructions.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '../../_i18n/dictionary';
import Breadcrumbs from '../../_components/Breadcrumbs';

const HREFLANG = { uk: 'uk', ru: 'ru', en: 'en-CA' };

const COPY = {
  uk: {
    crumbHome: 'Головна',
    crumbCookies: 'Cookies',
    title: 'Cookie policy · SkyFort',
    description: 'Які cookies використовує sky-fort.ca і як їх вимкнути.',
    h1: 'Cookie policy',
    updated: 'Оновлено: 27 травня 2026',
    intro: 'Сайт sky-fort.ca використовує cookies для трьох цілей. Нижче — які саме і як ти можеш їх вимкнути на рівні браузера.',
    cats: [
      {
        h: '1. Необхідні cookies',
        body: 'Зберігають твою cookie-згоду, мову інтерфейсу, сесію портала. Без них сайт не працює правильно. **Завжди увімкнені.**',
      },
      {
        h: '2. Аналітика — Google Analytics 4',
        body: 'Анонімна статистика (звідки прийшов, на яких сторінках затримався, які кнопки натискаєш). IP анонімізований. <a href="https://policies.google.com/privacy">Privacy policy Google</a>.',
        optOut:
          '**Як вимкнути**: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out browser add-on</a> або у налаштуваннях браузера блокуй cookies з домену *.google-analytics.com.',
      },
      {
        h: '3. UX — Microsoft Clarity',
        body: 'Анонімні записи сесій (heatmaps, scroll-pattern) щоб бачити де UX треба покращити. Не записує форми (нативна exclusion). <a href="https://privacy.microsoft.com/">Privacy Microsoft</a>.',
        optOut:
          '**Як вимкнути**: блокуй cookies з *.clarity.ms у налаштуваннях браузера, або через uBlock Origin / Privacy Badger.',
      },
      {
        h: '4. Email marketing — Brevo (опц.)',
        body: 'Якщо підписався на email — Brevo може ставити tracking pixel у листах щоб бачити чи відкрив. Тільки в email-ах, не на сайті.',
        optOut:
          '**Як вимкнути**: налаштування твого email-клієнта → "Не завантажувати зображення автоматично". Або відпишись (один клік у будь-якому листі).',
      },
    ],
    browserSection: {
      h: 'Налаштування браузера — універсально',
      body: 'Всі браузери дозволяють блокувати cookies повністю або вибірково:',
      list: [
        '<strong>Safari</strong>: Settings → Privacy → Manage Website Data',
        '<strong>Chrome</strong>: Settings → Privacy and security → Cookies',
        '<strong>Firefox</strong>: Settings → Privacy & Security → Cookies and Site Data',
        '<strong>Edge</strong>: Settings → Cookies and site permissions',
      ],
    },
    moreInfo: 'Повна інформація про збір даних — у',
    privacyLink: 'Політиці приватності',
  },
  ru: {
    crumbHome: 'Главная',
    crumbCookies: 'Cookies',
    title: 'Cookie policy · SkyFort',
    description: 'Какие cookies использует sky-fort.ca и как их выключить.',
    h1: 'Cookie policy',
    updated: 'Обновлено: 27 мая 2026',
    intro: 'Сайт sky-fort.ca использует cookies для трёх целей. Ниже — какие именно и как ты можешь их выключить на уровне браузера.',
    cats: [
      {
        h: '1. Необходимые cookies',
        body: 'Хранят твоё cookie-согласие, язык интерфейса, сессию портала. Без них сайт не работает правильно. **Всегда включены.**',
      },
      {
        h: '2. Аналитика — Google Analytics 4',
        body: 'Анонимная статистика (откуда пришёл, какие страницы смотрел, какие кнопки нажимаешь). IP анонимизирован. <a href="https://policies.google.com/privacy">Privacy Google</a>.',
        optOut:
          '**Как выключить**: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out browser add-on</a> или блокируй cookies с домена *.google-analytics.com.',
      },
      {
        h: '3. UX — Microsoft Clarity',
        body: 'Анонимные записи сессий (heatmaps, scroll). Не записывает формы. <a href="https://privacy.microsoft.com/">Privacy Microsoft</a>.',
        optOut: '**Как выключить**: блокируй cookies с *.clarity.ms или uBlock Origin / Privacy Badger.',
      },
      {
        h: '4. Email marketing — Brevo (опц.)',
        body: 'Если подписался — Brevo может ставить tracking pixel в письмах. Только в email, не на сайте.',
        optOut: '**Как выключить**: настройки email-клиента → "Не загружать изображения автоматически". Или отпишись.',
      },
    ],
    browserSection: {
      h: 'Настройки браузера — универсально',
      body: 'Все браузеры позволяют блокировать cookies полностью или выборочно:',
      list: [
        '<strong>Safari</strong>: Settings → Privacy → Manage Website Data',
        '<strong>Chrome</strong>: Settings → Privacy and security → Cookies',
        '<strong>Firefox</strong>: Settings → Privacy & Security → Cookies and Site Data',
        '<strong>Edge</strong>: Settings → Cookies and site permissions',
      ],
    },
    moreInfo: 'Полная информация о сборе данных — в',
    privacyLink: 'Политике приватности',
  },
  en: {
    crumbHome: 'Home',
    crumbCookies: 'Cookies',
    title: 'Cookie policy · SkyFort',
    description: 'Which cookies sky-fort.ca uses and how to disable them.',
    h1: 'Cookie policy',
    updated: 'Updated: May 27, 2026',
    intro: 'sky-fort.ca uses cookies for three purposes. Below — which ones and how you can disable them at the browser level.',
    cats: [
      {
        h: '1. Necessary cookies',
        body: 'Store your cookie consent, UI language, portal session. Without them the site does not work properly. **Always on.**',
      },
      {
        h: '2. Analytics — Google Analytics 4',
        body: 'Anonymous statistics (referral source, pages viewed, button clicks). IP is anonymized. <a href="https://policies.google.com/privacy">Google Privacy</a>.',
        optOut:
          '**How to disable**: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out browser add-on</a> or block cookies from *.google-analytics.com.',
      },
      {
        h: '3. UX — Microsoft Clarity',
        body: 'Anonymous session recordings (heatmaps, scroll patterns). Forms are excluded automatically. <a href="https://privacy.microsoft.com/">Microsoft Privacy</a>.',
        optOut: '**How to disable**: block cookies from *.clarity.ms or use uBlock Origin / Privacy Badger.',
      },
      {
        h: '4. Email marketing — Brevo (optional)',
        body: 'If you subscribed — Brevo may place a tracking pixel in emails. Only in emails, not on the site.',
        optOut: '**How to disable**: your email client settings → "Do not load images automatically". Or unsubscribe (one click in any email).',
      },
    ],
    browserSection: {
      h: 'Browser settings — universal',
      body: 'All browsers let you block cookies fully or selectively:',
      list: [
        '<strong>Safari</strong>: Settings → Privacy → Manage Website Data',
        '<strong>Chrome</strong>: Settings → Privacy and security → Cookies',
        '<strong>Firefox</strong>: Settings → Privacy & Security → Cookies and Site Data',
        '<strong>Edge</strong>: Settings → Cookies and site permissions',
      ],
    },
    moreInfo: 'Full information about data collection — in the',
    privacyLink: 'Privacy policy',
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return {};
  const c = COPY[locale] || COPY.uk;

  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}/cookies`])
  );
  alternates['x-default'] = '/uk/cookies';

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${locale}/cookies`, languages: alternates },
  };
}

function md(s) {
  return s.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
}

export default async function CookiesPage({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const c = COPY[locale] || COPY.uk;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:pt-32">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbCookies },
          ]}
        />
        <header className="mt-10">
          <h1 className="font-display text-4xl text-white md:text-5xl">{c.h1}</h1>
          <p className="mt-3 text-sm text-[var(--color-fg-subtle)]">{c.updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-fg-muted)]">{c.intro}</p>
        </header>

        <section className="mt-10 space-y-8">
          {c.cats.map((cat, i) => (
            <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
              <h2 className="font-display text-xl text-white">{cat.h}</h2>
              <p
                className="mt-3 leading-relaxed text-[var(--color-fg-muted)]"
                dangerouslySetInnerHTML={{ __html: md(cat.body) }}
              />
              {cat.optOut && (
                <p
                  className="mt-3 text-sm leading-relaxed text-[var(--color-fg-subtle)]"
                  dangerouslySetInnerHTML={{ __html: md(cat.optOut) }}
                />
              )}
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-white">{c.browserSection.h}</h2>
          <p className="mt-4 text-[var(--color-fg-muted)]">{c.browserSection.body}</p>
          <ul className="mt-5 list-disc space-y-2 pl-6 text-[var(--color-fg-muted)]">
            {c.browserSection.list.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </section>

        <p className="mt-12 text-[var(--color-fg-muted)]">
          {c.moreInfo}{' '}
          <Link
            href={`/${locale}/privacy`}
            className="font-semibold text-[var(--color-brand)] underline underline-offset-2 hover:text-[var(--color-brand-hover)]"
          >
            {c.privacyLink}
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
