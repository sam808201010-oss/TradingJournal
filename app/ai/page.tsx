import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

export default async function AIInsightsPage() {
  const trades = await prisma.trade.findMany({
    include: {
      tradeNotes: true,
    },
  });

  const totalTrades = trades.length;

  const wins = trades.filter(
    (t) => t.result?.toLowerCase() === "win"
  );

  const winRate =
    totalTrades > 0
      ? (wins.length / totalTrades) * 100
      : 0;

  const pairPnL: Record<string, number> = {};

  const setupStats: Record<
    string,
    {
      trades: number;
      wins: number;
      losses: number;
    }
  > = {};

  const emotionStats: Record<
    string,
    {
      trades: number;
      pnl: number;
    }
  > = {};

  trades.forEach((trade) => {
    pairPnL[trade.symbol] =
      (pairPnL[trade.symbol] || 0) +
      (trade.pnl || 0);

    trade.tradeNotes.forEach((note) => {
      if (note.setupType) {
        if (!setupStats[note.setupType]) {
          setupStats[note.setupType] = {
            trades: 0,
            wins: 0,
            losses: 0,
          };
        }

        setupStats[note.setupType].trades++;

        if (
          trade.result?.toLowerCase() === "win"
        ) {
          setupStats[note.setupType].wins++;
        }

        if (
          trade.result?.toLowerCase() ===
          "loss"
        ) {
          setupStats[note.setupType].losses++;
        }
      }

      if (note.emotion) {
        if (!emotionStats[note.emotion]) {
          emotionStats[note.emotion] = {
            trades: 0,
            pnl: 0,
          };
        }

        emotionStats[note.emotion].trades++;

        emotionStats[note.emotion].pnl +=
          trade.pnl || 0;
      }
    });
  });

  const sortedPairs =
    Object.entries(pairPnL).sort(
      (a, b) => b[1] - a[1]
    );

  const bestPair =
    sortedPairs[0]?.[0] || "-";

  const worstPair =
    sortedPairs[
      sortedPairs.length - 1
    ]?.[0] || "-";

  const bestSetup =
    Object.entries(setupStats)
      .sort((a, b) => {
        const aRate =
          a[1].trades > 0
            ? (a[1].wins /
                a[1].trades) *
              100
            : 0;

        const bRate =
          b[1].trades > 0
            ? (b[1].wins /
                b[1].trades) *
              100
            : 0;

        return bRate - aRate;
      })[0]?.[0] || "-";

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">

        <h1 className="text-4xl font-bold">
          AI Insights
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mt-8">

          <div className="bg-zinc-900 rounded-xl p-6">
            <p>Total Trades</p>
            <h2 className="text-3xl font-bold">
              {totalTrades}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p>Win Rate</p>
            <h2 className="text-3xl font-bold">
              {winRate.toFixed(1)}%
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p>Best Pair</p>
            <h2 className="text-3xl font-bold">
              {bestPair}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p>Best Setup</p>
            <h2 className="text-3xl font-bold">
              {bestSetup}
            </h2>
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Setup Performance
          </h2>

          <div className="space-y-4">

            {Object.entries(setupStats).map(
              ([setup, stats]) => {
                const winRate =
                  stats.trades > 0
                    ? (
                        (stats.wins /
                          stats.trades) *
                        100
                      ).toFixed(1)
                    : "0";

                return (
                  <div
                    key={setup}
                    className="border-b border-zinc-800 pb-3"
                  >
                    <div className="font-bold">
                      {setup}
                    </div>

                    <div>
                      Trades:
                      {" "}
                      {stats.trades}
                    </div>

                    <div>
                      Wins:
                      {" "}
                      {stats.wins}
                    </div>

                    <div>
                      Losses:
                      {" "}
                      {stats.losses}
                    </div>

                    <div className="text-green-400">
                      Win Rate:
                      {" "}
                      {winRate}%
                    </div>
                  </div>
                );
              }
            )}

          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Emotion Performance
          </h2>

          <div className="space-y-4">

            {Object.entries(
              emotionStats
            ).map(
              ([emotion, stats]) => (
                <div
                  key={emotion}
                  className="flex justify-between border-b border-zinc-800 pb-3"
                >
                  <span>
                    {emotion}
                  </span>

                  <span>
                    Trades:
                    {" "}
                    {stats.trades}
                    {" | "}
                    PnL:
                    {" "}
                    ${stats.pnl.toFixed(2)}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Coaching
          </h2>

          <ul className="space-y-3">

            <li>
              Your strongest setup is
              {" "}
              <strong>
                {bestSetup}
              </strong>
            </li>

            <li>
              Your best pair is
              {" "}
              <strong>
                {bestPair}
              </strong>
            </li>

            <li>
              Your weakest pair is
              {" "}
              <strong>
                {worstPair}
              </strong>
            </li>

            <li>
              Focus on setups with the
              highest win rate and
              avoid emotional trades
              that consistently lose.
            </li>

          </ul>

        </div>

      </section>
    </main>
  );
}
