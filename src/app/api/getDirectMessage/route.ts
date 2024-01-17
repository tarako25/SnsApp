import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session.user.id
    const userName = session.user.name
    const url = new URL(req.url);
    const targetId = url.searchParams.get("targetId");
    const targetName = url.searchParams.get("targetName");
    const message = await req.json();
    //日付作成
    const now = new Date();
    //ISO形式に変換
    const nowISO8601 = now.toISOString();

    await prisma.directMessage.create({
      data: {
        userId: userId,
        targetId: String(targetId),
        username: userName,
        targetname: String(targetName),
        content: String(message),
        createdAt: nowISO8601,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session.user.id
    const url = new URL(req.url);
    const targetId = url.searchParams.get("targetId");

    const data = await prisma.directMessage.findMany({
      orderBy: {
        createdAt: "desc", // createdAt フィールドで降順に並べ替える
      },
      take: 20,
      where: {
        targetId: {
          in: [String(userId), String(targetId)],
        },
        userId: {
          in: [String(userId), String(targetId)],
        },
      },
      include: {
        user: true
      }
    });
    return NextResponse.json({ data, message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}