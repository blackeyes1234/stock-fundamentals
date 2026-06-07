"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import {
  addSymbolToWatchlistSchema,
  createWatchlistSchema,
  watchlistIdSchema,
} from "@/schemas/watchlist";
import { stockSymbolSchema } from "@/schemas/stock";
import {
  addSymbolToWatchlistForUser,
  createWatchlistForUser,
  deleteWatchlistForUser,
  getWatchlistsForUser,
  removeSymbolFromWatchlistForUser,
  WatchlistError,
} from "@/services/watchlist-service";

export type ActionResult = {
  success: boolean;
  error?: string;
};

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

function toActionError(error: unknown): ActionResult {
  if (error instanceof WatchlistError) {
    return { success: false, error: error.message };
  }

  if (error instanceof Error && error.message === "Unauthorized") {
    return { success: false, error: "You must be signed in" };
  }

  return { success: false, error: "Something went wrong. Please try again." };
}

export async function getWatchlists() {
  const user = await requireUser();
  return getWatchlistsForUser(user.id);
}

export async function createWatchlist(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const parsed = createWatchlistSchema.safeParse({
      name: formData.get("name"),
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid watchlist name",
      };
    }

    await createWatchlistForUser(user.id, parsed.data.name);
    revalidatePath("/watchlists");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return toActionError(error);
  }
}

export async function addSymbolToWatchlist(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const parsed = addSymbolToWatchlistSchema.safeParse({
      watchlistId: formData.get("watchlistId"),
      symbol: formData.get("symbol"),
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    await addSymbolToWatchlistForUser(
      user.id,
      parsed.data.watchlistId,
      parsed.data.symbol,
    );
    revalidatePath("/watchlists");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return toActionError(error);
  }
}

export async function removeSymbolFromWatchlist(
  watchlistId: string,
  symbol: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const parsedWatchlistId = watchlistIdSchema.safeParse(watchlistId);
    const parsedSymbol = stockSymbolSchema.safeParse(symbol);

    if (!parsedWatchlistId.success || !parsedSymbol.success) {
      return { success: false, error: "Invalid input" };
    }

    await removeSymbolFromWatchlistForUser(
      user.id,
      parsedWatchlistId.data,
      parsedSymbol.data,
    );
    revalidatePath("/watchlists");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return toActionError(error);
  }
}

export async function deleteWatchlist(watchlistId: string): Promise<ActionResult> {
  try {
    const user = await requireUser();
    const parsedWatchlistId = watchlistIdSchema.safeParse(watchlistId);

    if (!parsedWatchlistId.success) {
      return { success: false, error: "Invalid watchlist" };
    }

    await deleteWatchlistForUser(user.id, parsedWatchlistId.data);
    revalidatePath("/watchlists");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return toActionError(error);
  }
}

export async function deleteWatchlistFormAction(
  watchlistId: string,
): Promise<void> {
  await deleteWatchlist(watchlistId);
}

export async function removeSymbolFormAction(
  watchlistId: string,
  symbol: string,
): Promise<void> {
  await removeSymbolFromWatchlist(watchlistId, symbol);
}
