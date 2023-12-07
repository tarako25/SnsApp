import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        const id = session.user.id
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        const pageStart = (Number(page) - 1) * pageItem;

        const follow = await prisma.follow.findMany({
            where:{
                userId: id
            }
        })
        let followsId = follow.map((user) => user.followId);
        //自分の投稿を含める
        followsId.push(id);

        const data = await prisma.post.findMany({
          where: {
            To: null,
            userId: {
                in: followsId,
              },
          },
          include: {
            good: true,
          },
          orderBy: {
            id: "desc",
          },
          skip:pageStart,
          take: pageItem,
        })
        const count = await prisma.post.count({
          where: {
            To: null
          }
        });
      return NextResponse.json(
        { data, count, message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }