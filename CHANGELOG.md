# Changelog

## Codex PR connectivity test

- Test commit to verify Codex PR creation flow.

## 2026-04-29 — Phase 15 completed

### Testing / Validation
- Attempted `npm run lint` (failed: `next` binary unavailable because dependencies not installed).
- Attempted `npm install` (failed: npm registry access policy returned HTTP 403).
- Attempted `npm run typecheck` and `npm run build` (failed due missing dependencies/tooling).
- Attempted `docker compose config` (failed: Docker CLI not available in environment).
- Performed source-level verification for:
  - multilingual routes
  - canonical/hreflang/OG metadata wiring
  - sitemap/robots presence
  - server-only Directus token boundary
  - fallback/unavailable rendering behavior

### Changed
- Removed generated artifact: `apps/web/tsconfig.tsbuildinfo`.
- `CURRENT_STEP.md` updated to Phase 15 completed with explicit known limitations.
- `PROJECT_ROADMAP.md` updated to mark Phase 15 completed.

### Notes
- No new features added in this phase.
- Remaining blockers are environment/tooling availability, not roadmap scope.

## 2026-04-29 — Phase 14 completed

### Changed
- `docker-compose.yml` reviewed and improved with explicit internal network usage across services.
- `infra/caddy/Caddyfile` reviewed and improved with baseline security headers.
- `.env.example` and `apps/web/.env.example` cleaned and clarified.
- `DEPLOYMENT.md` expanded with concrete backup/restore/update command examples and production checklist.
- `SECURITY_PLAN.md` expanded with Directus permissions/API exposure documentation and security defaults.
- `CURRENT_STEP.md` updated to Phase 14 completed and Phase 15 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 14 completed.

### Notes
- No app feature additions were made in this phase.
- No stack/auth/payment changes beyond security/deployment polish.
- Phase 15 was not started.

## 2026-04-29 — Phase 13 completed

### Added
- Route loading/error states:
  - `apps/web/src/app/[lang]/[[...slug]]/loading.tsx`
  - `apps/web/src/app/[lang]/[[...slug]]/error.tsx`
  - `apps/web/src/app/[lang]/student/loading.tsx`
  - `apps/web/src/app/[lang]/student/error.tsx`

### Changed
- `apps/web/src/components/public/header.tsx` now includes mobile hamburger behavior.
- `apps/web/src/components/student/mobile-nav.tsx` now uses a mobile drawer/toggle pattern.
- `apps/web/src/app/[lang]/student/lessons/page.tsx` now demonstrates stacked mobile side-by-side lesson view.
- `apps/web/src/app/[lang]/student/statistics/page.tsx` now includes an explicit empty-state placeholder.
- `CURRENT_STEP.md` updated to Phase 13 completed and Phase 14 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 13 completed.

### Notes
- No new major features added.
- No auth/payment/stack changes introduced.
- Phase 14 not started.

## 2026-04-29 — Phase 12 completed

### Added
- `apps/web/src/app/admin/page.tsx`

### Changed
- `CURRENT_STEP.md` updated to Phase 12 completed and Phase 13 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 12 completed.

### Notes
- `/admin` is a bridge page only.
- Directus admin is not duplicated in Next.js.
- No auth logic changes or custom CRUD were added.

## 2026-04-29 — Phase 11 completed

### Added
- `apps/web/src/components/auth/login-form.tsx`
- `apps/web/src/components/auth/register-form.tsx`
- `apps/web/src/lib/auth/config.ts`

### Changed
- `apps/web/src/app/[lang]/[[...slug]]/page.tsx` now renders login/register placeholder forms on corresponding page keys.
- `CURRENT_STEP.md` updated to Phase 11 completed and Phase 12 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 11 completed.

### Notes
- Student auth remains placeholder/prepared only.
- No protected routes enforced yet.
- No payment or advanced auth logic added.

## 2026-04-29 — Phase 10 completed

### Changed
- `apps/web/src/lib/directus/types.ts` expanded with page section and section translation types.
- `apps/web/src/lib/directus/fallback-data.ts` expanded with fallback page sections, section translations, and student content stats.
- `apps/web/src/lib/directus/content.ts` expanded with:
  - language/page resolution helpers
  - slug-based page translation resolution
  - published/complete section translation queries
  - student content stats helper with fallback
- `apps/web/src/app/[lang]/[[...slug]]/page.tsx` now renders public content from Directus/fallback helpers and dynamic sections.
- `apps/web/src/app/[lang]/student/dashboard/page.tsx` now uses server-side content stats helper.
- `CURRENT_STEP.md` updated to Phase 10 completed and Phase 11 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 10 completed.

### Notes
- Public draft/incomplete translations are filtered out.
- Missing translations now show safe unavailable state or fallback content.
- No auth/payment/mock scoring implementation added.

## 2026-04-29 — Phase 9 completed

### Added
- Student layout and navigation:
  - `apps/web/src/app/[lang]/student/layout.tsx`
  - `apps/web/src/components/student/sidebar.tsx`
  - `apps/web/src/components/student/mobile-nav.tsx`
- Learning mode toggle client component:
  - `apps/web/src/components/student/learning-mode-toggle.tsx`
- Student route pages:
  - `dashboard`, `modules`, `lessons`, `pdf-library`, `flashcards`, `questions`,
    `calculation-tasks`, `vocabulary`, `mock-exam`, `statistics`, `settings`
- Student nav config:
  - `apps/web/src/lib/student/nav.ts`

### Changed
- `CURRENT_STEP.md` updated to Phase 9 completed and Phase 10 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 9 completed.

### Notes
- Auth, progress tracking, and scoring remain placeholders in MVP scope.
- No Directus content rendering integration started yet (Phase 10).

## 2026-04-29 — Phase 8 completed

### Added
- `apps/web/src/components/public/language-switcher.tsx`

### Changed
- `apps/web/src/components/public/header.tsx` now uses the dedicated language switcher component.
- `apps/web/src/lib/public/content.ts` now includes:
  - `getPageContent` helper with fallback behavior
  - `buildLocalizedPath` helper
  - partial EN/AR placeholder support with German fallback
- `apps/web/src/lib/public/seo.ts` now uses translated content helper fallback.
- `apps/web/src/app/[lang]/[[...slug]]/page.tsx` now uses translated content helper fallback.
- `CURRENT_STEP.md` updated to Phase 8 completed and Phase 9 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 8 completed.

### Notes
- Public pages remain server-rendered; client component is used only for language switcher interactivity and persistence.
- Student area was not started in this phase.

## 2026-04-29 — Phase 7 completed

### Added
- `apps/web/src/lib/public/seo.ts`
- `apps/web/src/app/sitemap.ts`
- `apps/web/src/app/robots.ts`

### Changed
- `apps/web/src/app/[lang]/[[...slug]]/page.tsx` now generates metadata, canonical, hreflang, OG, and JSON-LD placeholder.
- `apps/web/src/lib/directus/client.ts` now uses revalidation strategy (`DIRECTUS_REVALIDATE_SECONDS`, default 300).
- `SEO_PLAN.md` updated with implemented SEO baseline.
- `CURRENT_STEP.md` updated to Phase 7 completed and Phase 8 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 7 completed.

### Notes
- Public pages remain server-rendered with one-H1 template.
- Student area not started in this phase.

## 2026-04-28 — Phase 6 completed


### Correction (Phase 6 language switcher)
- Updated language switcher to preserve current page key when switching languages.
- Example behavior: `/de/pruefung-erklaert` -> `/en/exam-explained` and `/ar/sharh-al-imtihan`.
- If a slug is missing for a target language, switcher falls back to that language homepage.
### Added
- `apps/web/src/lib/public/i18n.ts`
- `apps/web/src/lib/public/content.ts`
- `apps/web/src/components/public/header.tsx`
- `apps/web/src/components/public/footer.tsx`
- `apps/web/src/app/[lang]/[[...slug]]/page.tsx`

### Changed
- `apps/web/src/app/page.tsx` now redirects to `/de`.
- `CURRENT_STEP.md` updated to Phase 6 completed and Phase 7 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 6 completed.

### Notes
- Pages use original placeholder content and server-rendered route handling.
- No advanced SEO implementation added yet (reserved for Phase 7).

## 2026-04-28 — Phase 5 completed

### Added
- `apps/web/src/lib/directus/types.ts`
- `apps/web/src/lib/directus/client.ts`
- `apps/web/src/lib/directus/content.ts`
- `apps/web/src/lib/directus/fallback-data.ts`
- `apps/web/src/lib/directus/index.ts`

### Changed
- `apps/web/.env.example` updated with server-side `DIRECTUS_URL` and optional `DIRECTUS_STATIC_TOKEN` placeholders.
- `CURRENT_STEP.md` updated to Phase 5 completed and Phase 6 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 5 completed.

### Notes
- Directus client is server-side only (`server-only`), with no browser token exposure.
- No public pages were built in this phase.

## 2026-04-28 — Phase 4 completed


### Correction (Phase 4 seed enhancement)
- Added minimal English and Arabic translations for:
  - 2 lessons
  - 2 flashcards
  - 2 questions (+ options)
  - 1 calculation task
- Updated `directus/seed/README.md` to reflect multilingual seed coverage for side-by-side mode demo.
### Added
- `/directus/seed/README.md`
- `/directus/seed/languages.json`
- `/directus/seed/categories.json`
- `/directus/seed/public_pages.json`
- `/directus/seed/homepage_sections.json`
- `/directus/seed/learning_content.json`
- `/directus/seed/faq_and_pricing.json`

### Changed
- `CURRENT_STEP.md` updated to Phase 4 completed and Phase 5 next.
- `PROJECT_ROADMAP.md` updated to mark Phase 4 completed.

### Notes
- Seed data is intentionally small starter content and not a system limitation.
- No frontend pages or Directus API client were implemented in this phase.

## 2026-04-28 — Phase 3 completed

### Added
- `/directus/schema` reproducibility artifacts:
  - `directus/schema/README.md`
  - `directus/schema/schema-plan.json`
  - `directus/schema/permissions-matrix.md`
  - `directus/schema/apply-schema.md`

### Changed
- `DIRECTUS_SCHEMA.md` updated to reference schema artifacts and reproducibility approach.
- `CURRENT_STEP.md` updated to Phase 3 completed and Phase 4 next.
- `SECURITY_PLAN.md` updated with explicit Phase 3 permission-model references.

### Notes
- No seed data added in this phase.
- No frontend pages implemented in this phase.

## 2026-04-28 — Phase 2 completed

### Added
- `docker-compose.yml` with services:
  - `web` (Next.js)
  - `postgres` (PostgreSQL)
  - `directus` (Directus CMS)
  - `caddy` (reverse proxy)
- `infra/caddy/Caddyfile` with host-based reverse proxy routes.
- Environment template files with safe placeholders:
  - `.env.example`
  - `apps/web/.env.example`
  - `directus/.env.example`

### Changed
- `DEPLOYMENT.md` expanded with practical local Docker Compose workflow and service details.
- `SECURITY_PLAN.md` updated with Phase 2 infra-safe defaults and secret-handling notes.
- `PROJECT_ROADMAP.md` updated to mark Phase 2 as completed.
- `CURRENT_STEP.md` moved to Phase 2 completed and Phase 3 next.

### Notes
- No Directus schema setup or seed data was started in this phase.
- No public page feature implementation was started in this phase.

## 2026-04-28 — Phase 1 completed

### Added
- Root monorepo workspace `package.json`
- `apps/web` Next.js App Router TypeScript foundation files:
  - `apps/web/package.json`
  - `apps/web/tsconfig.json`
  - `apps/web/next-env.d.ts`
  - `apps/web/next.config.ts`
  - `apps/web/eslint.config.mjs`
  - `apps/web/postcss.config.mjs`
  - `apps/web/src/app/layout.tsx`
  - `apps/web/src/app/page.tsx`
  - `apps/web/src/app/globals.css`
  - `apps/web/src/lib/utils.ts`
  - `apps/web/src/components/ui/button.tsx`
  - `apps/web/src/components/layout/site-header.tsx`
- Root `.gitignore`
- `packages/ui/.gitkeep` placeholder package folder

### Notes
- Phase 1 completed without starting Docker, Directus, database, or schema setup.
- RSC-first baseline preserved: pages/components are server components unless explicitly marked otherwise.

## 2026-04-28 — Phase 0 completed

### Added
- `PROJECT_ROADMAP.md`
- `CURRENT_STEP.md`
- `CHANGELOG.md`
- `DIRECTUS_SCHEMA.md`
- `DEPLOYMENT.md`
- `SEO_PLAN.md`
- `SECURITY_PLAN.md`

### Notes
- This phase intentionally includes planning and documentation only.
- No feature implementation or runtime stack bootstrap was started.
