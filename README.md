# Stock Fundamentals

Production-ready scaffold for a stock fundamentals web app using **Next.js App Router**, **Supabase**, **Drizzle ORM**, and **Cursor project rules**.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS)
- Supabase (Auth, Postgres, RLS)
- Drizzle ORM (server-only database access)
- Vitest + Testing Library
- Zod validation

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Create a Supabase project at [supabase.com](https://supabase.com) and fill in:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`

4. Apply migrations:

   ```bash
   npx supabase link --project-ref <your-ref>
   npx supabase db push
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run Vitest unit tests |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Run seed script |

## Project structure

```
src/
  app/              Route groups: (marketing), (auth), (app), api/
  actions/          Server Actions
  components/       UI and feature components
  lib/              Supabase clients, Drizzle, utilities
  repositories/     Data access layer
  schemas/          Zod validation
  services/         Business logic
  types/            Shared TypeScript types
supabase/           SQL migrations and seed
docs/               Architecture, security, testing
.cursor/            Cursor rules and skills
```

See [AGENTS.md](./AGENTS.md) for AI agent orientation and [docs/](./docs/) for deeper documentation.

## Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- All tables must have RLS policies (default deny).
- Use the admin Supabase client only in trusted server contexts (webhooks, cron).
- Validate all user input with Zod in Server Actions and route handlers.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
