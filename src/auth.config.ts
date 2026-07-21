import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // Locale is injected by middleware; this is the fallback only.
  pages: {
    signIn: "/en/admin/login",
    error: "/en/admin/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "admin";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },

  // No providers here — credentials logic lives in auth.ts (Node runtime only).
  providers: [],
} satisfies NextAuthConfig;
