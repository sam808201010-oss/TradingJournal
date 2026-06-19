import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file =
    formData.get("file") as File;

  const tradeId =
    formData.get("tradeId") as string;

  const type =
    formData.get("type") as string;

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  const fileName =
    `${Date.now()}-${file.name}`;

  const { error } =
    await supabase.storage
      .from("trade-screenshots")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

  if (error) {
    return NextResponse.json(
      error,
      { status: 500 }
    );
  }

  const { data } =
    supabase.storage
      .from("trade-screenshots")
      .getPublicUrl(fileName);

  const screenshot =
    await prisma.tradeScreenshot.create({
      data: {
        tradeId,
        type,
        imageUrl:
          data.publicUrl,
      },
    });

  return NextResponse.json(
    screenshot
  );
}
