export const metadata = {
  robots: { index: false, follow: false },
};

// Deliberately performs NO session check. This is the login page.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0F172A] text-neutral-100">{children}</div>;
}
