# Testing strategy

## Pyramid

| Layer | Location | When |
|-------|----------|------|
| Unit | `tests/unit/` | Schemas, pure services, utilities |
| Integration | `tests/integration/` | DB + RLS (local Supabase) |
| E2E | `tests/e2e/` | Critical user flows (add Playwright later) |

## Required coverage

- New Zod schemas → unit tests for valid/invalid cases
- Business logic in services → unit tests with mocked repositories
- Auth/RLS-sensitive features → integration tests
- Critical flows (login, dashboard, stock detail) → e2e when UI stabilizes

## Commands

```bash
npm test              # run once
npm run test:watch    # watch mode
```

## CI

GitHub Actions runs lint, typecheck, test, and build on every PR.
