import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma as db } from "./prisma"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import google from "next-auth/providers/google"

declare module "next-auth" {
  interface User {
    onboarded: boolean;
  }
}
 
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
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

        // check the account provider is credentials
        const account = await db.account.findFirst({
          where: {
            userId: user.id!,
            provider: "google",
          },
        })
        if (account) {
          throw new Error("Account already linked to a user, please use appropriate provider to sign in")
        }

        // check if user is verified
        if (!user.emailVerified) {
          throw new Error("Email not verified. Please check your email for the verification link or Get a new one.")
        }

        const is_password_correct = bcrypt.compareSync(password as string, user.password as string)
        if (!is_password_correct) {
          throw new Error("Invalid credentials")
        }

        // check onboarded
        const profile = await db.profile.findUnique({
          where: {
            userId: user.id
          }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            onboarded: profile ? true : false
        }
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session.user.onboarded) {
        token.onboarded = session.user.onboarded;
        return token;
      };

      if (user) {
        token.id = user.id
        token.onboarded = user.onboarded
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.onboarded = token.onboarded as boolean
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development'
})