import { describe, expect, it } from "vitest";

import { stockSymbolSchema } from "@/schemas/stock";

describe("stockSymbolSchema", () => {
  it("accepts valid symbols", () => {
    expect(stockSymbolSchema.parse("aapl")).toBe("AAPL");
    expect(stockSymbolSchema.parse("BRK.B")).toBe("BRK.B");
  });

  it("rejects invalid symbols", () => {
    expect(stockSymbolSchema.safeParse("").success).toBe(false);
    expect(stockSymbolSchema.safeParse("123").success).toBe(false);
  });
});
