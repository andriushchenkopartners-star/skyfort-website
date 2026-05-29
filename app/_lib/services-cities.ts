// Дані для програмних Service × City landing pages.
// 4 послуги × 6 міст = 24 SEO-сторінки під long-tail запити типу
// "TFSA для українців в Едмонтоні", "exempt market Toronto" тощо.

export type Locale = "uk" | "ru" | "en";

export interface Service {
  slug: string;
  pillar: string;
  titleUk: string;
  titleRu: string;
  titleEn: string;
  descUk: string;
  descRu: string;
  descEn: string;
  keywords: string[];
  relatedCalculator: string;
  relatedPillarSlug: string;
}

export interface City {
  slug: string;
  nameUk: string;
  nameRu: string;
  nameEn: string;
  locativeUk: string;
  locativeRu: string;
  locativeEn: string;
  province: string;
  provinceCode: string;
  population: string;
  medianHHIncome: number;
  notesUk: string[];
  notesRu: string[];
  notesEn: string[];
}

export const SERVICES: Record<string, Service> = {
  tfsa: {
    slug: "tfsa",
    pillar: "TFSA",
    titleUk: "TFSA-планування",
    titleRu: "TFSA-планирование",
    titleEn: "TFSA planning",
    descUk:
      "Налаштування TFSA для новоприбулих: contribution room, growth-стратегії на 20 років, типові помилки.",
    descRu:
      "Настройка TFSA для новоприбывших: contribution room, growth-стратегии на 20 лет, типичные ошибки.",
    descEn:
      "TFSA setup for newcomers: contribution room, 20-year growth strategies, common mistakes.",
    keywords: ["TFSA", "contribution room", "newcomer Canada", "tax-free savings"],
    relatedCalculator: "/calculators/tfsa-growth",
    relatedPillarSlug: "tfsa-dlya-ukrayintsiv-povny-gayd-2026",
  },
  rrsp: {
    slug: "rrsp",
    pillar: "RRSP",
    titleUk: "RRSP-планування для новоприбулих",
    titleRu: "RRSP-планирование для новоприбывших",
    titleEn: "RRSP planning for newcomers",
    descUk:
      "Як rrsp room накопичується з першого Notice of Assessment, RRSP vs TFSA пріоритет, HBP для першого дому.",
    descRu:
      "Как RRSP room накапливается с первого Notice of Assessment, RRSP vs TFSA приоритет, HBP для первого дома.",
    descEn:
      "How RRSP room builds from first Notice of Assessment, RRSP vs TFSA priority, HBP for first home.",
    keywords: ["RRSP", "tax deduction", "retirement", "HBP", "newcomer"],
    relatedCalculator: "/calculators/financial-freedom",
    relatedPillarSlug: "rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi",
  },
  fhsa: {
    slug: "fhsa",
    pillar: "FHSA",
    titleUk: "FHSA-стратегія для першого дому",
    titleRu: "FHSA-стратегия для первого дома",
    titleEn: "FHSA strategy for first home",
    descUk:
      "$40K lifetime tax-free на перший дім. Як комбінувати з RRSP HBP та TFSA, ідеальна послідовність використання.",
    descRu:
      "$40K lifetime tax-free на первый дом. Как комбинировать с RRSP HBP и TFSA.",
    descEn:
      "$40K lifetime tax-free for first home. How to combine with RRSP HBP and TFSA.",
    keywords: ["FHSA", "first home", "$40K", "down payment", "HBP"],
    relatedCalculator: "/calculators/mortgage",
    relatedPillarSlug: "fhsa-40k-na-pershu-kvartiru-v-kanadi",
  },
  "exempt-market": {
    slug: "exempt-market",
    pillar: "ExemptMarket",
    titleUk: "Exempt market інвестиції",
    titleRu: "Exempt market инвестиции",
    titleEn: "Exempt market investments",
    descUk:
      "Приватні MICs, REITs, development LPs для Eligible Investors. CSA NI 45-106 категорії, ризики, як зайти.",
    descRu:
      "Частные MICs, REITs, development LPs для Eligible Investors. CSA NI 45-106 категории, риски.",
    descEn:
      "Private MICs, REITs, development LPs for Eligible Investors. CSA NI 45-106 categories, risks.",
    keywords: ["exempt market", "MIC", "private REIT", "Eligible Investor", "accredited"],
    relatedCalculator: "/calculators/financial-freedom",
    relatedPillarSlug: "exempt-market-calgary-commercial-real-estate-rozvytok",
  },
};

export const CITIES: Record<string, City> = {
  calgary: {
    slug: "calgary",
    nameUk: "Калгарі",
    nameRu: "Калгари",
    nameEn: "Calgary",
    locativeUk: "у Калгарі",
    locativeRu: "в Калгари",
    locativeEn: "in Calgary",
    province: "Alberta",
    provinceCode: "AB",
    population: "1.6M (CMA)",
    medianHHIncome: 116000,
    notesUk: [
      "Найшвидше зростаюче велике місто Канади: +90,000 нових мешканців у 2024.",
      "Real estate cap rates 5.5-7% (~2× кращі ніж Toronto).",
      "Provincial flat tax 10% (на низькі brackets), no PST.",
      "Activне ком'юніті українців через CUAET програму.",
    ],
    notesRu: [
      "Самый быстрорастущий крупный город Канады: +90,000 новых жителей в 2024.",
      "Real estate cap rates 5.5-7% (~2× лучше чем Toronto).",
      "Provincial flat tax 10% (на низкие brackets), no PST.",
      "Активное сообщество русскоязычных и украинцев через CUAET.",
    ],
    notesEn: [
      "Fastest-growing major Canadian city: +90,000 new residents in 2024.",
      "Real estate cap rates 5.5-7% (~2× better than Toronto).",
      "Provincial flat tax 10% (low brackets), no PST.",
      "Active Ukrainian community through CUAET program.",
    ],
  },
  edmonton: {
    slug: "edmonton",
    nameUk: "Едмонтон",
    nameRu: "Эдмонтон",
    nameEn: "Edmonton",
    locativeUk: "в Едмонтоні",
    locativeRu: "в Эдмонтоне",
    locativeEn: "in Edmonton",
    province: "Alberta",
    provinceCode: "AB",
    population: "1.5M (CMA)",
    medianHHIncome: 108000,
    notesUk: [
      "Столиця Альберти, government + healthcare-driven економіка (stable jobs).",
      "Cost of housing 30% нижчий ніж Калгарі — добре для FHSA-стратегії.",
      "Велика українська діаспора з 1990-х (друга хвиля).",
      "Той самий Alberta tax advantage що Калгарі.",
    ],
    notesRu: [
      "Столица Альберты, government + healthcare-driven экономика.",
      "Cost of housing на 30% ниже Калгари — хорошо для FHSA-стратегии.",
      "Большая русскоязычная диаспора с 1990-х.",
    ],
    notesEn: [
      "Capital of Alberta, government + healthcare-driven economy.",
      "Housing cost 30% lower than Calgary — great for FHSA strategy.",
      "Established Ukrainian-Canadian community since 1990s.",
    ],
  },
  "red-deer": {
    slug: "red-deer",
    nameUk: "Ред-Дір",
    nameRu: "Ред-Дир",
    nameEn: "Red Deer",
    locativeUk: "у Ред-Дірі",
    locativeRu: "в Ред-Дире",
    locativeEn: "in Red Deer",
    province: "Alberta",
    provinceCode: "AB",
    population: "100K (city)",
    medianHHIncome: 95000,
    notesUk: [
      "Третє за розміром місто Альберти, середина між Calgary та Edmonton.",
      "Affordable real estate: condo $250-400K, detached $400-600K.",
      "Energy + agriculture industries dominate.",
      "Спільнота newcomer-ів росте — менш конкурентний ринок ніж великі міста.",
    ],
    notesRu: [
      "Третий по размеру город Альберты, между Calgary и Edmonton.",
      "Доступная недвижимость: condo $250-400K, detached $400-600K.",
      "Energy + agriculture industries dominate.",
    ],
    notesEn: [
      "3rd largest city in Alberta, midway between Calgary and Edmonton.",
      "Affordable real estate: condo $250-400K, detached $400-600K.",
      "Energy + agriculture-dominated economy.",
    ],
  },
  vancouver: {
    slug: "vancouver",
    nameUk: "Ванкувер",
    nameRu: "Ванкувер",
    nameEn: "Vancouver",
    locativeUk: "у Ванкувері",
    locativeRu: "в Ванкувере",
    locativeEn: "in Vancouver",
    province: "British Columbia",
    provinceCode: "BC",
    population: "2.6M (CMA)",
    medianHHIncome: 90000,
    notesUk: [
      "BC tax: progressive до 20.5% top bracket — RRSP більш ефективний.",
      "Real estate найдорожчий у Канаді: $1,400+/sq.ft. Cap rates низькі (3-4%).",
      "Foreign buyer ban + speculation tax — впливає на real estate інвестиції.",
      "FHSA + HBP комбо — критичне через високі ціни.",
    ],
    notesRu: [
      "BC tax: progressive до 20.5% — RRSP более эффективен.",
      "Самая дорогая недвижимость в Канаде: $1,400+/sq.ft.",
      "Foreign buyer ban + speculation tax влияют на real estate инвестиции.",
    ],
    notesEn: [
      "BC tax: progressive up to 20.5% top bracket — RRSP more effective.",
      "Most expensive real estate in Canada: $1,400+/sq.ft.",
      "Foreign buyer ban + speculation tax affect real estate investing.",
    ],
  },
  burnaby: {
    slug: "burnaby",
    nameUk: "Бернабі",
    nameRu: "Бернаби",
    nameEn: "Burnaby",
    locativeUk: "у Бернабі",
    locativeRu: "в Бернаби",
    locativeEn: "in Burnaby",
    province: "British Columbia",
    provinceCode: "BC",
    population: "260K (city)",
    medianHHIncome: 88000,
    notesUk: [
      "Suburb Ванкувера з кращою affordability (на 20% дешевше за Vancouver proper).",
      "Tech hub (Microsoft, SAP campuses) — багато high-income earners.",
      "BC tax + foreign buyer ban + speculation tax — same as Vancouver.",
    ],
    notesRu: [
      "Suburb Ванкувера с лучшей affordability (на 20% дешевле).",
      "Tech hub — Microsoft, SAP campuses.",
    ],
    notesEn: [
      "Vancouver suburb with better affordability (~20% cheaper).",
      "Tech hub: Microsoft and SAP campuses.",
    ],
  },
  toronto: {
    slug: "toronto",
    nameUk: "Торонто",
    nameRu: "Торонто",
    nameEn: "Toronto",
    locativeUk: "у Торонто",
    locativeRu: "в Торонто",
    locativeEn: "in Toronto",
    province: "Ontario",
    provinceCode: "ON",
    population: "6.4M (CMA)",
    medianHHIncome: 97000,
    notesUk: [
      "Ontario tax: до 13.16% provincial top — high earners платять найбільше.",
      "Найбільший фінансовий ринок Канади — найбільше exempt market opportunities.",
      "Real estate $1,200+/sq.ft. Cap rates 3.5-4.5%.",
      "Найбільша українська діаспора у Канаді (1М+).",
    ],
    notesRu: [
      "Ontario tax: до 13.16% provincial top.",
      "Крупнейший финансовый рынок Канады — больше всего exempt market opportunities.",
      "Real estate $1,200+/sq.ft.",
    ],
    notesEn: [
      "Ontario tax: up to 13.16% provincial top bracket.",
      "Canada's largest financial market — most exempt market opportunities.",
      "Real estate $1,200+/sq.ft. Cap rates 3.5-4.5%.",
    ],
  },
};

// Хелпери

export function getServiceKeys(): string[] {
  return Object.keys(SERVICES);
}
export function getCityKeys(): string[] {
  return Object.keys(CITIES);
}
export function getService(slug: string): Service | null {
  return SERVICES[slug] || null;
}
export function getCity(slug: string): City | null {
  return CITIES[slug] || null;
}

export interface ServiceCityPair {
  service: string;
  city: string;
}

// Всі комбінації для generateStaticParams
export function getAllServiceCityPairs(): ServiceCityPair[] {
  const pairs: ServiceCityPair[] = [];
  for (const service of getServiceKeys()) {
    for (const city of getCityKeys()) {
      pairs.push({ service, city });
    }
  }
  return pairs;
}
