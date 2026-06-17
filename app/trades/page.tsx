import Sidebar from "@/components/layout/sidebar";

export default function TradesPage() {
  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            Trades
          </h1>

          <button className="bg-white text-black px-4 py-2 rounded-lg">
            Add Trade
          </button>
        </div>

        <div className="mt-8 bg-zinc-900 rounded-xl p-6">
          No trades yet
        </div>
      </section>
    </main>
  );
}
