import Link from "next/link";

import {
  LayoutDashboard,
  Building2,
  CandlestickChart,
  BarChart3,
  Wallet,
  NotebookPen,
  Brain,
  Settings,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: Building2,
  },
  {
    name: "Trades",
    href: "/trades",
    icon: CandlestickChart,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Payouts",
    href: "/payouts",
    icon: Wallet,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: NotebookPen,
  },
  {
    name: "AI Insights",
    href: "/ai",
    icon: Brain,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        TradeStructure
      </h1>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
		href={item.href}
		key={item.name}
		className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
		>
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
