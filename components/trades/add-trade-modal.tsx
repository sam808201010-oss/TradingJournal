"use client";

import { useState } from "react";

export default function AddTradeModal() {
  const [open, setOpen] = useState(false);
  
  const [pnl, setPnl] = useState("");
  const [rr, setRr] = useState("");
  const [commission, setCommission] = useState("");
  const [tradeDate, setTradeDate] = useState("");

  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState("Buy");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSave() {
    const response = await fetch("/api/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol,
        direction,
        entryPrice,
        stopLoss,
        takeProfit,
        lotSize,
        riskPercent,
        result,
        notes,
	pnl,
	rr,
	commission,
	tradeDate,
      }),
    });

    if (response.ok) {
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Add Trade
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              Add Trade
            </h2>

            <div className="space-y-3">

              <input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Symbol"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full p-3 bg-zinc-800 rounded"
              >
                <option>Buy</option>
                <option>Sell</option>
              </select>

              <input
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="Entry Price"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Stop Loss"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="Take Profit"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                placeholder="Lot Size"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                value={riskPercent}
                onChange={(e) => setRiskPercent(e.target.value)}
                placeholder="Risk %"
                className="w-full p-3 bg-zinc-800 rounded"
              />

		<input
	        type="number"
  placeholder="PnL"
  value={pnl}
  onChange={(e) => setPnl(e.target.value)}
  className="w-full bg-zinc-800 rounded-lg p-3"
/>

<input
  type="number"
  step="0.1"
  placeholder="RR"
  value={rr}
  onChange={(e) => setRr(e.target.value)}
  className="w-full bg-zinc-800 rounded-lg p-3"
/>

<input
  type="number"
  step="0.01"
  placeholder="Commission"
  value={commission}
  onChange={(e) => setCommission(e.target.value)}
  className="w-full bg-zinc-800 rounded-lg p-3"
/>

<input
  type="date"
  value={tradeDate}
  onChange={(e) => setTradeDate(e.target.value)}
  className="w-full bg-zinc-800 rounded-lg p-3"
/>		
              <input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Result (Win / Loss)"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full p-3 bg-zinc-800 rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="bg-zinc-700 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
