import { getWatchlists } from "@/actions/watchlist-actions";
import { AddSymbolForm } from "@/components/features/watchlist/add-symbol-form";
import { CreateWatchlistForm } from "@/components/features/watchlist/create-watchlist-form";
import { WatchlistCard } from "@/components/features/watchlist/watchlist-card";

export default async function WatchlistsPage() {
  const watchlists = await getWatchlists();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-950">Watchlists</h1>
        <p className="mt-2 text-zinc-600">
          Create named lists and save stock symbols to track.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 p-6">
        <h2 className="text-lg font-medium text-zinc-950">New watchlist</h2>
        <div className="mt-4">
          <CreateWatchlistForm />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6">
        <h2 className="text-lg font-medium text-zinc-950">Add symbol</h2>
        <div className="mt-4">
          <AddSymbolForm watchlists={watchlists} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-zinc-950">Your watchlists</h2>
        {watchlists.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
            You do not have any watchlists yet. Create one above to get started.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {watchlists.map((watchlist) => (
              <WatchlistCard key={watchlist.id} watchlist={watchlist} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
