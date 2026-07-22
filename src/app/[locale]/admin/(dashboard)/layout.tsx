import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Never throws: a session read failure (e.g. a cookie encrypted with a
  // rotated secret) must fail closed, not crash the render.
  let isAuthenticated = false;
  let session = null;
  try {
    session = await auth();
    isAuthenticated = Boolean(session?.user);
  } catch (err: any) {
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err; // Must bubble up so Next.js switches to dynamic rendering
    }
    console.error("[admin-layout] session read failed:", err);
    isAuthenticated = false;
  }

  if (!isAuthenticated) redirect(`/admin/login`);

  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  );
}
