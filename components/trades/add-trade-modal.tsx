"use client";

import { useState } from "react";

export default function AddTradeModal() {
  const [open, setOpen] = useState(false);

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
                placeholder="Symbol"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <select className="w-full p-3 bg-zinc-800 rounded">
                <option>Buy</option>
                <option>Sell</option>
              </select>

              <input
                placeholder="Entry Price"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                placeholder="Stop Loss"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                placeholder="Take Profit"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                placeholder="Lot Size"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                placeholder="Risk %"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <input
                placeholder="Result"
                className="w-full p-3 bg-zinc-800 rounded"
              />

              <textarea
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

              <button className="bg-white text-black px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
