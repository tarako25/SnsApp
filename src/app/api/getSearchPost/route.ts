import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        const pageStart = (Number(page) - 1) * pageItem;
        const keyword = await req.json();
        const alternatePrefix = keyword[0] === '#' ? '＃' : '#';
        const keyword2 = alternatePrefix + keyword.slice(1);
        
        const searchPost = await prisma.post.findMany({
            where: {
                content: {
                    contains: keyword[0] === '#' || keyword[0] === '＃' ? keyword.slice(1) : keyword,
                },
                OR: [
                    { content: { contains: keyword } },
                    { content: { contains: keyword2 } },
                ],
            },
            include: {
                good: true,
                user: true,
            },
            orderBy: {
                id: "desc",
            },
            skip: pageStart,
            take: pageItem,
        });
        const count = await prisma.post.count({
            where: {
                content: {
                    contains: keyword
                }
            },
          });
        return NextResponse.json(
        { searchPost, count, message: "Success" },
        { status: 201 },
        );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }