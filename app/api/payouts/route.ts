import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const payouts = await prisma.payout.findMany({
    include: {
      account: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(payouts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payout = await prisma.payout.create({
      data: {
        accountId: body.accountId,
        amount: Number(body.amount),

        status: body.status || "Requested",

        requestDate: body.requestDate
          ? new Date(body.requestDate)
          : new Date(),

        paidDate: body.paidDate
          ? new Date(body.paidDate)
          : null,

        notes: body.notes || null,
      },
    });

    return NextResponse.json(payout);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create payout" },
      { status: 500 }
    );
  }
}
