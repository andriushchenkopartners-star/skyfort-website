// app/not-found.js
// Site-wide 404 page. Replaces Next.js default. Detects language from the
// URL via headers().get('x-pathname') (set by proxy.js), serves locale-
// appropriate copy with smart suggestions for popular pages.
//
// Per audit 5 follow-up (batch 11): localized 404 with route-routing
// suggestions helps users land on the right page after a typo / outdated
// link / Estate-era URL that's now 404. Without this, default Next 404
// shows English-only "404 - This page could not be found" — useless for
// uk/ru audience.

import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./_components/Logo";

function langFromPath(p) {
  if (p?.startsWith("/ru")) return "ru";
  if (p?.startsWith("/en")) return "en";
  return "uk";
}

const COPY = {
  uk: {
    title: "Сторінку не знайдено",
    sub: "Можливо ти прийшов за застарілим лінком, або URL змінився. Ось куди людям зазвичай потрібно:",
    homeBtn: "На головну",
    suggestionsTitle: "Популярні розділи",
    suggestions: [
      { href: "/uk", label: "Головна", desc: "Огляд того хто я і чим займаюсь" },
      { href: "/uk/blog", label: "Блог", desc: "12 пілларних статей про TFSA, RRSP, RSU, exempt market, MPC" },
      { href: "/uk/calculators/tfsa-growth", label: "Калькулятори", desc: "TFSA growth, mortgage, RSU tax, financial freedom" },
      { href: "/uk/eligibility", label: "Eligible Investor self-check", desc: "60 секунд — чи відкривається exempt market" },
      { href: "/uk/dlya-it-fakhivtsiv", label: "Гайди по аудиторіях", desc: "IT-фахівцям · Лікарям · Підприємцям" },
      { href: "/uk/slovnyk", label: "Словник канадських фінансів", desc: "30+ термінів з джерелами" },
      { href: "/uk/perevirka", label: "Перевір мою реєстрацію", desc: "NRD #4575551 за 3 хвилини" },
      { href: "/uk/contact", label: "Контакти + Calendly", desc: "Безкоштовний 30-хвилинний дзвінок" },
    ],
  },
  ru: {
    title: "Страница не найдена",
    sub: "Возможно ты пришёл по устаревшей ссылке, или URL изменился. Вот куда обычно нужно:",
    homeBtn: "На главную",
    suggestionsTitle: "Популярные разделы",
    suggestions: [
      { href: "/ru", label: "Главная", desc: "Обзор того кто я и чем занимаюсь" },
      { href: "/ru/blog", label: "Блог", desc: "12 пилларных статей о TFSA, RRSP, RSU, exempt market, MPC" },
      { href: "/ru/calculators/tfsa-growth", label: "Калькуляторы", desc: "TFSA growth, mortgage, RSU tax, financial freedom" },
      { href: "/ru/eligibility", label: "Eligible Investor self-check", desc: "60 секунд — открывается ли exempt market" },
      { href: "/ru/dlya-it-fakhivtsiv", label: "Гайды по аудиториям", desc: "IT · Врачам · Предпринимателям" },
      { href: "/ru/slovnyk", label: "Словарь канадских финансов", desc: "30+ терминов с источниками" },
      { href: "/ru/perevirka", label: "Проверь мою регистрацию", desc: "NRD #4575551 за 3 минуты" },
      { href: "/ru/contact", label: "Контакты + Calendly", desc: "Бесплатный 30-минутный звонок" },
    ],
  },
  en: {
    title: "Page not found",
    sub: "You might have followed an outdated link, or the URL changed. Here's where people usually need to go:",
    homeBtn: "Home",
    suggestionsTitle: "Popular sections",
    suggestions: [
      { href: "/en", label: "Home", desc: "Overview of who I am and what I do" },
      { href: "/en/blog", label: "Blog", desc: "12 pillar articles on TFSA, RRSP, RSU, exempt market, MPC" },
      { href: "/en/calculators/tfsa-growth", label: "Calculators", desc: "TFSA growth, mortgage, RSU tax, financial freedom" },
      { href: "/en/eligibility", label: "Eligible Investor self-check", desc: "60 seconds — do you fit exempt market" },
      { href: "/en/dlya-it-fakhivtsiv", label: "Audience pillar guides", desc: "Tech workers · Physicians · Founders" },
      { href: "/en/slovnyk", label: "Canadian finance glossary", desc: "30+ terms with sources" },
      { href: "/en/perevirka", label: "Verify my registration", desc: "NRD #4575551 in 3 minutes" },
      { href: "/en/contact", label: "Contact + Calendly", desc: "Free 30-minute call" },
    ],
  },
};

export default async function NotFound() {
  const h = await headers();
  const path = h.get("x-pathname") || "";
  const lang = langFromPath(path);
  const c = COPY[lang] || COPY.uk;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${lang}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
        </div>
      </header>

      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-7xl font-extrabold text-[var(--color-brand)] opacity-60">
            404
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">
            {c.title}
          </h1>
          <p className="mt-4 text-lg text-white/75">{c.sub}</p>
          <Link
            href={`/${lang}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {c.homeBtn} <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{c.suggestionsTitle}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.suggestions.map((s, i) => (
              <li key={i}>
                <Link
                  href={s.href}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[var(--color-brand)]/40"
                >
                  <p className="font-bold text-white group-hover:text-[var(--color-brand)]">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-white/65">{s.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
