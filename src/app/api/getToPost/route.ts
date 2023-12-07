import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { pageItem } from "@/lib/PageItem"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const postid = url.searchParams.get("postId");
        const page = url.searchParams.get("page");
        const pageStart = (Number(page) - 1) * pageItem;
        if(postid){
            const data = await prisma.post.findMany({
                where: {
                    To: postid
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
                  To: postid
                }
              });
          return NextResponse.json(
            { data,count, message: "Success" },
            { status: 201 },
          );
        }
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }