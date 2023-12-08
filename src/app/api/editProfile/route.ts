import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const username = data.username;
        const userid = data.userId;
        const introduction = data.introduction;

        const user = await prisma.user.update({
            data: {
                name: username,
                introduction: introduction,
            },
            where: {
                id: userid
            }
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