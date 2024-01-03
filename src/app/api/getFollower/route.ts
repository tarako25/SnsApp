import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const page = url.searchParams.get("page");
    const pageStart = (Number(page) - 1) * pageItem;

    const follower = await prisma.follow.findMany({
        where:{
            followId: String(userId),
            userId: {
              not: String(userId)
          }
        },
        include: {
          user: true,
        },
        orderBy: {
            id: "desc",
          },
          skip:pageStart,
          take: pageItem,
    })
    const follow = await prisma.follow.findMany({
      where:{        
          userId: String(userId)
      }
  })
    const count = await prisma.follow.count({
        where:{
            followId: String(userId)
        }
    })
    return NextResponse.json(
      { message: "Success", follower, count, follow },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}