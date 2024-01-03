import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function POST(req: Request, res: NextResponse) {
  try {
    const data = await req.json();
    const url = data.url;
    const userId = data.userId;
    await prisma.user.update({
      data: {
        image: url,
      },
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
