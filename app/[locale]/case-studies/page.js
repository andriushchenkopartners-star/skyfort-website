// app/[locale]/case-studies/page.js
// Anonymized client case-studies index. CSA compliance angle: all cases are
// fully de-identified (no names, no employer names, ranges instead of exact
// numbers, "concept illustrations" framing), no return-percentage claims for
// specific securities, no testimonial-style "would recommend" language —
// pure educational walkthroughs of decision frameworks.
//
// Status: framework-only landing page. Individual /uk/case-studies/[slug]
// pages will be added once Andrii has reviewed which client journeys can be
// safely anonymized. For now the index page itself is real content — it
// describes WHAT cases will appear, WHY they're anonymized this way, and
// HOW the reader can map themselves to one (lead-gen funnel).
//
// 4th re-audit #4: anonymized case studies + clear methodology page satisfy
// E-E-A-T "experience" signal that AI Overviews look for in financial YMYL.

import Link from "next/link";
import {
  Code,
  Stethoscope,
  Briefcase,
  Building2,
  Globe,
  ShieldCheck,
  Lock,
  ScrollText,
} from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import TldrBlock from "../../_components/TldrBlock";
import RelatedLinks from "../../_components/RelatedLinks";
import AuthorByline from "../../_components/AuthorByline";
import ScrollDepthTracker from "../../_components/ScrollDepthTracker";
import StickyCta from "../../_components/StickyCta";
import TopicSuggestForm from "../../_components/TopicSuggestForm";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY = {
  uk: {
    titleMeta: "Кейси клієнтів — анонімізовані сценарії",
    descriptionMeta:
      "Освітні анонімізовані кейси: IT-фахівець з RSU, лікар з MPC, підприємець з CCPC, family relocation. Без рекомендацій. Licensed DR, NRD #4575551.",
    crumbHome: "Головна",
    crumbThis: "Кейси клієнтів",
    eyebrow: "Educational case framework",
    title: "Анонімізовані кейси клієнтів",
    subtitle:
      "Декілька реальних сценаріїв із моєї практики (повністю анонімізовані, узагальнені, без конкретних securities) — щоб ти побачив які рішення приймаються і чому.",
    tldr: "Анонімізовані кейси клієнтів: повністю де-ідентифіковані сценарії — IT-фахівець з RSU, лікар з MPC, підприємець з CCPC, family relocation, Eligible Investor entry. Frameworks замість returns. Без імен, без точних чисел, без рекомендацій купити-продати specific securities.",
    introBlock:
      "Я Licensed Dealing Representative (NRD #4575551, Axcess Capital Advisors Inc.). Усе нижче — освітні рамки прийняття рішень, не рекомендації, не обіцянки результатів. Я не публікую імена клієнтів, не показую брокерські рахунки, не оголошую конкретних securities — це порушує і regulatory правила, і базову етику. Замість цього кожен кейс описує тип клієнта (професія + ситуація), три питання які ми задавали, framework який застосовували, і чим завершився перший рік. Якщо твоя ситуація схожа — це не означає що тобі підійде те саме рішення. Це означає що варто обговорити твою специфіку.",
    regulatoryTitle: "Регуляторна логіка: чому case studies в Канаді обмежені",
    regulatoryIntro:
      "Це не просто моя обережність — це прямі вимоги National Instrument 31-103 (Registrant Conduct), що регулює усіх Dealing Representatives у Канаді. Розумієш ці правила — розумієш чому жоден легальний EMD не публікує \"кейсів з 14% returns\" у своєму блозі, і чому коли ти бачиш такі заяви від \"finfluencer-а\" — це майже завжди ознака unregistered operation.",
    regulatoryItems: [
      {
        cite: "NI 31-103, Part 13 — Dealing with Clients",
        body: "Правила marketing communications для зареєстрованих фірм. Заборонено: performance claims про specific securities у public marketing, обіцянки future returns, testimonials що підтверджують конкретні investment performance. Дозволено: educational frameworks, generic market data з джерелами, anonymous categorical examples.",
      },
      {
        cite: "NI 31-103, §13.5 — Marketing Practices",
        body: "Усі marketing materials мають бути fair, balanced, not misleading. Це означає: якщо я показую \"клієнт А заробив 14%\", я також маю показати клієнтів які lost money (CSA reviewer тест). На практиці це робить anonymized case studies зі специфічними returns майже неможливими — простіше публікувати frameworks.",
      },
      {
        cite: "NI 45-106, §1.1 — Eligible Investor & Accredited Investor",
        body: "Категорії інвесторів, що можуть купувати exempt market securities. Eligible: $75K solo income / $125K household, або $400K net assets. Accredited: $200K solo income / $300K household, або $1M+ financial assets, або $5M+ total net assets. Case studies можуть посилатись на цей фреймворк, але не давати індивідуальної рекомендації — це робиться тільки у private suitability assessment.",
      },
      {
        cite: "PIPEDA — Personal Information Protection",
        body: "Federal privacy law що зобов'язує захищати персональну інформацію клієнтів. Навіть якщо клієнт дав usnу згоду на публікацію — мінімально достатня анонімізація потрібна щоб \"reasonably\" не можна було ідентифікувати особу через combination факторів (місто + employer + income + age = identifiable).",
      },
      {
        cite: "Joint CSA/CIRO Staff Notice 31-369 (Dec 2025)",
        body: "Найновіший документ про social media + finfluencer compliance. Підтверджує: освітні fact patterns дозволені; конкретні security recommendations + return claims + performance comparisons — потребують реєстрації + suitability process. Це reframe того, що зареєстровані професіонали можуть казати публічно у 2026 році.",
      },
    ],
    permittedTitle: "Що case studies можуть і не можуть містити",
    permittedItems: [
      { ok: "✓ Дозволено", text: "Категорія клієнта (\"IT-фахівець, AB resident, $130-160K income\")" },
      { ok: "✗ Заборонено", text: "Ім'я, фото, точне місто, employer name" },
      { ok: "✓ Дозволено", text: "Decision framework (\"RRSP-first у vesting рік для збиття marginal\")" },
      { ok: "✗ Заборонено", text: "Конкретна стратегія купити specific security X" },
      { ok: "✓ Дозволено", text: "Generic returns reference (\"historical broad-market ETF 7-12%\")" },
      { ok: "✗ Заборонено", text: "Performance claim про specific security (\"MIC Y дав 14% у 2024\")" },
      { ok: "✓ Дозволено", text: "NI 45-106 self-check framework (\"$75K → Eligible Investor\")" },
      { ok: "✗ Заборонено", text: "Особиста рекомендація (\"тобі підійде exempt market portfolio\")" },
    ],
    methodTitle: "Як я анонімізую кейси",
    methodItems: [
      {
        icon: Lock,
        title: "Без імен, без міст, без компаній",
        body: "Жодне ім'я, жодний employer-by-name, жодне точне місто проживання не з'являється. Замість \"Олександр з Калгарі працює у Shopify\" — \"IT-фахівець у Альберті, US-based employer\". Замість конкретного брокера — \"self-directed broker з US security custody\".",
      },
      {
        icon: ShieldCheck,
        title: "Діапазони замість точних чисел",
        body: "Зарплата вказується діапазоном ($120-140K, не $128,500). Розміри інвестицій — round numbers ($50K, не $48,275). Це робить кейс корисним для категорії читачів без можливості ідентифікувати конкретну особу.",
      },
      {
        icon: ScrollText,
        title: "Без return percentages для конкретних securities",
        body: "Я не можу і не буду писати \"клієнт заробив 14% на MIC X\" — це порушує regulatory rules для EMD. Замість цього: \"клієнт диверсифікував 20% net worth у exempt market через 3 різні securities; historical broad-market ETF returns 7-12% — це reference point, не гарантія.\"",
      },
      {
        icon: Lock,
        title: "Письмова згода клієнта",
        body: "Кожен кейс публікується тільки після того як клієнт письмово підтвердив що анонімізація достатня. Більшість клієнтів охоче діляться — їхня історія допомагає іншим українцям робити кращі рішення.",
      },
    ],
    caseTypesTitle: "Типи кейсів які з'являться тут",
    caseTypes: [
      {
        icon: Code,
        eyebrow: "Tech",
        title: "IT-фахівець з US employer + RSU vesting",
        desc:
          "Senior engineer, $150-200K base + $80-120K RSU vesting on cliff. Питання: як оптимізувати tax bracket в рік vesting, як placeти US securities в TFSA vs RRSP, чи купляти home через FHSA. Framework: RRSP-first в vesting рік + auto-sell vested shares 80% + diversify через broad-market ETF.",
        topicHref: "/dlya-it-fakhivtsiv",
        topicLabel: "Гайд для IT-фахівців →",
      },
      {
        icon: Stethoscope,
        eyebrow: "Medical",
        title: "Лікар-резидент з incoming MPC рішенням",
        desc:
          "Family physician, перші 2 роки practice, $280-340K gross. Питання: коли incorporate (MPC), salary vs dividend, чи відкривати holdco, коли підключати IPP. Framework: incorporate на 2-3 рік practice + salary до CPP-max + дивіденди для residual + IPP пізніше при $200K+ accumulated.",
        topicHref: "/dlya-mediks",
        topicLabel: "Гайд для медиків →",
      },
      {
        icon: Briefcase,
        eyebrow: "Founder",
        title: "Підприємець з $1M+ revenue CCPC",
        desc:
          "Service business owner, 5+ років operations, готовий до potential exit. Питання: чи отримує QSBS статус (lifetime capital gains exemption $1M+), як structurate holdco для asset protection, чи можна family trust для income splitting. Framework: pre-exit QSBS purification + holdco-вгорі + family trust на 7+ рік до exit.",
        topicHref: "/dlya-pidpryyemtsiv",
        topicLabel: "Гайд для підприємців →",
      },
      {
        icon: Globe,
        eyebrow: "Newcomer",
        title: "Family relocation — Калгарі, 18 міс after arrival",
        desc:
          "Подружжя 35-40 років, двоє дітей, household income $180-220K, $50-80K starting capital в USD. Питання: пріоритети TFSA/RRSP/FHSA/RESP, що робити з $80K \"runway cash\", коли і чи купляти home. Framework: emergency fund 6 міс → RESP first (CESG 20% безкоштовно) → TFSA → FHSA → іпотека за 24-30 міс.",
        topicHref: "/blog",
        topicLabel: "Newcomer pillars у блозі →",
      },
      {
        icon: Building2,
        eyebrow: "Eligible Investor",
        title: "Eligible Investor готовий до exempt market входу",
        desc:
          "$200K+ household income 2 роки поспіль, $400K+ net assets. Питання: як проходити NI 45-106 self-certification, який % net worth у exempt market розумно, як диверсифікувати між MIC / commercial REIT / development LP. Framework: 15-25% net worth → 3+ окремих exempt market securities → liquid public market core залишається 60%+.",
        topicHref: "/eligibility",
        topicLabel: "Self-check за 60 секунд →",
      },
    ],
    statusTitle: "Статус публікації кейсів",
    statusBody:
      "Зараз я готую перші 3 детальних кейси (IT-фахівець, лікар, підприємець). Кожен пройде юридичну перевірку анонімізації перед публікацією. Якщо хочеш отримати notification коли вони з'являться — підпишись на email (внизу контактної сторінки) або забронюй discovery call і обговоримо твою специфіку напряму.",
    faqHeader: "Часті питання",
    faqs: [
      {
        q: "Чому ти не показуєш реальні returns своїх клієнтів?",
        a: "Тому що це порушує rules NI 31-103 (Registrant Conduct) для Dealing Representatives. EMD не може робити \"performance claims\" про конкретні securities у маркетингових матеріалах. Plus це етично спірно — past performance не predicts future, і клієнт може себе ідентифікувати по unique number. Замість returns — frameworks. Замість \"клієнт X заробив Y\" — \"клієнт у категорії Z прийняв таке-то рішення, ось чому\".",
      },
      {
        q: "Чи можна побачити testimonials від реальних клієнтів?",
        a: "Так — на /uk/pro-mene є секція з review-style відгуками клієнтів (з письмовою згодою на публікацію). Schema.org Review markup. Це не \"performance claims\" — це думки про роботу з мною як professional. CSA розрізняє \"testimonial про advisor\" (можна, з conditions) і \"testimonial про specific security performance\" (заборонено).",
      },
      {
        q: "Я підходжу під один з кейсів — це означає що мені підійде те саме рішення?",
        a: "Ні. Frameworks ілюструють підходи, але кожна ситуація має десятки nuances що змінюють оптимальне рішення: твій exact tax bracket, спецификa employer benefits, плани на еміграцію back, family situation, ризик-апетит. Discovery call — це 30-хвилин conversation для розуміння твоїх специфіки. Я не беру плати за discovery call.",
      },
      {
        q: "Чи будуть кейси з фактами які пішли не так?",
        a: "Так — частина кейсів буде про помилки і їх виправлення. Наприклад: \"клієнт зробив RRSP overcontribution на $20K, як ми це fixали + штрафи + lesson learned\". Educational value помилок часто більший за історії успіху.",
      },
      {
        q: "Як я можу запропонувати тип кейсу який буде цікавий?",
        a: "На сторінці /uk/contact є форма \"запропонувати тему\" — пиши там. Якщо це резонує з реальною ситуацією клієнтів — додам у roadmap.",
      },
    ],
    finalCtaTitle: "Поки кейси готуються — обговоримо твою ситуацію?",
    finalCtaBody:
      "Кожна реальна історія починається з discovery call. 30 хвилин, без зобов'язань, без оплати. Якщо твоя ситуація специфічна — це найшвидший шлях до конкретних відповідей.",
    finalCtaBtn: "Безкоштовний discovery call →",
  },
  ru: {
    titleMeta: "Кейсы клиентов — анонимизированные сценарии",
    descriptionMeta:
      "Образовательные анонимизированные кейсы: IT-специалист с RSU, врач с MPC, предприниматель с CCPC, family relocation. Без рекомендаций. Licensed DR, NRD #4575551.",
    crumbHome: "Главная",
    crumbThis: "Кейсы клиентов",
    eyebrow: "Educational case framework",
    title: "Анонимизированные кейсы клиентов",
    subtitle:
      "Несколько реальных сценариев из моей практики (полностью анонимизированных, обобщённых, без конкретных securities) — чтобы ты увидел какие решения принимаются и почему.",
    tldr: "Анонимизированные кейсы клиентов: де-идентифицированные сценарии — IT-специалист с RSU, врач с MPC, предприниматель с CCPC, family relocation, Eligible Investor entry. Frameworks вместо returns. Без имён, без точных чисел.",
    introBlock:
      "Я Licensed Dealing Representative (NRD #4575551, Axcess Capital Advisors Inc.). Всё ниже — образовательные рамки принятия решений, не рекомендации, не обещания результатов. Я не публикую имён клиентов, не показываю брокерские счета, не объявляю конкретных securities — это нарушает и regulatory правила, и базовую этику. Вместо этого каждый кейс описывает тип клиента (профессия + ситуация), три вопроса которые мы задавали, framework который применяли, и чем завершился первый год. Если твоя ситуация похожа — это не значит что тебе подойдёт то же решение. Это значит что стоит обсудить твою специфику.",
    regulatoryTitle: "Регуляторная логика: почему case studies в Канаде ограничены",
    regulatoryIntro:
      "Это не просто моя осторожность — это прямые требования National Instrument 31-103 (Registrant Conduct), регулирующего всех Dealing Representatives в Канаде. Понимаешь эти правила — понимаешь почему ни один legal EMD не публикует \"кейсов с 14% returns\" в своём блоге, и почему когда видишь такие заявления от \"finfluencer-а\" — это почти всегда признак unregistered operation.",
    regulatoryItems: [
      {
        cite: "NI 31-103, Part 13 — Dealing with Clients",
        body: "Правила marketing communications для зарегистрированных фирм. Запрещено: performance claims про specific securities в public marketing, обещания future returns, testimonials подтверждающие конкретные investment performance. Разрешено: educational frameworks, generic market data с источниками.",
      },
      {
        cite: "NI 31-103, §13.5 — Marketing Practices",
        body: "Все marketing materials должны быть fair, balanced, not misleading. Если показываю \"клиент А заработал 14%\", должен также показать клиентов кто lost money. Это делает anonymized case studies со специфическими returns почти невозможными.",
      },
      {
        cite: "NI 45-106, §1.1 — Eligible Investor & Accredited Investor",
        body: "Категории инвесторов, которые могут покупать exempt market securities. Eligible: $75K solo / $125K household income, или $400K net assets. Accredited: $200K solo / $300K household, $1M+ financial assets, $5M+ total net assets.",
      },
      {
        cite: "PIPEDA — Personal Information Protection",
        body: "Federal privacy law обязывающий защищать персональную информацию клиентов. Минимально достаточная анонимизация: нельзя \"reasonably\" идентифицировать особу через combination факторов.",
      },
      {
        cite: "Joint CSA/CIRO Staff Notice 31-369 (Dec 2025)",
        body: "Новейший документ про social media + finfluencer compliance. Образовательные fact patterns разрешены; конкретные security recommendations + return claims — требуют регистрации + suitability process.",
      },
    ],
    permittedTitle: "Что case studies могут и не могут содержать",
    permittedItems: [
      { ok: "✓ Разрешено", text: "Категория клиента (\"IT-специалист, AB resident, $130-160K income\")" },
      { ok: "✗ Запрещено", text: "Имя, фото, точный город, employer name" },
      { ok: "✓ Разрешено", text: "Decision framework (\"RRSP-first в vesting год\")" },
      { ok: "✗ Запрещено", text: "Конкретная стратегия купить specific security X" },
      { ok: "✓ Разрешено", text: "Generic returns reference (\"historical broad-market ETF 7-12%\")" },
      { ok: "✗ Запрещено", text: "Performance claim про specific security" },
      { ok: "✓ Разрешено", text: "NI 45-106 self-check framework" },
      { ok: "✗ Запрещено", text: "Личная рекомендация" },
    ],
    methodTitle: "Как я анонимизирую кейсы",
    methodItems: [
      {
        icon: Lock,
        title: "Без имён, без городов, без компаний",
        body: "Никакого имени, никакого employer-by-name, никакого точного города проживания. Вместо \"Александр из Калгари работает в Shopify\" — \"IT-специалист в Альберте, US-based employer\".",
      },
      {
        icon: ShieldCheck,
        title: "Диапазоны вместо точных чисел",
        body: "Зарплата указывается диапазоном ($120-140K, не $128,500). Размеры инвестиций — round numbers ($50K, не $48,275).",
      },
      {
        icon: ScrollText,
        title: "Без return percentages для конкретных securities",
        body: "Я не могу и не буду писать \"клиент заработал 14% на MIC X\" — это нарушает regulatory rules для EMD. Вместо этого: \"клиент диверсифицировал 20% net worth в exempt market через 3 разных securities\".",
      },
      {
        icon: Lock,
        title: "Письменное согласие клиента",
        body: "Каждый кейс публикуется только после письменного подтверждения клиента что анонимизация достаточна.",
      },
    ],
    caseTypesTitle: "Типы кейсов которые появятся здесь",
    caseTypes: [
      {
        icon: Code,
        eyebrow: "Tech",
        title: "IT-специалист с US employer + RSU vesting",
        desc:
          "Senior engineer, $150-200K base + $80-120K RSU vesting. Framework: RRSP-first в vesting год + auto-sell 80% + diversify через broad-market ETF.",
        topicHref: "/dlya-it-fakhivtsiv",
        topicLabel: "Гайд для IT-специалистов →",
      },
      {
        icon: Stethoscope,
        eyebrow: "Medical",
        title: "Врач-резидент с incoming MPC решением",
        desc:
          "Family physician, первые 2 года practice, $280-340K gross. Framework: incorporate на 2-3 год + salary до CPP-max + дивиденды для residual + IPP позже.",
        topicHref: "/dlya-mediks",
        topicLabel: "Гайд для медиков →",
      },
      {
        icon: Briefcase,
        eyebrow: "Founder",
        title: "Предприниматель с $1M+ revenue CCPC",
        desc:
          "Service business owner, 5+ лет operations, готовый к potential exit. Framework: pre-exit QSBS purification + holdco-наверху + family trust.",
        topicHref: "/dlya-pidpryyemtsiv",
        topicLabel: "Гайд для предпринимателей →",
      },
      {
        icon: Globe,
        eyebrow: "Newcomer",
        title: "Family relocation — Калгари, 18 мес after arrival",
        desc:
          "Семейная пара 35-40 лет, двое детей, household income $180-220K. Framework: emergency fund → RESP first (CESG 20%) → TFSA → FHSA → ипотека за 24-30 мес.",
        topicHref: "/blog",
        topicLabel: "Newcomer pillars в блоге →",
      },
      {
        icon: Building2,
        eyebrow: "Eligible Investor",
        title: "Eligible Investor готовый к exempt market входу",
        desc:
          "$200K+ household income 2 года подряд. Framework: 15-25% net worth → 3+ exempt market securities → liquid public market core 60%+.",
        topicHref: "/eligibility",
        topicLabel: "Self-check за 60 секунд →",
      },
    ],
    statusTitle: "Статус публикации кейсов",
    statusBody:
      "Сейчас я готовлю первые 3 детальных кейса (IT-специалист, врач, предприниматель). Каждый пройдёт юридическую проверку анонимизации перед публикацией. Если хочешь получить уведомление когда они появятся — подпишись на email или забронируй discovery call.",
    faqHeader: "Частые вопросы",
    faqs: [
      {
        q: "Почему ты не показываешь реальные returns своих клиентов?",
        a: "Потому что это нарушает rules NI 31-103 для Dealing Representatives. EMD не может делать \"performance claims\" о конкретных securities в маркетинговых материалах. Plus past performance не predicts future. Вместо returns — frameworks.",
      },
      {
        q: "Можно увидеть testimonials от реальных клиентов?",
        a: "Да — на /ru/pro-mene есть секция с review-style отзывами клиентов (с письменным согласием на публикацию). Schema.org Review markup. CSA разделяет \"testimonial про advisor\" (можно) и \"testimonial про specific security performance\" (запрещено).",
      },
      {
        q: "Я подхожу под один из кейсов — мне подойдёт то же решение?",
        a: "Нет. Frameworks иллюстрируют подходы, но каждая ситуация имеет десятки nuances. Discovery call — 30 минут conversation для понимания твоей специфики. Без оплаты.",
      },
      {
        q: "Будут ли кейсы где что-то пошло не так?",
        a: "Да — часть кейсов будет о ошибках и их исправлении. Educational value ошибок часто больше историй успеха.",
      },
      {
        q: "Как предложить тип кейса который будет интересен?",
        a: "На странице /ru/contact есть форма \"предложить тему\".",
      },
    ],
    finalCtaTitle: "Пока кейсы готовятся — обсудим твою ситуацию?",
    finalCtaBody:
      "Каждая реальная история начинается с discovery call. 30 минут, без обязательств, без оплаты.",
    finalCtaBtn: "Бесплатный discovery call →",
  },
  en: {
    titleMeta: "Client case studies — anonymized financial scenarios",
    descriptionMeta:
      "Educational anonymized cases: tech worker with RSUs, physician with MPC, business owner with CCPC, family relocation. No recommendations. Licensed DR, NRD #4575551.",
    crumbHome: "Home",
    crumbThis: "Client cases",
    eyebrow: "Educational case framework",
    title: "Anonymized client case studies",
    subtitle:
      "Real scenarios from my practice (fully anonymized, generalized, no specific securities) — to show what decisions get made and why.",
    tldr: "Anonymized client case studies: fully de-identified scenarios — tech worker with RSUs, physician with MPC, business owner with CCPC, family relocation, Eligible Investor entry. Frameworks instead of return claims. No names, no exact numbers.",
    introBlock:
      "I'm a Licensed Dealing Representative (NRD #4575551, Axcess Capital Advisors Inc.). Everything below is educational decision frameworks, not recommendations, not promises of results. I don't publish client names, account screenshots, or specific securities — that violates regulatory rules and basic ethics. Instead each case describes the client type (profession + situation), the three questions we asked, the framework we applied, and how year one ended. If your situation is similar — that doesn't mean the same solution fits you. It means it's worth discussing your specifics.",
    regulatoryTitle: "Regulatory rationale: why case studies in Canada are constrained",
    regulatoryIntro:
      "This isn't just my caution — it's a direct requirement of National Instrument 31-103 (Registrant Conduct), which governs all Dealing Representatives in Canada. Understand these rules and you understand why no legal EMD publishes \"client cases with 14% returns\" on their blog, and why when you see such claims from a \"finfluencer\" — it's almost always a sign of an unregistered operation.",
    regulatoryItems: [
      {
        cite: "NI 31-103, Part 13 — Dealing with Clients",
        body: "Marketing communications rules for registered firms. Prohibited: performance claims about specific securities in public marketing, promises of future returns, testimonials confirming specific investment performance. Permitted: educational frameworks, generic market data with sources, anonymous categorical examples.",
      },
      {
        cite: "NI 31-103, §13.5 — Marketing Practices",
        body: "All marketing materials must be fair, balanced, not misleading. If I show \"client A earned 14%\" I must also show clients who lost money (CSA reviewer test). In practice this makes anonymized case studies with specific returns nearly impossible — frameworks are simpler.",
      },
      {
        cite: "NI 45-106, §1.1 — Eligible Investor & Accredited Investor",
        body: "Investor categories that may purchase exempt market securities. Eligible: $75K solo income / $125K household, or $400K net assets. Accredited: $200K solo income / $300K household, $1M+ financial assets, or $5M+ total net assets. Case studies may reference this framework but not provide individual recommendations.",
      },
      {
        cite: "PIPEDA — Personal Information Protection",
        body: "Federal privacy law requiring protection of client personal information. Minimum sufficient anonymization: a person should not be \"reasonably\" identifiable through combinations of factors (city + employer + income + age).",
      },
      {
        cite: "Joint CSA/CIRO Staff Notice 31-369 (Dec 2025)",
        body: "Newest social-media + finfluencer compliance guidance. Confirms: educational fact patterns are permitted; specific security recommendations + return claims + performance comparisons — require registration + suitability process.",
      },
    ],
    permittedTitle: "What case studies can and cannot contain",
    permittedItems: [
      { ok: "✓ Permitted", text: "Client category (\"tech worker, AB resident, $130-160K income\")" },
      { ok: "✗ Prohibited", text: "Name, photo, precise city, employer name" },
      { ok: "✓ Permitted", text: "Decision framework (\"RRSP-first in vesting year to knock marginal\")" },
      { ok: "✗ Prohibited", text: "Specific strategy to buy specific security X" },
      { ok: "✓ Permitted", text: "Generic returns reference (\"historical broad-market ETF 7-12%\")" },
      { ok: "✗ Prohibited", text: "Performance claim about specific security (\"MIC Y returned 14% in 2024\")" },
      { ok: "✓ Permitted", text: "NI 45-106 self-check framework (\"$75K → Eligible Investor\")" },
      { ok: "✗ Prohibited", text: "Personal recommendation (\"exempt market portfolio would suit you\")" },
    ],
    methodTitle: "How I anonymize cases",
    methodItems: [
      {
        icon: Lock,
        title: "No names, no cities, no employers",
        body: "Never a name, never an employer-by-name, never a precise city. Instead of \"Alex from Calgary works at Shopify\" — \"tech worker in Alberta, US-based employer\".",
      },
      {
        icon: ShieldCheck,
        title: "Ranges instead of exact numbers",
        body: "Salary shown as a range ($120-140K, not $128,500). Investment sizes as round numbers.",
      },
      {
        icon: ScrollText,
        title: "No return percentages for specific securities",
        body: "I cannot and will not write \"client earned 14% on MIC X\" — violates NI 31-103 marketing rules for EMDs. Instead: \"client diversified 20% of net worth across exempt market via 3 separate securities\".",
      },
      {
        icon: Lock,
        title: "Written client consent",
        body: "Every case is published only after written client confirmation that anonymization is sufficient.",
      },
    ],
    caseTypesTitle: "Case types coming",
    caseTypes: [
      {
        icon: Code,
        eyebrow: "Tech",
        title: "Tech worker with US employer + RSU vesting",
        desc:
          "Senior engineer, $150-200K base + $80-120K RSU vesting. Framework: RRSP-first in vesting year + auto-sell vested 80% + diversify via broad-market ETF.",
        topicHref: "/dlya-it-fakhivtsiv",
        topicLabel: "Tech worker pillar →",
      },
      {
        icon: Stethoscope,
        eyebrow: "Medical",
        title: "Resident physician facing MPC decision",
        desc:
          "Family physician, first 2 years of practice, $280-340K gross. Framework: incorporate in year 2-3 + salary to CPP-max + dividends for residual + IPP later.",
        topicHref: "/dlya-mediks",
        topicLabel: "Physician pillar →",
      },
      {
        icon: Briefcase,
        eyebrow: "Founder",
        title: "Business owner with $1M+ revenue CCPC",
        desc:
          "Service business owner, 5+ years of operations, ready for potential exit. Framework: pre-exit QSBS purification + holdco-on-top + family trust.",
        topicHref: "/dlya-pidpryyemtsiv",
        topicLabel: "Business owner pillar →",
      },
      {
        icon: Globe,
        eyebrow: "Newcomer",
        title: "Family relocation — Calgary, 18 mo after arrival",
        desc:
          "Couple aged 35-40, two children, household income $180-220K. Framework: emergency fund → RESP first (CESG 20%) → TFSA → FHSA → mortgage in 24-30 mo.",
        topicHref: "/blog",
        topicLabel: "Newcomer pillars on the blog →",
      },
      {
        icon: Building2,
        eyebrow: "Eligible Investor",
        title: "Eligible Investor ready for exempt market entry",
        desc:
          "$200K+ household income 2 years running. Framework: 15-25% of net worth → 3+ separate exempt market securities → liquid public market core stays 60%+.",
        topicHref: "/eligibility",
        topicLabel: "60-second self-check →",
      },
    ],
    statusTitle: "Publication status",
    statusBody:
      "I'm preparing the first 3 detailed cases (tech worker, physician, business owner). Each will pass legal anonymization review before publishing. Want notification when they go live? Subscribe to email or book a discovery call.",
    faqHeader: "FAQ",
    faqs: [
      {
        q: "Why don't you show real client returns?",
        a: "Because it violates NI 31-103 (Registrant Conduct) rules for Dealing Representatives. EMDs cannot make \"performance claims\" about specific securities in marketing materials. Plus past performance doesn't predict future. Frameworks instead of returns.",
      },
      {
        q: "Can I see testimonials from real clients?",
        a: "Yes — /en/pro-mene has a Reviews section with written client consent. Schema.org Review markup. CSA distinguishes \"testimonial about advisor\" (allowed with conditions) and \"testimonial about specific security performance\" (prohibited).",
      },
      {
        q: "I match one of these cases — does the same solution fit me?",
        a: "No. Frameworks illustrate approaches, but each situation has dozens of nuances. Discovery call = 30 minutes to understand your specifics. No fee.",
      },
      {
        q: "Will there be cases where things went wrong?",
        a: "Yes — some cases will cover mistakes and their fixes. Educational value of mistakes is often higher than success stories.",
      },
      {
        q: "How can I suggest a case type that would be useful?",
        a: "/en/contact has a 'suggest a topic' form.",
      },
    ],
    finalCtaTitle: "While the cases are being prepared — let's discuss yours?",
    finalCtaBody:
      "Every real story starts with a discovery call. 30 minutes, no commitment, no fee.",
    finalCtaBtn: "Free discovery call →",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/case-studies`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/case-studies`,
    ])
  );
  alternates["x-default"] = "/uk/case-studies";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
    // Indexable as of batch 9 (audit 5 #5 follow-up): the page now contains
    // a full regulatory-rationale section citing NI 31-103 / NI 45-106 /
    // PIPEDA / CSA Notice 31-369 + a permitted/prohibited compare table,
    // making it a standalone reference on Canadian case-study marketing
    // constraints — not just a thin framework. Real /case-studies/[slug]
    // entries will still expand it further when shipped.
  };
}

// ItemList JSON-LD describing the upcoming case studies. Each is a
// "CreativeWork" placeholder pointing at the related topic pillar (since
// the individual case pages aren't published yet). Once cases ship, swap
// `url` to the actual /case-studies/[slug] URL.
function buildItemListJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.title,
    description: c.subtitle,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    url: `https://sky-fort.ca${path}`,
    numberOfItems: c.caseTypes.length,
    itemListElement: c.caseTypes.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.desc,
        url: `https://sky-fort.ca/${locale}${item.topicHref}`,
      },
    })),
  };
}

export default async function CaseStudiesPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/case-studies`;
  const itemListJsonLd = buildItemListJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page="case-studies" />
      <StickyCta locale={locale} page="case-studies" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: `/${locale}` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-white/75">{c.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <TldrBlock
            text={c.tldr}
            pageName={c.titleMeta}
            pageUrl={`https://sky-fort.ca/${locale}/case-studies`}
          />
          <AuthorByline locale={locale} />
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-base text-white/80 leading-relaxed">{c.introBlock}</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold">{c.regulatoryTitle}</h2>
          <p className="mb-8 text-base text-white/75 leading-relaxed">{c.regulatoryIntro}</p>
          <div className="space-y-4">
            {c.regulatoryItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border-l-2 border-[var(--color-brand)]/60 bg-white/[0.03] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
                  {item.cite}
                </p>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold">{c.permittedTitle}</h2>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {c.permittedItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-5 py-4 ${
                  i % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.01]"
                }`}
              >
                <span
                  className={`flex-shrink-0 text-sm font-bold ${
                    item.ok.startsWith("✓") ? "text-[var(--color-brand)]" : "text-red-400/80"
                  }`}
                >
                  {item.ok}
                </span>
                <span className="text-sm text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl sm:text-3xl font-bold">{c.methodTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.methodItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand)]/15 text-[var(--color-brand)]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl sm:text-3xl font-bold">{c.caseTypesTitle}</h2>
          <div className="grid gap-5">
            {c.caseTypes.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)]/15 text-[var(--color-brand)]">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-sm text-white/75 leading-relaxed">
                        {item.desc}
                      </p>
                      <Link
                        href={`/${locale}${item.topicHref}`}
                        className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                      >
                        {item.topicLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.07] p-6 sm:p-7">
            <h2 className="text-xl sm:text-2xl font-bold">{c.statusTitle}</h2>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {c.statusBody}
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading={
          locale === "ru" ? "Гайды по аудиториям" : locale === "en" ? "Audience pillars" : "Гайди по аудиторіях"
        }
        items={[
          {
            href: `/${locale}/dlya-it-fakhivtsiv`,
            label: locale === "ru" ? "Для IT-специалистов" : locale === "en" ? "For tech workers" : "Для IT-фахівців",
            description: locale === "ru" ? "RSU, ESPP, RRSP — гайд для tech." : locale === "en" ? "RSUs, ESPP, RRSP — tech worker pillar." : "RSU, ESPP, RRSP — гайд для IT.",
          },
          {
            href: `/${locale}/dlya-mediks`,
            label: locale === "ru" ? "Для медиков" : locale === "en" ? "For physicians" : "Для медиків",
            description: locale === "ru" ? "MPC, IPP, holdco — гайд для врачей." : locale === "en" ? "MPC, IPP, holdco — physician pillar." : "MPC, IPP, holdco — гайд для лікарів.",
          },
          {
            href: `/${locale}/dlya-pidpryyemtsiv`,
            label: locale === "ru" ? "Для предпринимателей" : locale === "en" ? "For founders" : "Для підприємців",
            description: locale === "ru" ? "CCPC, TOSI, LCGE — гайд для founders." : locale === "en" ? "CCPC, TOSI, LCGE — founder pillar." : "CCPC, TOSI, LCGE — гайд для засновників.",
          },
          {
            href: `/${locale}/eligibility`,
            label: locale === "ru" ? "Eligible Investor self-check" : locale === "en" ? "Eligible Investor self-check" : "Eligible Investor self-check",
            description: locale === "ru" ? "60 секунд — попадаешь ли в exempt market." : locale === "en" ? "60 seconds — do you fit exempt market thresholds?" : "60 секунд — чи попадаєш у exempt market.",
          },
        ]}
      />
      <StaticFaq
        faq={c.faqs}
        heading={c.faqHeader}
        jsonLdId={`https://sky-fort.ca${path}#faq`}
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <TopicSuggestForm locale={locale} source="case-studies" />
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">{c.finalCtaTitle}</h2>
          <p className="mt-3 text-white/75">{c.finalCtaBody}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-[var(--color-brand)] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {c.finalCtaBtn}
          </a>
        </div>
      </section>
    </main>
  );
}
