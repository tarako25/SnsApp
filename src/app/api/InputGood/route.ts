import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

//Good押したときの処理
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const postid = data.postId;
        const userid = data.userId;
        const now = new Date();
        await prisma.good.create({
            data: {
                postId: postid,
                createdAt: now,
                userId: userid
            }
        })
        const count = await prisma.good.count({
            where: {
                postId: postid,
            },
        });
        await prisma.post.update({
            data: {
              goodCount: count,
            },
            where: {
              id: postid,
            },
          });
      return NextResponse.json(
        { message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

  //Goodキャンセル
  export async function PUT(req: NextRequest, res: NextResponse) {
    try {
      const data = await req.json();
      const postid = data.postId;
      const userid = data.userId;
      const good = await prisma.good.findFirst({
        where: {
          postId: postid,
          userId: userid,
        },
      });
      const goodid = good?.id;
      await prisma.good.delete({
        where: {
          id: goodid,
          userId: userid,
        },
      });
  
      const count = await prisma.good.count({
        where: {
          postId: postid,
        },
      });
  
      await prisma.post.update({
        data: {
          goodCount: count,
        },
        where: {
          id: postid
        },
      });
  
      return NextResponse.json(
        { message: "Success" },
        { status: 201 },
      );
    } catch (err) {
      console.log(err)
      return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  