# 📧 Brevo welcome email templates — 3 ready-to-paste версії

> Це повний HTML для 3 welcome email-ів (UK / RU / EN). Скопіюй кожен у Brevo як окремий template і отримай 3 Template ID — далі додай їх у Vercel env vars.

## ⚡ TL;DR — 3 кроки для Andrii

1. **Створи 3 templates у Brevo** (по одному на мову — UK, RU, EN). Кожен — copy-paste HTML з цього файлу через **"Use code editor"** опцію.
2. **Скопіюй 3 Template IDs** (числа, видно у списку templates).
3. **Додай у Vercel env vars**:
   - `BREVO_WELCOME_TPLID_UK=<число>`
   - `BREVO_WELCOME_TPLID_RU=<число>`
   - `BREVO_WELCOME_TPLID_EN=<число>`

Те ж саме додай і в локальний `.env.local`.

Все. Підписники з кожної мови автоматично отримають правильний шаблон.

---

## Як створити template у Brevo (покроково)

1. Brevo Dashboard → ліве меню **Campaigns → Email Templates**
2. **New template** (зверху справа)
3. **Settings** — заповни ці 4 поля:
   - **Template name** (для тебе): наприклад `SkyFort Welcome — UK`
   - **Subject line**: дивись нижче в розділі для кожної мови
   - **From name**: `Andrii · SkyFort`
   - **From email**: `andrii@sky-fort.ca`
   - **Preview text**: дивись нижче для кожної мови
4. Натисни **Save & Design**
5. У редакторі обери **Use code editor** (зверху, поруч з "Drag & drop editor")
6. **Видали все що там за замовчуванням** (Brevo вставляє basic шаблон)
7. **Скопіюй HTML** з відповідного розділу нижче і встав
8. Натисни **Save & Activate** (зверху справа)
9. У списку templates подивись **Template ID** (число у URL або в Settings template-а)

---

# 🇺🇦 UK Template

**Template name**: `SkyFort Welcome — UK`

**Subject**: `Твій гайд TFSA — як обіцяно 👇`

**Preview text**: `8 типових помилок українців з TFSA + 20-річний план. Без спаму, можеш відписатись будь-коли.`

**HTML body** (copy це у "code editor"):

```html
<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Твій гайд TFSA</title>
</head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0b0d10;line-height:1.55;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f4ef;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e3e1da;">

      <!-- Header -->
      <tr><td style="background:#2D73E3;padding:24px 32px;color:#ffffff;">
        <div style="font-size:22px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;">SkyFort</div>
        <div style="font-size:12px;opacity:0.85;margin-top:4px;letter-spacing:0.04em;">Канадські фінанси для українців</div>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:32px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#0b0d10;line-height:1.25;">
          Привіт{% if params.FIRSTNAME %}, {{ params.FIRSTNAME }}{% endif %} 👋
        </h1>
        <p style="margin:0 0 16px;font-size:16px;color:#2a2e35;">
          Дякую що підписався — твій гайд TFSA нижче. Це освітні матеріали, не персональна рекомендація.
        </p>

        <!-- Main CTA button -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
          <tr><td style="background:#0b0d10;border-radius:10px;">
            <a href="https://sky-fort.ca/uk/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026?utm_source=brevo&utm_medium=email&utm_campaign=welcome_uk"
               style="display:inline-block;padding:14px 24px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">
              📖 Відкрити повний гайд TFSA →
            </a>
          </td></tr>
        </table>

        <p style="margin:0 0 12px;font-size:14px;color:#6b6b66;">
          У гайді розбираємо:
        </p>
        <ul style="margin:0 0 20px;padding-left:20px;font-size:15px;color:#2a2e35;">
          <li style="margin-bottom:8px;">Скільки <strong>TFSA contribution room</strong> ти маєш як новоприбулий (це плутає 80% людей)</li>
          <li style="margin-bottom:8px;">5 типових помилок — від банківських mutual funds з 2% MER до over-contribution штрафу</li>
          <li style="margin-bottom:8px;">20-річна стратегія: від банку → self-directed → exempt market коли стаєш Eligible Investor</li>
          <li>Скільки реально буде через 20 років при $500/міс — спойлер: ~$320,000</li>
        </ul>

        <!-- Divider -->
        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>

        <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#0b0d10;">Що далі?</h2>
        <p style="margin:0 0 12px;font-size:15px;color:#2a2e35;">
          Якщо хочеш персональний розбір <em>своєї</em> ситуації — записуйся на безкоштовний 30-хвилинний discovery call. Без впарювання, тільки твої цифри.
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:16px 0;">
          <tr><td style="background:#2D73E3;border-radius:10px;">
            <a href="https://calendly.com/andriushchenko-partners/new-meeting?utm_source=brevo&utm_medium=email&utm_campaign=welcome_uk"
               style="display:inline-block;padding:12px 22px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;border-radius:10px;">
              📅 Записатись на discovery call
            </a>
          </td></tr>
        </table>

        <!-- Other articles -->
        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>
        <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b6b66;">Ще корисне:</h3>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/uk/blog/rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ RRSP vs TFSA: що обирати в перші 5 років</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/uk/blog/fhsa-40k-na-pershu-kvartiru-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ FHSA: $40,000 на перший дім у Канаді</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/uk/blog/pershyi-rik-v-kanadi-finansovyi-cheklist" style="color:#2D73E3;text-decoration:none;">→ Перший рік у Канаді: фінансовий чек-ліст</a></p>
        <p style="margin:0;font-size:14px;"><a href="https://sky-fort.ca/uk/blog/yak-pereviryty-finansovogo-radnyka-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ Як перевірити фінансового радника</a></p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f5f4ef;padding:24px 32px;border-top:1px solid #e3e1da;font-size:11.5px;color:#6b6b66;line-height:1.55;">
        <p style="margin:0 0 8px;">
          <strong style="color:#0b0d10;">Andrii Andriushchenko</strong> · Licensed Dealing Representative<br>
          NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer)<br>
          Ліцензований в Alberta · British Columbia · Ontario
        </p>
        <p style="margin:0 0 8px;font-size:11px;">
          ⚠️ <em>Інформація в цьому листі — освітні матеріали, не персональна інвестиційна рекомендація. Не гарантую жодної дохідності. Для конкретного рішення необхідний KYC + Suitability Assessment.</em>
        </p>
        <p style="margin:0;font-size:11px;">
          📞 <a href="tel:+14033972553" style="color:#6b6b66;">+1-403-397-2553</a> · ✉️ <a href="mailto:andrii@sky-fort.ca" style="color:#6b6b66;">andrii@sky-fort.ca</a> · 🌐 <a href="https://sky-fort.ca" style="color:#6b6b66;">sky-fort.ca</a>
        </p>
        <p style="margin:12px 0 0;font-size:10.5px;color:#9a9890;">
          Ти отримав цей email бо підписався на sky-fort.ca. Перевірити мене в реєстрі: <a href="https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx" style="color:#9a9890;">info.securities-administrators.ca</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
```

---

# 🇷🇺 RU Template

**Template name**: `SkyFort Welcome — RU`

**Subject**: `Твой гайд TFSA — как обещали 👇`

**Preview text**: `8 типичных ошибок русскоязычных с TFSA + 20-летний план. Без спама, можешь отписаться в любой момент.`

**HTML body** (copy це у "code editor"):

```html
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Твой гайд TFSA</title>
</head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0b0d10;line-height:1.55;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f4ef;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e3e1da;">

      <tr><td style="background:#2D73E3;padding:24px 32px;color:#ffffff;">
        <div style="font-size:22px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;">SkyFort</div>
        <div style="font-size:12px;opacity:0.85;margin-top:4px;letter-spacing:0.04em;">Канадские финансы для русскоязычных</div>
      </td></tr>

      <tr><td style="padding:32px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#0b0d10;line-height:1.25;">
          Привет{% if params.FIRSTNAME %}, {{ params.FIRSTNAME }}{% endif %} 👋
        </h1>
        <p style="margin:0 0 16px;font-size:16px;color:#2a2e35;">
          Спасибо что подписался — твой гайд TFSA ниже. Это образовательные материалы, не персональная рекомендация.
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
          <tr><td style="background:#0b0d10;border-radius:10px;">
            <a href="https://sky-fort.ca/ru/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026?utm_source=brevo&utm_medium=email&utm_campaign=welcome_ru"
               style="display:inline-block;padding:14px 24px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">
              📖 Открыть полный гайд TFSA →
            </a>
          </td></tr>
        </table>

        <p style="margin:0 0 12px;font-size:14px;color:#6b6b66;">
          В гайде разбираем:
        </p>
        <ul style="margin:0 0 20px;padding-left:20px;font-size:15px;color:#2a2e35;">
          <li style="margin-bottom:8px;">Сколько <strong>TFSA contribution room</strong> у тебя как у новоприбывшего (это путает 80% людей)</li>
          <li style="margin-bottom:8px;">5 типичных ошибок — от банковских mutual funds с 2% MER до over-contribution штрафа</li>
          <li style="margin-bottom:8px;">20-летняя стратегия: от банка → self-directed → exempt market когда станешь Eligible Investor</li>
          <li>Сколько реально будет через 20 лет при $500/мес — спойлер: ~$320,000</li>
        </ul>

        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>

        <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#0b0d10;">Что дальше?</h2>
        <p style="margin:0 0 12px;font-size:15px;color:#2a2e35;">
          Если хочешь персональный разбор <em>своей</em> ситуации — записывайся на бесплатный 30-минутный discovery call. Без впаривания, только твои цифры.
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:16px 0;">
          <tr><td style="background:#2D73E3;border-radius:10px;">
            <a href="https://calendly.com/andriushchenko-partners/new-meeting?utm_source=brevo&utm_medium=email&utm_campaign=welcome_ru"
               style="display:inline-block;padding:12px 22px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;border-radius:10px;">
              📅 Записаться на discovery call
            </a>
          </td></tr>
        </table>

        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>
        <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b6b66;">Ещё полезное:</h3>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/ru/blog/rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ RRSP vs TFSA: что выбирать в первые 5 лет</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/ru/blog/fhsa-40k-na-pershu-kvartiru-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ FHSA: $40,000 на первую квартиру в Канаде</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/ru/blog/pershyi-rik-v-kanadi-finansovyi-cheklist" style="color:#2D73E3;text-decoration:none;">→ Первый год в Канаде: финансовый чек-лист</a></p>
        <p style="margin:0;font-size:14px;"><a href="https://sky-fort.ca/ru/blog/yak-pereviryty-finansovogo-radnyka-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ Как проверить финансового советника</a></p>
      </td></tr>

      <tr><td style="background:#f5f4ef;padding:24px 32px;border-top:1px solid #e3e1da;font-size:11.5px;color:#6b6b66;line-height:1.55;">
        <p style="margin:0 0 8px;">
          <strong style="color:#0b0d10;">Andrii Andriushchenko</strong> · Licensed Dealing Representative<br>
          NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer)<br>
          Лицензирован в Alberta · British Columbia · Ontario
        </p>
        <p style="margin:0 0 8px;font-size:11px;">
          ⚠️ <em>Информация в этом письме — образовательные материалы, не персональная инвестиционная рекомендация. Не гарантирую никакой доходности. Для конкретного решения необходим KYC + Suitability Assessment.</em>
        </p>
        <p style="margin:0;font-size:11px;">
          📞 <a href="tel:+14033972553" style="color:#6b6b66;">+1-403-397-2553</a> · ✉️ <a href="mailto:andrii@sky-fort.ca" style="color:#6b6b66;">andrii@sky-fort.ca</a> · 🌐 <a href="https://sky-fort.ca" style="color:#6b6b66;">sky-fort.ca</a>
        </p>
        <p style="margin:12px 0 0;font-size:10.5px;color:#9a9890;">
          Ты получил это письмо потому что подписался на sky-fort.ca. Проверить меня в реестре: <a href="https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx" style="color:#9a9890;">info.securities-administrators.ca</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
```

---

# 🇨🇦 EN Template

**Template name**: `SkyFort Welcome — EN`

**Subject**: `Your TFSA guide — as promised 👇`

**Preview text**: `8 common newcomer TFSA mistakes + the 20-year plan. No spam, unsubscribe anytime.`

**HTML body** (copy це у "code editor"):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your TFSA guide</title>
</head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0b0d10;line-height:1.55;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f4ef;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e3e1da;">

      <tr><td style="background:#2D73E3;padding:24px 32px;color:#ffffff;">
        <div style="font-size:22px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;">SkyFort</div>
        <div style="font-size:12px;opacity:0.85;margin-top:4px;letter-spacing:0.04em;">Canadian finance for newcomers</div>
      </td></tr>

      <tr><td style="padding:32px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#0b0d10;line-height:1.25;">
          Hi{% if params.FIRSTNAME %}, {{ params.FIRSTNAME }}{% endif %} 👋
        </h1>
        <p style="margin:0 0 16px;font-size:16px;color:#2a2e35;">
          Thanks for subscribing — your TFSA guide is below. This is educational content, not personal advice.
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
          <tr><td style="background:#0b0d10;border-radius:10px;">
            <a href="https://sky-fort.ca/en/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026?utm_source=brevo&utm_medium=email&utm_campaign=welcome_en"
               style="display:inline-block;padding:14px 24px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">
              📖 Open the full TFSA guide →
            </a>
          </td></tr>
        </table>

        <p style="margin:0 0 12px;font-size:14px;color:#6b6b66;">
          Inside the guide:
        </p>
        <ul style="margin:0 0 20px;padding-left:20px;font-size:15px;color:#2a2e35;">
          <li style="margin-bottom:8px;">How much <strong>TFSA contribution room</strong> you have as a newcomer (confuses 80% of people)</li>
          <li style="margin-bottom:8px;">5 typical mistakes — from bank mutual funds with 2% MER to over-contribution penalties</li>
          <li style="margin-bottom:8px;">A 20-year strategy: from bank → self-directed → exempt market once you're an Eligible Investor</li>
          <li>What you actually have after 20 years at $500/mo — spoiler: ~$320,000</li>
        </ul>

        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>

        <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#0b0d10;">What's next?</h2>
        <p style="margin:0 0 12px;font-size:15px;color:#2a2e35;">
          If you want a personal review of <em>your</em> situation — book a free 30-min discovery call. No pressure, just your numbers.
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:16px 0;">
          <tr><td style="background:#2D73E3;border-radius:10px;">
            <a href="https://calendly.com/andriushchenko-partners/new-meeting?utm_source=brevo&utm_medium=email&utm_campaign=welcome_en"
               style="display:inline-block;padding:12px 22px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;border-radius:10px;">
              📅 Book a discovery call
            </a>
          </td></tr>
        </table>

        <div style="height:1px;background:#e3e1da;margin:24px 0;"></div>
        <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b6b66;">Also useful:</h3>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/en/blog/rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ RRSP vs TFSA: which one in your first 5 years</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/en/blog/fhsa-40k-na-pershu-kvartiru-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ FHSA: $40,000 toward a first home in Canada</a></p>
        <p style="margin:0 0 6px;font-size:14px;"><a href="https://sky-fort.ca/en/blog/pershyi-rik-v-kanadi-finansovyi-cheklist" style="color:#2D73E3;text-decoration:none;">→ Your first year in Canada: a financial checklist</a></p>
        <p style="margin:0;font-size:14px;"><a href="https://sky-fort.ca/en/blog/yak-pereviryty-finansovogo-radnyka-v-kanadi" style="color:#2D73E3;text-decoration:none;">→ How to verify a financial advisor</a></p>
      </td></tr>

      <tr><td style="background:#f5f4ef;padding:24px 32px;border-top:1px solid #e3e1da;font-size:11.5px;color:#6b6b66;line-height:1.55;">
        <p style="margin:0 0 8px;">
          <strong style="color:#0b0d10;">Andrii Andriushchenko</strong> · Licensed Dealing Representative<br>
          NRD #4575551 · Axcess Capital Advisors Inc. (Exempt Market Dealer)<br>
          Licensed in Alberta · British Columbia · Ontario
        </p>
        <p style="margin:0 0 8px;font-size:11px;">
          ⚠️ <em>Information in this email is educational only — not personal investment advice. No returns are guaranteed. Specific recommendations require KYC + Suitability Assessment.</em>
        </p>
        <p style="margin:0;font-size:11px;">
          📞 <a href="tel:+14033972553" style="color:#6b6b66;">+1-403-397-2553</a> · ✉️ <a href="mailto:andrii@sky-fort.ca" style="color:#6b6b66;">andrii@sky-fort.ca</a> · 🌐 <a href="https://sky-fort.ca" style="color:#6b6b66;">sky-fort.ca</a>
        </p>
        <p style="margin:12px 0 0;font-size:10.5px;color:#9a9890;">
          You received this email because you subscribed at sky-fort.ca. Verify me in the registry: <a href="https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx" style="color:#9a9890;">info.securities-administrators.ca</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
```

---

## 🧪 Як протестувати (опц., після створення templates)

Замість того щоб реально підписувати когось на сайті — Brevo має вбудоване тестування:

1. Brevo → Templates → відкрий template
2. Зверху справа кнопка **Send a test**
3. Введи свій email
4. У полі **params** введи (JSON):
   ```json
   {"FIRSTNAME": "Andrii", "LOCALE": "uk"}
   ```
5. **Send**
6. Перевір свою пошту через ~30 сек

---

## ❓ FAQ

### Чому 3 templates, а не 1 з conditional?
Brevo підтримує conditional (`{% if params.LOCALE == 'uk' %}...{% endif %}`), але:
- HTML стає величезним і важко редагувати
- Якщо хочеш потім поміняти текст для UK — треба не зломати RU/EN
- 3 templates простіше підтримувати

### Якщо я не зроблю BREVO_WELCOME_TPLID_UK — що?
Якщо є `BREVO_WELCOME_TPLID` (без суфіксу) — код use його як fallback для всіх локалей. Тобто можеш створити **1 template** і відмовитись від мульти-мовної персоналізації — старий код продовжить працювати.

### Чи можна змінити Subject після створення?
Так. Brevo → Templates → клік на template → Settings → змінюй Subject → Save. Зміни застосовуються одразу для нових email-ів.

### Чи відправляються email-и одразу при підписці?
Так — `sendWelcomeEmail` викликається у fire-and-forget режимі одразу після успішного sync з Brevo (рядок 201-204 у `app/api/email-subscribe/route.js`).

### Чи можна подивитись доставку?
Brevo → ліве меню **Transactional → Email Activity** → бачиш всі надіслані email-и, delivery status, opens, clicks.

---

**EOF — 3 templates готові до paste**
