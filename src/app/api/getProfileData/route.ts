import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        const id = session.user.id
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");
        const user = await prisma.user.findFirst({
            where: {
                id:String(userId)
            },
        })
        const follow = await prisma.follow.findFirst({
            where:{        
                userId: id,
                followId: String(userId)
            }
        })
      return NextResponse.json(
        { user, follow, message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }