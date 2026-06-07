export type WatchlistItem = {
  id: string;
  watchlistId: string;
  symbol: string;
  createdAt: Date;
};

export type Watchlist = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  items: WatchlistItem[];
};
