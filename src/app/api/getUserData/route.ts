import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const Id = url.searchParams.get("Id");
        const user = await prisma.user.findFirst({
            where: {
              id: String(Id)
            },
        })
  
      return NextResponse.json(
        { user, message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }