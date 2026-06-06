---
name: add-feature
description: Scaffolds a new feature with route, service, repository, schema, and tests. Use when adding a new page, domain feature, or user-facing capability to Stock Fundamentals.
---

# Add feature

## Checklist

- [ ] Define Zod schema in `src/schemas/`
- [ ] Add repository methods in `src/repositories/`
- [ ] Add service logic in `src/services/`
- [ ] Expose via Server Action in `src/actions/` or route in `src/app/`
- [ ] Add UI under `src/app/(app)/` or `src/components/features/`
- [ ] Add SQL migration + RLS in `supabase/migrations/` if schema changes
- [ ] Add unit tests in `tests/unit/`
- [ ] Update `docs/data-model.md` if tables change

## Layer order

1. Schema (validation)
2. Migration + Drizzle schema alignment
3. Repository (queries)
4. Service (business rules)
5. Action or route (thin)
6. UI component/page

## Naming

- Services: `{domain}-service.ts`
- Repositories: `{domain}-repository.ts`
- Actions: `{domain}-actions.ts`
