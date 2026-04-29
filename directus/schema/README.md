# Directus Schema Reproducibility (Phase 3)

This folder contains reproducible schema artifacts for the FachkundePilot Content Studio.

## Artifacts
- `schema-plan.json`: machine-readable schema plan (collections, fields, relations, roles, permissions intent).
- `apply-schema.md`: step-by-step application runbook for a fresh Directus instance.
- `permissions-matrix.md`: role-by-role access matrix.

## Why this approach
Directus schema creation via API requires a running Directus instance with admin authentication.
In this phase we provide reproducible artifacts and deterministic application steps that can be executed later when services are running.

## Future automation
In a later step with running Directus, this folder can be extended with:
- Directus snapshot export (`directus schema snapshot`) and apply (`directus schema apply`), or
- API bootstrap scripts that POST collections/fields/permissions via `/collections`, `/fields`, `/relations`, `/permissions`.
