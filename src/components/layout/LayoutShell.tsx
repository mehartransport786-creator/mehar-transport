"use client";

import { usePathname } from "next/navigation";

export function LayoutShell({ 
  children,
  navbar,
  footer
}: { 
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("/admin") || false;

  return (
    <>
      {!isAdmin && navbar}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isAdmin && footer}
    </>
  );
}
