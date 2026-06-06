import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Stock Fundamentals
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
          Analyze fundamentals with a secure Supabase backend
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          A production-ready scaffold with Next.js App Router, typed data
          access, RLS-first Supabase migrations, and Cursor project rules.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/login"
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50"
        >
          Open dashboard
        </Link>
      </div>
    </div>
  );
}
