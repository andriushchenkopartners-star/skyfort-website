// app/api/search-index/route.ts
// Build-time generated search index for client-side site search. Reads all
// blog posts + a hardcoded list of high-value pillar pages and returns a
// compact JSON the client uses for fuzzy filtering.
//
// Why a route handler instead of pre-built JSON file: the route is
// fetched once on first search open, cached by browser, and self-updates
// when blog content changes (no separate index generation step).

import { NextResponse } from "next/server";
import { getAllPosts } from "../../_lib/blog";
import type { Locale } from "../../_lib/blog";

// Hardcoded pillar / reference / calculator URLs grouped by locale. Add new
// pages here when shipping; blog posts auto-pick up via getAllPosts.
const STATIC_PAGES: Record<Locale, Array<{ url: string; title: string; description: string; pillar: string }>> = {
  uk: [
    { url: "/uk/pro-mene", title: "Про мене — Licensed Dealing Representative", description: "NRD #4575551, Axcess Capital Advisors Inc., досвід та credentials", pillar: "About" },
    { url: "/uk/perevirka", title: "Перевір мене за 3 хвилини", description: "NRD search, ASC, IFSE EMP, OBSI — 4-крокова перевірка radniка", pillar: "Trust" },
    { url: "/uk/porivnyannia", title: "EMD vs CIRO vs Insurance", description: "Порівняльна таблиця 4 типів канадських фінансових ліцензій", pillar: "Trust" },
    { url: "/uk/finfluencer-compliance", title: "Finfluencer compliance: Notice 31-369", description: "Joint CSA/CIRO Staff Notice 31-369 (грудень 2025) пояснення", pillar: "Trust" },
    { url: "/uk/eligibility", title: "Eligible Investor self-check за 60 секунд", description: "NI 45-106 §1.1 — чи відкривається exempt market", pillar: "Tool" },
    { url: "/uk/slovnyk", title: "Словник канадських фінансів", description: "30+ термінів TFSA, RRSP, CCPC, MPC, MIC, EMD з джерелами", pillar: "Reference" },
    { url: "/uk/dlya-it-fakhivtsiv", title: "Фінанси для IT-фахівців у Канаді", description: "RSU, ESPP, RRSP, US-employer cross-border — 12-місячний roadmap", pillar: "Tech" },
    { url: "/uk/dlya-mediks", title: "Фінанси для лікарів у Канаді", description: "MPC, IPP, holdco, salary/dividend split — 10-річна стратегія", pillar: "Medical" },
    { url: "/uk/dlya-pidpryyemtsiv", title: "Фінанси для підприємців у Канаді", description: "CCPC, TOSI, LCGE на QSBS, family trust — 10-річний roadmap", pillar: "Founders" },
    { url: "/uk/case-studies", title: "Кейси клієнтів — анонімізовані сценарії", description: "Регуляторна логіка анонімізації + 3 composite кейси", pillar: "Cases" },
    { url: "/uk/case-studies/it-fakhivets-rsu-vesting-strategy", title: "Кейс: IT-фахівець з $108K RSU vesting", description: "Senior engineer Calgary — стратегія RRSP + sell-80%-vested", pillar: "Cases" },
    { url: "/uk/case-studies/mediks-mpc-incorporation-timeline", title: "Кейс: family physician і MPC", description: "$250K practice income — incorporate на 2-3 рік", pillar: "Cases" },
    { url: "/uk/case-studies/pidpryyemets-lcge-exit-planning", title: "Кейс: $3M exit з family trust + multi-LCGE", description: "8-year founder — purification + LCGE стратегія", pillar: "Cases" },
    { url: "/uk/tt-library", title: "TikTok library з транскриптами", description: "VideoObject schema, AI-search citations, повні транскрипти", pillar: "Reference" },
    { url: "/uk/calculators/tfsa-growth", title: "TFSA калькулятор", description: "Compound growth на 20 років, банк vs ETF comparison", pillar: "Tool" },
    { url: "/uk/calculators/mortgage", title: "Mortgage калькулятор", description: "Stress test, CMHC, GDS/TDS, early payoff", pillar: "Tool" },
    { url: "/uk/calculators/financial-freedom", title: "Financial Freedom (FIRE) калькулятор", description: "Дата FI на основі твоїх цифр", pillar: "Tool" },
    { url: "/uk/calculators/rsu-tax", title: "RSU Tax калькулятор", description: "2026 federal + AB/BC/ON brackets, RRSP refund математика", pillar: "Tool" },
    { url: "/uk/calculators/mer-impact", title: "MER impact калькулятор", description: "T-REX score — скільки комісії з'їдають за 30 років", pillar: "Tool" },
    { url: "/uk/calculators/mpc-vs-sole-proprietor", title: "MPC vs Sole Proprietor калькулятор", description: "Physician income → tax savings з MPC", pillar: "Tool" },
    { url: "/uk/blog", title: "Блог — освітні матеріали", description: "Pillar статті про TFSA, RRSP, FHSA, exempt market, RSU, MPC, LCGE", pillar: "Blog" },
    { url: "/uk/contact", title: "Контакти + Calendly", description: "30-хвилинна безкоштовна consultation", pillar: "Contact" },
  ],
  ru: [
    { url: "/ru/pro-mene", title: "Обо мне — Licensed Dealing Representative", description: "NRD #4575551, Axcess Capital Advisors Inc.", pillar: "About" },
    { url: "/ru/perevirka", title: "Проверь меня за 3 минуты", description: "NRD search, ASC, IFSE EMP, OBSI", pillar: "Trust" },
    { url: "/ru/porivnyannia", title: "EMD vs CIRO vs Insurance", description: "Сравнительная таблица 4 типов канадских финансовых лицензий", pillar: "Trust" },
    { url: "/ru/finfluencer-compliance", title: "Finfluencer compliance: Notice 31-369", description: "Joint CSA/CIRO Staff Notice 31-369 (декабрь 2025)", pillar: "Trust" },
    { url: "/ru/eligibility", title: "Eligible Investor self-check", description: "NI 45-106 §1.1 — 60 секунд", pillar: "Tool" },
    { url: "/ru/slovnyk", title: "Словарь канадских финансов", description: "30+ терминов TFSA, RRSP, CCPC, MPC, MIC, EMD", pillar: "Reference" },
    { url: "/ru/dlya-it-fakhivtsiv", title: "Финансы для IT-специалистов в Канаде", description: "RSU, ESPP, RRSP — 12-месячный roadmap", pillar: "Tech" },
    { url: "/ru/dlya-mediks", title: "Финансы для врачей в Канаде", description: "MPC, IPP, holdco — 10-летняя стратегия", pillar: "Medical" },
    { url: "/ru/dlya-pidpryyemtsiv", title: "Финансы для предпринимателей в Канаде", description: "CCPC, TOSI, LCGE — 10-летний roadmap", pillar: "Founders" },
    { url: "/ru/case-studies", title: "Кейсы клиентов — анонимизированные сценарии", description: "Регуляторная логика + 3 composite кейса", pillar: "Cases" },
    { url: "/ru/case-studies/it-fakhivets-rsu-vesting-strategy", title: "Кейс: IT-специалист с RSU vesting", description: "Senior engineer Calgary", pillar: "Cases" },
    { url: "/ru/case-studies/mediks-mpc-incorporation-timeline", title: "Кейс: family physician и MPC", description: "$250K practice income", pillar: "Cases" },
    { url: "/ru/case-studies/pidpryyemets-lcge-exit-planning", title: "Кейс: $3M exit с family trust", description: "8-year founder + multi-LCGE", pillar: "Cases" },
    { url: "/ru/calculators/tfsa-growth", title: "TFSA калькулятор", description: "Compound growth", pillar: "Tool" },
    { url: "/ru/calculators/mer-impact", title: "MER impact калькулятор", description: "T-REX score", pillar: "Tool" },
    { url: "/ru/calculators/mpc-vs-sole-proprietor", title: "MPC vs Sole Proprietor", description: "Physician calc", pillar: "Tool" },
    { url: "/ru/blog", title: "Блог", description: "Pillar статьи", pillar: "Blog" },
    { url: "/ru/contact", title: "Контакты + Calendly", description: "30-минутная бесплатная consultation", pillar: "Contact" },
  ],
  en: [
    { url: "/en/pro-mene", title: "About — Licensed Dealing Representative", description: "NRD #4575551, Axcess Capital Advisors Inc.", pillar: "About" },
    { url: "/en/perevirka", title: "Verify me in 3 minutes", description: "NRD, ASC, IFSE EMP, OBSI", pillar: "Trust" },
    { url: "/en/porivnyannia", title: "EMD vs CIRO vs Insurance", description: "Canadian financial licence comparison", pillar: "Trust" },
    { url: "/en/finfluencer-compliance", title: "Finfluencer compliance: CSA/CIRO Notice 31-369", description: "Dec 2025 staff notice explainer", pillar: "Trust" },
    { url: "/en/eligibility", title: "Eligible Investor self-check", description: "NI 45-106 §1.1 — 60 seconds", pillar: "Tool" },
    { url: "/en/slovnyk", title: "Canadian finance glossary", description: "30+ terms TFSA, RRSP, CCPC, MPC, MIC, EMD with sources", pillar: "Reference" },
    { url: "/en/dlya-it-fakhivtsiv", title: "Finance for tech workers in Canada", description: "RSU, ESPP, RRSP — 12-month roadmap", pillar: "Tech" },
    { url: "/en/dlya-mediks", title: "Finance for physicians in Canada", description: "MPC, IPP, holdco — 10-year strategy", pillar: "Medical" },
    { url: "/en/dlya-pidpryyemtsiv", title: "Finance for entrepreneurs in Canada", description: "CCPC, TOSI, LCGE — 10-year roadmap", pillar: "Founders" },
    { url: "/en/case-studies", title: "Client cases — anonymized scenarios", description: "Regulatory rationale + 3 composite cases", pillar: "Cases" },
    { url: "/en/case-studies/it-fakhivets-rsu-vesting-strategy", title: "Case: tech worker with $108K RSU vesting", description: "Senior engineer Calgary", pillar: "Cases" },
    { url: "/en/case-studies/mediks-mpc-incorporation-timeline", title: "Case: family physician + MPC", description: "$250K practice income", pillar: "Cases" },
    { url: "/en/case-studies/pidpryyemets-lcge-exit-planning", title: "Case: $3M founder exit with family trust", description: "Multi-LCGE strategy", pillar: "Cases" },
    { url: "/en/calculators/tfsa-growth", title: "TFSA calculator", description: "Compound growth, bank vs ETF", pillar: "Tool" },
    { url: "/en/calculators/mer-impact", title: "MER impact calculator", description: "T-REX score on 30-year horizon", pillar: "Tool" },
    { url: "/en/calculators/mpc-vs-sole-proprietor", title: "MPC vs Sole Proprietor calculator", description: "Physician tax differential", pillar: "Tool" },
    { url: "/en/blog", title: "Blog", description: "Pillar articles", pillar: "Blog" },
    { url: "/en/contact", title: "Contact + Calendly", description: "Free 30-minute consultation", pillar: "Contact" },
  ],
};

export type SearchDoc = {
  url: string;
  title: string;
  description: string;
  pillar: string;
};

// Cache the response for 1 hour so repeated openings of the search modal
// don't re-build the index. Stale-while-revalidate so blog updates
// propagate quickly without blocking.
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const docs: SearchDoc[] = [];
  for (const locale of ["uk", "ru", "en"] as Locale[]) {
    for (const p of STATIC_PAGES[locale]) docs.push(p);
    for (const post of getAllPosts(locale)) {
      docs.push({
        url: `/${locale}/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        pillar: post.pillar || "Blog",
      });
    }
  }
  return NextResponse.json({ docs, generatedAt: new Date().toISOString() });
}
