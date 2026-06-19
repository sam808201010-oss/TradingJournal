"use client";

import { useState } from "react";

export default function UploadScreenshotModal({
  tradeId,
}: {
  tradeId: string;
}) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("Entry");

  async function saveScreenshot() {
    await fetch("/api/screenshots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tradeId,
        imageUrl,
        type,
      }),
    });

    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 px-4 py-2 rounded-lg"
      >
        Upload Screenshot
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-xl">

            <h2 className="text-2xl font-bold mb-6">
              Add Screenshot
            </h2>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded bg-zinc-800 mb-4"
            >
              <option>Entry</option>
              <option>Exit</option>
              <option>Analysis</option>
            </select>

            <input
              className="w-full p-3 rounded bg-zinc-800"
              placeholder="Paste Image URL"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
            />

            <div className="flex gap-3 mt-6">

              <button
                onClick={saveScreenshot}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setOpen(false)}
                className="bg-zinc-700 px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
