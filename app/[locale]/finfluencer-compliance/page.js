// app/[locale]/finfluencer-compliance/page.js
// Deep explainer page on Joint CSA/CIRO Staff Notice 31-369 (December 11,
// 2025). Audit recommendation 3.5 (4th re-audit): high topical authority
// play in a severely under-supplied YMYL niche — most existing Canadian
// coverage is law-firm white papers (Cassels, Stikeman, Norton Rose) with
// zero Ukrainian/Russian/newcomer-focused angle.
//
// Audience: newcomers who follow TikTok / Instagram / Telegram "finfluencers"
// and don't know which ones are actually registered with CSA/CIRO. Goal:
// explain the December 2025 guidance in plain language + give them concrete
// tools to verify (the same tools we use on /perevirka).

import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  FileText,
  Megaphone,
} from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import TldrBlock from "../../_components/TldrBlock";
import RelatedLinks from "../../_components/RelatedLinks";
import AuthorByline from "../../_components/AuthorByline";
import UpdatedBadge from "../../_components/UpdatedBadge";
import ScrollDepthTracker from "../../_components/ScrollDepthTracker";
import StickyCta from "../../_components/StickyCta";
import TopicSuggestForm from "../../_components/TopicSuggestForm";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const CSA_URL = "https://www.securities-administrators.ca/";
const CIRO_URL = "https://www.ciro.ca/";
const NRD_URL = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";
const NOTICE_URL = "https://www.osc.ca/en/securities-law/instruments-rules-policies/3/31-369";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY = {
  uk: {
    titleMeta: "Finfluencer compliance: Notice 31-369 пояснення",
    descriptionMeta:
      "Що означає Joint CSA/CIRO Staff Notice 31-369 від 11 грудня 2025 для тебе як споживача фінансового контенту в TikTok/Instagram/Telegram у Канаді. Як перевірити чи finfluencer ліцензований.",
    crumbHome: "Головна",
    crumbThis: "Finfluencer compliance",
    eyebrow: "Регуляція 2026",
    title: "Joint CSA/CIRO Staff Notice 31-369",
    subtitle: "Що означає грудневе 2025 правило про finfluencers у Канаді — і як тобі захиститись",
    tldr: "Joint CSA/CIRO Staff Notice 31-369 (11 грудня 2025): освітній контент від finfluencers дозволений; конкретні рекомендації купити-продати specific securities — нелегальні без CSA-registration. Перевір будь-якого «радника» через NRD search за 30 секунд.",
    intro:
      "11 грудня 2025 Canadian Securities Administrators (CSA) разом з Canadian Investment Regulatory Organization (CIRO) випустили Joint Staff Notice 31-369 — публічне попередження для всіх фінансових professionals і брендів, які працюють із соцмережа-контентом. Це не новий закон, а уточнення того, що вже діє: якщо хтось публічно говорить про securities у TikTok / Instagram / YouTube / Telegram, відповідальність регулятора лежить на зареєстрованих фірмах, навіть якщо контент створив не сам representative. Для тебе як споживача — це означає чітку лінію між легальною освітою і нелегальним продажем.",
    sectionsTitle: "Що ти дізнаєшся",
    sections: [
      {
        icon: Megaphone,
        title: "Хто такий finfluencer і чому регулятор звернув увагу",
        body: "Finfluencer — це людина яка створює фінансовий контент у соцмережах: TikTok, Instagram, YouTube Shorts, Telegram, X. Поки контент чисто освітній («ось як працює TFSA»), регулятор не втручається. Але як тільки звучить «купи цей продукт», «гарантовані 15% return», «я особисто рекомендую X» — потрібна реєстрація як Dealing Representative або Investment Advisor у CSA/CIRO. У 2024-2025 регулятори зловили десятки кейсів коли finfluencers просували конкретні securities без жодної ліцензії. Notice 31-369 — публічна нагадування ринку що це порушення.",
      },
      {
        icon: ShieldCheck,
        title: "Що дозволено зареєстрованому DR (наприклад, мені)",
        body: "Зареєстрований Dealing Representative (як я, NRD #4575551 у Axcess Capital Advisors Inc.) може публікувати освітній контент про категорії активів (TFSA, RRSP, exempt market, real estate). Може пояснювати regulatory frameworks (NI 31-103, NI 45-106). Може давати загальні поради «що враховувати при виборі радника». Не може: давати персональні рекомендації купити-продати без формального KYC + Suitability Assessment з конкретним клієнтом, обіцяти конкретну дохідність, гарантувати результат. Кожен мій публічний матеріал — у тому числі ця сторінка — переглядається CCO Axcess Capital перед публікацією.",
      },
      {
        icon: AlertTriangle,
        title: "Що заборонено всім (зареєстрованим і ні)",
        body: "Гарантії дохідності — наприклад «$10K стане $100K за рік» — заборонено беззастережно. Просування конкретного security без disclosed compensation arrangement — порушення. Псевдо-консультації типу «напиши мені в DM — поможу» — пастка: розмова, що починається в DM і перетворюється на «купи цей фонд», створює відповідальність як за нерегульований продаж. Найгірша категорія — продаж crypto/forex/options схем під виглядом «навчання». Це і є то, проти чого Notice 31-369 спрямований у першу чергу.",
      },
      {
        icon: Search,
        title: "Як тобі перевірити чи finfluencer ліцензований",
        body: "Відкрий CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx). Якщо людина каже що вона «advisor», «consultant», «portfolio manager», «dealing representative» — вона МАЄ бути в цій базі. Якщо її там немає — будь-яка її «персональна рекомендація» юридично нелегальна, незалежно від кількості followers. Тривога: «certified», «expert», «mentor», «coach» — це не регуляторні терміни і нічого не означають про ліцензію. Перевір моє ім'я: NRD #4575551, ім'я Andrii Andriushchenko, фірма Axcess Capital Advisors Inc.",
      },
      {
        icon: FileText,
        title: "Що означає Notice для тебе як споживача",
        body: "Перше: підвищена увага до соцмережа-контенту з боку регуляторів — у 2026 році очікуй частіших enforcement actions проти нелегальних finfluencers. Друге: легше відрізнити справжніх professionals від «гуру»: справжній DR публічно вказує NRD #, фірму, провінції реєстрації, дисклеймери у кожному пості. Третє: твоє право на скаргу. Якщо хтось без ліцензії продав тобі продукт через TikTok DM — OBSI (Ombudsman for Banking Services and Investments) може допомогти повернути гроші. Це публічний канал, безкоштовний.",
      },
    ],
    comparisonTitle: "Швидке порівняння: легальний DR vs нелегальний finfluencer",
    comparisonHeaders: { aspect: "Аспект", licensed: "Зареєстрований DR (типу мене)", unlicensed: "Нелегальний finfluencer" },
    comparisonRows: [
      { aspect: "NRD #", licensed: "✅ Публічний, перевіряєш за 30 сек", unlicensed: "❌ Немає" },
      { aspect: "Фірма-роботодавець", licensed: "✅ Назва + реєстрація CSA", unlicensed: "❌ «Self-employed» / нічого" },
      { aspect: "Компенсація розкрита", licensed: "✅ В OM / на consult", unlicensed: "❌ «Comission від продажу X» приховано" },
      { aspect: "Дисклеймер у соцмережах", licensed: "✅ В кожному пості", unlicensed: "❌ Немає" },
      { aspect: "KYC перед рекомендацією", licensed: "✅ NI 31-103 обов'язково", unlicensed: "❌ «Купи це»" },
      { aspect: "Підпорядкований CCO", licensed: "✅ Кожен матеріал review", unlicensed: "❌ Ні" },
      { aspect: "Може гарантувати дохід", licensed: "❌ Заборонено", unlicensed: "✅ Часто це робить" },
      { aspect: "Відповідальність у разі збитків", licensed: "✅ OBSI + регулятор + фірма", unlicensed: "❌ Зникає / нікого" },
    ],
    faqTitle: "Часті питання",
    faq: [
      {
        q: "Чи може популярний український finfluencer на TikTok бути ліцензованим?",
        a: "Так — і це найкращий випадок для аудиторії. Перевір: пошукай його ім'я (повне) у CSA NRD search. Якщо в результатах — фірма + категорія + дата реєстрації — це справжній DR. Якщо нічого — він(а) поза регулюванням. Багато українсько/російсько-мовних finfluencers у Канаді показують «фінансові поради» БЕЗ ліцензії — це не обов'язково шахрайство, але юридично — нерегульована діяльність, без жодних твоїх прав на компенсацію.",
      },
      {
        q: "Що робити якщо вже інвестував через нелегального finfluencer?",
        a: "1) Зафіксуй всі переписки + платіжні документи. 2) Подай скаргу в OBSI (obsi.ca) — безкоштовно, можна українською/російською через перекладача. 3) Якщо це securities — паралельно скаргу в provincial securities regulator (ASC в Альберті, OSC в Ontario, BCSC у BC). 4) Якщо обіцянки гарантованої дохідності — це майже завжди порушення Securities Act. Регулятори активно йдуть на такі кейси у 2026.",
      },
      {
        q: "Чи можу я довіряти контенту якщо finfluencer ліцензований?",
        a: "Так, але з важливим застереженням: ліцензія підтверджує професійну кваліфікацію (пройдено EMP/CSC/WME/LLQP, background check, compliance training, прив'язка до зареєстрованої фірми, надзор регулятора), але **не означає що конкретна порада підходить саме тобі**. Конкретна рекомендація доступна лише після формального KYC + Suitability Assessment з твоїми цифрами. Завжди вимагай KYC перед прийняттям рішення.",
      },
      {
        q: "Чи покриває Notice 31-369 крипто-блогерів?",
        a: "Тільки якщо вони просувають securities. «Bitcoin це майбутнє» — освітній контент, не підпадає. «Купи цей токен від цього проекту, я отримую % з продажу» — підпадає (це distribution securities). Більшість крипто-проектів у 2024-2026 кваліфікувались CSA як securities, тому правила NI 31-103 + NI 45-106 застосовуються. Багато крипто-finfluencers у Канаді — у сірій зоні.",
      },
      {
        q: "Чому ти створюєш цю сторінку?",
        a: "Тому що я ліцензований Dealing Representative (NRD #4575551, Axcess Capital, AB·BC·ON), і моя професійна репутація залежить від того щоб українсько/російсько-мовна аудиторія в Канаді могла відрізняти регульованих professionals від нерегульованих \"гуру\". Це публічна освіта, яка одночасно захищає мою категорію реєстру і допомагає тобі не втратити гроші. Ця сторінка узгоджена з compliance Axcess Capital.",
      },
      {
        q: "Куди звертатись з більш конкретними питаннями?",
        a: "Discovery call 30 хв, безкоштовно — обговоримо твою ситуацію персонально. Або /uk/perevirka щоб самостійно перевірити мою реєстрацію. Або CSA NRD search безпосередньо. Якщо ти бачив підозрілого finfluencer — повідом OBSI або provincial regulator (ASC.ca для Альберти).",
      },
    ],
    bottomCtaTitle: "Потрібна персональна порада від ліцензованого professional?",
    bottomCtaText:
      "Discovery call — 30 хвилин, безкоштовно. Розберемо твою ситуацію конкретно, з усіма compliance-вимогами NI 31-103. Без обіцянок дохідності, без TikTok-маркетингу.",
    bottomCtaBtn: "Записатись на discovery call",
    verifyLinkLabel: "Перевір мене за 3 хвилини",
    noticeLinkLabel: "Прочитати Notice 31-369 (OSC)",
  },
  ru: {
    titleMeta: "Finfluencer compliance: Notice 31-369 объяснение",
    descriptionMeta:
      "Что означает Joint CSA/CIRO Staff Notice 31-369 от 11 декабря 2025 для тебя как потребителя финансового контента в TikTok/Instagram/Telegram в Канаде. Как проверить лицензирован ли finfluencer.",
    crumbHome: "Главная",
    crumbThis: "Finfluencer compliance",
    eyebrow: "Регуляция 2026",
    title: "Joint CSA/CIRO Staff Notice 31-369",
    subtitle: "Что означает декабрьское 2025 правило о finfluencers в Канаде — и как тебе защититься",
    tldr: "Joint CSA/CIRO Staff Notice 31-369 (11 декабря 2025): образовательный контент от finfluencers разрешён; конкретные рекомендации купить-продать specific securities — нелегальны без CSA-registration. Проверь любого «советника» через NRD search за 30 секунд.",
    intro:
      "11 декабря 2025 Canadian Securities Administrators (CSA) вместе с Canadian Investment Regulatory Organization (CIRO) выпустили Joint Staff Notice 31-369 — публичное предупреждение для всех финансовых professionals и брендов, работающих с соцмедиа-контентом. Это не новый закон, а уточнение того, что уже действует: если кто-то публично говорит о securities в TikTok / Instagram / YouTube / Telegram, ответственность регулятора лежит на зарегистрированных фирмах, даже если контент создал не сам representative. Для тебя как потребителя — это означает чёткую линию между легальным образованием и нелегальной продажей.",
    sectionsTitle: "Что ты узнаешь",
    sections: [
      {
        icon: Megaphone,
        title: "Кто такой finfluencer и почему регулятор обратил внимание",
        body: "Finfluencer — это человек, создающий финансовый контент в соцсетях: TikTok, Instagram, YouTube Shorts, Telegram, X. Пока контент чисто образовательный («вот как работает TFSA»), регулятор не вмешивается. Но как только звучит «купи этот продукт», «гарантированные 15% return», «я лично рекомендую X» — нужна регистрация как Dealing Representative или Investment Advisor в CSA/CIRO. В 2024-2025 регуляторы поймали десятки кейсов когда finfluencers продвигали конкретные securities без какой-либо лицензии. Notice 31-369 — публичное напоминание рынку что это нарушение.",
      },
      {
        icon: ShieldCheck,
        title: "Что разрешено зарегистрированному DR (например, мне)",
        body: "Зарегистрированный Dealing Representative (как я, NRD #4575551 в Axcess Capital Advisors Inc.) может публиковать образовательный контент о категориях активов (TFSA, RRSP, exempt market, real estate). Может объяснять regulatory frameworks (NI 31-103, NI 45-106). Может давать общие советы «что учитывать при выборе советника». Не может: давать персональные рекомендации купить-продать без формального KYC + Suitability Assessment с конкретным клиентом, обещать конкретную доходность, гарантировать результат. Каждый мой публичный материал — включая эту страницу — просматривается CCO Axcess Capital перед публикацией.",
      },
      {
        icon: AlertTriangle,
        title: "Что запрещено всем (зарегистрированным и нет)",
        body: "Гарантии доходности — например «$10K станет $100K за год» — запрещено безоговорочно. Продвижение конкретного security без disclosed compensation arrangement — нарушение. Псевдо-консультации типа «напиши мне в DM — помогу» — ловушка: разговор, начавшийся в DM и превратившийся в «купи этот фонд», создаёт ответственность как за нерегулируемую продажу. Худшая категория — продажа crypto/forex/options схем под видом «обучения». Это и есть то, против чего Notice 31-369 направлен в первую очередь.",
      },
      {
        icon: Search,
        title: "Как тебе проверить лицензирован ли finfluencer",
        body: "Открой CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx). Если человек говорит что она «advisor», «consultant», «portfolio manager», «dealing representative» — она ДОЛЖНА быть в этой базе. Если её там нет — любая её «персональная рекомендация» юридически нелегальна, независимо от количества followers. Тревога: «certified», «expert», «mentor», «coach» — это не регуляторные термины и ничего не значат о лицензии. Проверь моё имя: NRD #4575551, имя Andrii Andriushchenko, фирма Axcess Capital Advisors Inc.",
      },
      {
        icon: FileText,
        title: "Что означает Notice для тебя как потребителя",
        body: "Первое: повышенное внимание к соцмедиа-контенту со стороны регуляторов — в 2026 году ожидай более частых enforcement actions против нелегальных finfluencers. Второе: легче отличить настоящих professionals от «гуру»: настоящий DR публично указывает NRD #, фирму, провинции регистрации, дисклеймеры в каждом посте. Третье: твоё право на жалобу. Если кто-то без лицензии продал тебе продукт через TikTok DM — OBSI (Ombudsman for Banking Services and Investments) может помочь вернуть деньги. Это публичный канал, бесплатный.",
      },
    ],
    comparisonTitle: "Быстрое сравнение: легальный DR vs нелегальный finfluencer",
    comparisonHeaders: { aspect: "Аспект", licensed: "Зарегистрированный DR (как я)", unlicensed: "Нелегальный finfluencer" },
    comparisonRows: [
      { aspect: "NRD #", licensed: "✅ Публичный, проверяешь за 30 сек", unlicensed: "❌ Нет" },
      { aspect: "Фирма-работодатель", licensed: "✅ Название + регистрация CSA", unlicensed: "❌ «Self-employed» / ничего" },
      { aspect: "Компенсация раскрыта", licensed: "✅ В OM / на consult", unlicensed: "❌ «Commission от продажи X» скрыто" },
      { aspect: "Дисклеймер в соцсетях", licensed: "✅ В каждом посте", unlicensed: "❌ Нет" },
      { aspect: "KYC перед рекомендацией", licensed: "✅ NI 31-103 обязательно", unlicensed: "❌ «Купи это»" },
      { aspect: "Подчинённый CCO", licensed: "✅ Каждый материал review", unlicensed: "❌ Нет" },
      { aspect: "Может гарантировать доход", licensed: "❌ Запрещено", unlicensed: "✅ Часто это делает" },
      { aspect: "Ответственность в случае убытков", licensed: "✅ OBSI + регулятор + фирма", unlicensed: "❌ Исчезает / некого" },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      {
        q: "Может ли популярный русскоязычный finfluencer на TikTok быть лицензированным?",
        a: "Да — и это лучший случай для аудитории. Проверь: поищи его имя (полное) в CSA NRD search. Если в результатах — фирма + категория + дата регистрации — это настоящий DR. Если ничего — он(а) вне регулирования. Многие украино/русскоязычные finfluencers в Канаде показывают «финансовые советы» БЕЗ лицензии — это не обязательно мошенничество, но юридически — нерегулируемая деятельность, без каких-либо твоих прав на компенсацию.",
      },
      {
        q: "Что делать если уже инвестировал через нелегального finfluencer?",
        a: "1) Зафиксируй все переписки + платёжные документы. 2) Подай жалобу в OBSI (obsi.ca) — бесплатно, можно на украинском/русском через переводчика. 3) Если это securities — параллельно жалобу в provincial securities regulator (ASC в Альберте, OSC в Ontario, BCSC в BC). 4) Если обещания гарантированной доходности — это почти всегда нарушение Securities Act. Регуляторы активно идут на такие кейсы в 2026.",
      },
      {
        q: "Могу ли я доверять контенту если finfluencer лицензирован?",
        a: "Больше — да. Лицензия означает: пройденное профессиональное образование (EMP, CSC, WME, LLQP), regional background check, compliance training, привязка к зарегистрированной фирме, надзор регулятора. Но это не гарантия что конкретный совет тебе подходит — только после формального KYC + Suitability Assessment с твоими цифрами. Всегда требуй KYC перед принятием решения.",
      },
      {
        q: "Покрывает ли Notice 31-369 крипто-блогеров?",
        a: "Только если они продвигают securities. «Bitcoin это будущее» — образовательный контент, не подпадает. «Купи этот токен от этого проекта, я получаю % с продажи» — подпадает (это distribution securities). Большинство крипто-проектов в 2024-2026 квалифицировались CSA как securities, поэтому правила NI 31-103 + NI 45-106 применяются. Многие крипто-finfluencers в Канаде — в серой зоне.",
      },
      {
        q: "Почему ты создаёшь эту страницу?",
        a: "Потому что я лицензированный Dealing Representative (NRD #4575551, Axcess Capital, AB·BC·ON), и моя профессиональная репутация зависит от того чтобы украино/русскоязычная аудитория в Канаде могла отличать регулируемых professionals от нерегулируемых \"гуру\". Это публичное образование, которое одновременно защищает мою категорию реестра и помогает тебе не потерять деньги. Эта страница согласована с compliance Axcess Capital.",
      },
      {
        q: "Куда обращаться с более конкретными вопросами?",
        a: "Discovery call 30 мин, бесплатно — обсудим твою ситуацию персонально. Или /ru/perevirka чтобы самостоятельно проверить мою регистрацию. Или CSA NRD search напрямую. Если ты видел подозрительного finfluencer — сообщи OBSI или provincial regulator (ASC.ca для Альберты).",
      },
    ],
    bottomCtaTitle: "Нужен персональный совет от лицензированного professional?",
    bottomCtaText:
      "Discovery call — 30 минут, бесплатно. Разберём твою ситуацию конкретно, со всеми compliance-требованиями NI 31-103. Без обещаний доходности, без TikTok-маркетинга.",
    bottomCtaBtn: "Записаться на discovery call",
    verifyLinkLabel: "Проверь меня за 3 минуты",
    noticeLinkLabel: "Прочитать Notice 31-369 (OSC)",
  },
  en: {
    titleMeta: "Joint CSA/CIRO Staff Notice 31-369 — Canadian finfluencers explained",
    descriptionMeta:
      "What Joint CSA/CIRO Staff Notice 31-369 (December 11, 2025) means for you as a consumer of financial content on TikTok / Instagram / Telegram in Canada. How to check whether a finfluencer is actually licensed.",
    crumbHome: "Home",
    crumbThis: "Finfluencer compliance",
    eyebrow: "2026 Regulation",
    title: "Joint CSA/CIRO Staff Notice 31-369",
    subtitle: "What the December 2025 finfluencer rules in Canada mean — and how to protect yourself",
    tldr: "Joint CSA/CIRO Staff Notice 31-369 (December 11, 2025): educational finfluencer content is permitted; specific buy/sell recommendations about specific securities are illegal without CSA registration. Verify anyone via NRD search in 30 seconds.",
    intro:
      "On December 11, 2025 the Canadian Securities Administrators (CSA) together with the Canadian Investment Regulatory Organization (CIRO) released Joint Staff Notice 31-369 — a public reminder to every financial professional and brand active on social media. It isn't a new law; it's clarification of existing rules: if someone publicly talks about securities on TikTok / Instagram / YouTube / Telegram, registered firms remain responsible even when the content is created by someone other than the registered representative. For you as a consumer, it draws a clear line between legal education and illegal selling.",
    sectionsTitle: "What you'll learn",
    sections: [
      {
        icon: Megaphone,
        title: "What a finfluencer is and why regulators noticed",
        body: "A finfluencer is anyone creating financial content on social platforms: TikTok, Instagram, YouTube Shorts, Telegram, X. While content stays purely educational ('here's how a TFSA works'), regulators don't intervene. The line is crossed when 'buy this product', 'guaranteed 15% returns', or 'I personally recommend X' enters the picture — that requires Dealing Representative or Investment Advisor registration with CSA/CIRO. In 2024-2025 regulators caught dozens of cases where finfluencers promoted specific securities with no license at all. Notice 31-369 is a public reminder that this is a violation.",
      },
      {
        icon: ShieldCheck,
        title: "What a registered DR (like me) is allowed to do",
        body: "A registered Dealing Representative (in my case, NRD #4575551 with Axcess Capital Advisors Inc.) can publish educational content about asset categories (TFSA, RRSP, exempt market, real estate). Can explain regulatory frameworks (NI 31-103, NI 45-106). Can give general guidance on 'what to consider when picking an advisor'. Cannot: give personal buy/sell recommendations without a formal KYC + Suitability Assessment with the specific client, promise specific returns, or guarantee outcomes. Every public material I put out — including this page — is reviewed by Axcess Capital's CCO before publication.",
      },
      {
        icon: AlertTriangle,
        title: "What's forbidden for everyone (registered or not)",
        body: "Return guarantees — e.g. '$10K becomes $100K in a year' — are absolutely forbidden. Promoting a specific security without a disclosed compensation arrangement is a violation. Pseudo-consultations of the 'DM me, I'll help' kind are a trap: a conversation that starts in DMs and turns into 'buy this fund' creates liability as an unregulated sale. The worst category is selling crypto/forex/options schemes disguised as 'education'. That's the primary target of Notice 31-369.",
      },
      {
        icon: Search,
        title: "How to check whether a finfluencer is licensed",
        body: "Open the CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx). If someone calls themselves 'advisor', 'consultant', 'portfolio manager', or 'dealing representative', they MUST be in that database. If they're not, any 'personal recommendation' they give you is legally improper regardless of follower count. Red flag: 'certified', 'expert', 'mentor', 'coach' — these aren't regulatory terms and tell you nothing about a license. Check my name: NRD #4575551, Andrii Andriushchenko, Axcess Capital Advisors Inc.",
      },
      {
        icon: FileText,
        title: "What the Notice means for you as a consumer",
        body: "First: heightened regulator attention on social-media content — expect more enforcement actions against unlicensed finfluencers through 2026. Second: it's easier to spot real professionals vs. 'gurus' — a real DR publicly states NRD #, firm, provinces of registration, and disclaimers in every post. Third: your right to complain. If someone unlicensed sold you a product through TikTok DMs, OBSI (the Ombudsman for Banking Services and Investments) can help you recover funds. It's a public, free channel.",
      },
    ],
    comparisonTitle: "Quick comparison: licensed DR vs unlicensed finfluencer",
    comparisonHeaders: { aspect: "Aspect", licensed: "Registered DR (like me)", unlicensed: "Unlicensed finfluencer" },
    comparisonRows: [
      { aspect: "NRD #", licensed: "✅ Public, verify in 30 sec", unlicensed: "❌ None" },
      { aspect: "Employer firm", licensed: "✅ Named + CSA-registered", unlicensed: "❌ 'Self-employed' / nothing" },
      { aspect: "Compensation disclosed", licensed: "✅ In OM / on consult", unlicensed: "❌ 'Commission from X sales' hidden" },
      { aspect: "Social-media disclaimer", licensed: "✅ On every post", unlicensed: "❌ None" },
      { aspect: "KYC before recommendation", licensed: "✅ NI 31-103 mandatory", unlicensed: "❌ 'Just buy it'" },
      { aspect: "CCO oversight", licensed: "✅ Every asset reviewed", unlicensed: "❌ None" },
      { aspect: "Can guarantee returns", licensed: "❌ Forbidden", unlicensed: "✅ Often does" },
      { aspect: "Recourse if losses", licensed: "✅ OBSI + regulator + firm", unlicensed: "❌ Disappears / no one" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Can a popular Ukrainian/Russian-speaking TikTok finfluencer in Canada be properly licensed?",
        a: "Yes — and that's the best case for the audience. Verify by searching their full name in the CSA NRD database. If the result shows firm + category + registration date, it's a real DR. If nothing comes back, they're operating outside regulation. Many Ukrainian/Russian-language finfluencers in Canada offer 'financial advice' WITHOUT a license — not necessarily fraud, but legally unregulated activity with no recourse for you.",
      },
      {
        q: "What do I do if I already invested through an unlicensed finfluencer?",
        a: "1) Capture all chat history + payment documents. 2) File a complaint with OBSI (obsi.ca) — free, you can use a translator. 3) If it involved securities, parallel-file with the provincial securities regulator (ASC in Alberta, OSC in Ontario, BCSC in BC). 4) Guaranteed-return promises are almost always Securities Act violations. Regulators are actively pursuing these cases in 2026.",
      },
      {
        q: "Can I trust the content if the finfluencer is licensed?",
        a: "More — yes. A license means: completed professional education (EMP, CSC, WME, LLQP), regulatory background check, compliance training, attachment to a registered firm, regulator oversight. But it's not a guarantee that a specific recommendation fits you — only a formal KYC + Suitability Assessment with your numbers can confirm that. Always insist on KYC before making a decision.",
      },
      {
        q: "Does Notice 31-369 cover crypto influencers?",
        a: "Only when they promote securities. 'Bitcoin is the future' is educational and isn't covered. 'Buy this token from this project, I get a cut from sales' is covered (it's a securities distribution). Most crypto projects in 2024-2026 were classified by CSA as securities, so NI 31-103 + NI 45-106 apply. Many Canadian crypto finfluencers are in a grey zone.",
      },
      {
        q: "Why are you publishing this page?",
        a: "Because I'm a Licensed Dealing Representative (NRD #4575551, Axcess Capital, AB·BC·ON), and my professional reputation depends on the Ukrainian/Russian-speaking audience in Canada being able to tell regulated professionals from unregulated 'gurus'. This is public education that simultaneously protects my registry category and helps you not lose money. This page has been reviewed under Axcess Capital's compliance framework.",
      },
      {
        q: "Where do I go for more specific questions?",
        a: "30-minute discovery call, free — we'll go through your situation in person. Or /en/perevirka to verify my registration yourself. Or the CSA NRD search directly. If you've spotted a suspicious finfluencer, report to OBSI or the provincial regulator (ASC.ca for Alberta).",
      },
    ],
    bottomCtaTitle: "Need personal advice from a licensed professional?",
    bottomCtaText:
      "Discovery call — 30 minutes, free. We work through your situation concretely, with all NI 31-103 compliance requirements respected. No return promises, no TikTok marketing.",
    bottomCtaBtn: "Book a discovery call",
    verifyLinkLabel: "Verify me in 3 minutes",
    noticeLinkLabel: "Read Notice 31-369 (OSC)",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/finfluencer-compliance`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/finfluencer-compliance`,
    ])
  );
  alternates["x-default"] = "/uk/finfluencer-compliance";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    keywords: [
      "finfluencer Canada",
      "CSA CIRO Staff Notice 31-369",
      "TikTok finfluencer Canada",
      "як перевірити фінансового радника",
      "как проверить финансового советника",
      "verify financial advisor Canada",
      "NRD search Canada",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.descriptionMeta,
    },
  };
}

function buildJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://sky-fort.ca${path}#article`,
        headline: c.titleMeta,
        description: c.descriptionMeta,
        inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
        about: {
          "@type": "Thing",
          name: "Joint CSA/CIRO Staff Notice 31-369",
          url: NOTICE_URL,
        },
        author: {
          "@type": "Person",
          name: "Andrii Andriushchenko",
          jobTitle: "Licensed Dealing Representative",
          identifier: "NRD 4575551",
          url: `https://sky-fort.ca/${locale}/pro-mene`,
        },
        publisher: {
          "@type": "FinancialService",
          name: "SkyFort Wealth",
          url: "https://sky-fort.ca",
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://sky-fort.ca${path}` },
      },
    ],
  };
}

export default async function FinfluencerCompliancePage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/finfluencer-compliance`;
  const jsonLd = buildJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page="finfluencer-compliance" />
      <StickyCta locale={locale} page="finfluencer-compliance" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbThis },
          ]}
        />

        {/* HERO */}
        <header className="mt-10 pb-10">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">{c.eyebrow}</p>
          <h1 className="font-display-tight text-4xl text-white md:text-6xl">{c.title}</h1>
          <p className="mt-4 text-xl font-bold text-[#c4c4c4] md:text-2xl">{c.subtitle}</p>
          <p className="mt-7 text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
            <a
              href={NOTICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {c.noticeLinkLabel}
            </a>
            <span className="text-[var(--color-fg-subtle)]">·</span>
            <Link
              href={`/${locale}/perevirka`}
              className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
            >
              {c.verifyLinkLabel} →
            </Link>
          </div>
        </header>

        <div className="pb-4">
          <div className="mb-3">
            <UpdatedBadge date="2026-05-29" locale={locale} />
          </div>
          <TldrBlock
            text={c.tldr}
            pageName={c.titleMeta}
            pageUrl={`https://sky-fort.ca/${locale}/finfluencer-compliance`}
          />
          <div className="mt-4">
            <AuthorByline locale={locale} />
          </div>
        </div>

        {/* SECTIONS */}
        <section className="mt-12 pb-12">
          <h2 className="mb-10 font-display text-3xl text-white md:text-4xl">{c.sectionsTitle}</h2>
          <div className="space-y-5">
            {c.sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={i}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-9"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10">
                      <Icon className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl text-white md:text-2xl">{s.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-[#c4c4c4]">{s.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="mt-12 pb-12">
          <h2 className="mb-8 font-display text-3xl text-white md:text-4xl">{c.comparisonTitle}</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                  <th className="px-5 py-4 font-semibold">{c.comparisonHeaders.aspect}</th>
                  <th className="px-5 py-4 font-semibold text-[var(--color-brand)]">{c.comparisonHeaders.licensed}</th>
                  <th className="px-5 py-4 font-semibold">{c.comparisonHeaders.unlicensed}</th>
                </tr>
              </thead>
              <tbody>
                {c.comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <td className="px-5 py-4 font-semibold text-white">{row.aspect}</td>
                    <td className="px-5 py-4 text-[#c4c4c4]">{row.licensed}</td>
                    <td className="px-5 py-4 text-[#a3a3a3]">{row.unlicensed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* RELATED — internal links to YMYL trust pages */}
      <RelatedLinks
        heading={
          locale === "ru"
            ? "Связанные руководства"
            : locale === "en"
            ? "Related guides"
            : "Пов'язані матеріали"
        }
        items={[
          {
            href: `/${locale}/perevirka`,
            label:
              locale === "ru"
                ? "Проверь моего регистрацию за 3 минуты"
                : locale === "en"
                ? "Verify my registration in 3 minutes"
                : "Перевір мою реєстрацію за 3 хвилини",
            description:
              locale === "ru"
                ? "NRD #4575551, Axcess Capital, IFSE EMP, OBSI — пошаговый чек."
                : locale === "en"
                ? "NRD #4575551, Axcess Capital, IFSE EMP, OBSI — step-by-step check."
                : "NRD #4575551, Axcess Capital, IFSE EMP, OBSI — покрокова перевірка.",
          },
          {
            href: `/${locale}/porivnyannia`,
            label:
              locale === "ru"
                ? "EMD vs CIRO vs Insurance"
                : locale === "en"
                ? "EMD vs CIRO vs Insurance"
                : "EMD vs CIRO vs Insurance",
            description:
              locale === "ru"
                ? "Какая лицензия у твоего советника на самом деле."
                : locale === "en"
                ? "Which licence your adviser actually holds, and what it covers."
                : "Яку ліцензію має твій радник насправді — і що вона покриває.",
          },
          {
            href: `/${locale}/eligibility`,
            label:
              locale === "ru"
                ? "Eligible Investor self-check за 60 секунд"
                : locale === "en"
                ? "Eligible Investor self-check in 60 seconds"
                : "Eligible Investor self-check за 60 секунд",
            description:
              locale === "ru"
                ? "NI 45-106 §1.1 — попадаешь ли ты в категории exempt market."
                : locale === "en"
                ? "NI 45-106 §1.1 — do you fit the exempt market categories?"
                : "NI 45-106 §1.1 — чи попадаєш ти у категорії exempt market.",
          },
          {
            href: `/${locale}/slovnyk`,
            label:
              locale === "ru"
                ? "Словарь канадских финансов"
                : locale === "en"
                ? "Canadian finance glossary"
                : "Словник канадських фінансів",
            description:
              locale === "ru"
                ? "30+ терминов TFSA, CCPC, MIC, EMD с источниками."
                : locale === "en"
                ? "30+ terms — TFSA, CCPC, MIC, EMD — with sources."
                : "30+ термінів — TFSA, CCPC, MIC, EMD — з джерелами.",
          },
        ]}
      />

      {/* FAQ */}
      <StaticFaq
        faq={c.faq}
        heading={c.faqTitle}
        jsonLdId={`https://sky-fort.ca${path}#faq`}
      />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <TopicSuggestForm locale={locale} source="finfluencer-compliance" />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display-tight text-3xl text-white md:text-5xl">{c.bottomCtaTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]">{c.bottomCtaText}</p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
        >
          {c.bottomCtaBtn}
        </a>
      </section>
    </main>
  );
}
