import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session.user.id
    const url = new URL(req.url);
    const targetId = url.searchParams.get("targetId");

    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
    });
    const targetuser = await prisma.user.findFirst({
      where: {
        id: String(targetId),
      },
    });
    return NextResponse.json(
      { message: "Success", targetuser, user },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}