import { NextRequest, NextResponse } from "next/server";

async function resolveUrl(url: string): Promise<string> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return res.url;
}

function extractPlaceIdFromHtml(html: string): string | null {
  const match = html.match(/!1s(ChI[a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  return null;
}

function extractName(html: string): string | null {
  const match = html.match(/<title>(.*?)<\/title>/);
  if (!match) return null;
  return match[1].replace(" - Google Maps", "").trim();
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return res.text();
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("url");
  if (!input) {
    return NextResponse.json({ place_id: null }, { status: 400 });
  }

  try {
    const finalUrl = await resolveUrl(input);
    const html = await fetchHtml(finalUrl);
    const placeId = extractPlaceIdFromHtml(html);

    if (!placeId) {
      return NextResponse.json({ place_id: null }, { status: 200 });
    }

    const name = extractName(html);
    const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`;

    return NextResponse.json({
      place_id: placeId,
      business_name: name ?? null,
      review_link: reviewLink,
    });
  } catch {
    return NextResponse.json({ place_id: null }, { status: 200 });
  }
}
