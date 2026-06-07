import { describe, expect, it } from "vitest";

import {
  addSymbolToWatchlistSchema,
  createWatchlistSchema,
  watchlistNameSchema,
} from "@/schemas/watchlist";

describe("watchlistNameSchema", () => {
  it("accepts valid names", () => {
    expect(watchlistNameSchema.parse("  Tech  ")).toBe("Tech");
  });

  it("rejects empty names", () => {
    expect(watchlistNameSchema.safeParse("").success).toBe(false);
    expect(watchlistNameSchema.safeParse("   ").success).toBe(false);
  });

  it("rejects names over 50 characters", () => {
    expect(watchlistNameSchema.safeParse("a".repeat(51)).success).toBe(false);
  });
});

describe("createWatchlistSchema", () => {
  it("parses a create payload", () => {
    expect(createWatchlistSchema.parse({ name: "Dividends" })).toEqual({
      name: "Dividends",
    });
  });
});

describe("addSymbolToWatchlistSchema", () => {
  it("parses a valid add-symbol payload", () => {
    const result = addSymbolToWatchlistSchema.parse({
      watchlistId: "550e8400-e29b-41d4-a716-446655440000",
      symbol: "aapl",
    });

    expect(result.symbol).toBe("AAPL");
  });

  it("rejects invalid watchlist ids", () => {
    expect(
      addSymbolToWatchlistSchema.safeParse({
        watchlistId: "not-a-uuid",
        symbol: "AAPL",
      }).success,
    ).toBe(false);
  });
});
