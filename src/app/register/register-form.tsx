"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { register } from "@/server/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { BrandLogo } from "@/components/brand-logo";

export default function RegisterForm() {
  const [state, formAction] = useFormState(register, { error: null });

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-black px-5 selection:bg-orange-500/30">
      {/* ── Full-screen ambient background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-grid bg-noise absolute inset-0" />
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-orange-600/[0.08] blur-[160px]" />
        <div className="absolute bottom-[-10%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-500/[0.04] blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* ── Logo with glow ring ── */}
        <div className="animate-fade-in flex justify-center">
          <Link href="/" className="group relative text-2xl">
            <div className="animate-breathe absolute -inset-4 rounded-2xl bg-gradient-to-r from-orange-500/[0.08] to-yellow-500/[0.05] blur-xl" />
            <div className="relative">
              <BrandLogo />
            </div>
          </Link>
        </div>

        {/* ── Header ── */}
        <div className="animate-fade-up delay-100 mt-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              free page
            </span>
          </h1>
          <p className="mt-2.5 text-[15px] text-gray-500">
            Set up your spa&apos;s link page in under a minute
          </p>
        </div>

        {/* ── Form card with animated border ── */}
        <div className="animate-fade-up delay-200 group relative mt-8 rounded-2xl p-px">
          {/* Rotating gradient border */}
          <div className="absolute -inset-px overflow-hidden rounded-2xl">
            <div className="animate-spin-slow absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#f97316_50%,transparent_70%,transparent_100%)] opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
          </div>

          {/* Card body */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 sm:p-8">
            <form action={formAction} className="space-y-5">
              {state.error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {state.error}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[15px] w-[15px] text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 transition-all focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-[15px] w-[15px] text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 transition-all focus:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-600">Use 6 or more characters</p>
              </div>

              {/* Submit */}
              <SubmitButton variant="gradient">Get started free</SubmitButton>
            </form>
          </div>
        </div>

        {/* ── Trust pills ── */}
        <div className="animate-fade-up delay-300 mt-6 flex items-center justify-center gap-4">
          {[
            { icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", text: "No credit card" },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "60s setup" },
            { icon: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", text: "Free forever" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5 text-[11px] text-gray-600">
              <svg className="h-3 w-3 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
              </svg>
              {item.text}
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="animate-fade-up delay-300 relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-4 text-xs text-gray-600">Already have an account?</span>
          </div>
        </div>

        {/* ── Login CTA ── */}
        <Link
          href="/login"
          className="animate-fade-up delay-400 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-gray-300 transition-all hover:border-orange-500/20 hover:bg-white/[0.06] hover:text-white"
        >
          Sign in to your account
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </Link>

        {/* ── Legal ── */}
        <p className="animate-fade-in delay-500 mt-8 text-center text-[11px] leading-relaxed text-gray-600">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
