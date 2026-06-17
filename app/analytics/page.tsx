import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
  const trades = await prisma.trade.findMany();

  const wins = trades.filter(
    (t) => t.result === "Win"
  ).length;

  const losses = trades.filter(
    (t) => t.result === "Loss"
  ).length;

  const winRate =
    trades.length > 0
      ? ((wins / trades.length) * 100).toFixed(1)
      : "0";

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Analytics
        </h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Total Trades</h3>
            <p className="text-3xl font-bold">
              {trades.length}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Wins</h3>
            <p className="text-3xl font-bold">
              {wins}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Win Rate</h3>
            <p className="text-3xl font-bold">
              {winRate}%
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
