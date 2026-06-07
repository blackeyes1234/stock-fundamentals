import {
  addSymbol,
  countSymbolsInWatchlist,
  countWatchlistsByUserId,
  createWatchlist,
  deleteWatchlist,
  getWatchlistById,
  listWatchlistsByUserId,
  removeSymbol,
} from "@/repositories/watchlist-repository";

export const MAX_WATCHLISTS_PER_USER = 20;
export const MAX_SYMBOLS_PER_WATCHLIST = 50;

export class WatchlistError extends Error {
  constructor(
    message: string,
    readonly code:
      | "NOT_FOUND"
      | "DUPLICATE_NAME"
      | "DUPLICATE_SYMBOL"
      | "LIMIT_REACHED",
  ) {
    super(message);
    this.name = "WatchlistError";
  }
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function getWatchlistsForUser(userId: string) {
  return listWatchlistsByUserId(userId);
}

export async function createWatchlistForUser(userId: string, name: string) {
  const count = await countWatchlistsByUserId(userId);
  if (count >= MAX_WATCHLISTS_PER_USER) {
    throw new WatchlistError(
      `You can have at most ${MAX_WATCHLISTS_PER_USER} watchlists`,
      "LIMIT_REACHED",
    );
  }

  try {
    return await createWatchlist(userId, name);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new WatchlistError(
        "You already have a watchlist with that name",
        "DUPLICATE_NAME",
      );
    }
    throw error;
  }
}

export async function deleteWatchlistForUser(
  userId: string,
  watchlistId: string,
) {
  const deleted = await deleteWatchlist(userId, watchlistId);
  if (!deleted) {
    throw new WatchlistError("Watchlist not found", "NOT_FOUND");
  }

  return deleted;
}

export async function addSymbolToWatchlistForUser(
  userId: string,
  watchlistId: string,
  symbol: string,
) {
  const watchlist = await getWatchlistById(userId, watchlistId);
  if (!watchlist) {
    throw new WatchlistError("Watchlist not found", "NOT_FOUND");
  }

  const symbolCount = await countSymbolsInWatchlist(watchlistId);
  if (symbolCount >= MAX_SYMBOLS_PER_WATCHLIST) {
    throw new WatchlistError(
      `Each watchlist can have at most ${MAX_SYMBOLS_PER_WATCHLIST} symbols`,
      "LIMIT_REACHED",
    );
  }

  try {
    return await addSymbol(watchlistId, symbol);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new WatchlistError(
        `${symbol} is already in this watchlist`,
        "DUPLICATE_SYMBOL",
      );
    }
    throw error;
  }
}

export async function removeSymbolFromWatchlistForUser(
  userId: string,
  watchlistId: string,
  symbol: string,
) {
  const watchlist = await getWatchlistById(userId, watchlistId);
  if (!watchlist) {
    throw new WatchlistError("Watchlist not found", "NOT_FOUND");
  }

  const deleted = await removeSymbol(watchlistId, symbol);
  if (!deleted) {
    throw new WatchlistError("Symbol not found in watchlist", "NOT_FOUND");
  }

  return deleted;
}

export async function getTotalSymbolCountForUser(userId: string) {
  const watchlists = await listWatchlistsByUserId(userId);
  return watchlists.reduce((total, watchlist) => total + watchlist.items.length, 0);
}
