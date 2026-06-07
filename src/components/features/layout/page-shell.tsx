import Link from "next/link";
import type { ReactNode } from "react";

import { AuthNav } from "@/components/features/layout/auth-nav";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold text-zinc-950">
          Stock Fundamentals
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600">
          <AuthNav />
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
