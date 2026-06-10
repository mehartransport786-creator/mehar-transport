"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(`/${locale}/admin`);
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F9FC] dark:bg-[#0F172A]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between bg-[#1B1E4F] p-12 overflow-hidden">
        {/* Abstract luxury background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#D9A63A] to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Command Center for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A63A] to-amber-200">
                Premium Transport
              </span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg font-light">
              Securely manage VIP bookings, fleet operations, customer requests, and executive transportation services across Saudi Arabia.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/40 text-sm font-medium">
          <span>&copy; {new Date().getFullYear()} Mehar Transport</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A63A]" />
          <span>Riyadh, Saudi Arabia</span>
        </div>
      </div>

      {/* Right Side - Authentication */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 relative">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-12">
             <div className="bg-[#1B1E4F] rounded-xl p-2 shadow-xl">
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

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/30 flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className={`block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1E4F] dark:focus:ring-[#D9A63A] transition-all sm:text-sm ${
                    errors.email ? "border-red-300 focus:ring-red-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                  placeholder="admin@mehar.sa"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button type="button" className="text-sm font-semibold text-[#1B1E4F] hover:text-[#D9A63A] dark:text-[#D9A63A] dark:hover:text-white transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`block w-full pl-11 pr-11 py-3 bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1E4F] dark:focus:ring-[#D9A63A] transition-all sm:text-sm ${
                    errors.password ? "border-red-300 focus:ring-red-500" : "border-slate-200 dark:border-slate-800"
                  }`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-[#1B1E4F] focus:ring-[#1B1E4F] border-slate-300 rounded cursor-pointer"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-[#1B1E4F] hover:bg-[#1B1E4F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B1E4F] disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0 dark:bg-[#D9A63A] dark:text-[#1B1E4F] dark:hover:bg-[#D9A63A]/90"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

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
