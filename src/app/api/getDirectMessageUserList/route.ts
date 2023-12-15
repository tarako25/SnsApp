import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"
import { pageItem } from "@/lib/PageItem"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session.user.id
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    const pageStart = (Number(page) - 1) * pageItem;
    const messages = await prisma.directMessage.findMany({
      where: {
        OR: [
            { userId: String(userId) },
            { targetId: String(userId) },
          ],
      },
      orderBy: {
        id: "desc",
      },
      skip:pageStart,
      take: pageItem,
      select: {
        userId: true,
        targetId: true,
        createdAt: true,
        content: true,
        // ここにusernameとtargetnameを追加します
        username: true,
        targetname: true,
      }
    });

    const user = messages.map(m => ({
      id: m.userId === userId ? m.targetId : m.userId,
      createdAt: m.createdAt,
      content: m.content,
      // ここにusernameとtargetnameを追加します
      username: m.username,
      targetname: m.targetname
    }));

    const uniqueUsers = Array.from(new Map(user.map(u => [u.id, u])).values());

    const count = uniqueUsers.length

    return NextResponse.json(
      { message: "Success", uniqueUsers, count },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ err, message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}