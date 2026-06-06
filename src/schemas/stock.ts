import { z } from "zod";

export const stockSymbolSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z][A-Z0-9.-]{0,9}$/, "Invalid stock symbol");

export type StockSymbol = z.infer<typeof stockSymbolSchema>;
