import Sidebar from "@/components/layout/sidebar";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h2 className="text-4xl font-bold">
          Dashboard
        </h2>

        <p className="text-zinc-400 mt-2">
          Welcome to TradeStructure
        </p>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Total PnL</h3>
            <p className="text-2xl font-bold mt-2">
              $0.00
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Win Rate</h3>
            <p className="text-2xl font-bold mt-2">
              0%
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Accounts</h3>
            <p className="text-2xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Drawdown</h3>
            <p className="text-2xl font-bold mt-2">
              0%
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
