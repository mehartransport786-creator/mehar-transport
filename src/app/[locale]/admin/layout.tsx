import { auth } from "@/auth";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { redirect } from "@/i18n/routing";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Middleware should catch this, but adding a server-side safeguard is best practice
  if (!session?.user) {
    // We don't have access to the exact locale here easily in the server component without params, 
    // but middleware handles the precise locale redirect. If it reaches here, it's a fallback.
    redirect({ href: '/admin/login', locale: 'en' });
  }

  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  );
}
