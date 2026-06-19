"use client";

import { useState } from "react";

export default function AddNoteModal({
  tradeId,
}: {
  tradeId: string;
}) {
  const [open, setOpen] = useState(false);

  const [setupType, setSetupType] = useState("");
  const [emotion, setEmotion] = useState("");
  const [lesson, setLesson] = useState("");
  const [note, setNote] = useState("");

  async function saveNote() {
    await fetch("/api/trade-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tradeId,
        setupType,
        emotion,
        lesson,
        note,
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
        Add Note
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-xl">

            <h2 className="text-2xl font-bold mb-6">
              Add Trade Note
            </h2>

            <div className="space-y-4">

              <input
                className="w-full p-3 rounded bg-zinc-800"
                placeholder="Setup Type"
                value={setupType}
                onChange={(e) =>
                  setSetupType(e.target.value)
                }
              />

              <input
                className="w-full p-3 rounded bg-zinc-800"
                placeholder="Emotion"
                value={emotion}
                onChange={(e) =>
                  setEmotion(e.target.value)
                }
              />

              <input
                className="w-full p-3 rounded bg-zinc-800"
                placeholder="Lesson"
                value={lesson}
                onChange={(e) =>
                  setLesson(e.target.value)
                }
              />

              <textarea
                className="w-full p-3 rounded bg-zinc-800"
                rows={5}
                placeholder="Journal Note"
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
              />

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={saveNote}
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
