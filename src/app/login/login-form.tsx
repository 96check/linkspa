"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/server/actions/auth";
import { SubmitButton } from "@/components/submit-button";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, { error: null });

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-black px-4 selection:bg-orange-500/30">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-orange-600/[0.07] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-yellow-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-1.5 text-lg font-bold tracking-tight text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 text-xs font-black text-black">
            S
          </span>
          <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            SalonLink
          </span>
        </Link>

        {/* Header */}
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 ring-1 ring-orange-500/20">
            <span className="text-2xl" aria-hidden="true">&#x1F44B;</span>
          </div>
          <h1 className="mt-5 text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your spa page
          </p>
        </div>

        {/* Form card */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
          <form action={formAction} className="space-y-5">
            {state.error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              />
            </div>

            <SubmitButton>Sign in</SubmitButton>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            Create one free
          </Link>
        </p>
      </div>
    </main>
  );
}
