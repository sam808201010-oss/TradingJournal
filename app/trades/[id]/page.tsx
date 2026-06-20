import Sidebar from "@/components/layout/sidebar";
import AddNoteModal from "@/components/trades/add-note-modal";
import UploadScreenshotModal from "@/components/trades/upload-screenshot-modal";
import ImageLightbox from "@/components/trades/image-lightbox";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function TradeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trade = await prisma.trade.findUnique({
    where: {
      id,
    },
    include: {
      tradeNotes: {
        orderBy: {
          createdAt: "desc",
        },
      },

      screenshots: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!trade) {
    notFound();
  }

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            {trade.symbol}
          </h1>

          <div className="flex gap-3">
            <UploadScreenshotModal tradeId={trade.id} />
            <AddNoteModal tradeId={trade.id} />
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Direction
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.direction}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              Result
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.result}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              PnL
            </p>

            <h2 className="text-3xl font-bold mt-3">
              ${trade.pnl ?? 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <p className="text-zinc-400">
              RR
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {trade.rr ?? 0}
            </h2>
          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Trade Details
          </h2>

          <div className="space-y-3">

            <p>Entry: {trade.entryPrice}</p>
            <p>Stop Loss: {trade.stopLoss}</p>
            <p>Take Profit: {trade.takeProfit}</p>
            <p>Lot Size: {trade.lotSize}</p>
            <p>Risk %: {trade.riskPercent}</p>
            <p>Commission: {trade.commission}</p>

            <p>
              Trade Date:{" "}
              {new Date(
                trade.tradeDate
              ).toLocaleDateString()}
            </p>

            {trade.notes && (
              <div className="border-t border-zinc-800 pt-4 mt-4">
                <h3 className="font-bold mb-2">
                  Notes
                </h3>

                <p>{trade.notes}</p>
              </div>
            )}

          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Trade Screenshots
          </h2>

          {trade.screenshots.length === 0 ? (
            <p className="text-zinc-400">
              No screenshots uploaded yet
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">

              {trade.screenshots.map((shot) => (
                <div
                  key={shot.id}
                  className="border border-zinc-800 rounded-lg p-4"
                >
                  <p className="font-bold mb-3">
                    {shot.type}
                  </p>

                  <ImageLightbox
                    imageUrl={shot.imageUrl}
                    type={shot.type}
                  />

                  <p className="text-sm text-zinc-500 mt-3">
                    {new Date(
                      shot.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Trade Journal Notes
          </h2>

          {trade.tradeNotes.length === 0 ? (
            <p className="text-zinc-400">
              No notes added yet
            </p>
          ) : (
            <div className="space-y-6">

              {trade.tradeNotes.map((note) => (
                <div
                  key={note.id}
                  className="border border-zinc-800 rounded-lg p-4"
                >
                  <p>
                    <strong>Setup:</strong>{" "}
                    {note.setupType || "-"}
                  </p>

                  <p>
                    <strong>Emotion:</strong>{" "}
                    {note.emotion || "-"}
                  </p>

                  <p>
                    <strong>Lesson:</strong>{" "}
                    {note.lesson || "-"}
                  </p>

                  <p className="mt-3">
                    {note.note || "-"}
                  </p>

                  <p className="text-sm text-zinc-500 mt-3">
                    {new Date(
                      note.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </section>
    </main>
  );
}
