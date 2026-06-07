"use client";

import { useActionState } from "react";

import {
  addSymbolToWatchlist,
  type ActionResult,
} from "@/actions/watchlist-actions";
import { Button } from "@/components/ui/button";
import type { Watchlist } from "@/types/watchlist";

const initialState: ActionResult = { success: true };

type AddSymbolFormProps = {
  watchlists: Watchlist[];
};

export function AddSymbolForm({ watchlists }: AddSymbolFormProps) {
  const [state, formAction, isPending] = useActionState(
    addSymbolToWatchlist,
    initialState,
  );

  if (watchlists.length === 0) {
    return (
      <p className="text-sm text-zinc-600">
        Create a watchlist first, then add symbols.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          name="watchlistId"
          required
          defaultValue={watchlists[0]?.id}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-500"
        >
          {watchlists.map((watchlist) => (
            <option key={watchlist.id} value={watchlist.id}>
              {watchlist.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="symbol"
          placeholder="Stock symbol (e.g. AAPL)"
          required
          maxLength={10}
          className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm uppercase outline-none focus:border-zinc-500"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add symbol"}
        </Button>
      </div>
      {!state.success && state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}
    </form>
  );
}
