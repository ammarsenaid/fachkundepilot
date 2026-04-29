#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const REQUIRED = ['DIRECTUS_URL', 'DIRECTUS_ADMIN_EMAIL', 'DIRECTUS_ADMIN_PASSWORD'];

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

async function request(baseUrl, token, method, endpoint, body) {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch {}

  if (!res.ok) throw new Error(`${method} ${endpoint} failed ${res.status}: ${text}`);
  return json;
}

async function login(baseUrl) {
  const json = await request(baseUrl, null, 'POST', '/auth/login', {
    email: env('DIRECTUS_ADMIN_EMAIL'),
    password: env('DIRECTUS_ADMIN_PASSWORD')
  });
  return json.data.access_token;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(path.resolve(process.cwd(), file), 'utf8'));
}

async function createItem(baseUrl, token, collection, item) {
  try {
    await request(baseUrl, token, 'POST', `/items/${collection}`, item);
    console.log(`created ${collection}: ${item.id ?? item.code ?? item.page_key ?? item.category_key ?? item.lesson_key ?? item.faq_key ?? item.plan_key ?? 'item'}`);
  } catch (e) {
    if (String(e.message).includes('RECORD_NOT_UNIQUE') || String(e.message).includes('duplicate')) {
      console.log(`exists/skipped ${collection}`);
      return;
    }
    throw e;
  }
}

async function importArray(baseUrl, token, collection, rows = []) {
  for (const row of rows) await createItem(baseUrl, token, collection, row);
}

async function main() {
  for (const x of REQUIRED) env(x);

  const baseUrl = env('DIRECTUS_URL').replace(/\/$/, '');
  const token = await login(baseUrl);

  const languages = await readJson('directus/seed/languages.json');
  const categories = await readJson('directus/seed/categories.json');
  const pages = await readJson('directus/seed/public_pages.json');
  const sections = await readJson('directus/seed/homepage_sections.json');
  const learning = await readJson('directus/seed/learning_content.json');
  const faqPricing = await readJson('directus/seed/faq_and_pricing.json');

  await importArray(baseUrl, token, 'languages', Array.isArray(languages) ? languages : (languages.languages ?? []));
  await importArray(baseUrl, token, 'categories', categories.categories ?? []);
  await importArray(baseUrl, token, 'category_translations', categories.category_translations ?? []);

  await importArray(baseUrl, token, 'pages', pages.pages ?? []);
  await importArray(baseUrl, token, 'page_translations', pages.page_translations ?? []);

  await importArray(baseUrl, token, 'page_sections', sections.page_sections ?? []);
  await importArray(baseUrl, token, 'section_translations', sections.section_translations ?? []);

  for (const [collection, rows] of Object.entries(learning)) {
    await importArray(baseUrl, token, collection, rows);
  }

  for (const [collection, rows] of Object.entries(faqPricing)) {
    await importArray(baseUrl, token, collection, rows);
  }

  console.log('\nSeed import completed.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
