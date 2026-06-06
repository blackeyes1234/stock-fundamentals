# Security

## Secrets

- `NEXT_PUBLIC_*` — safe for browser bundles
- `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` — server-only, never commit

Audit every PR for `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE` (should be zero matches).

## Row Level Security

- Enable RLS on all public tables.
- Default deny; add explicit policies per operation.
- Test policies: user A must not read user B's rows.

## Auth

- Resolve sessions server-side in Server Actions and route handlers.
- Do not trust client-only auth checks for protected data.
- OAuth redirect URL: `/auth/callback`

## Input validation

Validate all external input with Zod before database or service calls.

## Headers

Security headers are configured in `next.config.ts` (frame denial, nosniff, referrer policy).

## Dependencies

Run `npm audit` periodically. CI should fail on critical vulnerabilities when policy is added.
