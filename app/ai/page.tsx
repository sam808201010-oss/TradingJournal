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
    (trade) => trade.result === "Win"
  );

  const winRate =
    totalTrades > 0
      ? (wins.length / totalTrades) * 100
      : 0;

  const setupCounts: Record<string, number> = {};
  const emotionCounts: Record<string, number> = {};
  const pairPnL: Record<string, number> = {};

  trades.forEach((trade) => {
    pairPnL[trade.symbol] =
      (pairPnL[trade.symbol] || 0) +
      (trade.pnl || 0);

    trade.tradeNotes.forEach((note) => {
      if (note.setupType) {
        setupCounts[note.setupType] =
          (setupCounts[note.setupType] || 0) + 1;
      }

      if (note.emotion) {
        emotionCounts[note.emotion] =
          (emotionCounts[note.emotion] || 0) + 1;
      }
    });
  });

  const sortedPairs = Object.entries(pairPnL).sort(
    (a, b) => b[1] - a[1]
  );

  const bestPair =
    sortedPairs[0]?.[0] || "-";

  const worstPair =
    sortedPairs[
      sortedPairs.length - 1
    ]?.[0] || "-";

  const mostUsedSetup =
    Object.entries(setupCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  const mostCommonEmotion =
    Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

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
            <p>Worst Pair</p>
            <h2 className="text-3xl font-bold">
              {worstPair}
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-zinc-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Setup Analysis
            </h2>

            {Object.entries(setupCounts).length === 0 ? (
              <p>No setup data yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(setupCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([setup, count]) => (
                    <div
                      key={setup}
                      className="flex justify-between"
                    >
                      <span>{setup}</span>
                      <span>{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Emotion Analysis
            </h2>

            {Object.entries(emotionCounts).length === 0 ? (
              <p>No emotion data yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(emotionCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([emotion, count]) => (
                    <div
                      key={emotion}
                      className="flex justify-between"
                    >
                      <span>{emotion}</span>
                      <span>{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Pair Performance
          </h2>

          <div className="space-y-3">
            {sortedPairs.map(([pair, pnl]) => (
              <div
                key={pair}
                className="flex justify-between"
              >
                <span>{pair}</span>

                <span
                  className={
                    pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  ${pnl.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Coaching
          </h2>

          <ul className="space-y-3">

            <li>
              Your best performing pair is{" "}
              <strong>{bestPair}</strong>
            </li>

            <li>
              Your most used setup is{" "}
              <strong>{mostUsedSetup}</strong>
            </li>

            <li>
              Your most common emotion is{" "}
              <strong>
                {mostCommonEmotion}
              </strong>
            </li>

            <li>
              Focus on repeating trades
              that match your strongest
              setup patterns.
            </li>

          </ul>

        </div>

      </section>
    </main>
  );
}
