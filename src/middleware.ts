import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

/**
 * Auth handler — only instantiated for requests that actually need auth.
 * Handles both admin page protection (redirect to login) and admin API
 * protection (401 JSON response).
 */
const adminAuthHandler = auth((req) => {
  const { pathname } = req.nextUrl;

  // --- API guard ---
  if (pathname.startsWith('/api/admin') && !req.auth) {
    return Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // --- Page guard (non-API admin routes) ---
  if (!pathname.startsWith('/api')) {
    const isLoginPage = pathname.includes('/admin/login');

    if (!isLoginPage && !req.auth) {
      const localeMatch = pathname.match(
        new RegExp(`^/(${routing.locales.join('|')})`)
      );
      const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return Response.redirect(loginUrl);
    }

    // Run i18n middleware for authenticated admin page requests
    return intlMiddleware(req);
  }
});

/**
 * Main middleware entry point.
 *
 * Critical optimisation (Step 2):
 *   The previous implementation wrapped the *entire* middleware in `auth()`,
 *   which caused NextAuth v5 to HKDF-derive + AES-GCM-decrypt the session JWT
 *   on every matched request — including anonymous visitors on public pages,
 *   every blog post, and every API call. That JWT crypto runs on every cold
 *   start and contributed significantly to Active CPU usage.
 *
 *   Now, the auth wrapper is only invoked for paths that actually require
 *   authentication (/admin/* pages and /api/admin/* routes). Public pages and
 *   non-admin API routes skip auth entirely and only run next-intl routing.
 */
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Non-admin API routes → pass through immediately (no auth, no intl)
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/admin')) {
    return;
  }

  // Admin paths (pages or API) → run JWT decode + guard
  if (pathname.includes('/admin') || pathname.startsWith('/api/admin')) {
    try {
      // NextAuth v5 auth() HOC expects AppRouteHandlerFnContext as second arg,
      // but in middleware mode it only reads the request. Pass an empty context
      // to satisfy TypeScript without changing runtime behaviour.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authRes = await adminAuthHandler(req, {} as any);
      if (authRes) {
        // If it's a redirect or JSON response (from adminAuthHandler), return it
        // but we also need to pass the pathname to the layout
        authRes.headers.set('x-middleware-request-x-pathname', pathname);
        return authRes;
      }
    } catch (error) {
      console.error('Middleware Auth Error:', error);
      // Fail closed
      if (pathname.startsWith('/api/admin')) {
        return Response.json(
          { success: false, error: 'Unauthorized (System Error)' },
          { status: 401 }
        );
      }
      return Response.redirect(new URL('/', req.url));
    }
  }

  // All public pages → only run next-intl (locale detection + redirect)
  const res = intlMiddleware(req);
  res.headers.set('x-middleware-request-x-pathname', pathname);
  return res;
}

export const config = {
  // Match everything except _next internals and static files
  matcher: ['/((?!_next|.*\\..*).*)', '/api/admin/:path*'],
};
