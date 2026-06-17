import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const trades = await prisma.trade.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(trades);
}

export async function POST(request: Request) {
  const body = await request.json();

  const trade = await prisma.trade.create({
    data: {
      symbol: body.symbol,
      direction: body.direction,
      entryPrice: Number(body.entryPrice),
      stopLoss: body.stopLoss
        ? Number(body.stopLoss)
        : null,
      takeProfit: body.takeProfit
        ? Number(body.takeProfit)
        : null,
      lotSize: body.lotSize
        ? Number(body.lotSize)
        : null,
      riskPercent: body.riskPercent
        ? Number(body.riskPercent)
        : null,
      result: body.result,
      notes: body.notes,
    },
  });

  return NextResponse.json(trade);
}
