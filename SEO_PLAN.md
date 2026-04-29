# SEO & Multilingual Plan

## SEO Rendering Strategy
- Next.js App Router with React Server Components by default.
- Public pages rendered server-side with revalidation.
- Avoid client-only rendering for primary SEO content.

## URL Strategy
Language-prefixed routes:
- `/de/...`
- `/en/...`
- `/ar/...`
- extendable for `/tr`, `/fa`, `/ru`, `/uk`.

Only publish URLs where translation is complete + published.

## Metadata Strategy (Implemented baseline)
Public route metadata is generated per page key:
- Title
- Description
- Canonical URL
- Open Graph title/description/url
- Hreflang alternates between supported language routes

## Hreflang Strategy
- Generated via `alternates.languages` in route metadata.
- Includes current supported language variants for the same page key.
- If translation slug is unavailable in a target language, fallback route logic points to language homepage.

## Sitemap & Robots (Implemented baseline)
- `apps/web/src/app/sitemap.ts`: emits language-prefixed public URLs.
- `apps/web/src/app/robots.ts`: allows public paths, disallows `/api/` and `/admin`, exposes sitemap URL.

## Structured Data
- JSON-LD WebPage placeholder is rendered on public pages.
- To be expanded with Organization/FAQ/Breadcrumb entities later where relevant.

## Canonical Rules
- Self-canonical per language page.
- Avoid canonical collisions across language variants.

## Caching / Revalidation Plan
- Public route template: `revalidate = 300`.
- Directus fetch helper uses `next.revalidate` with env override:
  - `DIRECTUS_REVALIDATE_SECONDS` (default `300`).
- This avoids full rebuilds on normal content updates.

## Technical SEO Notes
- One clear H1 in page template.
- Semantic structure using `<main>` and `<article>`.
- Real anchor links for navigation.
- Legal pages remain placeholders and must be legally reviewed before launch.
