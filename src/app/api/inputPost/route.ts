import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const username = data.userName;
        const userid = data.userId;
        const content = data.content;
        const postid = data.To;
        const now = new Date();
        const user = await prisma.post.create({
            data: {
                username: String(username),
                content: content,
                createdAt: now,
                userId: userid,
                To: postid
            }
        })
        const count = await prisma.post.count({
          where: {
            To:postid
          }
        })
        if(postid){
          await prisma.post.update({
            data: {
              postCount: count,
            },
            where: {
              id: postid,
            },
          });
        }
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