import Link from "next/link";

import {
  deleteWatchlistFormAction,
  removeSymbolFormAction,
} from "@/actions/watchlist-actions";
import { Button } from "@/components/ui/button";
import type { Watchlist } from "@/types/watchlist";

type WatchlistCardProps = {
  watchlist: Watchlist;
};

export function WatchlistCard({ watchlist }: WatchlistCardProps) {
  const deleteList = deleteWatchlistFormAction.bind(null, watchlist.id);

  return (
    <article className="rounded-2xl border border-zinc-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-zinc-950">{watchlist.name}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {watchlist.items.length} symbol
            {watchlist.items.length === 1 ? "" : "s"}
          </p>
        </div>
        <form action={deleteList}>
          <Button type="submit" variant="secondary">
            Delete list
          </Button>
        </form>
      </div>

      {watchlist.items.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">No symbols yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {watchlist.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 px-3 py-2"
            >
              <Link
                href={`/stocks/${item.symbol}`}
                className="font-medium text-zinc-950 hover:underline"
              >
                {item.symbol}
              </Link>
              <form
                action={removeSymbolFormAction.bind(
                  null,
                  watchlist.id,
                  item.symbol,
                )}
              >
                <button
                  type="submit"
                  className="text-sm text-zinc-500 hover:text-zinc-950"
                >
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
