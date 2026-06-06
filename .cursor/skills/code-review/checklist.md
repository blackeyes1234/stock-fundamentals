# Code review checklist

- [ ] Minimal, focused diff
- [ ] Zod validation on external input
- [ ] Auth enforced server-side
- [ ] No secrets or `NEXT_PUBLIC_` misuse
- [ ] Admin client not in user-facing paths
- [ ] RLS on new/changed tables
- [ ] Tests for behavior changes
- [ ] Docs updated if env or architecture changed
- [ ] lint, typecheck, test, build pass
