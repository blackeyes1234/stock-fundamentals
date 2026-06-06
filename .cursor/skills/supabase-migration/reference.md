# Migration reference

## File naming

`YYYYMMDDHHMMSS_short_description.sql`

Example: `20250606120000_add_watchlists.sql`

## Policy naming

- `"Users can read own {resource}"`
- `"Users can insert own {resource}"`
- `"Users can update own {resource}"`
- `"Users can delete own {resource}"`

## Ownership column

Prefer `user_id uuid not null references auth.users (id)` on user-owned tables.

## Apply locally

```bash
npx supabase db push
```

## Apply via Drizzle (schema sync)

```bash
npm run db:push
```

Use one source of truth. This project treats `supabase/migrations/` as canonical for RLS SQL.
