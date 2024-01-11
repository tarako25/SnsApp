import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function POST(req: NextRequest, res: NextResponse) {

    const session = await getServerSession(authOptions);
    try {
        const userId = session.user.id
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        const keyword = await req.json();
        const pageStart = (Number(page) - 1) * pageItem;
        
        const searchUser = await prisma.user.findMany({
            where: {
                name: {
                    contains: keyword
                }
            },
            orderBy: {
                id: "desc",
            },
            skip:pageStart,
            take: pageItem,
        })
        const follow = await prisma.follow.findMany({
        where: {        
            userId: String(userId)
        }
        })
        const count = await prisma.post.count({
            where: {
                content: {
                    contains: keyword
                }
            },
          });
        return NextResponse.json(
        { searchUser, follow, count, message: "Success" },
        { status: 201 },
        );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }