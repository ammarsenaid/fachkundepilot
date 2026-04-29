# Apply Schema Runbook (Fresh Environment)

## Prerequisites
1. Phase 2 stack is running (`postgres` + `directus`).
2. Admin credentials are configured via `directus/.env`.
3. You can sign in to Directus Content Studio.

## Application order
1. Create collections in this sequence:
   - `languages`
   - base collections (`pages`, `page_sections`, `categories`, `lessons`, `pdf_documents`, `flashcards`, `questions`, `question_options`, `calculation_tasks`, `vocabulary_items`, `faq_items`, `pricing_plans`, `site_settings`, `student_profiles`, `learning_progress`)
   - all translation collections
2. Add fields per `DIRECTUS_SCHEMA.md`.
3. Add relations according to `schema-plan.json`.
4. Create roles: Administrator, Content Manager, Translator, Student, Public.
5. Apply permission filters from `permissions-matrix.md`.
6. Verify public role cannot access draft/incomplete rows.

## Reproducibility checkpoints
- Keep a dated record of final collection/field config export.
- Export a Directus schema snapshot once instance is running.
- Commit snapshot to `/directus/schema` in a later phase.

## Validation checklist
- [ ] All 28 collections exist
- [ ] Translation collections link to base + language
- [ ] Public role reads only published+complete content
- [ ] Student role scoped to own profile/progress
- [ ] Content Manager and Translator boundaries match matrix
