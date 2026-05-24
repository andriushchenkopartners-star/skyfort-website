import { Mail, Phone, AtSign, Send } from "lucide-react";
import Logo from "../_components/Logo";
import TikTokIcon from "../_components/TikTokIcon";
import { CONFIG } from "../_i18n/config";

export default function Footer({ content }) {
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
          </div>
        </div>
        <div className="mt-16 border-t border-[#2a2a2a] pt-8 text-xs text-[#6b6b6b]">
          {content.footer.rights}
        </div>
      </div>
    </footer>
  );
}
