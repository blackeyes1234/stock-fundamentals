import { z } from "zod";

import { stockSymbolSchema } from "@/schemas/stock";

export const watchlistNameSchema = z
  .string()
  .trim()
  .min(1, "Watchlist name is required")
  .max(50, "Watchlist name must be 50 characters or fewer");

export const createWatchlistSchema = z.object({
  name: watchlistNameSchema,
});

export const addSymbolToWatchlistSchema = z.object({
  watchlistId: z.string().uuid("Invalid watchlist"),
  symbol: stockSymbolSchema,
});

export const watchlistIdSchema = z.string().uuid("Invalid watchlist");

export type CreateWatchlistInput = z.infer<typeof createWatchlistSchema>;
export type AddSymbolToWatchlistInput = z.infer<
  typeof addSymbolToWatchlistSchema
>;
