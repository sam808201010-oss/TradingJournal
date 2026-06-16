"use client";

import { useState } from "react";

export default function AddAccountModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Add Account
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">
              Add Trading Account
            </h2>

            <div className="space-y-4">

              <input
                placeholder="Account Name"
                className="w-full bg-zinc-800 p-3 rounded-lg"
              />

              <input
                placeholder="Broker Name"
                className="w-full bg-zinc-800 p-3 rounded-lg"
              />

              <input
                placeholder="Starting Balance"
                className="w-full bg-zinc-800 p-3 rounded-lg"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="bg-zinc-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                className="bg-white text-black px-4 py-2 rounded-lg"
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
