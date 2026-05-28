// app/[locale]/contact/page.js
// Local SEO landing — primary signal to Google for "Calgary financial advisor"
// queries. Includes NAP (name/address/phone), business hours, embedded map,
// NRD verification link, and a discovery-call CTA.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ExternalLink, ShieldCheck, MessageCircle, Calendar } from 'lucide-react';
import { SUPPORTED_LOCALES } from '../../_i18n/dictionary';
import { CONFIG } from '../../_i18n/config';
import Breadcrumbs from '../../_components/Breadcrumbs';

const HREFLANG = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-CA' };

const COPY = {
  uk: {
    crumbHome: 'Головна',
    crumbContact: 'Контакти',
    title: 'Контакти · SkyFort у Калгарі',
    description:
      'Як зі мною звʼязатись: телефон, email, WhatsApp, Calendly. Базуюсь у Калгарі, працюю з клієнтами в Alberta, BC, Ontario. NRD #4575551.',
    h1: 'Контакти',
    sub: 'Ліцензований Dealing Representative у Калгарі. Працюю з клієнтами в Альберті, Британській Колумбії та Онтаріо. Дзвінки веду українською, російською або англійською.',
    hoursTitle: 'Робочі години',
    hoursWeekdays: 'Понеділок-П\'ятниця',
    hoursWeekdaysVal: '9:00 – 18:00 MT',
    hoursWeekend: 'Вихідні',
    hoursWeekendVal: 'За попереднім записом',
    hoursTz: 'Mountain Time (Calgary, AB)',
    locationTitle: 'Локація',
    locationCity: 'Калгарі, Альберта',
    locationDetail:
      'Особисті зустрічі — в head office Axcess Capital Advisors Inc. у Калгарі. Для клієнтів з Edmonton, Vancouver, Toronto — Zoom або Google Meet (той же результат, економія часу на дорогу).',
    coverageTitle: 'Регіони',
    coverageVal: 'Alberta · British Columbia · Ontario',
    licenseTitle: 'Ліцензія',
    licenseLine1: 'Licensed Dealing Representative',
    licenseLine2: 'NRD #4575551',
    licenseLine3: 'Axcess Capital Advisors Inc. (Exempt Market Dealer)',
    verifyLink: 'Перевірити мене у реєстрі CSA',
    contactWays: 'Способи зв\'язку',
    primaryCta: 'Записатись на дзвінок (30 хв · безкоштовно)',
    languages: 'Мови',
    languagesVal: 'Українська · Русский · English',
    faqTitle: 'Часті питання',
    faq: [
      {
        q: 'Можна зустрітись особисто?',
        a: 'Так — у Калгарі, в офісі Axcess Capital Advisors Inc. Для клієнтів з інших міст — Zoom/Google Meet. Той самий формат і результат, без витрат часу на дорогу.',
      },
      {
        q: 'Скільки коштує перша консультація?',
        a: 'Discovery call (30 хв) — безкоштовно. За правилами CSA, до KYC + Suitability Assessment я не рекомендую конкретні продукти.',
      },
      {
        q: 'Чи відповідаєш у вихідні?',
        a: 'Email і портал — стараюсь у межах робочого дня. WhatsApp — швидше, але серйозні рішення раджу обговорювати на скоординованому дзвінку буднями.',
      },
      {
        q: 'Найкращий спосіб для першого контакту?',
        a: 'Calendly (кнопка зверху) — резервуєш час одразу, я бачу твоє ім\'я і коротко контекст. Email теж OK, але часи відповіді довші.',
      },
    ],
    disclaimer:
      'NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer). Інформація на цьому сайті — освітні матеріали, не персональна інвестиційна рекомендація.',
  },
  ru: {
    crumbHome: 'Главная',
    crumbContact: 'Контакты',
    title: 'Контакты · SkyFort в Калгари',
    description:
      'Как со мной связаться: телефон, email, WhatsApp, Calendly. Базируюсь в Калгари, работаю с клиентами в Alberta, BC, Ontario. NRD #4575551.',
    h1: 'Контакты',
    sub: 'Licensed Dealing Representative в Калгари. Работаю с клиентами в Альберте, Британской Колумбии и Онтарио. Звонки веду на украинском, русском или английском.',
    hoursTitle: 'Рабочие часы',
    hoursWeekdays: 'Понедельник-Пятница',
    hoursWeekdaysVal: '9:00 – 18:00 MT',
    hoursWeekend: 'Выходные',
    hoursWeekendVal: 'По предварительной записи',
    hoursTz: 'Mountain Time (Calgary, AB)',
    locationTitle: 'Локация',
    locationCity: 'Калгари, Альберта',
    locationDetail:
      'Личные встречи — в head office Axcess Capital Advisors Inc. в Калгари. Для клиентов из Edmonton, Vancouver, Toronto — Zoom или Google Meet (тот же результат, экономия времени на дорогу).',
    coverageTitle: 'Регионы',
    coverageVal: 'Alberta · British Columbia · Ontario',
    licenseTitle: 'Лицензия',
    licenseLine1: 'Licensed Dealing Representative',
    licenseLine2: 'NRD #4575551',
    licenseLine3: 'Axcess Capital Advisors Inc. (Exempt Market Dealer)',
    verifyLink: 'Проверить меня в реестре CSA',
    contactWays: 'Способы связи',
    primaryCta: 'Записаться на звонок (30 мин · бесплатно)',
    languages: 'Языки',
    languagesVal: 'Українська · Русский · English',
    faqTitle: 'Частые вопросы',
    faq: [
      {
        q: 'Можно встретиться лично?',
        a: 'Да — в Калгари, в офисе Axcess Capital Advisors Inc. Для клиентов из других городов — Zoom/Google Meet. Тот же формат и результат, без затрат времени на дорогу.',
      },
      {
        q: 'Сколько стоит первая консультация?',
        a: 'Discovery call (30 мин) — бесплатно. По правилам CSA, до KYC + Suitability Assessment я не рекомендую конкретные продукты.',
      },
      {
        q: 'Отвечаешь ли в выходные?',
        a: 'Email и портал — стараюсь в рабочее время. WhatsApp — быстрее, но серьёзные решения советую обсуждать на скоординированном звонке в будни.',
      },
      {
        q: 'Лучший способ для первого контакта?',
        a: 'Calendly (кнопка сверху) — резервируешь время сразу, я вижу твоё имя и краткий контекст. Email тоже OK, но время ответа дольше.',
      },
    ],
    disclaimer:
      'NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer). Информация на этом сайте — образовательные материалы, не персональная инвестиционная рекомендация.',
  },
  en: {
    crumbHome: 'Home',
    crumbContact: 'Contact',
    title: 'Contact · SkyFort in Calgary',
    description:
      "How to reach me: phone, email, WhatsApp, Calendly. Based in Calgary, working with clients in Alberta, BC, Ontario. NRD #4575551.",
    h1: 'Contact',
    sub: "Licensed Dealing Representative based in Calgary. Working with clients across Alberta, British Columbia, and Ontario. Calls in Ukrainian, Russian, or English.",
    hoursTitle: 'Business hours',
    hoursWeekdays: 'Monday-Friday',
    hoursWeekdaysVal: '9:00 AM – 6:00 PM MT',
    hoursWeekend: 'Weekends',
    hoursWeekendVal: 'By appointment',
    hoursTz: 'Mountain Time (Calgary, AB)',
    locationTitle: 'Location',
    locationCity: 'Calgary, Alberta',
    locationDetail:
      "In-person meetings — at the Axcess Capital Advisors Inc. head office in Calgary. For clients in Edmonton, Vancouver, Toronto — Zoom or Google Meet (same outcome, no commute).",
    coverageTitle: 'Service area',
    coverageVal: 'Alberta · British Columbia · Ontario',
    licenseTitle: 'License',
    licenseLine1: 'Licensed Dealing Representative',
    licenseLine2: 'NRD #4575551',
    licenseLine3: 'Axcess Capital Advisors Inc. (Exempt Market Dealer)',
    verifyLink: 'Verify me on the CSA registry',
    contactWays: 'Ways to reach me',
    primaryCta: 'Book a call (30 min · free)',
    languages: 'Languages',
    languagesVal: 'Ukrainian · Russian · English',
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'Can we meet in person?',
        a: "Yes — at the Axcess Capital Advisors Inc. office in Calgary. For clients elsewhere, Zoom/Google Meet works just as well, with no commute.",
      },
      {
        q: 'What does the first consultation cost?',
        a: "30-min discovery call is free. Per CSA rules, I don't recommend specific products before a formal KYC + Suitability Assessment.",
      },
      {
        q: 'Do you reply on weekends?',
        a: "Email and portal — I aim for business hours. WhatsApp is faster, but I prefer to discuss serious decisions on a scheduled call during the week.",
      },
      {
        q: 'Best way to reach out first?',
        a: "Calendly (button above) — you reserve a time directly, I see your name and quick context. Email also fine, but response times are longer.",
      },
    ],
    disclaimer:
      'NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer). Information on this site is educational only — not personal investment advice.',
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
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}/contact`])
  );
  alternates['x-default'] = '/uk/contact';

  return {
    title: c.title,
    description: c.description,
    keywords: [
      'Calgary financial advisor',
      'Ukrainian financial advisor Calgary',
      'українцям Калгарі',
      'фінансовий радник Канада',
      'NRD 4575551',
      'Axcess Capital Advisors',
      'exempt market Alberta',
      'TFSA newcomer Calgary',
    ],
    alternates: { canonical: `/${locale}/contact`, languages: alternates },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `https://sky-fort.ca/${locale}/contact`,
      type: 'website',
      locale: { uk: 'uk_UA', ru: 'ru_RU', en: 'en_CA' }[locale],
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const c = COPY[locale] || COPY.uk;

  // LocalBusiness + ContactPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `https://sky-fort.ca/${locale}/contact#contactpage`,
        url: `https://sky-fort.ca/${locale}/contact`,
        about: { '@id': 'https://sky-fort.ca/#business' },
        inLanguage: { uk: 'uk-UA', ru: 'ru-RU', en: 'en-CA' }[locale],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://sky-fort.ca/${locale}/contact#faq`,
        mainEntity: c.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-5xl px-6 pt-28 pb-24 md:pt-32">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbContact },
          ]}
        />

        <header className="mt-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            <MapPin size={12} aria-hidden="true" />
            {c.locationCity}
          </div>
          <h1 className="font-display text-4xl text-white md:text-6xl">{c.h1}</h1>
          <p className="mt-6 text-xl text-[var(--color-fg-muted)]">{c.sub}</p>

          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {c.primaryCta}
          </a>
        </header>

        {/* Three primary blocks — Hours, Location, Coverage */}
        <section className="mt-14 grid gap-5 md:grid-cols-3">
          <InfoBlock icon={<Clock size={20} />} title={c.hoursTitle}>
            <div className="flex flex-col gap-1">
              <Row label={c.hoursWeekdays} value={c.hoursWeekdaysVal} />
              <Row label={c.hoursWeekend} value={c.hoursWeekendVal} />
              <p className="mt-2 text-xs text-[var(--color-fg-subtle)]">{c.hoursTz}</p>
            </div>
          </InfoBlock>

          <InfoBlock icon={<MapPin size={20} />} title={c.locationTitle}>
            <p className="font-semibold text-white">{c.locationCity}</p>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{c.locationDetail}</p>
          </InfoBlock>

          <InfoBlock icon={<ShieldCheck size={20} />} title={c.coverageTitle}>
            <p className="font-semibold text-white">{c.coverageVal}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
              {c.languages}
            </p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{c.languagesVal}</p>
          </InfoBlock>
        </section>

        {/* Contact ways — direct, scannable */}
        <section className="mt-14">
          <h2 className="font-display text-2xl text-white md:text-3xl">{c.contactWays}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ContactRow
              icon={<Calendar />}
              label="Calendly"
              value={c.primaryCta}
              href={CONFIG.calendlyUrl}
              external
              accent
            />
            <ContactRow
              icon={<Phone />}
              label={locale === 'uk' ? 'Телефон' : locale === 'ru' ? 'Телефон' : 'Phone'}
              value="+1 (403) 397-2553"
              href="tel:+14033972553"
            />
            <ContactRow
              icon={<Mail />}
              label="Email"
              value={CONFIG.email}
              href={`mailto:${CONFIG.email}`}
            />
            <ContactRow
              icon={<MessageCircle />}
              label="WhatsApp"
              value={locale === 'uk' ? 'Швидкий чат' : locale === 'ru' ? 'Быстрый чат' : 'Quick chat'}
              href={CONFIG.whatsapp}
              external
            />
          </div>
        </section>

        {/* License block */}
        <section className="mt-14 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-9">
          <h2 className="font-display text-2xl text-white md:text-3xl">{c.licenseTitle}</h2>
          <div className="mt-5 flex flex-col gap-2 text-lg text-[var(--color-fg-muted)]">
            <p>
              <strong className="text-white">Andrii Andriushchenko</strong> · {c.licenseLine1}
            </p>
            <p>
              <strong className="text-white">{c.licenseLine2}</strong>
            </p>
            <p>{c.licenseLine3}</p>
          </div>
          <a
            href="https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            {c.verifyLink}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </section>

        {/* Map embed — Calgary downtown */}
        <section className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]" style={{ aspectRatio: '16/9' }}>
            <iframe
              title={`${c.locationCity} map`}
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80222.43830879548!2d-114.13180034999999!3d51.027535749999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-display text-2xl text-white md:text-3xl">{c.faqTitle}</h2>
          <dl className="mt-6 space-y-4">
            {c.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                <dt className="mb-2 font-semibold text-white">{item.q}</dt>
                <dd className="text-[var(--color-fg-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Bottom CTA */}
        <section className="mt-14 rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a] p-8 text-center md:p-10">
          <h2 className="font-display text-2xl text-white md:text-3xl">
            {c.primaryCta}
          </h2>
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {c.primaryCta}
          </a>
        </section>

        <p className="mt-10 text-center text-xs leading-relaxed text-[var(--color-fg-subtle)]">
          {c.disclaimer}
        </p>
      </article>
    </main>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────

function InfoBlock({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
        {icon}
      </div>
      <h3 className="mb-3 font-display text-lg text-white">{title}</h3>
      <div className="text-[var(--color-fg-muted)]">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] py-1.5 last:border-b-0">
      <span className="text-sm text-[var(--color-fg-subtle)]">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function ContactRow({ icon, label, value, href, external = false, accent = false }) {
  const Tag = external ? 'a' : 'a';
  return (
    <Tag
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`group flex items-center gap-4 rounded-xl border p-5 transition-colors ${
        accent
          ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/10 hover:bg-[var(--color-brand)]/15'
          : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-brand)]/40'
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          accent
            ? 'bg-[var(--color-brand)] text-white'
            : 'bg-[var(--color-brand-soft)] text-[var(--color-brand)]'
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">{label}</div>
        <div className="mt-1 font-semibold text-white">{value}</div>
      </div>
      <ExternalLink className="h-4 w-4 text-[var(--color-fg-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Tag>
  );
}
