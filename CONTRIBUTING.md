# Contributing

## Branch naming

- `feat/short-description` — new features
- `fix/short-description` — bug fixes
- `chore/short-description` — tooling, deps, docs

## Pull requests

1. Keep PRs focused and small when possible.
2. Run locally before opening:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

3. Include tests for behavior changes.
4. Update docs when architecture, env vars, or workflows change.

## Commits

Use concise messages focused on **why**:

```
feat(auth): add magic link sign-in flow
fix(stocks): validate symbol before repository lookup
```

## Code review checklist

See [docs/review-checklist.md](./docs/review-checklist.md).
