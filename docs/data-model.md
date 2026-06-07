# Data model

## profiles

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, references `auth.users` |
| email | text | Required |
| display_name | text | Optional |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

### RLS policies

- SELECT/UPDATE/INSERT: `auth.uid() = id`

### Bootstrap

A trigger on `auth.users` insert auto-creates a matching `profiles` row.

## watchlists

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, `gen_random_uuid()` |
| user_id | uuid | FK to `auth.users`, indexed |
| name | text | Unique per user |
| created_at | timestamptz | Default now() |

### RLS policies

- SELECT/INSERT/UPDATE/DELETE: `auth.uid() = user_id`

## watchlist_items

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, `gen_random_uuid()` |
| watchlist_id | uuid | FK to `watchlists`, indexed |
| symbol | text | Uppercase in app layer |
| created_at | timestamptz | Default now() |

### Constraints

- Unique `(watchlist_id, symbol)`

### RLS policies

- SELECT/INSERT/DELETE: allowed when parent watchlist belongs to `auth.uid()`

## Future tables (suggested)

- `fundamental_snapshots` — cached metrics per symbol/date

Always include `user_id` or ownership FK and index it for RLS performance.
