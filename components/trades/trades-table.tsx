"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function TradesTable({
  trades,
}: {
  trades: any[];
}) {
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] =
    useState("All");

  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const symbolMatch =
        trade.symbol
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const resultMatch =
        resultFilter === "All"
          ? true
          : trade.result?.toLowerCase() ===
            resultFilter.toLowerCase();

      return symbolMatch && resultMatch;
    });
  }, [trades, search, resultFilter]);

  const wins = trades.filter(
    (t) => t.result?.toLowerCase() === "win"
  ).length;

  const losses = trades.filter(
    (t) => t.result?.toLowerCase() === "loss"
  ).length;

  const openTrades = trades.filter(
    (t) => t.result?.toLowerCase() === "open"
  ).length;

  return (
    <>
      <div className="grid md:grid-cols-4 gap-4 mt-8">

        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Total Trades
          </p>

          <h2 className="text-3xl font-bold">
            {trades.length}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Wins
          </p>

          <h2 className="text-3xl font-bold text-green-400">
            {wins}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Losses
          </p>

          <h2 className="text-3xl font-bold text-red-400">
            {losses}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Open Trades
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            {openTrades}
          </h2>
        </div>

      </div>

      <div className="flex gap-4 mt-8 flex-wrap">

        <input
          placeholder="Search Symbol..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-zinc-900 rounded-lg px-4 py-3"
        />

        <select
          value={resultFilter}
          onChange={(e) =>
            setResultFilter(e.target.value)
          }
          className="bg-zinc-900 rounded-lg px-4 py-3"
        >
          <option>All</option>
          <option>Win</option>
          <option>Loss</option>
          <option>Open</option>
        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

        {filteredTrades.map((trade) => (
          <Link
            href={`/trades/${trade.id}`}
            key={trade.id}
          >
            <div className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition cursor-pointer">

              <h2 className="text-xl font-bold">
                {trade.symbol}
              </h2>

              <p className="mt-3">
                Direction: {trade.direction}
              </p>

              <p>
                Entry: {trade.entryPrice}
              </p>

              <p>
                P&L:
                <span
                  className={
                    trade.pnl > 0
                      ? "text-green-400 ml-2"
                      : "text-red-400 ml-2"
                  }
                >
                  {trade.pnl ?? 0}
                </span>
              </p>

              <p>
                RR: {trade.rr ?? "-"}
              </p>

              <p>
                Result: {trade.result}
              </p>

              {trade.account?.accountName && (
                <p className="text-zinc-400 mt-2">
                  {trade.account.accountName}
                </p>
              )}

            </div>
          </Link>
        ))}

      </div>
    </>
  );
}
