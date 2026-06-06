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

## Future tables (suggested)

- `watchlists` — user-owned symbol lists
- `watchlist_items` — symbols per watchlist
- `fundamental_snapshots` — cached metrics per symbol/date

Always include `user_id` or ownership FK and index it for RLS performance.
