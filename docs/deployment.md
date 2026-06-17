# Deployment

## Production URLs

| Service | URL |
|---------|-----|
| **Vercel app** | https://stock-fundamentals.vercel.app |
| **Supabase prod** | `rltnukulvnoujpuxphwh` (stock-fundamentals) |
| **Supabase local dev** | `yhijrbtkjguzeexetycy` (blackeyes1234's Project) |
| **Health check** | https://stock-fundamentals.vercel.app/api/health |

GitHub repo: https://github.com/blackeyes1234/stock-fundamentals  
Vercel project: `garvinho-3094s-projects/stock-fundamentals` (auto-deploys on push to `main`)

---

## Environment split

| Environment | Supabase project | Config |
|-------------|------------------|--------|
| **Local dev** | `yhijrbtkjguzeexetycy` (blackeyes1234's Project) | [`.env.local`](.env.local) |
| **Production (Vercel)** | `rltnukulvnoujpuxphwh` (stock-fundamentals) | Vercel → Settings → Environment Variables |

Each environment uses its own `profiles`, `watchlists`, and `watchlist_items` tables on the matching Supabase project.

---

## Vercel environment variables (Production)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rltnukulvnoujpuxphwh.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | stock-fundamentals → API Keys |
| `SUPABASE_SERVICE_ROLE_KEY` | stock-fundamentals → API Keys (secret) |
| `DATABASE_URL` | stock-fundamentals → Connect → **Transaction pooler** (port **6543**, `aws-1-ca-central-1`) |

---

## Local environment (`.env.local`)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yhijrbtkjguzeexetycy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | blackeyes1234's Project → API Keys |
| `SUPABASE_SERVICE_ROLE_KEY` | blackeyes1234's Project → API Keys |
| `DATABASE_URL` | blackeyes → pooler port **6543** (`aws-1-us-east-1`) |

Restart `npm run dev` after changing `.env.local`.

---

## Supabase Auth URL configuration

### Local — `yhijrbtkjguzeexetycy`

| Setting | Value |
|---------|-------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

Reference: [`supabase/config.local.toml`](supabase/config.local.toml)

### Production — `rltnukulvnoujpuxphwh`

| Setting | Value |
|---------|-------|
| Site URL | `https://stock-fundamentals.vercel.app` |
| Redirect URLs | `https://stock-fundamentals.vercel.app/auth/callback` |

Reference: [`supabase/config.prod.toml`](supabase/config.prod.toml)

Apply via dashboard or:

```powershell
# Local auth URLs → blackeyes
supabase link --project-ref yhijrbtkjguzeexetycy
# copy auth section from config.local.toml into config.toml, then:
supabase config push --yes

# Prod auth URLs → stock-fundamentals
supabase link --project-ref rltnukulvnoujpuxphwh
# copy auth section from config.prod.toml into config.toml, then:
supabase config push --yes
```

---

## Google Sign-In

Use **separate** OAuth clients per Supabase project. See [google-oauth-setup.md](./google-oauth-setup.md).

---

## Migrations

```powershell
supabase link --project-ref yhijrbtkjguzeexetycy
supabase db push

supabase link --project-ref rltnukulvnoujpuxphwh
supabase db push

# Default CLI link for local work:
supabase link --project-ref yhijrbtkjguzeexetycy
```

---

## Deploy workflow

1. Push to `main` on GitHub → Vercel auto-deploys
2. Or: `npx vercel --prod` from repo root

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Local data appears in wrong Supabase | Check `.env.local` points to `yhijrbtkjguzeexetycy` |
| Prod data in wrong Supabase | Check Vercel env vars point to `rltnukulvnoujpuxphwh` |
| Google `redirect_uri_mismatch` | Use correct callback URI for that project's OAuth client |
| DB `ENOTFOUND` | Use pooler `DATABASE_URL` (port 6543), not `db.<ref>.supabase.co` |
