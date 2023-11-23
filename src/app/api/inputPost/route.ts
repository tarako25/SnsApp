import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const username = data.userName;
        const userid = data.userId;
        const content = data.content;
        const now = new Date();
        const user = await prisma.post.create({
            data: {
                username: String(username),
                content: content,
                createdAt: now,
                userId: userid
            }
        })
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