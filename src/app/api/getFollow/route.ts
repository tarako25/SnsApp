import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const page = url.searchParams.get("page");
    const pageStart = (Number(page) - 1) * pageItem;

    const follow = await prisma.follow.findMany({
        where:{
            userId: String(userId),
            followId: {
              not: String(userId)
          }
        },
        include: {
          followuser: true,
        },
        orderBy: {
            id: "desc",
          },
          skip:pageStart,
          take: pageItem,
    })
    const count = await prisma.follow.count({
        where:{
            userId: String(userId)
        }
    })
    return NextResponse.json(
      { message: "Success", follow, count },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}