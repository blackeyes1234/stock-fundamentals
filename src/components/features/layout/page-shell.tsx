import Link from "next/link";
import type { ReactNode } from "react";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold text-zinc-950">
          Stock Fundamentals
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600">
          <Link href="/dashboard" className="hover:text-zinc-950">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-zinc-950">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
