import Sidebar from "@/components/layout/sidebar";
import AddTradeModal from "@/components/trades/add-trade-modal";
import TradesTable from "@/components/trades/trades-table";
import { prisma } from "@/lib/prisma";

export default async function TradesPage() {
  const trades = await prisma.trade.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      account: true,
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

        <TradesTable trades={trades} />
      </section>
    </main>
  );
}
