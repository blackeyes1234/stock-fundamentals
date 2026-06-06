export type Profile = {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type StockSummary = {
  symbol: string;
  name: string;
  sector: string | null;
};
