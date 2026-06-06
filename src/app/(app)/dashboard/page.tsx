import Link from "next/link";

import { getCurrentUserProfile } from "@/actions/profile-actions";

export default async function DashboardPage() {
  const profile = await getCurrentUserProfile();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-950">Dashboard</h1>
        <p className="mt-2 text-zinc-600">
          {profile
            ? `Welcome back${profile.displayName ? `, ${profile.displayName}` : ""}.`
            : "Authenticated routes live here. Connect Supabase Auth to load user data."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/stocks/AAPL"
          className="rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-400"
        >
          <h2 className="text-lg font-medium text-zinc-950">Sample stock</h2>
          <p className="mt-2 text-sm text-zinc-600">
            View a placeholder fundamentals detail page for AAPL.
          </p>
        </Link>
        <div className="rounded-2xl border border-dashed border-zinc-300 p-6">
          <h2 className="text-lg font-medium text-zinc-950">Watchlists</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Add watchlist services and repositories under `src/services`.
          </p>
        </div>
      </div>
    </div>
  );
}
