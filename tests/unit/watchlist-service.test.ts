import { beforeEach, describe, expect, it, vi } from "vitest";

import * as repository from "@/repositories/watchlist-repository";
import {
  addSymbolToWatchlistForUser,
  createWatchlistForUser,
  MAX_SYMBOLS_PER_WATCHLIST,
  MAX_WATCHLISTS_PER_USER,
  WatchlistError,
} from "@/services/watchlist-service";

vi.mock("@/repositories/watchlist-repository", () => ({
  countWatchlistsByUserId: vi.fn(),
  countSymbolsInWatchlist: vi.fn(),
  createWatchlist: vi.fn(),
  getWatchlistById: vi.fn(),
  addSymbol: vi.fn(),
}));

const userId = "550e8400-e29b-41d4-a716-446655440000";
const watchlistId = "660e8400-e29b-41d4-a716-446655440000";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("createWatchlistForUser", () => {
  it("throws when watchlist limit is reached", async () => {
    vi.mocked(repository.countWatchlistsByUserId).mockResolvedValue(
      MAX_WATCHLISTS_PER_USER,
    );

    await expect(createWatchlistForUser(userId, "Tech")).rejects.toMatchObject({
      code: "LIMIT_REACHED",
    } satisfies Partial<WatchlistError>);
  });

  it("maps duplicate name violations", async () => {
    vi.mocked(repository.countWatchlistsByUserId).mockResolvedValue(0);
    vi.mocked(repository.createWatchlist).mockRejectedValue({ code: "23505" });

    await expect(createWatchlistForUser(userId, "Tech")).rejects.toMatchObject({
      code: "DUPLICATE_NAME",
    } satisfies Partial<WatchlistError>);
  });
});

describe("addSymbolToWatchlistForUser", () => {
  it("throws when watchlist is missing", async () => {
    vi.mocked(repository.getWatchlistById).mockResolvedValue(null);

    await expect(
      addSymbolToWatchlistForUser(userId, watchlistId, "AAPL"),
    ).rejects.toMatchObject({
      code: "NOT_FOUND",
    } satisfies Partial<WatchlistError>);
  });

  it("throws when symbol limit is reached", async () => {
    vi.mocked(repository.getWatchlistById).mockResolvedValue({
      id: watchlistId,
      userId,
      name: "Tech",
      createdAt: new Date(),
      items: [],
    });
    vi.mocked(repository.countSymbolsInWatchlist).mockResolvedValue(
      MAX_SYMBOLS_PER_WATCHLIST,
    );

    await expect(
      addSymbolToWatchlistForUser(userId, watchlistId, "AAPL"),
    ).rejects.toMatchObject({
      code: "LIMIT_REACHED",
    } satisfies Partial<WatchlistError>);
  });

  it("maps duplicate symbol violations", async () => {
    vi.mocked(repository.getWatchlistById).mockResolvedValue({
      id: watchlistId,
      userId,
      name: "Tech",
      createdAt: new Date(),
      items: [],
    });
    vi.mocked(repository.countSymbolsInWatchlist).mockResolvedValue(1);
    vi.mocked(repository.addSymbol).mockRejectedValue({ code: "23505" });

    await expect(
      addSymbolToWatchlistForUser(userId, watchlistId, "AAPL"),
    ).rejects.toMatchObject({
      code: "DUPLICATE_SYMBOL",
    } satisfies Partial<WatchlistError>);
  });
});
