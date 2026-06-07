# Deployment

## Production URLs

| Service | URL |
|---------|-----|
| **Vercel app** | https://stock-fundamentals.vercel.app |
| **Supabase prod** | `yhijrbtkjguzeexetycy` (dashboard name: blackeyes1234's Project) |
| **Supabase dev** | `rltnukulvnoujpuxphwh` (stock-fundamentals) |
| **Health check** | https://stock-fundamentals.vercel.app/api/health |

GitHub repo: https://github.com/blackeyes1234/stock-fundamentals  
Vercel project: `garvinho-3094s-projects/stock-fundamentals` (auto-deploys on push to `main`)

---

## Environment split

| Environment | Supabase project | Config |
|-------------|------------------|--------|
| **Local dev** | `rltnukulvnoujpuxphwh` | `.env.local` |
| **Production (Vercel)** | `yhijrbtkjguzeexetycy` | Vercel → Settings → Environment Variables |

A third Supabase project could not be created (free tier limit: 2 active projects). Production uses the existing `yhijrbtkjguzeexetycy` project with migrations applied.

---

## Vercel environment variables (Production)

Set in Vercel → **stock-fundamentals** → **Settings** → **Environment Variables**:

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yhijrbtkjguzeexetycy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase prod → API Keys |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase prod → API Keys (secret) |
| `DATABASE_URL` | Supabase prod → Connect → **Transaction pooler** (port **6543**) |

Use the pooler host (`aws-1-us-east-1.pooler.supabase.com`), not `db.<ref>.supabase.co`.

---

## Supabase production auth URLs

In **production Supabase** (`yhijrbtkjguzeexetycy`) → **Authentication** → **URL Configuration**:

| Setting | Value |
|---------|-------|
| **Site URL** | `https://stock-fundamentals.vercel.app` |
| **Redirect URLs** | `https://stock-fundamentals.vercel.app/auth/callback` |

(Applied via `supabase config push` during initial deploy.)

---

## Google Sign-In (production)

### Google Cloud Console

Add this **Authorized redirect URI** (keep dev URI if you still use the dev Supabase project):

```
https://yhijrbtkjguzeexetycy.supabase.co/auth/v1/callback
```

### Supabase production

**Authentication** → **Providers** → **Google** → enable and paste the same Client ID + Secret used for dev.

---

## Migrations

Apply to production:

```powershell
supabase link --project-ref yhijrbtkjguzeexetycy
supabase db push
supabase link --project-ref rltnukulvnoujpuxphwh   # switch back to dev
```

---

## Deploy workflow

1. Push to `main` on GitHub → Vercel builds and deploys automatically.
2. Or manual deploy: `npx vercel --prod` from the repo root (requires Vercel CLI login).

---

## Pre-deploy checklist

- [ ] Migrations applied to prod Supabase
- [ ] All 4 env vars set in Vercel Production
- [ ] Supabase prod Site URL + Redirect URLs include Vercel domain
- [ ] Google redirect URI includes prod Supabase callback
- [ ] Google provider enabled on prod Supabase
- [ ] `GET /api/health` returns `{"status":"ok"}`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Google `redirect_uri_mismatch` | Add `https://yhijrbtkjguzeexetycy.supabase.co/auth/v1/callback` in Google |
| DB errors on Vercel | Use transaction pooler `DATABASE_URL` (port 6543) |
| Auth redirect loop | Confirm Vercel `/auth/callback` is in Supabase Redirect URLs |
| Build fails | Check Vercel build logs; ensure env vars exist for Production |
