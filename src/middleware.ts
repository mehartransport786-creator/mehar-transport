import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // Run locale logic first to get the resolved response
  const res = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin/login" || pathname === "/en/admin/login";

  // If it's an admin route and not the login page, check auth
  if (isAdminRoute && !isLoginRoute) {
    // Cheap non-DB check for proxy:
    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = isProduction ? "__Secure-authjs.session-token" : "authjs.session-token";
    
    const token = await getToken({ 
      req, 
      secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
      cookieName,
      secureCookie: isProduction
    });
    
    if (!token) {
      const loginUrl = new URL(`/admin/login`, req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Public routes, login route, or authenticated admin routes return the locale response immediately
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
