import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const Trends = await prisma.post.findMany({
            where: {
                content: {
                    contains: "#",
                },
            },
            select: {
                content: true
            }
        });

        return NextResponse.json(
            { Trends, message: "Success" },
            { status: 201 },
        );
    } catch (err) {
        return NextResponse.json({ err, message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}