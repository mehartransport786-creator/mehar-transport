import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});

const { auth } = NextAuth(authConfig);

/** Strips the locale segment: /en/admin/login -> /admin/login */
function stripLocale(pathname: string): { locale: string; rest: string } {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  if (LOCALES.includes(maybeLocale as (typeof LOCALES)[number])) {
    return { locale: maybeLocale, rest: "/" + segments.slice(1).join("/") };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname };
}

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl;
  const { locale, rest } = stripLocale(pathname);

  const isAdminRoute = rest === "/admin" || rest.startsWith("/admin/");
  const isLoginRoute = rest === "/admin/login";

  // Non-admin routes: i18n only.
  if (!isAdminRoute) return intlMiddleware(req);

  // The login page is NEVER protected. Without this, it redirects to itself.
  if (isLoginRoute) return intlMiddleware(req);

  const isAuthenticated = Boolean(req.auth);
  if (isAuthenticated) return intlMiddleware(req);

  // Locale-aware redirect target. A bare "/admin/login" would be re-prefixed
  // by the i18n middleware and re-evaluated here — that is the loop.
  const loginUrl = new URL(`/${locale}/admin/login`, req.nextUrl.origin);

  // Self-redirect guard: never redirect a path to itself, whatever the logic above.
  if (loginUrl.pathname === pathname) return intlMiddleware(req);

  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
