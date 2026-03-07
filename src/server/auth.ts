import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Spa } from "@/types/database";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Returns the authenticated user and their spa.
 * Redirects to /login if not authenticated, /onboarding if no spa.
 * Wrapped with React cache() so layout + page share one DB call per request.
 */
export const requireSpa = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();

  const { data } = await supabase
    .from("spas")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) {
    redirect("/onboarding");
  }

  return { user, spa: data as Spa };
});
