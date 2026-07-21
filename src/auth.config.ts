import type { NextAuthConfig } from 'next-auth';

// NOTE: DO NOT add a module-level throw guard for AUTH_SECRET here.
// This file is imported by middleware.ts and auth.ts, both of which are
// evaluated at Next.js BUILD TIME during the "Collecting page data" phase.
// Environment variables like AUTH_SECRET are NOT available at build time.
// A top-level throw here crashes the build for EVERY route that imports auth.
// NextAuth itself enforces the secret at runtime and throws a clear error
// if AUTH_SECRET is genuinely missing when a real request is processed.

export const authConfig = {
  pages: {
    signIn: '/en/admin/login',
  },
  providers: [], // Populated in auth.ts
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET, // safe — undefined at build time, populated at runtime
  trustHost: true, // Fixes "Server configuration error" on live domains/proxies
} satisfies NextAuthConfig;
