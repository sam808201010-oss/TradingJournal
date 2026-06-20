"use client";

import { useState } from "react";

type Props = {
  imageUrl: string;
  type: string;
};

export default function ImageLightbox({
  imageUrl,
  type,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={imageUrl}
        alt={type}
        onClick={() => setOpen(true)}
        className="rounded-lg w-full cursor-pointer hover:opacity-80 transition"
      />

      {open && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-7xl w-full">
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-white text-xl font-bold">
                {type}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="bg-zinc-800 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>

            </div>

            <img
              src={imageUrl}
              alt={type}
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
