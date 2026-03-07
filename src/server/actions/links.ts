"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireSpa } from "@/server/auth";
import { linkSchema } from "@/lib/validators/link";

interface ActionState {
  error: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFormData(formData: FormData) {
  return {
    type: formData.get("type") as string,
    title: formData.get("title") as string,
    url: formData.get("url") as string,
    order: parseInt(formData.get("order") as string, 10) || 0,
    active: formData.get("active") === "on",
  };
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createLink(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const parsed = linkSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createClient();
  const { error } = await supabase.from("links").insert({
    spa_id: spa.id,
    ...parsed.data,
  });

  if (error) {
    return { error: "Failed to create link. Please try again." };
  }

  revalidatePath(`/${spa.slug}`);
  redirect("/dashboard/links");
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateLink(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;

  if (!linkId) {
    return { error: "Link ID is required." };
  }

  const parsed = linkSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("links")
    .update(parsed.data)
    .eq("id", linkId)
    .eq("spa_id", spa.id);

  if (error) {
    return { error: "Failed to update link. Please try again." };
  }

  revalidatePath(`/${spa.slug}`);
  redirect("/dashboard/links");
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteLink(formData: FormData): Promise<void> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;
  if (!linkId) return;

  const supabase = createClient();
  await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("spa_id", spa.id);

  revalidatePath("/dashboard/links");
  revalidatePath(`/${spa.slug}`);
}

// ---------------------------------------------------------------------------
// Toggle active
// ---------------------------------------------------------------------------

export async function toggleLinkActive(formData: FormData): Promise<void> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;
  if (!linkId) return;

  const supabase = createClient();

  // Fetch current state — never trust the client
  const { data: link } = await supabase
    .from("links")
    .select("active")
    .eq("id", linkId)
    .eq("spa_id", spa.id)
    .single();

  if (!link) return;

  await supabase
    .from("links")
    .update({ active: !link.active })
    .eq("id", linkId)
    .eq("spa_id", spa.id);

  revalidatePath("/dashboard/links");
  revalidatePath(`/${spa.slug}`);
}
