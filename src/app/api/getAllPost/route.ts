import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const data = await prisma.post.findMany({
        })
  
      return NextResponse.json(
        { data, message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }