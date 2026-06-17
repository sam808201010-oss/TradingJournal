"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EquityCurve({
  trades,
}: {
  trades: any[];
}) {
  let equity = 0;

  const data = trades.map((trade, index) => {
    equity += trade.pnl || 0;

    return {
      trade: index + 1,
      equity,
    };
  });

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="trade" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="equity"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
