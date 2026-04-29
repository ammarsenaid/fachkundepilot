# Security Plan

## Security Objectives
- Protect CMS/admin access.
- Protect secrets and infrastructure.
- Expose only published public data.
- Prevent draft leakage.

## Authentication & Access
- Directus authentication required for admin/content roles.
- Directus admin remains in Directus (no duplicated admin CRUD in Next.js).
- Student auth remains MVP placeholder until dedicated auth phase.

## Roles & Permission Model
Planned roles:
- Administrator
- Content Manager
- Translator
- Student
- Public

Rules:
- Public: published + complete content only.
- Student: own progress records only.
- Admin/content roles: authenticated and least privilege.

## Directus Permissions Documentation
Reference:
- `directus/schema/permissions-matrix.md`
- `directus/schema/schema-plan.json`
- `directus/schema/apply-schema.md`

## API Exposure Documentation
- Server-side Directus helper only for privileged fetches.
- `DIRECTUS_STATIC_TOKEN` remains server-side env only.
- Client/browser code must never contain admin/private tokens.
- Public-facing APIs return only published/complete content.

## Infrastructure Defaults
- Caddy is the only public ingress.
- Directus and Postgres are internal on Docker network.
- Security headers configured at Caddy level.
- Health checks enabled for key services.

## Secrets Management
- Keep secrets only in environment variables.
- Never commit tokens/passwords/keys.
- Replace placeholders before staging/production.

## Backup & Recovery Security
- Backups before updates.
- Encrypt or securely store backup artifacts.
- Restrict backup access.
- Test restore procedures regularly.

## Production Security Checklist
- [ ] Strong admin credentials + rotation policy
- [ ] HTTPS enforced at Caddy
- [ ] No secrets committed
- [ ] Public role permission filters verified
- [ ] Draft/incomplete content not publicly exposed
- [ ] Backup/restore drill documented and tested
