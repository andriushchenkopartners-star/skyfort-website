# Як додати клієнтський testimonial у код

> Якщо ти отримав письмову згоду від клієнта на публікацію відгуку — ось як його додати на сайт. Це займає 5-10 хвилин і одразу йде на прод.

## ⚠️ Compliance — обов'язково перед додаванням

CSA NI 31-103 регулює testimonials у фінансовій індустрії. Перед тим як додавати:

| Перевірка | Чому |
|-----------|------|
| ✅ Письмова згода клієнта (email або PDF) | CSA вимагає документоване consent |
| ✅ Текст відгуку не містить return percentages | "Заробив 12%" — заборонено. "Allowed me to understand TFSA" — OK |
| ✅ Текст не містить guarantees | Ніяких "гарантованих" будь-чого |
| ✅ Не запропоновано compensation за відгук | CSA забороняє paid testimonials у моїй категорії |
| ✅ Текст substantively unchanged | Можна light edit для clarity (виправити друкарські), але не переписати |
| ✅ Файл згоди збережено локально (вне репо) | На випадок аудиту CSA — show on demand |

Якщо хоч одне ні — **не додавай**.

## Як додати

1. Відкрий файл `app/_data/testimonials.js`
2. У масиві `TESTIMONIALS = [...]` додай об'єкт за схемою:

```javascript
{
  id: "anna-k-2026-05",              // унікальний ключ (slug-style)
  authorName: "Anna K.",              // ім'я + ініціал прізвища АБО pseudonym
  authorCity: "Calgary, AB",          // опційно
  authorContext: "Newcomer 2022 · TFSA setup",  // опційно — short context
  text: "Andrii walked me through TFSA contribution room as a newcomer in 30 minutes. My bank advisor had given me three different answers in two meetings.",
  locale: "en",                       // 'uk' | 'ru' | 'en'
  rating: 5,                          // 1-5
  datePublished: "2026-05-15",        // ISO date
  consentRef: "consent-2026-05-15-anna-k.pdf",  // твоє внутрішнє посилання
},
```

3. Збережи, закомить:
   ```bash
   git add app/_data/testimonials.js
   git commit -m "feat: add testimonial from Anna K."
   git push
   ```

4. Vercel автоматично перебудує → за 2-3 хв відгук з'являється на homepage.

## Що відбувається на сайті

- **Якщо TESTIMONIALS = []** (порожньо): на homepage між FAQ і FinalCta показується **fallback з trust signals** (NRD, jurisdictions, мови). Review JSON-LD не додається.
- **Якщо TESTIMONIALS має ≥1 запис**: показується карусель/grid реальних відгуків + Review schema додається в HTML → Google може показувати ★★★★★ у пошуковій видачі.

## Локалізація

- Якщо клієнт дав відгук українською — `locale: "uk"`. На /uk/ він буде показаний.
- На /ru/ показуються ru, на /en/ — en. **Fallback**: якщо у твоїй мові нема відгуків, але є інші — показуються всі (sorted by date desc).
- Найкраща стратегія: зібрати **по 2-3 відгука на кожну мову** для розмаїття.

## Як попросити відгук у клієнта

Шаблон email (адаптуй):

```
Привіт [Ім'я]!

Якщо тобі підходить — буду вдячний за короткий відгук про наш discovery call.
Це 2-3 речення про твою ситуацію і що було корисно.

Якщо OK з публікацією на sky-fort.ca — даси згоду (просто "так, можна" в email
достатньо). Можу показати тебе як "[Ім'я] [Першa літера прізвища]"
або під псевдонімом — як хочеш.

⚠️ Пара compliance моментів:
- Не пиши конкретні цифри доходів які ти отримав через мене
- Не використовуй слова "гарантовано" або "обіцяє"
- Просто реальний experience consultation

Дякую!
```

Збережи їхню відповідь (yes-to-publish) як PDF або в окремому folder локально — це consent doc для аудиту.

## FAQ

### Чи можу я використати тільки ім'я (без прізвища)?
Так. Pseudonym дозволено за умови **consent клієнта**. Можна "Anna K." (first + initial) — це найчастіший підхід.

### Чи можна перекласти відгук на іншу мову?
Краще — ні. Якщо клієнт дав українською — публікуй українською. Якщо хочеш мати на трьох мовах — попроси клієнта дати на бажаній мові.

### Як видалити відгук пізніше?
Просто видали об'єкт з масиву `TESTIMONIALS` і commit. Заразом видали consent file локально якщо клієнт попросив withdraw.

### Що якщо клієнт хоче поскаржитись (negative review)?
Не публікуй. CSA правила вимагають substantively unchanged — selectively publishing only positive = misleading practice. Якщо є negative — обговорюй з клієнтом особисто, але на сайт **тільки** позитивні (з real consent).

### Скільки відгуків треба для AggregateRating schema?
Будь-яка кількість ≥1. Schema автоматично генерується. 5+ відгуків зі score 4.5+ — Google починає показувати stars у SERP.

### Чи можу видати свій відгук від родича?
Ні. CSA вимагає арм's length — відгук має бути від реального не-родинного клієнта.

---

**Файли пов'язані**:
- `app/_data/testimonials.js` — дані
- `app/_sections/Testimonials.jsx` — render
- `app/[locale]/page.js` — mount on homepage between FAQ і FinalCta
