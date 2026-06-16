import Sidebar from "@/components/layout/sidebar";
import StatCard from "@/components/cards/stat-card";

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
          <StatCard title="Total PnL" value="$0.00" />
          <StatCard title="Win Rate" value="0%" />
          <StatCard title="Accounts" value="0" />
          <StatCard title="Drawdown" value="0%" />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-zinc-900 rounded-xl p-6 h-80">
            Equity Curve
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 h-80">
            Recent Trades
          </div>
        </div>
      </section>
    </main>
  );
}
