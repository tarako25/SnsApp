import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const postid = url.searchParams.get("postId");
        if(postid){
            const data = await prisma.post.findFirst({
                where: {
                    id: postid
                },
                include: {
                    good: true,
                },
            })
      
          return NextResponse.json(
            { data, message: "Success" },
            { status: 201 },
          );
        }
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }