# Architecture

## Layers

```
Presentation   src/app/           Routes, layouts, thin handlers
Actions        src/actions/       Server Actions (validate → auth → service)
Services       src/services/      Business rules and orchestration
Repositories   src/repositories/  Data access only
Infrastructure src/lib/           Supabase clients, Drizzle, utilities
```

## Data flow

1. User interacts with a route or Server Action.
2. Input is validated with Zod (`src/schemas/`).
3. Session is resolved via Supabase server client.
4. Service layer applies business rules.
5. Repository executes Drizzle queries against Postgres.
6. RLS enforces row-level access even if application code has a bug.

## Supabase clients

| Client | File | Use |
|--------|------|-----|
| Browser | `lib/supabase/client.ts` | Auth UI only |
| Server | `lib/supabase/server.ts` | Session-scoped server reads/writes |
| Admin | `lib/supabase/admin.ts` | Webhooks/cron only; bypasses RLS |

The admin module imports `server-only` to prevent accidental client bundling.

## Route groups

- `(marketing)` — public, no auth required
- `(auth)` — sign-in flows and OAuth callback
- `(app)` — authenticated experiences

## Migrations

SQL migrations in `supabase/migrations/` are the source of truth. Drizzle schema in `src/lib/db/schema.ts` should stay aligned with migrations.
