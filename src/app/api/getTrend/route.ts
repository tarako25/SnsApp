import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const trends = await prisma.post.findMany({
            where: {
                OR: [
                    { content: { contains: "#" } },
                    { content: { contains: "＃" } }
                ],
            },
            select: { content: true }
        });

        console.log("test0", trends)
        // ハッシュタグを抽出してカウントする
        const hashtagCounts: Record<string, number> = trends.reduce((acc, post) => {
            // 正規表現を使用してハッシュタグを抽出（'#' と '＃' の両方に対応）
            const hashtags = post.content.match(/[#＃][\wぁ-んァ-ン一-龠]+/g) || [];
            console.log("test1", hashtags)
            hashtags.forEach(tag => {
                // ハッシュタグを正規化（小文字に変換し、全角の '#' を半角に変換）
                const normalizedTag = tag.toLowerCase().replace(/＃/, '#');
                acc[normalizedTag] = (acc[normalizedTag] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        // 最も多いハッシュタグを見つける
        const mostCommonHashtag = Object.keys(hashtagCounts).reduce((a, b) => hashtagCounts[a] > hashtagCounts[b] ? a : b);

        console.log("test2",mostCommonHashtag)

        return NextResponse.json(
            { mostCommonHashtag, message: "Success" },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}