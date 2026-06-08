"use client";

import { useEffect } from "react";
import type { ComponentType } from "react";
import {
  Calendar,
  Download,
  Calculator,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Button from "../../_components/Button";
import Card from "../../_components/Card";
import Container from "../../_components/Container";
import Logo from "../../_components/Logo";
import TikTokIcon from "../../_components/TikTokIcon";
import EmailCaptureForm from "../../_components/EmailCaptureForm";
import { resolveLocale } from "../../_i18n/dictionary";
import { CONFIG } from "../../_i18n/config";
import {
  captureUtmsOnLoad,
  trackTtLandingView,
  trackTtCtaClick,
  withUtms,
} from "../../_lib/analytics";

const CALENDLY = CONFIG.calendlyUrl;
const WHATSAPP = CONFIG.whatsapp;
const TIKTOK = CONFIG.tiktok;
const NRD_LOOKUP =
  "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const COPY = {
  uk: {
    h1: "Бачив мене у TikTok?",
    sub: "Ось усе що тобі треба за один екран. Обери що цікавить — повертайся з питаннями.",
    trust: "Licensed DR · NRD",
    firm: "Axcess Capital Advisors Inc.",
    ctas: [
      { id: "book",       title: "Безкоштовний 30-хв дзвінок",       subtitle: "Discovery call · Zoom або Google Meet" },
      { id: "guide",      title: "Завантажити гайди (8 PDF)",         subtitle: "TFSA, FHSA, RRSP, exempt market — без email-форми" },
      { id: "calculator", title: "TFSA-калькулятор на 20 років",      subtitle: "Введи свої цифри. Побач різницю bank vs diversified портфоліо." },
      { id: "whatsapp",   title: "Написати у WhatsApp",                subtitle: "Швидке питання — без запису" },
    ],
    disclaimer: "Освітні матеріали. Не є інвестиційною рекомендацією. Exempt market інвестиції доступні лише Eligible Investors під CSA NI 45-106.",
    verifyLink: "Перевірити реєстрацію у ASC",
    followCta: "Слідкуй на TikTok",
  },
  ru: {
    h1: "Видел меня в TikTok?",
    sub: "Вот всё что тебе нужно за один экран. Выбери что интересно — возвращайся с вопросами.",
    trust: "Licensed DR · NRD",
    firm: "Axcess Capital Advisors Inc.",
    ctas: [
      { id: "book",       title: "Бесплатный 30-мин звонок",          subtitle: "Discovery call · Zoom или Google Meet" },
      { id: "guide",      title: "Скачать гайды (8 PDF)",              subtitle: "TFSA, FHSA, RRSP, exempt market — без email-формы" },
      { id: "calculator", title: "TFSA-калькулятор на 20 лет",         subtitle: "Введи свои цифры. Увидь разницу bank vs diversified портфолио." },
      { id: "whatsapp",   title: "Написать в WhatsApp",                subtitle: "Быстрый вопрос — без записи" },
    ],
    disclaimer: "Образовательные материалы. Не является инвестиционной рекомендацией. Exempt market доступен только Eligible Investors под CSA NI 45-106.",
    verifyLink: "Проверить регистрацию в ASC",
    followCta: "Подписаться в TikTok",
  },
  en: {
    h1: "Saw me on TikTok?",
    sub: "Everything you need on one screen. Pick what you want — come back with questions.",
    trust: "Licensed DR · NRD",
    firm: "Axcess Capital Advisors Inc.",
    ctas: [
      { id: "book",       title: "Free 30-min discovery call",         subtitle: "Zoom or Google Meet" },
      { id: "guide",      title: "Download guides (8 PDFs)",           subtitle: "TFSA, FHSA, RRSP, exempt market — no email gate" },
      { id: "calculator", title: "20-year TFSA calculator",            subtitle: "Plug in your numbers. See the bank vs diversified portfolio gap." },
      { id: "whatsapp",   title: "WhatsApp me",                        subtitle: "Quick question — no booking" },
    ],
    disclaimer: "Educational only. Not investment advice. Exempt market investments are restricted to Eligible Investors per CSA NI 45-106.",
    verifyLink: "Verify ASC registration",
    followCta: "Follow on TikTok",
  },
};

const CTA_ICONS = {
  book: Calendar,
  guide: Download,
  calculator: Calculator,
  whatsapp: MessageCircle,
};

function buildCtas(locale: string) {
  return COPY[locale].ctas.map((cta) => {
    let href, external;
    switch (cta.id) {
      case "book":       href = CALENDLY; external = true; break;
      case "guide":      href = `/${locale}#guides`; external = false; break;
      case "calculator": href = `/${locale}/calculators/tfsa-growth`; external = false; break;
      case "whatsapp":   href = WHATSAPP; external = true; break;
      default:           href = "/"; external = false;
    }
    return { ...cta, href, external, icon: CTA_ICONS[cta.id] };
  });
}

interface TtLandingClientProps {
  locale?: string;
  portraitSrc: string;
  portraitAlt: string;
  ImageComponent: ComponentType<any>;
}

export default function TtLandingClient({ locale: rawLocale, portraitSrc, portraitAlt, ImageComponent }: TtLandingClientProps) {
  const locale = resolveLocale(rawLocale) as "uk" | "ru" | "en";
  const copy = COPY[locale];
  const ctas = buildCtas(locale);

  useEffect(() => {
    captureUtmsOnLoad();
    const params = new URLSearchParams(window.location.search);
    trackTtLandingView(params.get("utm_campaign") || "bio");
  }, []);

  return (
    <Container size="sm" className="pt-12 pb-16 md:pt-20 md:pb-24">
      <header className="flex flex-col items-center text-center">
        <Logo size="lg" className="mb-5" />
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[var(--color-brand)] mb-5">
          <ImageComponent
            src={portraitSrc}
            alt={portraitAlt}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {copy.h1}
        </h1>
        <p className="mt-2 text-[var(--color-fg-muted)] max-w-md text-base md:text-lg">
          {copy.sub}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-fg-subtle)]">
          <ShieldCheck size={14} className="text-[var(--color-brand)]" aria-hidden="true" />
          <span>
            {copy.trust} <span className="font-mono">#4575551</span> · {copy.firm}
          </span>
        </div>
      </header>

      <div className="mt-10 flex flex-col gap-3">
        {ctas.map((cta) => (
          <Card
            key={cta.id}
            variant="glow"
            padding="none"
            radius="xl"
            className="overflow-hidden"
          >
            <Button
              href={withUtms(cta.href)}
              variant="ghost"
              size="lg"
              className="!h-auto !p-5 w-full !justify-start text-left"
              icon={cta.external ? ExternalLink : null}
              iconPosition="right"
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              onClick={() => trackTtCtaClick(cta.id)}
            >
              <span className="flex items-center gap-4 w-full">
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex-shrink-0"
                  aria-hidden="true"
                >
                  <cta.icon size={20} />
                </span>
                <span className="flex flex-col gap-0.5 flex-1">
                  <span className="text-[var(--color-fg)] text-base md:text-lg font-semibold leading-tight">
                    {cta.title}
                  </span>
                  <span className="text-[var(--color-fg-muted)] text-sm font-normal leading-snug">
                    {cta.subtitle}
                  </span>
                </span>
              </span>
            </Button>
          </Card>
        ))}
      </div>

      {/* Email capture — нижче CTAs, для тих хто хоче спершу подивитись на гайд */}
      <div className="mt-8">
        <EmailCaptureForm
          locale={locale}
          variant="card"
          source="tt_landing"
          leadMagnet="TFSA_GUIDE"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href={TIKTOK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTtCtaClick("follow_tiktok")}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--color-fg)] transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] hover:border-[var(--color-brand)] hover:bg-[var(--color-bg-card)] active:scale-95"
        >
          <TikTokIcon className="h-4 w-4" />
          {copy.followCta} · {CONFIG.tiktokHandle}
        </a>
      </div>

      <footer className="mt-8 text-center space-y-3">
        <p className="text-xs text-[var(--color-fg-subtle)] leading-relaxed">
          {copy.disclaimer}
        </p>
        <a
          href={NRD_LOOKUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[var(--color-fg-muted)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)] underline underline-offset-2"
        >
          {copy.verifyLink} <ExternalLink size={11} aria-hidden="true" />
        </a>
      </footer>
    </Container>
  );
}
