import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin/login";

  // Non-admin routes: i18n only.
  if (!isAdminRoute) return intlMiddleware(req);

  // The login page is NEVER protected. Without this, it redirects to itself.
  if (isLoginRoute) return intlMiddleware(req);

  const isAuthenticated = Boolean(req.auth);
  if (isAuthenticated) return intlMiddleware(req);

  // Unauthenticated user accessing an admin route. Redirect to login.
  const loginUrl = new URL(`/admin/login`, req.nextUrl.origin);

  // Self-redirect guard: never redirect a path to itself.
  if (loginUrl.pathname === pathname) return intlMiddleware(req);

  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
