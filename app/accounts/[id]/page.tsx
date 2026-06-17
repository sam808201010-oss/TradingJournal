import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

export default async function AccountDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const account = await prisma.tradingAccount.findUnique({
    where: { id },
    include: {
      trades: true,
    },
  });

  if (!account) {
    return <div>Account not found</div>;
  }

  const totalTrades = account.trades.length;

  const wins = account.trades.filter(
    (t) => t.result === "Win"
  ).length;

  const winRate =
    totalTrades > 0
      ? (wins / totalTrades) * 100
      : 0;

const totalPnL = account.trades.reduce(
  (sum, trade) => sum + (trade.pnl || 0),
  0
);

const profit =
  account.currentBalance - account.startingBalance;

const targetProgress =
  account.profitTarget && account.profitTarget > 0
    ? (profit / account.profitTarget) * 100
    : 0;

const dailyDDRemaining =
  account.maxDailyDrawdown
    ? account.maxDailyDrawdown
    : 0;

const overallDDRemaining =
  account.maxOverallDrawdown
    ? account.currentBalance -
      (account.startingBalance -
        account.maxOverallDrawdown)
    : 0;

return (
  <main className="bg-black text-white min-h-screen flex">
    <Sidebar />

    <section className="flex-1 p-8">
      <h1 className="text-4xl font-bold">
        {account.accountName}
      </h1>

      <div className="grid grid-cols-4 gap-4 mt-8">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p>Current Balance</p>
          <h2 className="text-2xl font-bold">
            ${account.currentBalance.toLocaleString()}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p>Profit</p>
          <h2 className="text-2xl font-bold text-green-500">
            ${profit.toFixed(2)}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p>Target Progress</p>
          <h2 className="text-2xl font-bold">
            {targetProgress.toFixed(1)}%
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p>Payout Cycle</p>
          <h2 className="text-2xl font-bold">
            {account.payoutCycle || "-"}
          </h2>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">
          Profit Target Progress
        </h2>

        <div className="w-full bg-zinc-800 rounded-full h-5">
          <div
            className="bg-green-500 h-5 rounded-full"
            style={{
              width: `${Math.min(targetProgress, 100)}%`,
            }}
          />
        </div>

        <p className="mt-3">
          {targetProgress.toFixed(1)}%
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="font-bold mb-2">
            Daily DD Remaining
          </h2>

          <p className="text-3xl font-bold">
            ${dailyDDRemaining.toFixed(2)}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="font-bold mb-2">
            Overall DD Remaining
          </h2>

          <p className="text-3xl font-bold">
            ${overallDDRemaining.toFixed(2)}
          </p>
        </div>

      </div>

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
          <p>Balance</p>
          <h2 className="text-3xl font-bold">
            ${account.currentBalance.toLocaleString()}
          </h2>
        </div>

      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Trades
        </h2>

        <div className="space-y-4">
          {account.trades.map((trade) => (
            <div
              key={trade.id}
              className="bg-zinc-900 p-4 rounded-xl"
            >
              <h3 className="font-bold">
                {trade.symbol}
              </h3>

              <p>
                {trade.direction} • {trade.result}
              </p>

              <p>
                PnL: ${trade.pnl || 0}
              </p>

              <p>
                RR: {trade.rr || 0}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  </main>
);
}
