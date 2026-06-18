import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function TradeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trade = await prisma.trade.findUnique({
    where: {
      id,
    },
  });

  if (!trade) {
    notFound();
  }

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          {trade.symbol}
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Direction
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.direction}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Result
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.result}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              PnL
            </p>

            <h2 className="text-3xl font-bold mt-3">
              ${trade.pnl ?? 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              RR
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.rr ?? 0}
            </h2>
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Trade Details
          </h2>

          <div className="space-y-3">

            <p>Entry: {trade.entryPrice}</p>

            <p>Stop Loss: {trade.stopLoss}</p>

            <p>Take Profit: {trade.takeProfit}</p>

            <p>Lot Size: {trade.lotSize}</p>

            <p>Risk %: {trade.riskPercent}</p>

            <p>Commission: {trade.commission}</p>

            <p>
              Trade Date:
              {" "}
              {new Date(
                trade.tradeDate
              ).toLocaleDateString()}
            </p>

            {trade.notes && (
              <div className="border-t border-zinc-800 pt-4 mt-4">
                <h3 className="font-bold mb-2">
                  Notes
                </h3>

                <p>{trade.notes}</p>
              </div>
            )}

          </div>

        </div>

      </section>
    </main>
  );
}
