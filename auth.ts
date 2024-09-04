import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import { getUserById, getUserIsBlocked } from "@/data/user"
import { authConfig } from "./auth.config"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const isBlocked = await getUserIsBlocked(user.id);

      if (isBlocked) return false;

      return true;
  },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})

