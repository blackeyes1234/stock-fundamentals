---
name: code-review
description: Reviews code for quality, security, and maintainability following Stock Fundamentals standards. Use when reviewing pull requests, examining code changes, or when the user asks for a code review.
---

# Code review

## Quick start

1. Check correctness and edge cases
2. Verify security (RLS, secrets, client boundaries)
3. Assess structure (layers respected)
4. Confirm tests and docs

## Severity

- **Critical** — must fix before merge (security, data loss, auth bypass)
- **Suggestion** — should improve (missing tests, unclear naming)
- **Nice to have** — optional polish

## Checklist

See [checklist.md](checklist.md) for the full pre-merge gate.

## Feedback format

```
Critical: Admin client imported in client component — move to Server Action.
Suggestion: Add unit test for invalid stock symbol input.
```
