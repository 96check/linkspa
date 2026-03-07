const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";
const BASE = "https://api.mapbox.com/search/searchbox/v1";

/* ── Types ────────────────────────────────────────── */

export interface AddressSuggestion {
  mapbox_id: string;
  name: string;           // e.g. "123 Main St"
  full_address: string;   // e.g. "123 Main St, Springfield, IL 62704, United States"
}

export interface ParsedAddress {
  address_line1: string;
  city: string;
  state_region: string;
  postal_code: string;
  country: string; // ISO 3166-1 alpha-2
}

/* ── Suggest ──────────────────────────────────────── */

export async function suggestAddresses(
  query: string,
  sessionToken: string,
): Promise<AddressSuggestion[]> {
  if (!MAPBOX_TOKEN) {
    console.warn("[mapbox] NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");
    return [];
  }
  if (query.length < 3) return [];

  const params = new URLSearchParams({
    q: query,
    language: "en",
    types: "address",
    limit: "5",
    session_token: sessionToken,
    access_token: MAPBOX_TOKEN,
  });

  try {
    const res = await fetch(`${BASE}/suggest?${params}`);
    if (!res.ok) {
      const body = await res.text();
      console.error(`[mapbox] suggest ${res.status}: ${body}`);
      return [];
    }

    const data = await res.json();

    return (data.suggestions ?? []).map((s: Record<string, string>) => ({
      mapbox_id: s.mapbox_id,
      name: s.name,
      full_address: s.full_address ?? s.name,
    }));
  } catch (err) {
    console.error("[mapbox] suggest error:", err);
    return [];
  }
}

/* ── Retrieve ─────────────────────────────────────── */

export async function retrieveAddress(
  mapboxId: string,
  sessionToken: string,
): Promise<ParsedAddress | null> {
  if (!MAPBOX_TOKEN) {
    console.warn("[mapbox] NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");
    return null;
  }

  const params = new URLSearchParams({
    session_token: sessionToken,
    access_token: MAPBOX_TOKEN,
  });

  try {
    const res = await fetch(`${BASE}/retrieve/${mapboxId}?${params}`);
    if (!res.ok) {
      const body = await res.text();
      console.error(`[mapbox] retrieve ${res.status}: ${body}`);
      return null;
    }

    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature) return null;

    const props = feature.properties;
    const ctx = props.context ?? {};

    return {
      address_line1: props.name ?? "",
      city: ctx.place?.name ?? ctx.locality?.name ?? "",
      state_region: ctx.region?.name ?? ctx.district?.name ?? "",
      postal_code: ctx.postcode?.name ?? "",
      country: ctx.country?.country_code?.toUpperCase() ?? "",
    };
  } catch (err) {
    console.error("[mapbox] retrieve error:", err);
    return null;
  }
}
