import { createClient } from "@/lib/supabase/server";
import type { Spa, Link } from "@/types/database";

export async function getSpaBySlug(slug: string): Promise<Spa | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("spas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Spa;
}

export async function getLinksBySpaId(spaId: string): Promise<Link[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("spa_id", spaId)
    .eq("active", true)
    .order("order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as Link[];
}
