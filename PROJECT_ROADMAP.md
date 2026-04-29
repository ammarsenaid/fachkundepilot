# FachkundePilot Project Roadmap

## Vision
Build a professional, multilingual learning platform for the German Taxi- und Mietwagen Fachkundeprüfung with a CMS-first architecture, SEO-first public frontend, and scalable self-hosted deployment.

Slogan: **„Verstehen in deiner Sprache. Bestehen auf Deutsch.“**

Disclaimer: **„Die offizielle Prüfung findet auf Deutsch statt. Übersetzungen dienen nur dem besseren Verständnis.“**

## Guardrails
- Deliver a professional MVP without overengineering.
- Use agreed stack only unless blocked.
- Keep Directus as Content Studio for admin/content workflows.
- Keep public pages SEO-friendly and server-rendered through Next.js App Router.
- Do not implement unapproved major features.

## Phase Plan

### Phase 0 — Project planning files
Create foundational planning/memory docs:
- PROJECT_ROADMAP.md
- CURRENT_STEP.md
- CHANGELOG.md
- DIRECTUS_SCHEMA.md
- DEPLOYMENT.md
- SEO_PLAN.md
- SECURITY_PLAN.md

### Phase 1 — Monorepo and project foundation
- Initialize Next.js App Router (TypeScript, Tailwind).
- Set RSC default architecture.
- Add shadcn/ui, Framer Motion, lucide-react.
- Establish base design tokens, layout shell, reusable components.

### Phase 2 — Docker Compose foundation ✅ Completed (2026-04-28)
- Created `docker-compose.yml` stack: web, Directus, PostgreSQL, Caddy.
- Added persistent volumes and env examples.
- Documented local startup workflow.

### Phase 3 — Directus schema setup ✅ Completed (2026-04-28)
- Added reproducibility artifacts under `/directus/schema`.
- Documented collections/relations/roles/permissions with deterministic apply runbook.
- Defined next automation path for snapshot/apply or API bootstrap when Directus is running.

### Phase 4 — Seed data ✅ Completed (2026-04-28)
- Added original placeholder seed JSON files under `/directus/seed`.
- Seeded languages, categories, pages, homepage sections, lessons, flashcards, questions, calculation task, FAQ, and pricing starter records.
- Preserved extensibility for additional languages and categories.

### Phase 5 — Directus API client in Next.js ✅ Completed (2026-04-28)
- Added server-only typed Directus client utilities in Next.js.
- Added language/page/page_translation fetch helpers with fallback data behavior.
- Kept privileged token usage server-side via environment variables.

### Phase 6 — Public website skeleton ✅ Completed (2026-04-28)
- Added language-prefixed public route skeleton for required pages (`/de`, `/en`, `/ar`).
- Added public header/footer, responsive structure, and language switcher links.
- Added legal placeholder notes and RTL basics for Arabic.

### Phase 7 — SEO and multilingual routing ✅ Completed (2026-04-29)
- Added page metadata generation with canonical URLs, hreflang, and Open Graph.
- Added `sitemap.ts` and `robots.ts` for public pages.
- Added JSON-LD placeholders and maintained one-H1 semantic page template.
- Added revalidation baseline for Directus/public route content.

### Phase 8 — Multilingual UI and RTL foundation ✅ Completed (2026-04-29)
- Refined language switcher behavior and added simple persistence.
- Kept German/English/Arabic support with RTL direction handling for Arabic.
- Added helper-based fallback behavior for missing translations.

### Phase 9 — Student learning area ✅ Completed (2026-04-29)
- Added student route skeleton and dashboard placeholder widgets.
- Added learning mode toggle with simple client persistence.
- Added responsive student navigation for desktop/mobile.

### Phase 10 — Directus-powered content rendering ✅ Completed (2026-04-29)
- Connected public/student pages to Directus helpers with server-side fetches.
- Enforced published + complete translation filtering for public content.
- Added dynamic page section rendering with safe fallback behavior.

### Phase 11 — Login/register foundation ✅ Completed (2026-04-29)
- Added localized login/register UI placeholders.
- Added prepared auth plan structure for future provider decision.
- Kept auth flow intentionally non-enforcing in MVP.

### Phase 12 — /admin bridge page ✅ Completed (2026-04-29)
- Added Next.js `/admin` bridge page to Directus Content Studio.
- Kept production-safe behavior and avoided sensitive data exposure.

### Phase 13 — Mobile and UX polish ✅ Completed (2026-04-29)
- Added mobile-friendly public and student navigation behavior.
- Improved side-by-side lesson placeholder stacking on mobile.
- Added loading, error, and empty-state placeholders.

### Phase 14 — Security, deployment, maintenance polish ✅ Completed (2026-04-29)
- Hardened compose/Caddy/env defaults and documentation.
- Finalized backup, restore, and update runbook examples.
- Consolidated security checklist and API/permissions documentation references.

### Phase 15 — Final testing and cleanup ✅ Completed (2026-04-29)
- Executed available validation checks and source-level audits for SEO/routing/security boundaries.
- Documented environment limitations affecting runtime/package checks.
- Cleaned local generated artifacts from repository state.

## Non-MVP (Document Only)
- Payments
- Advanced mock exam scoring
- AI features
- Native mobile apps
- Analytics (unless lightweight and explicitly approved)

## Definition of MVP Done
- Stack implemented as agreed.
- Content manageable in Directus Content Studio.
- Public frontend multilingual + SEO-safe.
- Student area baseline functional with MVP placeholders.
- Deployment and security runbooks documented and reproducible.
