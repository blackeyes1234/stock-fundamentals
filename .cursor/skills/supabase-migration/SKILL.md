---
name: supabase-migration
description: Creates Supabase SQL migrations with RLS policies and keeps Drizzle schema aligned. Use when adding tables, columns, indexes, or RLS policies.
---

# Supabase migration

## Workflow

1. Write SQL migration in `supabase/migrations/YYYYMMDDHHMMSS_description.sql`
2. Enable RLS: `alter table public.{table} enable row level security;`
3. Add explicit policies for SELECT, INSERT, UPDATE, DELETE as needed
4. Update `src/lib/db/schema.ts` to match
5. Run `npm run db:generate` if using Drizzle-generated migrations too
6. Document table in `docs/data-model.md`

## RLS template

```sql
alter table public.example enable row level security;

create policy "Users read own rows"
  on public.example
  for select
  using (auth.uid() = user_id);
```

## Rules

- Default deny — no policy means no access
- Index foreign keys used in RLS (`user_id`, etc.)
- Never disable RLS on user-owned data

See [reference.md](reference.md) for naming conventions.
