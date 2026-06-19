import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";
import EquityCurve from "@/components/analytics/equity-curve";

export default async function AnalyticsPage() {
  const trades = await prisma.trade.findMany();

  const totalTrades = trades.length;

  const wins = trades.filter(
    (trade) => trade.result === "Win"
  );

  const losses = trades.filter(
    (trade) => trade.result === "Loss"
  );

  const winRate =
    totalTrades > 0
      ? (wins.length / totalTrades) * 100
      : 0;

  const totalPnL = trades.reduce(
    (sum, trade) => sum + (trade.pnl || 0),
    0
  );

  const avgRR =
    totalTrades > 0
      ? trades.reduce(
          (sum, trade) => sum + (trade.rr || 0),
          0
        ) / totalTrades
      : 0;

  const averageWin =
    wins.length > 0
      ? wins.reduce(
          (sum, trade) => sum + (trade.pnl || 0),
          0
        ) / wins.length
      : 0;

  const averageLoss =
    losses.length > 0
      ? losses.reduce(
          (sum, trade) => sum + (trade.pnl || 0),
          0
        ) / losses.length
      : 0;

  const largestWin =
    wins.length > 0
      ? Math.max(
          ...wins.map((t) => t.pnl || 0)
        )
      : 0;

  const largestLoss =
    losses.length > 0
      ? Math.min(
          ...losses.map((t) => t.pnl || 0)
        )
      : 0;

  const profitFactor =
    Math.abs(
      losses.reduce(
        (sum, trade) => sum + (trade.pnl || 0),
        0
      )
    ) > 0
      ? wins.reduce(
          (sum, trade) => sum + (trade.pnl || 0),
          0
        ) /
        Math.abs(
          losses.reduce(
            (sum, trade) =>
              sum + (trade.pnl || 0),
            0
          )
        )
      : 0;

  const pairStats: Record<
    string,
    number
  > = {};

  trades.forEach((trade) => {
    if (!trade.symbol) return;

    pairStats[trade.symbol] =
      (pairStats[trade.symbol] || 0) +
      (trade.pnl || 0);
  });

  const sortedPairs =
    Object.entries(pairStats).sort(
      (a, b) => b[1] - a[1]
    );

  const bestPair =
    sortedPairs.length > 0
      ? sortedPairs[0][0]
      : "-";

  const worstPair =
    sortedPairs.length > 0
      ? sortedPairs[
          sortedPairs.length - 1
        ][0]
      : "-";

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mt-8">

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

        <div className="grid md:grid-cols-3 gap-4 mt-8">

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Profit Factor</p>
            <h2 className="text-3xl font-bold">
              {profitFactor.toFixed(2)}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Average Win</p>
            <h2 className="text-3xl font-bold text-green-400">
              ${averageWin.toFixed(2)}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Average Loss</p>
            <h2 className="text-3xl font-bold text-red-400">
              ${averageLoss.toFixed(2)}
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-8">

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Best Pair</p>
            <h2 className="text-2xl font-bold">
              {bestPair}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Worst Pair</p>
            <h2 className="text-2xl font-bold">
              {worstPair}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Largest Win</p>
            <h2 className="text-2xl font-bold text-green-400">
              ${largestWin.toFixed(2)}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p>Largest Loss</p>
            <h2 className="text-2xl font-bold text-red-400">
              ${largestLoss.toFixed(2)}
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
