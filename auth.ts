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
      // Adicionar novos campos do DB ao token
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.isBlocked = token.isBlocked as boolean;
      }
      if (token.username && session.user) {
        session.user.username = token.username as string;
      }
      if (token.phone && session.user) {
        session.user.phone = token.phone as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // Adicionar novos campos do DB ao token
      token.role = existingUser.role;
      token.isBlocked = existingUser.isBlocked;
      token.username = existingUser.username;
      token.phone = existingUser.phone;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})

