import Sidebar from "@/components/layout/sidebar";
import AddTradeModal from "@/components/trades/add-trade-modal";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function TradesPage() {
  const trades = await prisma.trade.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            Trades
          </h1>

          <AddTradeModal />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="bg-zinc-900 rounded-xl p-6"
            >
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
                SL: {trade.stopLoss}
              </p>

              <p>
                TP: {trade.takeProfit}
              </p>

              <p>
                Lot Size: {trade.lotSize}
              </p>

              <p>
                Risk: {trade.riskPercent}%
              </p>

              <p className="mt-2 font-semibold">
                Result: {trade.result}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
