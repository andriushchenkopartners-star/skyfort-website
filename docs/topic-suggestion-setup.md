# Topic suggestion form — налаштування

## Що це

Форма "Запропонуй тему наступної статті" — на сторінці `/uk/blog` і в кінці кожного блог-поста. Читачі можуть прислати ідею + опційно email щоб отримати notification коли стаття вийде.

## Що зроблено в коді (готово)

- ✅ API endpoint: `app/api/topic-request/route.js`
  - Anti-spam: honeypot field + rate limit (1/60 сек per IP)
  - IP-hash для anti-abuse (privacy-friendly)
- ✅ Component: `app/_components/TopicSuggestForm.jsx` (UK / RU / EN)
- ✅ Mounted на blog hub та кожному пості
- ✅ Локалізована UA / RU / EN
- ✅ Tracks GA event `topic_request_submit` (з source: blog_hub / blog_post:slug)
- ✅ Persistence: draft зберігається в localStorage поки не submit

## Що тобі зробити (1 крок, ~2 хв)

### Створи таблицю в Supabase

1. Supabase → SQL Editor → New query
2. Скопіюй увесь зміст з `docs/sql/topic_requests.sql`
3. Run → має написати "Success"

Все. API endpoint вже використовує `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (які вже додано в Vercel для consultation tool) — нічого додавати не треба.

## Як виглядає на сайті

- На `/uk/blog` (після списку статей): велика картка з полем "Що тобі цікаво розібрати"
- На кожному пості (після related): та сама картка
- При submit: показує зелений "Дякую!" блок

## Як ти бачиш заявки

### Через Supabase Table Editor
1. Supabase → Table Editor → `topic_requests`
2. Список усіх пропозицій з фільтрами

### Через SQL queries (Supabase → SQL Editor)

**Найновіші пропозиції:**
```sql
select topic, email, locale, source, created_at
from topic_requests
where status='new'
order by created_at desc
limit 20;
```

**Топ-теми (групуючи по схожих):**
```sql
select topic, count(*) as requests
from topic_requests
group by topic
order by requests desc
limit 20;
```

**По джерелах (з якої сторінки):**
```sql
select source, count(*) as total
from topic_requests
group by source
order by total desc;
```

**З UTM (з TikTok / Instagram / etc.):**
```sql
select utm_source, count(*) as total
from topic_requests
where utm_source is not null
group by utm_source
order by total desc;
```

## Workflow з пропозиціями

1. Раз на тиждень — переглянь `topic_requests` (топ-10 за `created_at desc`).
2. Цікаві → постав `status = 'planned'` (manually через Table Editor).
3. Коли пишеш статтю за пропозицією → у самій статті згадай "Стаття написана у відповідь на запитання @username" (так я зробив для taraskaperyz10).
4. Після публікації → постав `status = 'written'` + якщо є email → надішли notification (manually або через Brevo broadcast).

## Безпека

- ✅ Rate limit: 1 запит / 60 сек per IP-hash
- ✅ Honeypot field "website" (bots заповнюють — ми silently відкидаємо)
- ✅ Validation: topic 5-500 chars
- ✅ IP зберігається як SHA-256 hash (не raw IP — privacy)
- ✅ RLS на таблиці: тільки service_role може писати/читати (через наш endpoint)

## Тестування

### Локально:
```bash
npm run dev
```
Відкрий http://localhost:3000/uk/blog → внизу заповни форму → submit.

Перевір що з'явилось у Supabase Table Editor → `topic_requests`.

### На проді:
Те саме, але https://sky-fort.ca/uk/blog. Запис з'явиться навіть якщо env vars такі ж як для consultation (вони shared).
