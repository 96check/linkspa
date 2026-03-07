export const runtime = "nodejs";

import { redirect } from "next/navigation";
import { requireUser } from "@/server/auth";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const user = await requireUser();

  const supabase = await createClient();
  const { data: existingSpa } = await supabase
    .from("spas")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existingSpa) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-black px-4 selection:bg-orange-500/30">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-600/[0.07] blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-[350px] w-[350px] rounded-full bg-yellow-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <p className="flex items-center justify-center gap-1.5 text-lg font-bold tracking-tight text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 text-xs font-black text-black">
            L
          </span>
          Link
          <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Spa
          </span>
        </p>

        {/* Header */}
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 ring-1 ring-orange-500/20">
            <span className="text-2xl" aria-hidden="true">&#x2728;</span>
          </div>
          <h1 className="mt-5 text-2xl font-bold text-white">
            Welcome! Let&apos;s set up your page
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            This takes 30 seconds. Your customers will see this page
            when they scan your QR code.
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
