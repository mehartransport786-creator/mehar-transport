import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/en/admin/login',
  },
  providers: [], // Populated in auth.ts
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET || "default_secret_for_development_only",
} satisfies NextAuthConfig;
