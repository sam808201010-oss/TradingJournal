import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const notes = await prisma.tradeNote.findMany({
    include: {
      trade: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Journal Notes
        </h1>

        {notes.length === 0 ? (
          <div className="bg-zinc-900 rounded-xl p-6">
            No journal notes yet
          </div>
        ) : (
          <div className="grid gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-zinc-900 rounded-xl p-6"
              >
                <h2 className="text-xl font-bold">
                  {note.trade?.symbol ?? "Unknown Trade"}
                </h2>

                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Setup:</strong>{" "}
                    {note.setupType ?? "-"}
                  </p>

                  <p>
                    <strong>Emotion:</strong>{" "}
                    {note.emotion ?? "-"}
                  </p>

                  <p>
                    <strong>Lesson:</strong>{" "}
                    {note.lesson ?? "-"}
                  </p>

                  <p>
                    <strong>Note:</strong>{" "}
                    {note.note ?? "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
