import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOption"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const userId = data.userId;
        const userName = data.userName;
        const followId = data.followId;
        const followName = data.followName;
        const now = new Date();
        await prisma.follow.create({
            data: {
                userId: userId,
                username: userName,
                followId: followId,
                followname: followName,
                createdAt: now,
            }
        })
        const followCount = await prisma.follow.count({
            where:{
                userId: String(userId),
            }
        })
        const followerCount = await prisma.follow.count({
          where:{
              followId: String(followId),
          }
        })
        await prisma.user.update({
            where:{
                id: String(userId),
            },
            data:{
                followCount:followCount
            }
        })
        await prisma.user.update({
            where:{
                id: String(followId),
            },
            data:{
                followerCount:followerCount
            }
        })
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
  export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        const userId = session.user.id
        const url = new URL(req.url);
        let Id = url.searchParams.get("Id");
        const followId = url.searchParams.get("followId");

        console.log(followId)
        if(!Id){
            const userId = url.searchParams.get("userId");
            const id = await prisma.follow.findFirst({
                where:{
                    userId: String(userId),
                    followId: String(followId)
                }
            })
            Id = String(id?.id)
        }

        await prisma.follow.delete({
            where:{
                id: String(Id)
            }
        })
        const followCount = await prisma.follow.count({
            where:{
                userId: String(userId),
            }
        })
        console.log(userId,"followCount", followCount)
        const followerCount = await prisma.follow.count({
          where:{
              followId: String(followId),
          }
        })
        console.log(followId,"followerCount", followerCount)
        await prisma.user.update({
            where:{
                id: String(userId),
            },
            data:{
                followCount:followCount
            }
        })
        await prisma.user.update({
            where:{
                id: String(followId),
            },
            data:{
                followerCount:followerCount
            }
        })
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