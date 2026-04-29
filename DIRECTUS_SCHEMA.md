# Directus Schema Plan (Content Studio)

## Purpose
Define reproducible Directus collections, fields, relations, roles, and permission rules for FachkundePilot.

## Reproducibility Strategy (Phase 3)
Schema artifacts now live in `/directus/schema`:
- `README.md`
- `schema-plan.json`
- `permissions-matrix.md`
- `apply-schema.md`

Because full automatic creation requires a running Directus instance and authenticated admin access, this phase delivers deterministic artifacts + runbook that can be applied in the next execution step when services are running.

Planned next automation options:
1. Directus schema snapshot/apply workflow.
2. API bootstrap script posting to `/collections`, `/fields`, `/relations`, `/permissions`.

## Core Modeling Rule
- Do **not** use hardcoded language fields (`*_de`, `*_en`, `*_ar`).
- Use base entity + translation entity pattern.

## Collections and Fields (Planned)
All requested collections are planned exactly:
1. languages
2. pages
3. page_translations
4. page_sections
5. section_translations
6. categories
7. category_translations
8. lessons
9. lesson_translations
10. pdf_documents
11. pdf_document_translations
12. flashcards
13. flashcard_translations
14. questions
15. question_translations
16. question_options
17. question_option_translations
18. calculation_tasks
19. calculation_task_translations
20. vocabulary_items
21. vocabulary_translations
22. faq_items
23. faq_translations
24. pricing_plans
25. pricing_plan_translations
26. site_settings
27. student_profiles
28. learning_progress

## Relationship Blueprint
- `*_translations` tables: many-to-one to base entity and many-to-one to `languages`.
- `pages` -> `page_sections`: one-to-many.
- `categories` -> lessons/pdf_documents/flashcards/questions/calculation_tasks/vocabulary_items: one-to-many.
- `questions` -> `question_options`: one-to-many.
- `student_profiles` -> `learning_progress`: one-to-many.

Canonical relation list is maintained in `directus/schema/schema-plan.json`.

## Publication Rules
Public website data must satisfy:
- Translation record `is_published = true`
- Translation record `is_complete = true`
- Base entity `status = published` (where applicable)

Missing/unpublished translations:
- Not exposed on public URLs.
- Not indexed.
- Visible in Content Studio for internal workflow.

## Roles (Planned)
1. **Administrator**: full access.
2. **Content Manager**: manage core content and publishing.
3. **Translator**: translation-focused edit rights only.
4. **Student**: read published learning content + update own progress.
5. **Public**: read-only access to published/complete public content.

Detailed matrix is maintained in `directus/schema/permissions-matrix.md`.

## Permission Principles
- Directus admin always authenticated.
- Public role cannot read drafts/incomplete translations.
- Student role constrained to own progress records.
- No privileged tokens in client-side code.

## Status Workflow (Planned)
- Draft -> Ready -> Published (implemented via `status`, `is_published`, `is_complete`).
- Publishing checks ensure completeness before indexability.
