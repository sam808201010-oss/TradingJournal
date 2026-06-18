"use client";

import { useEffect, useState } from "react";

export default function AddPayoutModal() {
  const [open, setOpen] = useState(false);

  const [accounts, setAccounts] = useState([]);

  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Requested");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then(setAccounts);
  }, []);

  async function handleSubmit() {
    await fetch("/api/payouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
        amount,
        status,
        notes,
      }),
    });

    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Add Payout
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              Add Payout
            </h2>

            <select
              className="w-full p-3 bg-zinc-800 rounded mb-3"
              value={accountId}
              onChange={(e) =>
                setAccountId(e.target.value)
              }
            >
              <option value="">
                Select Account
              </option>

              {accounts.map((account: any) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.accountName}
                </option>
              ))}
            </select>

            <input
              placeholder="Amount"
              className="w-full p-3 bg-zinc-800 rounded mb-3"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

            <select
              className="w-full p-3 bg-zinc-800 rounded mb-3"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Requested</option>
              <option>Approved</option>
              <option>Paid</option>
              <option>Rejected</option>
            </select>

            <textarea
              placeholder="Notes"
              className="w-full p-3 bg-zinc-800 rounded mb-4"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-zinc-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-white text-black rounded"
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
