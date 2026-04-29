#!/usr/bin/env node

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
    throw new Error(`${method} ${endpoint} failed ${res.status}: ${text}`);
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

async function existingFields(baseUrl, token, collection) {
  const json = await request(baseUrl, token, 'GET', `/fields/${collection}`);
  return new Set((json.data || []).map((f) => f.field));
}

function f(field, type, schema = {}) {
  return {
    field,
    type,
    schema: {
      is_nullable: true,
      ...schema
    }
  };
}

const FIELD_PLAN = {
  languages: [
    f('code', 'string', { is_nullable: false }),
    f('name', 'string', { is_nullable: false }),
    f('native_name', 'string'),
    f('direction', 'string', { default_value: 'ltr' }),
    f('is_default', 'boolean', { default_value: false }),
    f('is_active', 'boolean', { default_value: true })
  ],

  pages: [
    f('page_key', 'string', { is_nullable: false }),
    f('internal_name', 'string')
  ],

  page_translations: [
    f('slug', 'string', { is_nullable: false }),
    f('title', 'string', { is_nullable: false }),
    f('seo_title', 'string'),
    f('seo_description', 'text'),
    f('og_title', 'string'),
    f('og_description', 'text'),
    f('content_summary', 'text')
  ],

  page_sections: [
    f('section_key', 'string', { is_nullable: false }),
    f('section_type', 'string', { is_nullable: false }),
    f('is_visible', 'boolean', { default_value: true })
  ],

  section_translations: [
    f('heading', 'string'),
    f('subheading', 'string'),
    f('body', 'text'),
    f('button_text', 'string'),
    f('button_url', 'string'),
    f('image_alt', 'string'),
    f('content_json', 'json')
  ],

  categories: [
    f('category_key', 'string', { is_nullable: false }),
    f('icon', 'string'),
    f('color', 'string')
  ],

  category_translations: [
    f('name', 'string', { is_nullable: false }),
    f('description', 'text'),
    f('slug', 'string')
  ],

  lessons: [
    f('lesson_key', 'string', { is_nullable: false }),
    f('difficulty', 'string'),
    f('estimated_minutes', 'integer')
  ],

  lesson_translations: [
    f('title', 'string', { is_nullable: false }),
    f('slug', 'string'),
    f('summary', 'text'),
    f('body', 'text')
  ],

  pdf_documents: [
    f('file', 'uuid'),
    f('language_id', 'integer')
  ],

  pdf_document_translations: [
    f('title', 'string'),
    f('description', 'text')
  ],

  flashcards: [
    f('difficulty', 'string')
  ],

  flashcard_translations: [
    f('front_text', 'text'),
    f('back_text', 'text'),
    f('explanation', 'text')
  ],

  questions: [
    f('question_type', 'string'),
    f('difficulty', 'string'),
    f('points', 'integer')
  ],

  question_translations: [
    f('question_text', 'text'),
    f('explanation', 'text')
  ],

  question_options: [
    f('is_correct', 'boolean', { default_value: false })
  ],

  question_option_translations: [
    f('option_text', 'text')
  ],

  calculation_tasks: [
    f('difficulty', 'string'),
    f('points', 'integer')
  ],

  calculation_task_translations: [
    f('task_text', 'text'),
    f('given_values', 'json'),
    f('correct_result', 'string'),
    f('formula', 'string'),
    f('step_by_step_solution', 'text'),
    f('common_mistake', 'text')
  ],

  vocabulary_items: [
    f('german_term', 'string')
  ],

  vocabulary_translations: [
    f('simple_explanation', 'text'),
    f('translated_term', 'string'),
    f('example_sentence', 'text')
  ],

  faq_items: [
    f('faq_key', 'string')
  ],

  faq_translations: [
    f('question', 'text'),
    f('answer', 'text')
  ],

  pricing_plans: [
    f('plan_key', 'string'),
    f('price_monthly', 'decimal'),
    f('price_yearly', 'decimal'),
    f('currency', 'string'),
    f('is_featured', 'boolean', { default_value: false })
  ],

  pricing_plan_translations: [
    f('name', 'string'),
    f('description', 'text'),
    f('features_json', 'json'),
    f('cta_text', 'string')
  ],

  site_settings: [
    f('key', 'string'),
    f('value', 'text'),
    f('value_json', 'json'),
    f('description', 'text')
  ],

  student_profiles: [
    f('directus_user_id', 'uuid'),
    f('preferred_language_id', 'integer'),
    f('learning_mode', 'string', { default_value: 'side_by_side' })
  ],

  learning_progress: [
    f('student_id', 'integer'),
    f('content_type', 'string'),
    f('content_id', 'string'),
    f('score', 'integer'),
    f('last_seen_at', 'timestamp'),
    f('completed_at', 'timestamp')
  ]
};

async function main() {
  for (const name of REQUIRED) env(name);

  const baseUrl = env('DIRECTUS_URL').replace(/\/$/, '');
  const token = await login(baseUrl);

  for (const [collection, fields] of Object.entries(FIELD_PLAN)) {
    console.log(`\nCollection: ${collection}`);
    const existing = await existingFields(baseUrl, token, collection);

    for (const field of fields) {
      if (existing.has(field.field)) {
        console.log(`exists: ${collection}.${field.field}`);
        continue;
      }

      await request(baseUrl, token, 'POST', `/fields/${collection}`, field);
      console.log(`created: ${collection}.${field.field}`);
    }
  }

  console.log('\nField bootstrap completed.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
