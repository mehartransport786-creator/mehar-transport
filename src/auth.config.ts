import type { NextAuthConfig } from 'next-auth';

// F23: Never fall back to a hardcoded secret. If AUTH_SECRET is unset the app
// should fail loudly at startup rather than silently issue forgeable tokens.
if (!process.env.AUTH_SECRET) {
  throw new Error(
    'AUTH_SECRET environment variable is not set. The application cannot start securely.'
  );
}

export const authConfig = {
  pages: {
    signIn: '/en/admin/login',
  },
  providers: [], // Populated in auth.ts
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
