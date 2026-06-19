"use client";

import { useState } from "react";

export default function UploadScreenshotModal({
  tradeId,
}: {
  tradeId: string;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Entry");
  const [file, setFile] = useState<File | null>(
    null
  );
  const [uploading, setUploading] =
    useState(false);

  async function uploadScreenshot() {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("tradeId", tradeId);
    formData.append("type", type);

    const res = await fetch(
      "/api/upload-screenshot",
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      window.location.reload();
    }

    setUploading(false);
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
              Upload Screenshot
            </h2>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full p-3 rounded bg-zinc-800 mb-4"
            >
              <option>Entry</option>
              <option>Exit</option>
              <option>Analysis</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full p-3 rounded bg-zinc-800"
            />

            <div className="flex gap-3 mt-6">

              <button
                onClick={uploadScreenshot}
                disabled={uploading}
                className="bg-green-600 px-4 py-2 rounded"
              >
                {uploading
                  ? "Uploading..."
                  : "Upload"}
              </button>

              <button
                onClick={() =>
                  setOpen(false)
                }
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
