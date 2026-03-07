import { NextResponse } from "next/server";

// TEMPORARY: Remove this route after debugging
export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? process.env.NEXT_PUBLIC_SUPABASE_URL.slice(0, 30) + "..."
      : "MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "SET (length=" + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ")"
      : "MISSING",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
}
