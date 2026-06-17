import Sidebar from "@/components/layout/sidebar";
import AddTradeModal from "@/components/trades/add-trade-modal";

export default function TradesPage() {
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

        <div className="mt-8 bg-zinc-900 rounded-xl p-6">
          No trades yet
        </div>
      </section>
    </main>
  );
}
