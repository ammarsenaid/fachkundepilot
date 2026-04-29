# Deployment & Operations Plan

## Runtime Topology
Docker Compose services:
- `web` (Next.js App Router)
- `directus` (Content Studio CMS)
- `postgres` (database)
- `caddy` (reverse proxy + TLS)

All services run on isolated internal network `app_net`.

## Domains
Production target:
- `fachkundepilot.de` -> Next.js
- `cms.fachkundepilot.de` -> Directus

Local development:
- `localhost`
- `cms.localhost`

## Compose Hardening Baseline
- Only Caddy exposes host ports (`80`, `443`).
- Directus and Postgres stay internal on Docker network.
- Health checks enabled for Postgres and Directus.
- Persistent volumes for DB/uploads/Caddy state.

## Environment Files
- `.env.example` (global compose)
- `apps/web/.env.example` (web runtime)
- `directus/.env.example` (Directus + DB credentials)

Rules:
- Never commit real `.env` files.
- Replace all placeholder secrets in non-local environments.

## Local Development Workflow
1. Copy templates:
   - `cp .env.example .env`
   - `cp apps/web/.env.example apps/web/.env`
   - `cp directus/.env.example directus/.env`
2. Set strong credentials in `directus/.env`.
3. Start:
   - `docker compose up -d`
4. Verify status:
   - `docker compose ps`
   - `docker compose logs -f directus`
   - `docker compose logs -f web`
5. Stop:
   - `docker compose down`

## Backup Commands (Examples)
### PostgreSQL dump
```bash
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup_postgres.sql
```

### Directus uploads archive
```bash
docker run --rm -v fachkundepilot_directus_uploads:/data -v "$PWD":/backup alpine \
  sh -c 'cd /data && tar -czf /backup/backup_directus_uploads.tar.gz .'
```

### Environment backup (encrypted or private storage only)
```bash
tar -czf backup_env_files.tar.gz .env apps/web/.env directus/.env
```

## Restore Process (Examples)
1. Stop stack: `docker compose down`
2. Restore DB:
```bash
docker compose up -d postgres
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < backup_postgres.sql
```
3. Restore uploads:
```bash
docker run --rm -v fachkundepilot_directus_uploads:/data -v "$PWD":/backup alpine \
  sh -c 'cd /data && tar -xzf /backup/backup_directus_uploads.tar.gz'
```
4. Re-start full stack: `docker compose up -d`
5. Smoke test web + CMS.

## Update Process
1. Create backups first.
2. Pull latest code/images.
3. Recreate containers:
```bash
docker compose pull
docker compose up -d --remove-orphans
```
4. Validate health/logs.
5. Roll back from backup if needed.

## Production Checklist
- [ ] Strong Directus admin credentials
- [ ] HTTPS active on both domains
- [ ] Only Caddy exposed publicly
- [ ] Secrets not in Git
- [ ] Backup + restore tested
- [ ] Public permissions audited

## Storage Upgrade Path
Current: Directus local storage volume.
Future: S3/MinIO external object storage.
