# Deployment

## Recommended host

Vercel for Next.js; Supabase for database and auth.

## Environment variables

Set in the hosting provider (never commit):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

## Migrations

Apply before or during deploy:

```bash
npx supabase db push
```

Or run SQL migrations via Supabase CLI linked to production.

## Health check

`GET /api/health` returns JSON status for uptime monitoring.

## Pre-deploy checklist

- [ ] Migrations applied
- [ ] RLS enabled on new tables
- [ ] Env vars set in production
- [ ] OAuth redirect URLs include production domain
- [ ] CI green on main
