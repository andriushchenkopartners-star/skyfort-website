#!/usr/bin/env node
// scripts/create-brevo-templates.mjs
// Creates 3 welcome email templates in Brevo (UK / RU / EN) via the API.
// Reads HTML bodies from docs/brevo-welcome-templates.md (3 ```html blocks
// in order: UK, RU, EN). Uses BREVO_API_KEY from .env.local.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// ─── load env ────────────────────────────────────────────────────────────
function loadEnvLocal() {
  const file = path.join(ROOT, '.env.local');
  if (!fs.existsSync(file)) return;
  const txt = fs.readFileSync(file, 'utf8');
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvLocal();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error('❌ BREVO_API_KEY missing in .env.local');
  process.exit(1);
}

// ─── extract 3 HTML bodies from docs/brevo-welcome-templates.md ──────────
const md = fs.readFileSync(
  path.join(ROOT, 'docs', 'brevo-welcome-templates.md'),
  'utf8'
);
const htmlBlocks = [...md.matchAll(/```html\n([\s\S]*?)\n```/g)].map((m) => m[1]);
if (htmlBlocks.length < 3) {
  console.error(
    `❌ Expected at least 3 \`\`\`html blocks in brevo-welcome-templates.md, found ${htmlBlocks.length}`
  );
  process.exit(1);
}

// ─── template metadata (UK / RU / EN — matches block order in the .md) ───
const TEMPLATES = [
  {
    locale: 'uk',
    name: 'SkyFort Welcome — UK',
    subject: 'Твій гайд TFSA — як обіцяно 👇',
    preview:
      '8 типових помилок українців з TFSA + 20-річний план. Без спаму, можеш відписатись будь-коли.',
    html: htmlBlocks[0],
  },
  {
    locale: 'ru',
    name: 'SkyFort Welcome — RU',
    subject: 'Твой гайд TFSA — как обещали 👇',
    preview:
      '8 типичных ошибок русскоязычных с TFSA + 20-летний план. Без спама, можешь отписаться в любой момент.',
    html: htmlBlocks[1],
  },
  {
    locale: 'en',
    name: 'SkyFort Welcome — EN',
    subject: 'Your TFSA guide — as promised 👇',
    preview:
      '8 common newcomer TFSA mistakes + the 20-year plan. No spam, unsubscribe anytime.',
    html: htmlBlocks[2],
  },
];

const SENDER = { email: 'andrii@sky-fort.ca', name: 'Andrii · SkyFort' };

// ─── helper: list existing templates so we can skip duplicates ───────────
async function listExisting() {
  const all = [];
  let offset = 0;
  while (true) {
    const res = await fetch(
      `https://api.brevo.com/v3/smtp/templates?limit=50&offset=${offset}`,
      {
        headers: { 'api-key': BREVO_API_KEY, Accept: 'application/json' },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`List templates failed: ${res.status} ${text}`);
    }
    const j = await res.json();
    const items = j.templates || [];
    all.push(...items);
    if (items.length < 50) break;
    offset += 50;
  }
  return all;
}

// ─── create one template ─────────────────────────────────────────────────
async function createTemplate(tpl) {
  const body = {
    templateName: tpl.name,
    subject: tpl.subject,
    htmlContent: tpl.html,
    sender: SENDER,
    isActive: true,
    tag: `welcome-${tpl.locale}`,
    replyTo: 'andrii@sky-fort.ca',
  };
  const res = await fetch('https://api.brevo.com/v3/smtp/templates', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create ${tpl.name} failed: ${res.status} ${text}`);
  }
  const j = await res.json();
  return j.id;
}

// ─── main ────────────────────────────────────────────────────────────────
(async () => {
  console.log('🔍 Listing existing Brevo templates to avoid duplicates…');
  const existing = await listExisting();
  const byName = new Map(existing.map((t) => [t.name, t.id]));
  console.log(`   Found ${existing.length} existing templates.`);
  console.log('');

  const results = [];
  for (const tpl of TEMPLATES) {
    const dup = byName.get(tpl.name);
    if (dup) {
      console.log(`⏭️  ${tpl.name} already exists → ID ${dup} (skipping create)`);
      results.push({ locale: tpl.locale, id: dup, reused: true });
      continue;
    }
    process.stdout.write(`⬆️  Creating "${tpl.name}"… `);
    const id = await createTemplate(tpl);
    console.log(`✅ ID ${id}`);
    results.push({ locale: tpl.locale, id, reused: false });
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✅ DONE — paste these into Vercel env vars:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  for (const r of results) {
    const key = `BREVO_WELCOME_TPLID_${r.locale.toUpperCase()}`;
    console.log(`  ${key}=${r.id}`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
})().catch((err) => {
  console.error('');
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
