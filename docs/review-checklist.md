# Review checklist

## Correctness

- [ ] Logic handles null/empty/error cases
- [ ] Zod validation on all external input
- [ ] Auth checked server-side for protected routes

## Security

- [ ] No secrets in code or `NEXT_PUBLIC_*` misuse
- [ ] Admin client not imported from client components
- [ ] New tables have RLS policies
- [ ] No raw user input in SQL

## Quality

- [ ] Matches project structure and naming
- [ ] Minimal, focused diff
- [ ] Tests added/updated for behavior changes
- [ ] Docs updated if workflows or env vars changed

## CI

- [ ] lint, typecheck, test, build pass locally
