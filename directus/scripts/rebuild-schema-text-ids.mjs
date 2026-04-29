#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const base = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const email = process.env.DIRECTUS_ADMIN_EMAIL;
const password = process.env.DIRECTUS_ADMIN_PASSWORD;

if (!base || !email || !password) {
  console.error('Missing DIRECTUS_URL, DIRECTUS_ADMIN_EMAIL, or DIRECTUS_ADMIN_PASSWORD');
  process.exit(1);
}

async function req(method, endpoint, token, body) {
  const res = await fetch(`${base}${endpoint}`, {
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

async function login() {
  const json = await req('POST', '/auth/login', null, { email, password });
  return json.data.access_token;
}

const idField = {
  field: 'id',
  type: 'string',
  schema: {
    name: 'id',
    is_primary_key: true,
    is_nullable: false,
    has_auto_increment: false,
    max_length: 255
  },
  meta: {
    interface: 'input',
    readonly: false,
    hidden: false,
    required: true
  }
};

function field(field, type, extra = {}) {
  return {
    field,
    type,
    schema: {
      is_nullable: true,
      ...extra.schema
    },
    meta: extra.meta || {}
  };
}

function baseFields(collection) {
  const list = [
    field('status', 'string', { schema: { is_nullable: false, default_value: 'draft' } }),
    field('created_at', 'timestamp'),
    field('updated_at', 'timestamp')
  ];

  if (!['site_settings', 'learning_progress'].includes(collection)) {
    list.push(field('sort_order', 'integer', { schema: { default_value: 0 } }));
  }

  if (collection.endsWith('_translations')) {
    list.push(
      field('is_published', 'boolean', { schema: { is_nullable: false, default_value: false } }),
      field('is_complete', 'boolean', { schema: { is_nullable: false, default_value: false } })
    );
  }

  return list;
}

const custom = {
  languages: [
    field('code', 'string', { schema: { is_nullable: false } }),
    field('name', 'string', { schema: { is_nullable: false } }),
    field('native_name', 'string'),
    field('direction', 'string', { schema: { default_value: 'ltr' } }),
    field('is_default', 'boolean', { schema: { default_value: false } }),
    field('is_active', 'boolean', { schema: { default_value: true } })
  ],
  pages: [
    field('page_key', 'string', { schema: { is_nullable: false } }),
    field('internal_name', 'string')
  ],
  page_translations: [
    field('page_id', 'string'),
    field('language_id', 'string'),
    field('slug', 'string', { schema: { is_nullable: false } }),
    field('title', 'string', { schema: { is_nullable: false } }),
    field('seo_title', 'string'),
    field('seo_description', 'text'),
    field('og_title', 'string'),
    field('og_description', 'text'),
    field('content_summary', 'text')
  ],
  page_sections: [
    field('page_id', 'string'),
    field('section_key', 'string', { schema: { is_nullable: false } }),
    field('section_type', 'string', { schema: { is_nullable: false } }),
    field('is_visible', 'boolean', { schema: { default_value: true } })
  ],
  section_translations: [
    field('section_id', 'string'),
    field('language_id', 'string'),
    field('heading', 'string'),
    field('subheading', 'string'),
    field('body', 'text'),
    field('button_text', 'string'),
    field('button_url', 'string'),
    field('image_alt', 'string'),
    field('content_json', 'json')
  ],
  categories: [
    field('category_key', 'string', { schema: { is_nullable: false } }),
    field('icon', 'string'),
    field('color', 'string')
  ],
  category_translations: [
    field('category_id', 'string'),
    field('language_id', 'string'),
    field('name', 'string', { schema: { is_nullable: false } }),
    field('description', 'text'),
    field('slug', 'string')
  ],
  lessons: [
    field('category_id', 'string'),
    field('lesson_key', 'string', { schema: { is_nullable: false } }),
    field('difficulty', 'string'),
    field('estimated_minutes', 'integer')
  ],
  lesson_translations: [
    field('lesson_id', 'string'),
    field('language_id', 'string'),
    field('title', 'string', { schema: { is_nullable: false } }),
    field('slug', 'string'),
    field('summary', 'text'),
    field('body', 'text')
  ],
  pdf_documents: [
    field('category_id', 'string'),
    field('file', 'uuid'),
    field('language_id', 'string')
  ],
  pdf_document_translations: [
    field('pdf_document_id', 'string'),
    field('language_id', 'string'),
    field('title', 'string'),
    field('description', 'text')
  ],
  flashcards: [
    field('category_id', 'string'),
    field('difficulty', 'string')
  ],
  flashcard_translations: [
    field('flashcard_id', 'string'),
    field('language_id', 'string'),
    field('front_text', 'text'),
    field('back_text', 'text'),
    field('explanation', 'text')
  ],
  questions: [
    field('category_id', 'string'),
    field('question_type', 'string'),
    field('difficulty', 'string'),
    field('points', 'integer')
  ],
  question_translations: [
    field('question_id', 'string'),
    field('language_id', 'string'),
    field('question_text', 'text'),
    field('explanation', 'text')
  ],
  question_options: [
    field('question_id', 'string'),
    field('is_correct', 'boolean', { schema: { default_value: false } })
  ],
  question_option_translations: [
    field('question_option_id', 'string'),
    field('language_id', 'string'),
    field('option_text', 'text')
  ],
  calculation_tasks: [
    field('category_id', 'string'),
    field('difficulty', 'string'),
    field('points', 'integer')
  ],
  calculation_task_translations: [
    field('calculation_task_id', 'string'),
    field('language_id', 'string'),
    field('task_text', 'text'),
    field('given_values', 'json'),
    field('correct_result', 'string'),
    field('formula', 'string'),
    field('step_by_step_solution', 'text'),
    field('common_mistake', 'text')
  ],
  vocabulary_items: [
    field('category_id', 'string'),
    field('german_term', 'string')
  ],
  vocabulary_translations: [
    field('vocabulary_item_id', 'string'),
    field('language_id', 'string'),
    field('simple_explanation', 'text'),
    field('translated_term', 'string'),
    field('example_sentence', 'text')
  ],
  faq_items: [
    field('faq_key', 'string')
  ],
  faq_translations: [
    field('faq_item_id', 'string'),
    field('language_id', 'string'),
    field('question', 'text'),
    field('answer', 'text')
  ],
  pricing_plans: [
    field('plan_key', 'string'),
    field('price_monthly', 'decimal'),
    field('price_yearly', 'decimal'),
    field('currency', 'string'),
    field('is_featured', 'boolean', { schema: { default_value: false } })
  ],
  pricing_plan_translations: [
    field('pricing_plan_id', 'string'),
    field('language_id', 'string'),
    field('name', 'string'),
    field('description', 'text'),
    field('features_json', 'json'),
    field('cta_text', 'string')
  ],
  site_settings: [
    field('key', 'string'),
    field('value', 'text'),
    field('value_json', 'json'),
    field('description', 'text')
  ],
  student_profiles: [
    field('directus_user_id', 'uuid'),
    field('preferred_language_id', 'string'),
    field('learning_mode', 'string', { schema: { default_value: 'side_by_side' } })
  ],
  learning_progress: [
    field('student_id', 'string'),
    field('content_type', 'string'),
    field('content_id', 'string'),
    field('score', 'integer'),
    field('last_seen_at', 'timestamp'),
    field('completed_at', 'timestamp')
  ]
};

function parseRef(ref) {
  const [collection, field] = ref.split('.');
  return { collection, field };
}

async function main() {
  const token = await login();
  const plan = JSON.parse(await fs.readFile(path.resolve('directus/schema/schema-plan.json'), 'utf8'));

  const existing = await req('GET', '/collections', token);
  const existingSet = new Set((existing.data || []).map(c => c.collection));

  for (const collection of plan.collections) {
    if (existingSet.has(collection)) {
      console.log(`exists collection: ${collection}`);
      continue;
    }

    const fields = [idField, ...baseFields(collection), ...(custom[collection] || [])];

    await req('POST', '/collections', token, {
      collection,
      meta: { icon: 'folder', note: 'Bootstrapped with text primary key IDs' },
      schema: { name: collection },
      fields
    });

    console.log(`created collection: ${collection}`);
  }

  const rels = await req('GET', '/relations', token);
  const relSet = new Set((rels.data || []).map(r => `${r.collection}.${r.field}->${r.related_collection}`));

  for (const rel of plan.relations) {
    if (rel.type !== 'many_to_one') continue;
    if (rel.from.includes('directus_user_id')) continue;

    const from = parseRef(rel.from);
    const to = parseRef(rel.to);
    const key = `${from.collection}.${from.field}->${to.collection}`;

    if (relSet.has(key)) {
      console.log(`exists relation: ${key}`);
      continue;
    }

    await req('POST', '/relations', token, {
      collection: from.collection,
      field: from.field,
      related_collection: to.collection,
      schema: { on_delete: 'SET NULL' }
    });

    console.log(`created relation: ${key}`);
  }

  console.log('Schema rebuilt with text IDs.');
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
