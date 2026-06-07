import Link from "next/link";

import { getSessionUser, signOut } from "@/actions/auth-actions";

export async function AuthNav() {
  const user = await getSessionUser();

  if (!user) {
    return (
      <Link href="/login" className="hover:text-zinc-950">
        Sign in
      </Link>
    );
  }

  return (
    <>
      <Link href="/dashboard" className="hover:text-zinc-950">
        Dashboard
      </Link>
      <Link href="/watchlists" className="hover:text-zinc-950">
        Watchlists
      </Link>
      <form action={signOut}>
        <button
          type="submit"
          className="hover:text-zinc-950"
        >
          Sign out
        </button>
      </form>
    </>
  );
}
