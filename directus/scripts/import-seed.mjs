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

  if (!res.ok) {
    const error = new Error(`${method} ${endpoint} failed ${res.status}: ${text}`);
    error.status = res.status;
    error.responseText = text;
    throw error;
  }

  return json;
}

async function login(baseUrl) {
  const json = await request(baseUrl, null, 'POST', '/auth/login', {
    email: env('DIRECTUS_ADMIN_EMAIL'),
    password: env('DIRECTUS_ADMIN_PASSWORD')
  });

  const token = json?.data?.access_token;
  if (!token) throw new Error('No Directus access token returned');
  return token;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(path.resolve(process.cwd(), file), 'utf8'));
}

async function upsertItem(baseUrl, token, collection, item) {
  const label =
    item.id ??
    item.code ??
    item.page_key ??
    item.category_key ??
    item.lesson_key ??
    item.faq_key ??
    item.plan_key ??
    'item';

  if (item.id) {
    try {
      await request(baseUrl, token, 'PATCH', `/items/${collection}/${encodeURIComponent(item.id)}`, item);
      console.log(`updated ${collection}: ${label}`);
      return;
    } catch (error) {
      if (error.status !== 404) throw error;
    }
  }

  try {
    await request(baseUrl, token, 'POST', `/items/${collection}`, item);
    console.log(`created ${collection}: ${label}`);
  } catch (error) {
    if (
      item.id &&
      (String(error.message).includes('RECORD_NOT_UNIQUE') ||
        String(error.message).includes('duplicate'))
    ) {
      await request(baseUrl, token, 'PATCH', `/items/${collection}/${encodeURIComponent(item.id)}`, item);
      console.log(`updated ${collection}: ${label}`);
      return;
    }

    throw error;
  }
}

async function importArray(baseUrl, token, collection, rows = []) {
  for (const row of rows) {
    await upsertItem(baseUrl, token, collection, row);
  }
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

  console.log('\nSeed upsert completed.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
