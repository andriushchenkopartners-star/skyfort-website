// app/[locale]/privacy/page.js
// Privacy policy — PIPEDA + CASL-compliant statement of practices.
// Required for: Google Ads, Brevo subscriber compliance, trust signal.

import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '../../_i18n/dictionary';
import Breadcrumbs from '../../_components/Breadcrumbs';

const HREFLANG = { uk: 'uk', ru: 'ru', en: 'en-CA' };

const COPY = {
  uk: {
    crumbHome: 'Головна',
    crumbPrivacy: 'Політика приватності',
    title: 'Політика приватності · SkyFort',
    description: 'Як SkyFort збирає, використовує і зберігає особисті дані відповідно до PIPEDA та CASL.',
    h1: 'Політика приватності',
    updated: 'Оновлено: 27 травня 2026',
    intro: 'Ця політика описує як **Andrii Andriushchenko** (далі — "SkyFort", "ми", "я") збирає, використовує, зберігає і захищає особисті дані відвідувачів сайту **sky-fort.ca**, клієнтів і підписників. Дотримуємось **Personal Information Protection and Electronic Documents Act (PIPEDA)** і **Canada\'s Anti-Spam Legislation (CASL)**.',
    sections: [
      {
        h: 'Контактна особа',
        body: [
          'Питання приватності, доступ до даних, видалення:',
          '**Andrii Andriushchenko**, Licensed Dealing Representative · NRD #4575551 · andrii@sky-fort.ca · +1-403-397-2553',
          'Calgary, Alberta, Canada',
        ],
      },
      {
        h: 'Які дані збираємо',
        body: [
          'Залежно від того як ти взаємодієш з сайтом:',
          '**Якщо просто читаєш**: IP-адреса (hashed), браузер, ОС, мова — для аналітики через Google Analytics 4 і Microsoft Clarity. Cookie-згода обов\'язкова (див. секцію Cookies).',
          '**Якщо підписуєшся на email**: email, ім\'я (опційно), джерело підписки, UTM-параметри. Зберігається у Brevo (наш провайдер розсилок) і Supabase (наш backup).',
          '**Якщо записуєшся на discovery call**: ім\'я, email, контекст ситуації (як описав у формі), часовий пояс. Зберігається у Calendly + Supabase.',
          '**Якщо стаєш клієнтом порталу**: повне ім\'я, email, провінція проживання, мова, дані які ти сам вводиш про свої рахунки (balance, account type — це **твоя власна** інформація, не offical statement). Зберігається у Supabase, доступна тільки тобі через Row-Level Security.',
          '**Як EMD-клієнт** (формально через Axcess Capital Advisors): додаткові KYC-документи, Suitability Assessment — зберігаються згідно регуляторних вимог CSA (мінімум 7 років після завершення відносин).',
        ],
      },
      {
        h: 'Як використовуємо',
        body: [
          'Тільки для цілей які явно зазначені при зборі:',
          '— **Освітні матеріали і відповіді на твої питання** через email/портал',
          '— **Бронювання discovery calls** через Calendly',
          '— **Сегментована аналітика** (анонімізована — не повʼязує конкретного відвідувача з ім\'ям)',
          '— **KYC + Suitability** для EMD-сервісів (де це регуляторно вимагається)',
          '— **Не продаємо і не передаємо третім сторонам** для маркетингу.',
        ],
      },
      {
        h: 'Кому передаємо дані',
        body: [
          'Третім особам — **тільки** з конкретною ціллю і з мінімально необхідним обсягом:',
          '— **Brevo** (Франція, GDPR-compliant) — для розсилок. <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Supabase** (США, hosted у us-west-1) — для зберігання даних. <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Google Analytics 4** (Google LLC, США) — аналітика. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Microsoft Clarity** (Microsoft, США) — session replay для UX-аналізу. <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Calendly** (США) — discovery calls. <a href="https://calendly.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Vercel** (США) — хостинг сайту. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Axcess Capital Advisors Inc.** (Канада) — як dealer-фірма, обов\'язково отримує EMD-related дані.',
        ],
      },
      {
        h: 'Як зберігаємо',
        body: [
          '**Encryption at rest** у Supabase (AES-256), **encryption in transit** (TLS 1.3 скрізь).',
          'Хеш IP замість IP — для аналітики не можемо ідентифікувати конкретну особу.',
          'Дотримуємось **principle of least privilege** — кожен service-key обмежений мінімальним scope.',
          'Регуляторні дані EMD — згідно CSA NI 31-103 (мінімум 7 років після завершення відносин).',
        ],
      },
      {
        h: 'Твої права',
        body: [
          'За PIPEDA ти маєш право:',
          '— **Доступ** — попросити копію всіх своїх даних, які у мене є',
          '— **Корекція** — виправити неточну інформацію',
          '— **Видалення** — попросити видалити дані (з обмеженнями для регуляторних EMD-документів)',
          '— **Відкликати згоду** на email-розсилку — один клік "unsubscribe" у кожному листі',
          '— **Скаргу** — у Office of the Privacy Commissioner of Canada (priv.gc.ca) якщо вважаєш що порушено',
          'Для запиту — напиши на **andrii@sky-fort.ca**. Відповім протягом 30 днів (PIPEDA-вимога).',
        ],
      },
      {
        h: 'Cookies',
        body: [
          'Сайт використовує cookies трьох типів — деталі у <a href="/uk/cookies">Cookie policy</a>:',
          '**Необхідні** — сесія, безпека (завжди увімкнені)',
          '**Аналітика** — Google Analytics 4, Microsoft Clarity (можна вимкнути)',
          '**Маркетинг** — Brevo tracking pixel (опційно)',
          'При першому відвідуванні зʼявляється cookie-banner з вибором. Можеш змінити рішення коли завгодно — посилання у footer-і.',
        ],
      },
      {
        h: 'Транскордонна передача даних',
        body: [
          'Деякі провайдери (GA, Clarity, Vercel, Supabase) знаходяться у США. PIPEDA вимагає інформувати про це. Дані шифровані in-transit і at-rest, але формально підпадають під US-юрисдикцію коли там зберігаються.',
          'Brevo — Франція (EU GDPR, ще суворіше захищає).',
        ],
      },
      {
        h: 'Дитячі дані',
        body: ['Сайт не призначений для дітей до 16 років. Ми не збираємо свідомо дані осіб молодше 16. Якщо дізнаєшся що дитина передала нам дані — повідом і ми видалимо.'],
      },
      {
        h: 'Зміни політики',
        body: ['Можемо оновлювати цю політику. При суттєвих змінах — повідомимо підписників email-ом за 30 днів. Дата оновлення — вгорі сторінки.'],
      },
    ],
  },

  ru: {
    crumbHome: 'Главная',
    crumbPrivacy: 'Политика приватности',
    title: 'Политика приватности · SkyFort',
    description: 'Как SkyFort собирает, использует и хранит личные данные согласно PIPEDA и CASL.',
    h1: 'Политика приватности',
    updated: 'Обновлено: 27 мая 2026',
    intro: 'Эта политика описывает как **Andrii Andriushchenko** (далее — "SkyFort", "мы", "я") собирает, использует, хранит и защищает личные данные посетителей сайта **sky-fort.ca**, клиентов и подписчиков. Соблюдаем **Personal Information Protection and Electronic Documents Act (PIPEDA)** и **Canada\'s Anti-Spam Legislation (CASL)**.',
    sections: [
      {
        h: 'Контактное лицо',
        body: [
          'Вопросы приватности, доступ к данным, удаление:',
          '**Andrii Andriushchenko**, Licensed Dealing Representative · NRD #4575551 · andrii@sky-fort.ca · +1-403-397-2553',
          'Calgary, Alberta, Canada',
        ],
      },
      {
        h: 'Какие данные собираем',
        body: [
          'В зависимости от того как взаимодействуешь с сайтом:',
          '**Если просто читаешь**: IP-адрес (hashed), браузер, ОС, язык — для аналитики через Google Analytics 4 и Microsoft Clarity. Cookie-согласие обязательно (см. секцию Cookies).',
          '**Если подписываешься на email**: email, имя (опц.), источник подписки, UTM-параметры. Хранится в Brevo и Supabase (backup).',
          '**Если записываешься на discovery call**: имя, email, контекст ситуации, часовой пояс. Хранится в Calendly + Supabase.',
          '**Если становишься клиентом портала**: полное имя, email, провинция, язык, данные которые ты сам вводишь о своих счетах (это **твоя личная** информация, не official statement). Хранится в Supabase, доступно только тебе через RLS.',
          '**Как EMD-клиент** (формально через Axcess Capital Advisors): KYC-документы, Suitability Assessment — согласно требованиям CSA (минимум 7 лет после завершения отношений).',
        ],
      },
      {
        h: 'Как используем',
        body: [
          'Только для целей которые явно указаны при сборе:',
          '— **Образовательные материалы и ответы на вопросы** через email/портал',
          '— **Бронирование discovery calls**',
          '— **Сегментированная аналитика** (анонимизированная)',
          '— **KYC + Suitability** для EMD-сервисов',
          '— **Не продаём и не передаём третьим сторонам** для маркетинга.',
        ],
      },
      {
        h: 'Кому передаём данные',
        body: [
          'Только с конкретной целью и минимально необходимым объёмом:',
          '— **Brevo** (Франция, GDPR) — для рассылок. <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener">Privacy</a>',
          '— **Supabase** (США) — для хранения. <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Privacy</a>',
          '— **Google Analytics 4** (Google LLC, США). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy</a>',
          '— **Microsoft Clarity** (Microsoft, США). <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener">Privacy</a>',
          '— **Calendly** (США). <a href="https://calendly.com/privacy" target="_blank" rel="noopener">Privacy</a>',
          '— **Vercel** (США) — хостинг. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Privacy</a>',
          '— **Axcess Capital Advisors Inc.** (Канада) — как dealer-фирма, обязательно получает EMD-related данные.',
        ],
      },
      {
        h: 'Как храним',
        body: [
          '**Encryption at rest** в Supabase (AES-256), **encryption in transit** (TLS 1.3).',
          'Hash IP вместо IP — для аналитики невозможно идентифицировать конкретного человека.',
          '**Principle of least privilege** — каждый service-key с минимальным scope.',
          'EMD-данные — согласно CSA NI 31-103 (минимум 7 лет).',
        ],
      },
      {
        h: 'Твои права',
        body: [
          'По PIPEDA ты имеешь право:',
          '— **Доступ** — копия всех твоих данных',
          '— **Коррекция** — исправить неточную информацию',
          '— **Удаление** — попросить удалить (с ограничениями для регуляторных EMD-документов)',
          '— **Отозвать согласие** на email-рассылку — один клик "unsubscribe"',
          '— **Жалоба** в Office of the Privacy Commissioner of Canada (priv.gc.ca)',
          'Для запроса — напиши на **andrii@sky-fort.ca**. Отвечу в течение 30 дней (PIPEDA).',
        ],
      },
      {
        h: 'Cookies',
        body: [
          'Сайт использует cookies трёх типов — детали в <a href="/ru/cookies">Cookie policy</a>:',
          '**Необходимые** — сессия, безопасность (всегда включены)',
          '**Аналитика** — Google Analytics 4, Microsoft Clarity (можно выключить)',
          '**Маркетинг** — Brevo tracking pixel (опц.)',
          'При первом визите появляется cookie-banner с выбором. Можешь изменить решение в любой момент — ссылка в footer.',
        ],
      },
      {
        h: 'Трансграничная передача данных',
        body: [
          'Некоторые провайдеры (GA, Clarity, Vercel, Supabase) находятся в США. PIPEDA требует информировать. Данные шифрованы in-transit и at-rest, но формально подпадают под US-юрисдикцию.',
          'Brevo — Франция (EU GDPR).',
        ],
      },
      {
        h: 'Детские данные',
        body: ['Сайт не предназначен для детей до 16 лет. Сознательно не собираем данные лиц моложе 16.'],
      },
      {
        h: 'Изменения политики',
        body: ['Можем обновлять. При существенных изменениях — уведомим подписчиков email за 30 дней. Дата вверху.'],
      },
    ],
  },

  en: {
    crumbHome: 'Home',
    crumbPrivacy: 'Privacy policy',
    title: 'Privacy policy · SkyFort',
    description: 'How SkyFort collects, uses, and stores personal data in compliance with PIPEDA and CASL.',
    h1: 'Privacy policy',
    updated: 'Updated: May 27, 2026',
    intro: 'This policy describes how **Andrii Andriushchenko** (hereafter "SkyFort", "we", "I") collects, uses, stores, and protects personal data from visitors of **sky-fort.ca**, clients, and subscribers. We comply with the **Personal Information Protection and Electronic Documents Act (PIPEDA)** and **Canada\'s Anti-Spam Legislation (CASL)**.',
    sections: [
      {
        h: 'Contact for privacy',
        body: [
          'Privacy questions, data access, deletion requests:',
          '**Andrii Andriushchenko**, Licensed Dealing Representative · NRD #4575551 · andrii@sky-fort.ca · +1-403-397-2553',
          'Calgary, Alberta, Canada',
        ],
      },
      {
        h: 'What we collect',
        body: [
          'Depending on how you interact with the site:',
          '**If you just read**: IP address (hashed), browser, OS, language — for analytics via Google Analytics 4 and Microsoft Clarity. Cookie consent required (see Cookies section).',
          '**If you subscribe to email**: email, name (optional), subscription source, UTM parameters. Stored in Brevo (our email provider) and Supabase (backup).',
          '**If you book a discovery call**: name, email, context (as filled in the form), time zone. Stored in Calendly + Supabase.',
          '**If you become a portal client**: full name, email, province, language, data you enter yourself about your accounts (balance, account type — this is **your own** information, not an official statement). Stored in Supabase, accessible only to you via Row-Level Security.',
          '**As an EMD client** (formally through Axcess Capital Advisors): additional KYC documents, Suitability Assessment — stored per CSA regulatory requirements (minimum 7 years after relationship ends).',
        ],
      },
      {
        h: 'How we use it',
        body: [
          'Only for purposes explicitly stated at collection:',
          '— **Educational materials and answering your questions** via email/portal',
          '— **Discovery call booking** via Calendly',
          '— **Aggregate analytics** (anonymized — not linking visitors to identities)',
          '— **KYC + Suitability** for EMD services (where regulatorily required)',
          '— **We do not sell or transfer to third parties** for marketing.',
        ],
      },
      {
        h: 'Who we share it with',
        body: [
          'Third parties — **only** with specific purpose and minimum necessary scope:',
          '— **Brevo** (France, GDPR-compliant) — for email. <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Supabase** (US, hosted us-west-1) — for data storage. <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Google Analytics 4** (Google LLC, US) — analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Microsoft Clarity** (Microsoft, US) — session replay. <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Calendly** (US) — discovery calls. <a href="https://calendly.com/privacy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Vercel** (US) — site hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Privacy policy</a>',
          '— **Axcess Capital Advisors Inc.** (Canada) — as dealer firm, required to receive EMD-related data.',
        ],
      },
      {
        h: 'How we store it',
        body: [
          '**Encryption at rest** in Supabase (AES-256), **encryption in transit** (TLS 1.3 everywhere).',
          'IP hash instead of IP — for analytics we cannot identify specific people.',
          'We follow **principle of least privilege** — each service key has minimal scope.',
          'EMD regulatory data — per CSA NI 31-103 (minimum 7 years after relationship ends).',
        ],
      },
      {
        h: 'Your rights',
        body: [
          'Under PIPEDA you have the right to:',
          '— **Access** — request a copy of all your data we hold',
          '— **Correction** — fix inaccurate information',
          '— **Deletion** — request deletion (with limits for regulatory EMD documents)',
          '— **Withdraw consent** to email — one-click "unsubscribe" in every email',
          '— **Complaint** to the Office of the Privacy Commissioner of Canada (priv.gc.ca) if you believe we\'ve violated this policy',
          'For any request — email **andrii@sky-fort.ca**. I respond within 30 days (PIPEDA requirement).',
        ],
      },
      {
        h: 'Cookies',
        body: [
          'The site uses three types of cookies — details in the <a href="/en/cookies">Cookie policy</a>:',
          '**Necessary** — session, security (always on)',
          '**Analytics** — Google Analytics 4, Microsoft Clarity (can be disabled)',
          '**Marketing** — Brevo tracking pixel (optional)',
          'On first visit a cookie banner appears with options. You can change your decision anytime — link in footer.',
        ],
      },
      {
        h: 'Cross-border data transfer',
        body: [
          'Some providers (GA, Clarity, Vercel, Supabase) are in the US. PIPEDA requires informing you. Data is encrypted in-transit and at-rest, but formally falls under US jurisdiction when stored there.',
          'Brevo — France (EU GDPR, even stricter protection).',
        ],
      },
      {
        h: 'Children\'s data',
        body: ['The site is not intended for children under 16. We do not knowingly collect data from anyone under 16. If you learn that a child has provided us data — let us know and we will delete it.'],
      },
      {
        h: 'Policy changes',
        body: ['We may update this policy. For material changes we will notify subscribers by email 30 days in advance. Update date at the top.'],
      },
    ],
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
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}/privacy`])
  );
  alternates['x-default'] = '/uk/privacy';

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${locale}/privacy`, languages: alternates },
  };
}

function inlineMd(s) {
  // tiny **bold** → <strong> renderer + raw <a> passthrough
  return s.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const c = COPY[locale] || COPY.uk;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:pt-32">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbPrivacy },
          ]}
        />
        <header className="mt-10">
          <h1 className="font-display text-4xl text-white md:text-5xl">{c.h1}</h1>
          <p className="mt-3 text-sm text-[var(--color-fg-subtle)]">{c.updated}</p>
          <p
            className="mt-6 text-lg leading-relaxed text-[var(--color-fg-muted)]"
            dangerouslySetInnerHTML={{ __html: inlineMd(c.intro) }}
          />
        </header>

        {c.sections.map((sec, i) => (
          <section key={i} className="mt-12">
            <h2 className="font-display text-2xl text-white md:text-3xl">{sec.h}</h2>
            {sec.body.map((para, j) => (
              <p
                key={j}
                className="mt-4 leading-relaxed text-[var(--color-fg-muted)]"
                dangerouslySetInnerHTML={{ __html: inlineMd(para) }}
              />
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
