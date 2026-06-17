import Sidebar from "@/components/layout/sidebar";
import StatCard from "@/components/cards/stat-card";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const accounts = await prisma.tradingAccount.count();
  const trades = await prisma.trade.findMany();

  const wins = trades.filter((t) => t.result === "Win").length;

  const winRate =
    trades.length > 0
      ? ((wins / trades.length) * 100).toFixed(1)
      : "0";

  const totalPnL = trades.reduce(
    (sum, trade) => sum + (trade.pnl || 0),
    0
  );

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
	<StatCard title="Accounts" value={String(accounts)} />

	<StatCard title="Trades" value={String(trades.length)} />

	<StatCard title="Win Rate" value={`${winRate}%`} />

	<StatCard title="Total PnL" value={`$${totalPnL}`} />        
	</div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-zinc-900 rounded-xl p-6 h-80">
            Equity Curve
          </div>

	<div className="bg-zinc-900 rounded-xl p-6 h-80 overflow-auto">
	  <h3 className="font-bold text-lg mb-4">
	    Recent Trades
	  </h3>

	  {trades.slice(0, 5).map((trade) => (
	    <div
	      key={trade.id}
	      className="border-b border-zinc-800 py-2"
	    >
	      <div>{trade.symbol}</div>
	      <div className="text-sm text-zinc-400">
	        {trade.result}
	      </div>
	    </div>
	   ))}
	</div>
        </div>
      </section>
    </main>
  );
}
