import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const url = new URL(req.url);
    const Id = url.searchParams.get("Id");


    const checkId = await prisma.post.findFirst({
      where: {
        id: String(Id),
      },
    });
    return NextResponse.json(
      { message: "Success", checkId },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}