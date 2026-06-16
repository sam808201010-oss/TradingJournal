"use client";

import { useState } from "react";

export default function AddAccountModal() {
  const [open, setOpen] = useState(false);

  const [accountName, setAccountName] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountName,
          brokerName,

          accountType: "Broker",
          phase: "Live",

          startingBalance: Number(startingBalance),
          currentBalance: Number(startingBalance),

          status: "Active",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      alert("Account created successfully");

      setAccountName("");
      setBrokerName("");
      setStartingBalance("");

      setOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    }
  };

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
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Account Name"
                className="w-full bg-zinc-800 p-3 rounded-lg"
              />

              <input
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                placeholder="Broker Name"
                className="w-full bg-zinc-800 p-3 rounded-lg"
              />

              <input
                value={startingBalance}
                onChange={(e) => setStartingBalance(e.target.value)}
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
                onClick={handleSave}
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
