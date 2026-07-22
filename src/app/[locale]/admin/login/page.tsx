import LoginForm from "./LoginForm";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { locale } = await params;
  const { callbackUrl, error } = await searchParams;

  const safeCallback =
    callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : `/admin`;

  return (
    <div className="min-h-screen w-full flex bg-muted dark:bg-[#0F172A]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between bg-primary p-12 overflow-hidden">
        {/* Abstract luxury background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-secondary to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-white/95 rounded-xl p-2.5 shadow-2xl">
              <img src="/logo.png" alt="Mehar Transport" className="h-10 w-auto" />
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wider text-xl">MEHAR TRANSPORT</h1>
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-medium">Enterprise Operations</p>
            </div>
          </div>

          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Command Center for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-200">
                Premium Transport
              </span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg font-light">
              Securely manage VIP bookings, fleet operations, customer requests, and executive transportation services across Saudi Arabia.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/40 text-sm font-medium">
          <span>&copy; {new Date().getFullYear()} Mehar Transport</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <span>Riyadh, Saudi Arabia</span>
        </div>
      </div>

      {/* Right Side - Authentication */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 relative">
        <div className="absolute top-8 right-8 z-50">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-auto relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-12">
             <div className="bg-primary rounded-xl p-2 shadow-xl">
              <img src="/logo.png" alt="Mehar" className="h-10 w-auto brightness-0 invert" />
            </div>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Sign in to Dashboard
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Enter your admin credentials to access the platform.
            </p>
          </div>

          <LoginForm callbackUrl={safeCallback} initialError={error} />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Protected by Enterprise-grade Authentication. <br />
              All access attempts are logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
