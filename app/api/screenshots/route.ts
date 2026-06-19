import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const screenshots = await prisma.tradeScreenshot.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(screenshots);
}

export async function POST(req: Request) {
  const body = await req.json();

  const screenshot = await prisma.tradeScreenshot.create({
    data: {
      tradeId: body.tradeId,
      imageUrl: body.imageUrl,
      type: body.type,
    },
  });

  return NextResponse.json(screenshot);
}
