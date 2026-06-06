import { notFound } from "next/navigation";

import { stockSymbolSchema } from "@/schemas/stock";

type StockPageProps = {
  params: Promise<{ symbol: string }>;
};

export default async function StockPage({ params }: StockPageProps) {
  const { symbol: rawSymbol } = await params;
  const parsed = stockSymbolSchema.safeParse(rawSymbol);

  if (!parsed.success) {
    notFound();
  }

  const symbol = parsed.data;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Fundamentals
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">{symbol}</h1>
        <p className="mt-2 text-zinc-600">
          Replace this placeholder with repository-backed metrics and charts.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {["P/E", "Revenue TTM", "Debt/Equity"].map((metric) => (
          <div
            key={metric}
            className="rounded-2xl border border-zinc-200 p-5"
          >
            <p className="text-sm text-zinc-500">{metric}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
