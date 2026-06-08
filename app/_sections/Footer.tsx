import Link from "next/link";
import { Mail, Phone, AtSign, Send, MapPin } from "lucide-react";
import Logo from "../_components/Logo";
import TikTokIcon from "../_components/TikTokIcon";
import { CONFIG } from "../_i18n/config";

type Locale = "uk" | "ru" | "en";

interface LegalLinks {
  contact: string;
  press: string;
  privacy: string;
  cookies: string;
}

interface FooterContent {
  footer: {
    tagline: string;
    contactTitle: string;
    legalTitle: string;
    disclaimer: string;
    finfluencerNote?: string;
    rights: string;
  };
}

const LEGAL_LINKS: Record<Locale, LegalLinks> = {
  uk: { contact: "Контакти", press: "Преса", privacy: "Приватність", cookies: "Cookies" },
  ru: { contact: "Контакты", press: "Пресса", privacy: "Приватность", cookies: "Cookies" },
  en: { contact: "Contact", press: "Press", privacy: "Privacy", cookies: "Cookies" },
};

export default function Footer({ content, locale = "uk" }: { content: FooterContent; locale?: Locale }) {
  // Locale comes from the route segment now (passed as prop). The previous
  // localeFromContent() heuristic looked at content.footer.contactTitle and
  // tried to distinguish "Контакти" (UA) from "Контакты" (RU) by checking if
  // the string contained 'акт' AND 'и' — but BOTH strings contain both, so
  // Ukrainian was misclassified as Russian and footer links pointed to
  // /ru/contact, /ru/privacy, /ru/cookies on Ukrainian pages. Caught by SEO
  // audit (May 28, 2026). Pass locale explicitly to remove the guesswork.
  const l = LEGAL_LINKS[locale] || LEGAL_LINKS.uk;
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#191919] pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo variant="mark" />
            <p className="mt-4 text-sm text-[#6b6b6b]">{content.footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">
              {content.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-[#a3a3a3]">
              <li>
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONFIG.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONFIG.tiktok}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"
                >
                  <TikTokIcon className="h-3.5 w-3.5" />
                  TikTok · {CONFIG.tiktokHandle}
                </a>
              </li>
              {/* Instagram temporarily hidden — profile not live yet.
                  Re-enables automatically when CONFIG.instagramActive = true. */}
              {CONFIG.instagramActive && (
                <li>
                  <a
                    href={CONFIG.instagram}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"
                  >
                    <AtSign className="h-3.5 w-3.5" aria-hidden="true" />
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={CONFIG.telegram}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">
              {content.footer.legalTitle}
            </h3>
            <p className="text-xs leading-relaxed text-[#6b6b6b]">
              {content.footer.disclaimer}
            </p>
            {content.footer.finfluencerNote && (
              <p className="mt-3 border-t border-[#2a2a2a] pt-3 text-[11px] leading-relaxed text-[#6b6b6b]">
                {content.footer.finfluencerNote}
              </p>
            )}
          </div>
        </div>
        <div className="mt-16 border-t border-[#2a2a2a] pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-[#6b6b6b]">{content.footer.rights}</div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#a3a3a3]">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1 transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {l.contact}
            </Link>
            <Link href={`/${locale}/presa`} className="transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]">{l.press}</Link>
            <Link href={`/${locale}/privacy`} className="transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]">{l.privacy}</Link>
            <Link href={`/${locale}/cookies`} className="transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]">{l.cookies}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
