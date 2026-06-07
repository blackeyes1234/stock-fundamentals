"use client";

import { useActionState } from "react";

import {
  createWatchlist,
  type ActionResult,
} from "@/actions/watchlist-actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { success: true };

export function CreateWatchlistForm() {
  const [state, formAction, isPending] = useActionState(
    createWatchlist,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        name="name"
        placeholder="Watchlist name (e.g. Tech)"
        required
        maxLength={50}
        className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-500"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create watchlist"}
      </Button>
      {!state.success && state.error ? (
        <p className="text-sm text-red-600 sm:basis-full">{state.error}</p>
      ) : null}
    </form>
  );
}
