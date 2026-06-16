import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const accounts = await prisma.tradingAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const account = await prisma.tradingAccount.create({
  data: {
    accountName: body.accountName,

    brokerName: body.brokerName,
    propFirmName: body.propFirmName,

    accountType: body.accountType,
    phase: body.phase,

    startingBalance: Number(body.startingBalance),
    currentBalance: Number(body.currentBalance),

    maxDailyDrawdown: body.maxDailyDrawdown
      ? Number(body.maxDailyDrawdown)
      : null,

    maxOverallDrawdown: body.maxOverallDrawdown
      ? Number(body.maxOverallDrawdown)
      : null,

    profitTarget: body.profitTarget
      ? Number(body.profitTarget)
      : null,

    payoutCycle: body.payoutCycle,

    status: body.status,
  },
});

    return NextResponse.json(account);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
