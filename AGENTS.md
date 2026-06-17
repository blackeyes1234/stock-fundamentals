# Agent guide — Stock Fundamentals

## Product

Web application for analyzing stock fundamentals. Users sign in with Google via Supabase Auth, manage multiple named watchlists, and inspect per-symbol metrics.

## Stack

- **Frontend:** Next.js App Router, React, Tailwind CSS
- **Backend:** Supabase (Postgres + Auth + RLS)
- **ORM:** Drizzle (server-only via `src/lib/db/`)
- **Validation:** Zod (`src/schemas/`)
- **Tests:** Vitest (`tests/unit/`)

## Where things live

| Path | Purpose |
|------|---------|
| `src/app/(marketing)/` | Public landing pages |
| `src/app/(auth)/` | Login, signup, OAuth callback |
| `src/app/(app)/` | Authenticated app routes (dashboard, watchlists, stocks) |
| `src/app/(app)/watchlists/` | Create watchlists and add/remove symbols |
| `src/app/api/` | Route handlers (health, webhooks) |
| `src/actions/` | Server Actions — validate, authorize, delegate |
| `src/services/` | Business logic and orchestration |
| `src/repositories/` | Database queries only |
| `src/lib/supabase/` | Browser, server, and admin clients |
| `supabase/migrations/` | SQL migrations + RLS (source of truth) |

## Supabase environments

| Environment | Project ref | Dashboard name |
|-------------|-------------|----------------|
| Local (`.env.local`) | `yhijrbtkjguzeexetycy` | blackeyes1234's Project |
| Production (Vercel) | `rltnukulvnoujpuxphwh` | stock-fundamentals |

See [docs/deployment.md](./docs/deployment.md) and [docs/google-oauth-setup.md](./docs/google-oauth-setup.md).

## Commands

```bash
npm run dev          # local dev server
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Vitest
npm run build        # production build
npm run db:generate  # Drizzle migration files
npm run db:push      # push schema
```

## Do

- Keep diffs minimal and match existing patterns.
- Use Server Actions or route handlers for data mutations.
- Validate inputs with Zod before database access.
- Enable RLS on every new table; default deny.
- Add unit tests for business logic and schemas.

## Don't

- Import `src/lib/supabase/admin.ts` from client components.
- Prefix secrets with `NEXT_PUBLIC_`.
- Query the database directly from React components.
- Change schema only in the Supabase dashboard — use migrations.

## Deeper docs

- [Architecture](./docs/architecture.md)
- [Security](./docs/security.md)
- [Testing strategy](./docs/testing-strategy.md)
- [Data model](./docs/data-model.md)
- [Deployment](./docs/deployment.md)

## Cursor rules

Project rules live in `.cursor/rules/*.mdc`. Follow them when editing matching files.
