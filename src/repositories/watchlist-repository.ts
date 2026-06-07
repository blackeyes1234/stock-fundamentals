import { and, asc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { watchlistItems, watchlists } from "@/lib/db/schema";
import type { Watchlist } from "@/types/watchlist";

export async function listWatchlistsByUserId(
  userId: string,
): Promise<Watchlist[]> {
  const db = getDb();
  const rows = await db.query.watchlists.findMany({
    where: eq(watchlists.userId, userId),
    with: {
      items: {
        orderBy: [asc(watchlistItems.symbol)],
      },
    },
    orderBy: [asc(watchlists.name)],
  });

  return rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    name: row.name,
    createdAt: row.createdAt,
    items: row.items.map((item) => ({
      id: item.id,
      watchlistId: item.watchlistId,
      symbol: item.symbol,
      createdAt: item.createdAt,
    })),
  }));
}

export async function countWatchlistsByUserId(userId: string) {
  const db = getDb();
  const rows = await db
    .select({ id: watchlists.id })
    .from(watchlists)
    .where(eq(watchlists.userId, userId));

  return rows.length;
}

export async function countSymbolsInWatchlist(watchlistId: string) {
  const db = getDb();
  const rows = await db
    .select({ id: watchlistItems.id })
    .from(watchlistItems)
    .where(eq(watchlistItems.watchlistId, watchlistId));

  return rows.length;
}

export async function createWatchlist(userId: string, name: string) {
  const db = getDb();
  const [watchlist] = await db
    .insert(watchlists)
    .values({ userId, name })
    .returning();

  return watchlist;
}

export async function deleteWatchlist(userId: string, watchlistId: string) {
  const db = getDb();
  const [deleted] = await db
    .delete(watchlists)
    .where(and(eq(watchlists.id, watchlistId), eq(watchlists.userId, userId)))
    .returning({ id: watchlists.id });

  return deleted ?? null;
}

export async function addSymbol(watchlistId: string, symbol: string) {
  const db = getDb();
  const [item] = await db
    .insert(watchlistItems)
    .values({ watchlistId, symbol })
    .returning();

  return item;
}

export async function removeSymbol(watchlistId: string, symbol: string) {
  const db = getDb();
  const [deleted] = await db
    .delete(watchlistItems)
    .where(
      and(
        eq(watchlistItems.watchlistId, watchlistId),
        eq(watchlistItems.symbol, symbol),
      ),
    )
    .returning({ id: watchlistItems.id });

  return deleted ?? null;
}

export async function getWatchlistById(userId: string, watchlistId: string) {
  const db = getDb();
  const watchlist = await db.query.watchlists.findFirst({
    where: and(eq(watchlists.id, watchlistId), eq(watchlists.userId, userId)),
    with: {
      items: true,
    },
  });

  return watchlist ?? null;
}
