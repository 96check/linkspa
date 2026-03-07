import { createClient } from "@/lib/supabase/server";
import { requireSpa } from "@/server/auth";
import type { Link } from "@/types/database";

/**
 * Fetch all links belonging to the authenticated user's spa.
 * Sorted by "order" ascending.
 */
export async function getLinksForCurrentUser(): Promise<Link[]> {
  const { spa } = await requireSpa();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("spa_id", spa.id)
    .order("order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as Link[];
}

/**
 * Fetch a single link by ID, scoped to the authenticated user's spa.
 * Returns null if not found or not owned.
 */
export async function getLinkById(linkId: string): Promise<Link | null> {
  const { spa } = await requireSpa();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("id", linkId)
    .eq("spa_id", spa.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Link;
}
