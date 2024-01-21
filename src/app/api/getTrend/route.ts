import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // UTCで15時に設定

        const posts = await prisma.post.findMany({
            where: {
                createdAt: {
                    gte: todayStart,
                },
                OR: [
                    { content: { contains: "#" } },
                    { content: { contains: "＃" } }
                ],
            },
            select: { content: true }
        });

        // ハッシュタグを抽出してカウントする
        const hashtagCounts: Record<string, number> = posts.reduce((acc, post) => {
            // 正規表現を使用してハッシュタグを抽出（'#' と '＃' の両方に対応）
            const hashtags = post.content.match(/[#＃][\wぁ-んァ-ン一-龠０-９]+/g) || [];
            hashtags.forEach(tag => {
                // ハッシュタグを正規化（小文字に変換し、全角の '#' を半角に変換）
                const normalizedTag = tag.toLowerCase().replace(/＃/, '#');
                acc[normalizedTag] = (acc[normalizedTag] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        // ハッシュタグを多い順にソートして上位10個を取得し、それぞれのカウントと共に
        const Trends = Object.entries(hashtagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => ({ tag: entry[0], count: entry[1] }));     
            
        return NextResponse.json(
            { Trends, message: "Success" },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}