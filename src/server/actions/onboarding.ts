"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { slugSchema } from "@/lib/validators/slug";
import { requireUser } from "@/server/auth";

interface OnboardingState {
  error: string | null;
}

export async function createSpa(
  _prevState: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const user = await requireUser();

  const spaName = formData.get("spa_name") as string;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const address_line1 = (formData.get("address_line1") as string)?.trim() || null;
  const address_line2 = (formData.get("address_line2") as string)?.trim() || null;
  const city = (formData.get("city") as string)?.trim() || null;
  const state_region = (formData.get("state_region") as string)?.trim() || null;
  const postal_code = (formData.get("postal_code") as string)?.trim() || null;
  const country = (formData.get("country") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;
  const rawSlug = formData.get("slug") as string;

  if (!spaName?.trim()) {
    return { error: "Business name is required." };
  }

  const slugResult = slugSchema.safeParse(rawSlug);
  if (!slugResult.success) {
    return { error: slugResult.error.issues[0].message };
  }

  const slug = slugResult.data;
  const supabase = await createClient();

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from("spas")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    return { error: "This address is already taken. Try another one." };
  }

  const { error } = await supabase.from("spas").insert({
    user_id: user.id,
    slug,
    spa_name: spaName.trim(),
    bio,
    address_line1,
    address_line2,
    city,
    state_region,
    postal_code,
    country,
    phone,
  });

  if (error) {
    console.error("Supabase insert error:", error);

    if (error.code === "23505") {
      return { error: "This address is already taken. Try another one." };
    }
    if (error.code === "42501") {
      return { error: "Permission denied. Please check your database policies." };
    }

    return { error: `Failed to create page: ${error.message}` };
  }

  redirect("/dashboard");
}
