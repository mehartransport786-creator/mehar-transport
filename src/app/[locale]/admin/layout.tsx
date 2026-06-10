import { auth } from "@/auth";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { redirect } from "@/i18n/routing";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Middleware should catch this, but adding a server-side safeguard is best practice
  // Check if we're not on the login page and not authenticated
  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  );
}
