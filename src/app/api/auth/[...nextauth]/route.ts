import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient()

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      }),
      GoogleProvider({
          clientId: process.env.Google_CLIENT_ID ?? '',
          clientSecret: process.env.Google_CLIENT_SECRET ?? '',
        }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
        session: async ({ session, user }: { session: any; user: any }) => {
          if (user) {
            session.user.id = user.id; // userIdをセッションに追加
          }
          return session;
        },
      },
}

export default NextAuth(authOptions)