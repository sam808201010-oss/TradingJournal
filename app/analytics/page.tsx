import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";
import EquityCurve from "@/components/analytics/equity-curve";

export default async function AnalyticsPage() {
  const trades = await prisma.trade.findMany();

  const totalTrades = trades.length;

  const wins = trades.filter(
    (trade) => trade.result === "Win"
  ).length;

  const losses = trades.filter(
    (trade) => trade.result === "Loss"
  ).length;

  const winRate =
    totalTrades > 0
      ? (wins / totalTrades) * 100
      : 0;

  const totalPnL = trades.reduce(
    (sum, trade) => sum + (trade.pnl || 0),
    0
  );

  const avgRR =
    trades.length > 0
      ? trades.reduce(
          (sum, trade) => sum + (trade.rr || 0),
          0
        ) / trades.length
      : 0;

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <div className="grid grid-cols-4 gap-4 mt-8">

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Total Trades</p>
            <h2 className="text-3xl font-bold">
              {totalTrades}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Win Rate</p>
            <h2 className="text-3xl font-bold">
              {winRate.toFixed(1)}%
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Total PnL</p>
            <h2 className="text-3xl font-bold">
              ${totalPnL.toFixed(2)}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Average RR</p>
            <h2 className="text-3xl font-bold">
              {avgRR.toFixed(2)}
            </h2>
          </div>

        </div>

<div className="bg-zinc-900 rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Equity Curve
  </h2>

  <EquityCurve trades={trades} />
</div>
      </section>
    </main>
  );
}
