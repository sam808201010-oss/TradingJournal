import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.tradeNote.findMany({
    include: {
      trade: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const body = await req.json();

  const note = await prisma.tradeNote.create({
    data: {
      tradeId: body.tradeId,
      setupType: body.setupType,
      emotion: body.emotion,
      lesson: body.lesson,
      note: body.note,
    },
  });

  return NextResponse.json(note);
}
