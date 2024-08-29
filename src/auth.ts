import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma as db } from "./prisma"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import google from "next-auth/providers/google"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60, // 1 year
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        
        const {email, password} = credentials;

        const user = await db.user.findUnique({
          where: { email: email as string },
        })

        if (!user) {
          throw new Error("User not found")
        }

        const is_password_correct = bcrypt.compareSync(password as string, user.password as string)
        if (!is_password_correct) {
          throw new Error("Invalid credentials")
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            email_verified: user.emailVerified
        }
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  ],
  debug: process.env.NODE_ENV === 'development'
})