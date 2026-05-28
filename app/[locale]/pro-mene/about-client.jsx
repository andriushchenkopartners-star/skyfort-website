"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import { resolveLocale } from "../../_i18n/dictionary";
import { CONFIG } from "../../_i18n/config";

// ─── /pro-mene FAQ — addresses common objections before the CTA ────────────
// Topics chosen to handle the questions newcomers actually ask before booking:
// process, eligibility, pricing, license boundaries, low-asset path, compliance.
// All answers educational only — no return promises, no specific product names.

const FAQ_HEADING = {
  uk: "Часті питання",
  ru: "Частые вопросы",
  en: "Frequently asked questions",
};

const FAQ = {
  uk: [
    {
      q: "Як проходить discovery call?",
      a: "30 хвилин у Zoom або Google Meet. Спочатку обговорюємо твою ситуацію — імміграційний статус, доходи, цілі, що вже зроблено. Потім я пояснюю які інструменти підходять (TFSA, RRSP, FHSA, exempt market) і чому. В кінці — наступні кроки, без тиску. «Не зараз» — нормальна відповідь.",
    },
    {
      q: "Чи треба бути Eligible Investor щоб поговорити?",
      a: "Ні. Більшість моїх клієнтів — newcomers, які ще тільки будують фундамент. 80% починають з TFSA/RRSP/FHSA. Exempt market — наступний крок, коли вже є infrastructure. Discovery call корисний у будь-якому випадку.",
    },
    {
      q: "Скільки коштує консультація?",
      a: "Discovery call безкоштовний. Якщо рекомендую exempt market продукт і ти підписуєшся — я отримую commission від issuer (стандартна канадська практика, прозоро вказана в Offering Memorandum). Якщо ти не підписуєшся — нічого не платиш. Освітні матеріали і дзвінок завжди безкоштовні.",
    },
    {
      q: "Чи можеш порекомендувати конкретний ETF або mutual fund?",
      a: "Ні. Моя ліцензія — Dealing Representative для exempt market. Public market securities (ETF, mutual funds, individual stocks) поза моєю ліцензією — для них потрібен CIRO-registered advisor. Освітньо обговорити можу; формально рекомендувати — ні.",
    },
    {
      q: "Я newcomer без $400K — є сенс зустрічі?",
      a: "Так. $400K — поріг Accredited Investor для деяких exempt-market продуктів. Але більшість моїх клієнтів починають набагато менш. На discovery call розберемо твою ситуацію, побудуємо план через TFSA/RRSP/FHSA, а коли (і якщо) виростеш до Eligible Investor — додамо exempt market інструменти.",
    },
    {
      q: "Чи всі матеріали узгоджені з compliance?",
      a: "Так. Усі публічні матеріали — освітні, без обіцянок дохідності, без персональних рекомендацій. CCO (Chief Compliance Officer) Axcess Capital переглядає контент. Перевір мою реєстрацію за NRD #4575551 на сайті Canadian Securities Administrators — лінк у дисклеймері.",
    },
  ],
  ru: [
    {
      q: "Как проходит discovery call?",
      a: "30 минут в Zoom или Google Meet. Сначала обсуждаем твою ситуацию — иммиграционный статус, доходы, цели, что уже сделано. Потом я объясняю какие инструменты подходят (TFSA, RRSP, FHSA, exempt market) и почему. В конце — следующие шаги, без давления. «Не сейчас» — нормальный ответ.",
    },
    {
      q: "Нужно ли быть Eligible Investor чтобы поговорить?",
      a: "Нет. Большинство моих клиентов — newcomers, которые ещё только строят фундамент. 80% начинают с TFSA/RRSP/FHSA. Exempt market — следующий шаг, когда уже есть infrastructure. Discovery call полезен в любом случае.",
    },
    {
      q: "Сколько стоит консультация?",
      a: "Discovery call бесплатный. Если рекомендую exempt market продукт и ты подписываешься — я получаю commission от issuer (стандартная канадская практика, прозрачно указано в Offering Memorandum). Если ты не подписываешься — ничего не платишь. Образовательные материалы и звонок всегда бесплатные.",
    },
    {
      q: "Можешь ли ты порекомендовать конкретный ETF или mutual fund?",
      a: "Нет. Моя лицензия — Dealing Representative для exempt market. Public market securities (ETF, mutual funds, отдельные акции) вне моей лицензии — для них нужен CIRO-registered advisor. Образовательно обсудить могу; формально рекомендовать — нет.",
    },
    {
      q: "Я newcomer без $400K — есть смысл встречи?",
      a: "Да. $400K — порог Accredited Investor для некоторых exempt-market продуктов. Но большинство моих клиентов начинают намного меньше. На discovery call разберём твою ситуацию, построим план через TFSA/RRSP/FHSA, а когда (и если) вырастешь до Eligible Investor — добавим exempt market инструменты.",
    },
    {
      q: "Все ли материалы согласованы с compliance?",
      a: "Да. Все публичные материалы — образовательные, без обещаний доходности, без персональных рекомендаций. CCO (Chief Compliance Officer) Axcess Capital проверяет контент. Проверь мою регистрацию по NRD #4575551 на сайте Canadian Securities Administrators — ссылка в дисклеймере.",
    },
  ],
  en: [
    {
      q: "How does the discovery call work?",
      a: "30 minutes on Zoom or Google Meet. We start by discussing your situation — immigration status, income, goals, what you've already done. Then I explain which tools fit (TFSA, RRSP, FHSA, exempt market) and why. We end with next steps, no pressure. 'Not now' is a fine answer.",
    },
    {
      q: "Do I need to be an Eligible Investor to talk?",
      a: "No. Most of my clients are newcomers still building the foundation. About 80% start with TFSA/RRSP/FHSA. Exempt market is a later step once the infrastructure is in place. The discovery call is useful either way.",
    },
    {
      q: "How much does the consultation cost?",
      a: "The discovery call is free. If I recommend an exempt market product and you subscribe, I receive a commission from the issuer (standard Canadian practice, disclosed transparently in the Offering Memorandum). If you don't subscribe, you pay nothing. Educational materials and the call are always free.",
    },
    {
      q: "Can you recommend a specific ETF or mutual fund?",
      a: "No. My license is Dealing Representative for the exempt market. Public market securities (ETFs, mutual funds, individual stocks) are outside my license — you'd need a CIRO-registered advisor for those. I can discuss them educationally, but I cannot formally recommend them.",
    },
    {
      q: "I'm a newcomer without $400K — is there still a point?",
      a: "Yes. $400K is the Accredited Investor threshold for some exempt-market products, but most of my clients start with much less. On the discovery call we go through your situation, build a plan via TFSA/RRSP/FHSA, and when (and if) you grow into the Eligible Investor category we layer exempt-market tools on top.",
    },
    {
      q: "Are all materials compliance-approved?",
      a: "Yes. All public materials are educational — no return promises, no personal recommendations. Axcess Capital's CCO (Chief Compliance Officer) reviews the content. Verify my registration under NRD #4575551 on the Canadian Securities Administrators website — link in the disclaimer.",
    },
  ],
};

const CALENDLY = CONFIG.calendlyUrl;
const NRD_URL =
  "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const t = {
  uk: {
    kicker: "Про мене",
    name: "Андрій Андрющенко",
    role: "Licensed Dealing Representative · Exempt Market Dealer",
    intro:
      "Українці в Канаді платять банку $300+/місяць за посередність — і не помічають цього 10 років. За той самий період хтось хто почав з системою будує капітал на десятки тисяч більше. Різниця не в зарплаті. В знаннях.",
    storyTitle: "Чому SkyFort",
    story: [
      "Перше що бачиш у Канаді — ціни. Друге — банк продає mutual fund з 1.8% MER, кажучи «це безпечно». Третє — за 5 років твій рахунок ледь випередив інфляцію, а сусід-канадець через self-directed ETF за $5 brokerage комісію має набагато більше. Це не «не пощастило». Це система, яку ніхто не пояснює рідною мовою.",
      "Я переїхав до Канади і пройшов це сам. Пішов вчитися: Exempt Market Proficiency Course (IFSE Institute). Отримав ліцензію Dealing Representative. Зареєстрований в Axcess Capital Advisors Inc. (Exempt Market Dealer) — особисто в AB · BC · ON. NRD #4575551 — перевір сам.",
      "Тепер моя робота — показувати реальну математику українцям, російськомовним і newcomers, які хочуть зрозуміти канадську фінансову систему. Без банківських продавців. Без TikTok-обіцянок 25%. Тільки цифри, інструменти та компас — щоб ти приймав власні зважені рішення.",
    ],
    credTitle: "Кваліфікація та реєстрація",
    credRegLabel: "Поточна реєстрація",
    credReg: "Dealing Representative (Exempt Market Dealer) — Alberta · British Columbia · Ontario",
    credFirmLabel: "Фірма",
    credFirm: "Axcess Capital Advisors Inc.",
    credNrdLabel: "NRD реєстраційний номер",
    credCourseLabel: "Кваліфікація",
    credCourse: "Exempt Market Proficiency Course (EMP) — IFSE Institute, 2024",
    verify: "Перевірити реєстрацію в National Registration Search",
    doTitle: "З чим я працюю",
    canDo: [
      "Exempt market інвестиції (MIC, приватне кредитування, REIT) через Axcess Capital",
      "Стратегія TFSA, RRSP, FHSA — як використати правильно",
      "Планування капіталу для новоприбулих та сімей",
      "Освітні консультації — пояснюю, а не тисну",
    ],
    cantTitle: "Чого я НЕ роблю",
    cantDo: [
      "Не даю рекомендацій по ETF, mutual funds, окремих акціях (public market) — це поза моєю ліцензією",
      "Не обіцяю гарантованої дохідності",
      "Не продаю те, що тобі не підходить",
    ],
    cantNote:
      "Для рекомендацій по public market звертайся до CIRO-registered advisor.",
    ctaTitle: "Готовий поговорити?",
    ctaDesc: "30 хвилин, безкоштовно. Розберемо твою ситуацію та знайдемо найкращий варіант.",
    cta: "Записатись на консультацію",
    crumbHome: "Головна",
    crumbThis: "Про мене",
  },
  ru: {
    kicker: "Обо мне",
    name: "Андрей Андрющенко",
    role: "Licensed Dealing Representative · Exempt Market Dealer",
    intro:
      "Русскоязычные в Канаде платят банку $300+/месяц за посредственность — и не замечают этого 10 лет. За тот же период кто-то, кто начал с системой, строит капитал на десятки тысяч больше. Разница не в зарплате. В знаниях.",
    storyTitle: "Почему SkyFort",
    story: [
      "Первое что видишь в Канаде — цены. Второе — банк продаёт mutual fund с 1.8% MER, говоря «это безопасно». Третье — за 5 лет твой счёт еле обогнал инфляцию, а сосед-канадец через self-directed ETF за $5 brokerage комиссию имеет существенно больше. Это не «не повезло». Это система, которую никто не объясняет на родном языке.",
      "Я переехал в Канаду и прошёл это сам. Пошёл учиться: Exempt Market Proficiency Course (IFSE Institute). Получил лицензию Dealing Representative. Зарегистрирован в Axcess Capital Advisors Inc. (Exempt Market Dealer) — лично в AB · BC · ON. NRD #4575551 — проверь сам.",
      "Теперь моя работа — показывать реальную математику русскоязычным и newcomers, которые хотят понять канадскую финансовую систему. Без банковских продавцов. Без TikTok-обещаний 25%. Только цифры, инструменты и компас — чтобы ты принимал собственные взвешенные решения.",
    ],
    credTitle: "Квалификация и регистрация",
    credRegLabel: "Текущая регистрация",
    credReg: "Dealing Representative (Exempt Market Dealer) — Alberta · British Columbia · Ontario",
    credFirmLabel: "Фирма",
    credFirm: "Axcess Capital Advisors Inc.",
    credNrdLabel: "NRD регистрационный номер",
    credCourseLabel: "Квалификация",
    credCourse: "Exempt Market Proficiency Course (EMP) — IFSE Institute, 2024",
    verify: "Проверить регистрацию в National Registration Search",
    doTitle: "С чем я работаю",
    canDo: [
      "Exempt market инвестиции (MIC, частное кредитование, REIT) через Axcess Capital",
      "Стратегия TFSA, RRSP, FHSA — как использовать правильно",
      "Планирование капитала для новоприбывших и семей",
      "Образовательные консультации — объясняю, а не давлю",
    ],
    cantTitle: "Чего я НЕ делаю",
    cantDo: [
      "Не даю рекомендаций по ETF, mutual funds, отдельным акциям (public market) — это вне моей лицензии",
      "Не обещаю гарантированной доходности",
      "Не продаю то, что тебе не подходит",
    ],
    cantNote:
      "Для рекомендаций по public market обращайся к CIRO-registered advisor.",
    ctaTitle: "Готов поговорить?",
    ctaDesc: "30 минут, бесплатно. Разберём твою ситуацию и найдём лучший вариант.",
    cta: "Записаться на консультацию",
    crumbHome: "Главная",
    crumbThis: "Обо мне",
  },
  en: {
    kicker: "About me",
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative · Exempt Market Dealer",
    intro:
      "Newcomers in Canada pay their bank $300+/month for mediocrity — and don't notice for 10 years. In the same window, someone who started with a system builds tens of thousands more in capital. The difference isn't salary. It's knowledge.",
    storyTitle: "Why SkyFort",
    story: [
      "The first thing you see in Canada is the prices. The second is a bank selling you a mutual fund with a 1.8% MER, calling it 'safe.' The third is realizing five years in that your account barely outpaced inflation while your Canadian-born neighbour with a self-directed ETF at $5 brokerage is meaningfully ahead. That's not bad luck. It's a system nobody explained to you in your own language.",
      "I moved to Canada and went through this myself. So I went to school: Exempt Market Proficiency Course (IFSE Institute). Got my Dealing Representative license. Registered with Axcess Capital Advisors Inc. (Exempt Market Dealer) — personally in AB · BC · ON. NRD #4575551 — verify it yourself.",
      "Now my job is showing real math to Ukrainians, Russian-speakers, and newcomers who want to understand the Canadian financial system. No bank salespeople. No TikTok promises of 25%. Just numbers, tools, and a compass — so you can make your own informed decisions.",
    ],
    credTitle: "Qualifications & registration",
    credRegLabel: "Current registration",
    credReg: "Dealing Representative (Exempt Market Dealer) — Alberta · British Columbia · Ontario",
    credFirmLabel: "Firm",
    credFirm: "Axcess Capital Advisors Inc.",
    credNrdLabel: "NRD registration number",
    credCourseLabel: "Qualification",
    credCourse: "Exempt Market Proficiency Course (EMP) — IFSE Institute, 2024",
    verify: "Verify registration on National Registration Search",
    doTitle: "What I work with",
    canDo: [
      "Exempt market investments (MIC, private lending, REIT) through Axcess Capital",
      "TFSA, RRSP, FHSA strategy — how to use them right",
      "Wealth planning for newcomers and families",
      "Educational consultations — I explain, I don't pressure",
    ],
    cantTitle: "What I DON'T do",
    cantDo: [
      "I don't advise on ETFs, mutual funds, individual stocks (public market) — that's outside my license",
      "I don't promise guaranteed returns",
      "I don't sell what doesn't fit you",
    ],
    cantNote:
      "For public market advice, consult a CIRO-registered advisor.",
    ctaTitle: "Ready to talk?",
    ctaDesc: "30 minutes, free. We'll review your situation and find the best option.",
    cta: "Book a consultation",
    crumbHome: "Home",
    crumbThis: "About",
  },
};

export default function AboutClient({ locale: rawLocale }) {
  const locale = resolveLocale(rawLocale);
  const c = t[locale];

  return (
    <div id="main" className="min-h-screen bg-[#191919] text-white">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbThis },
          ]}
        />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[var(--color-brand)] opacity-20 blur-3xl" aria-hidden="true" />
            <Image
              src="/andrii.jpg"
              alt={c.name}
              width={600}
              height={800}
              priority
              sizes="(min-width: 768px) 50vw, 384px"
              className="h-auto w-full rounded-3xl border border-[#2a2a2a] object-cover"
            />
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">{c.kicker}</p>
            <h1 className="font-display-tight text-5xl text-white md:text-7xl">{c.name}</h1>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 px-4 py-2 text-sm font-semibold text-[#7eaef5]">
              <ShieldCheck className="h-4 w-4" /> {c.role}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-4xl leading-[0.95] text-white md:text-5xl">{c.storyTitle}</h2>
        <div className="mt-8 space-y-5">
          {c.story.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#a3a3a3]">{p}</p>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-[#2a2a2a] bg-[#1f1f1f] p-8 md:p-12">
          <h2 className="font-display text-3xl text-white md:text-4xl">{c.credTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.credRegLabel}</p>
              <p className="mt-1 text-base text-white">{c.credReg}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.credFirmLabel}</p>
              <p className="mt-1 text-base text-white">{c.credFirm}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.credNrdLabel}</p>
              <p className="mt-1 text-base font-bold text-[var(--color-brand)]">NRD #4575551</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.credCourseLabel}</p>
              <p className="mt-1 text-base text-white">{c.credCourse}</p>
            </div>
          </div>
          <a
            href={NRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            <ExternalLink className="h-4 w-4" /> {c.verify}
          </a>
        </div>
      </section>

      {/* DO / DON'T */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl text-white">
              <CheckCircle2 className="h-6 w-6 text-green-400" /> {c.doTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {c.canDo.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#c4c4c4]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[#3a3a3a] bg-[#1f1f1f] p-8">
            <h3 className="flex items-center gap-2 font-display text-2xl text-white">
              <XCircle className="h-6 w-6 text-[#6b6b6b]" /> {c.cantTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {c.cantDo.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#c4c4c4]">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[#2a2a2a] pt-4 text-xs leading-relaxed text-[#6b6b6b]">{c.cantNote}</p>
          </div>
        </div>
      </section>

      {/* FAQ — addresses common objections before the CTA */}
      <StaticFaq
        faq={FAQ[locale] || FAQ.uk}
        heading={FAQ_HEADING[locale] || FAQ_HEADING.uk}
        jsonLdId={`https://sky-fort.ca/${locale}/pro-mene#faq`}
      />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display-tight text-4xl text-white md:text-6xl">{c.ctaTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[#a3a3a3]">{c.ctaDesc}</p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
        >
          {c.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
