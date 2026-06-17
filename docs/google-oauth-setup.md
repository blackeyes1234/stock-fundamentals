# Google OAuth setup (separate clients per Supabase project)

Use **two** Web application OAuth clients so local and production do not interfere with task-manager.

## Local — blackeyes1234's Project (`yhijrbtkjguzeexetycy`)

1. Google Cloud Console → **Credentials** → Create OAuth 2.0 Client ID (Web application)
2. Name: e.g. `Stock Fundamentals Local`
3. **Authorized redirect URI:**
   ```
   https://yhijrbtkjguzeexetycy.supabase.co/auth/v1/callback
   ```
4. Supabase (`yhijrbtkjguzeexetycy`) → **Authentication** → **Providers** → **Google**
   - Enable Google
   - Paste this client's Client ID + Secret
   - Save

## Production — stock-fundamentals (`rltnukulvnoujpuxphwh`)

1. Create a **second** OAuth 2.0 Client ID (Web application)
2. Name: e.g. `Stock Fundamentals Production`
3. **Authorized redirect URI:**
   ```
   https://rltnukulvnoujpuxphwh.supabase.co/auth/v1/callback
   ```
4. Supabase (`rltnukulvnoujpuxphwh`) → **Authentication** → **Providers** → **Google**
   - Enable Google
   - Paste this client's Client ID + Secret
   - Save

## Do not mix clients

| Supabase project | Google client | App redirect (in Supabase URL config, not Google) |
|------------------|---------------|---------------------------------------------------|
| `yhijrbtkjguzeexetycy` | Local client | `http://localhost:3000/auth/callback` |
| `rltnukulvnoujpuxphwh` | Production client | `https://stock-fundamentals.vercel.app/auth/callback` |

Task-manager can keep its existing Google client on blackeyes if it already uses a different OAuth client ID in Supabase.

## Testing mode

If either OAuth consent screen is in **Testing**, add your Gmail as a **Test user** on that client.
