import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.tradeNote.findMany({
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
      setupType: body.setupType || null,
      emotion: body.emotion || null,
      lesson: body.lesson || null,
      note: body.note || null,
    },
  });

  return NextResponse.json(note);
}

