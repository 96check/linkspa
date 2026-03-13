"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireSpa } from "@/server/auth";
import { linkSchema } from "@/lib/validators/link";

interface ActionState {
  error: string | null;
  success: boolean;
}


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract the storage path from a full Supabase public URL.
 * e.g. ".../storage/v1/object/public/avatars/abc-123/avatar-1710000000.jpg"
 *   → "abc-123/avatar-1710000000.jpg"
 */
function extractStoragePath(publicUrl: string): string | null {
  try {
    const marker = "/storage/v1/object/public/avatars/";
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
  } catch {
    return null;
  }
}

function parseLinkForm(formData: FormData) {
  return {
    type: formData.get("type") as string,
    title: formData.get("title") as string,
    url: formData.get("url") as string,
    order: parseInt(formData.get("order") as string, 10) || 0,
    active: formData.get("active") === "on",
  };
}

function revalidate(slug: string) {
  revalidatePath("/dashboard");
  revalidatePath(`/${slug}`);
}

// ---------------------------------------------------------------------------
// Update Profile
// ---------------------------------------------------------------------------

export async function updateProfile(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const spaName = (formData.get("spa_name") as string)?.trim();
  const bio = (formData.get("bio") as string)?.trim() || null;
  const address_line1 = (formData.get("address_line1") as string)?.trim() || null;
  const address_line2 = (formData.get("address_line2") as string)?.trim() || null;
  const city = (formData.get("city") as string)?.trim() || null;
  const state_region = (formData.get("state_region") as string)?.trim() || null;
  const postal_code = (formData.get("postal_code") as string)?.trim() || null;
  const country = (formData.get("country") as string)?.trim() || null;
  const phone = (formData.get("phone") as string)?.trim() || null;

  if (!spaName || spaName.length < 1) {
    return { error: "Business name is required.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("spas")
    .update({
      spa_name: spaName,
      bio,
      address_line1,
      address_line2,
      city,
      state_region,
      postal_code,
      country,
      phone,
    })
    .eq("id", spa.id);

  if (error) {
    return { error: "Failed to save. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Upload Avatar
// ---------------------------------------------------------------------------

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadAvatar(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) {
    return { error: "Please select an image.", success: false };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only JPG, PNG, WebP and GIF are allowed.", success: false };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Image must be under 2 MB.", success: false };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filePath = `${spa.id}/avatar-${Date.now()}.${ext}`;

  const supabase = await createClient();

  // Delete the old avatar file from Storage (if one exists)
  if (spa.logo_url) {
    const oldPath = extractStoragePath(spa.logo_url);
    if (oldPath) {
      await supabase.storage.from("avatars").remove([oldPath]);
    }
  }

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Failed to upload image. Please try again.", success: false };
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // Update spa record
  const { error: updateError } = await supabase
    .from("spas")
    .update({ logo_url: urlData.publicUrl })
    .eq("id", spa.id);

  if (updateError) {
    return { error: "Failed to save. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Remove Avatar
// ---------------------------------------------------------------------------

export async function removeAvatar(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prev?: ActionState,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const supabase = await createClient();

  // Delete the file from Storage
  if (spa.logo_url) {
    const oldPath = extractStoragePath(spa.logo_url);
    if (oldPath) {
      await supabase.storage.from("avatars").remove([oldPath]);
    }
  }

  // Clear logo_url in database
  const { error } = await supabase
    .from("spas")
    .update({ logo_url: null })
    .eq("id", spa.id);

  if (error) {
    return { error: "Failed to remove avatar.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Update Theme
// ---------------------------------------------------------------------------

export async function updateTheme(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const theme = (formData.get("theme") as string)?.trim();
  if (!theme) {
    return { error: "Theme is required.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("spas")
    .update({ theme })
    .eq("id", spa.id);

  if (error) {
    return { error: "Failed to save theme. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Add Link
// ---------------------------------------------------------------------------

export async function addLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const parsed = linkSchema.safeParse(parseLinkForm(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
      success: false,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("links").insert({
    spa_id: spa.id,
    ...parsed.data,
  });

  if (error) {
    return { error: "Failed to add link. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Edit Link
// ---------------------------------------------------------------------------

export async function editLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;

  if (!linkId) {
    return { error: "Link ID is required.", success: false };
  }

  const parsed = linkSchema.safeParse(parseLinkForm(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input",
      success: false,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("links")
    .update(parsed.data)
    .eq("id", linkId)
    .eq("spa_id", spa.id);

  if (error) {
    return { error: "Failed to save. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Delete Link
// ---------------------------------------------------------------------------

export async function removeLinkAction(formData: FormData): Promise<void> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;
  if (!linkId) return;

  const supabase = await createClient();
  await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("spa_id", spa.id);

  revalidate(spa.slug);
}

// ---------------------------------------------------------------------------
// Resolve Google Maps short URL → Place ID
// ---------------------------------------------------------------------------

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/** Normalize Google share/short URL so fetch hits the right host */
function normalizeGoogleMapsUrl(url: string): string {
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (parsed.hostname === "share.google") {
      parsed.hostname = "share.google.com";
    }
    if (!parsed.protocol.startsWith("http")) parsed.protocol = "https:";
    return parsed.toString();
  } catch {
    return trimmed;
  }
}

/** Extract a ChIJ place_id from any string (URL, HTML, raw id) */
function extractPlaceIdFromText(text: string): string | null {
  if (!text) return null;

  // ?placeid= parameter
  const paramMatch = text.match(/[?&]placeid=([^&"'\s]+)/i);
  if (paramMatch) return decodeURIComponent(paramMatch[1]);

  // place_id:… or place_id=… format
  const colonMatch = text.match(/place_id[=:]([^&/\s"']+)/i);
  if (colonMatch) return decodeURIComponent(colonMatch[1]);

  // JSON-style "place_id":"ChIJ…" or 'place_id':'ChIJ…'
  const jsonMatch = text.match(/["']place_id["']\s*:\s*["'](ChIJ[A-Za-z0-9_-]+)["']/i);
  if (jsonMatch) return jsonMatch[1];

  // !1sChIJ… inside Maps data params (URL or data=)
  const dataMatch = text.match(/!1s(ChIJ[^!&\s"']+)/);
  if (dataMatch) return dataMatch[1];

  // Any ChIJ token (≥20 chars after prefix to reduce false positives)
  const anyMatch = text.match(/(ChIJ[A-Za-z0-9_-]{20,})/);
  if (anyMatch) return anyMatch[1];

  return null;
}

/**
 * Try to find a redirect URL buried in HTML:
 * consent pages, meta-refresh, canonical/og:url, JS redirects.
 */
function extractRedirectUrl(html: string): string | null {
  // 1. Google consent page → ?continue=<encoded-url>
  const continueMatch = html.match(
    /[?&]continue=(https?(?:%3A|:)(?:%2F|\/){2}[^&"'\s]+)/i,
  );
  if (continueMatch) {
    try {
      return decodeURIComponent(continueMatch[1]);
    } catch {
      /* ignore bad encoding */
    }
  }

  // 2. <meta http-equiv="refresh" content="0;url=…">
  const metaRefresh = html.match(
    /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*?url=([^"'\s;>]+)/i,
  );
  if (metaRefresh) return metaRefresh[1].replace(/&amp;/g, "&");

  // 3. <link rel="canonical" href="…"> (only if it points to Maps)
  const canonical = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["'](https?:\/\/[^"']+google[^"']*\/maps[^"']*)/i,
  );
  if (canonical) return canonical[1].replace(/&amp;/g, "&");

  // 4. <meta property="og:url" content="…"> (only if it points to Maps)
  const ogUrl = html.match(
    /<meta[^>]+property=["']og:url["'][^>]+content=["'](https?:\/\/[^"']+google[^"']*\/maps[^"']*)/i,
  );
  if (ogUrl) return ogUrl[1].replace(/&amp;/g, "&");

  // 5. JS redirect: window.location = "…" or window.location.href = "…"
  const jsRedir = html.match(
    /window\.location(?:\.href)?\s*=\s*["'](https?:\/\/[^"']+)/,
  );
  if (jsRedir) return jsRedir[1];

  // 6. Any Google Maps URL in the page (href or embedded)
  const mapsLink = html.match(
    /["'](https?:\/\/(?:www\.)?google\.[a-z.]+\/maps\/place\/[^"'\s]+)["']/i,
  );
  if (mapsLink) return mapsLink[1].replace(/&amp;/g, "&");

  // 7. Short link that might redirect again (goo.gl, maps.app.goo.gl)
  const shortLink = html.match(
    /["'](https?:\/\/(?:maps\.app\.)?goo\.gl\/[^"'\s]+)["']/i,
  );
  if (shortLink) return shortLink[1].replace(/&amp;/g, "&");

  // 8. share.google.com link in page
  const shareLink = html.match(
    /["'](https?:\/\/share\.google\.com\/[^"'\s]+)["']/i,
  );
  if (shareLink) return shareLink[1].replace(/&amp;/g, "&");

  // 9. Any google.*/maps URL (wider match for redirect targets)
  const anyMaps = html.match(
    /["'](https?:\/\/[^"']*google[^"']*\/maps[^"']*)["']/i,
  );
  if (anyMaps) return anyMaps[1].replace(/&amp;/g, "&");

  return null;
}

/** Fetch a URL following HTTP redirects, with timeout */
async function fetchWithTimeout(
  url: string,
  signal: AbortSignal,
): Promise<{ finalUrl: string; html: string }> {
  const response = await fetch(url, {
    redirect: "follow",
    signal,
    headers: FETCH_HEADERS,
  });
  const html = await response.text();
  return { finalUrl: response.url, html };
}

export async function resolveGooglePlaceId(
  inputUrl: string,
): Promise<{ placeId: string | null; error: string | null }> {
  const trimmed = inputUrl.trim();
  if (!trimmed) return { placeId: null, error: "Please enter a URL." };

  // Quick extraction (no fetch needed)
  if (/^ChIJ[A-Za-z0-9_-]+$/.test(trimmed)) {
    return { placeId: trimmed, error: null };
  }
  const quick = extractPlaceIdFromText(trimmed);
  if (quick) return { placeId: quick, error: null };

  // Only attempt fetch for URLs
  if (!/^https?:\/\//i.test(trimmed)) {
    return { placeId: null, error: null };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    let currentUrl = normalizeGoogleMapsUrl(trimmed);
    const visited = new Set<string>();

    // Follow up to 5 hops (HTTP redirects + HTML-based redirects)
    for (let hop = 0; hop < 5; hop++) {
      if (visited.has(currentUrl)) break;
      visited.add(currentUrl);

      const { finalUrl, html } = await fetchWithTimeout(
        currentUrl,
        controller.signal,
      );

      // Check the final redirect URL
      const fromUrl = extractPlaceIdFromText(finalUrl);
      if (fromUrl) return { placeId: fromUrl, error: null };

      // Scan the HTML body (first 500 KB)
      const slice = html.slice(0, 500_000);
      const fromHtml = extractPlaceIdFromText(slice);
      if (fromHtml) return { placeId: fromHtml, error: null };

      // Try to find a next URL to follow (consent page, meta-refresh, etc.)
      const nextUrl = extractRedirectUrl(slice);
      if (!nextUrl || visited.has(nextUrl)) break;

      currentUrl = nextUrl;
    }

    return {
      placeId: null,
      error:
        "Could not extract Place ID. Try pasting the Place ID directly (starts with ChIJ).",
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { placeId: null, error: "Request timed out. Please try again." };
    }
    return {
      placeId: null,
      error: "Failed to resolve URL. Try pasting the Place ID directly.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Update Google Review URL
// ---------------------------------------------------------------------------

export async function updateGoogleReview(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { spa } = await requireSpa();

  const googleReviewUrl =
    (formData.get("google_review_url") as string)?.trim() || null;

  const supabase = await createClient();
  const { error } = await supabase
    .from("spas")
    .update({ google_review_url: googleReviewUrl })
    .eq("id", spa.id);

  if (error) {
    return { error: "Failed to save. Please try again.", success: false };
  }

  revalidate(spa.slug);
  return { error: null, success: true };
}

// ---------------------------------------------------------------------------
// Reorder Links
// ---------------------------------------------------------------------------

export async function reorderLinks(orderedIds: string[]): Promise<void> {
  const { spa } = await requireSpa();
  if (!orderedIds.length) return;

  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from("links")
        .update({ order: index })
        .eq("id", id)
        .eq("spa_id", spa.id),
    ),
  );

  revalidate(spa.slug);
}

// ---------------------------------------------------------------------------
// Toggle Link Active
// ---------------------------------------------------------------------------

export async function toggleLinkAction(formData: FormData): Promise<void> {
  const { spa } = await requireSpa();
  const linkId = formData.get("id") as string;
  if (!linkId) return;

  const supabase = await createClient();
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

  revalidate(spa.slug);
}
