export default function Sidebar() {
  const items = [
    "Dashboard",
    "Accounts",
    "Trades",
    "Analytics",
    "Payouts",
    "Notes",
    "AI Insights",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        TradeStructure
      </h1>

      <nav className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="text-zinc-400 hover:text-white cursor-pointer transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}
