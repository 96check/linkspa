/**
 * Next.js only inlines NEXT_PUBLIC_* vars when accessed as
 * `process.env.NEXT_PUBLIC_XXX` (literal dot-notation).
 * Using `process.env[dynamicKey]` does NOT get inlined at build time,
 * which causes undefined on the client / Edge runtime.
 */

export const env = {
  get NEXT_PUBLIC_SUPABASE_URL(): string {
    const v = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!v) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
    return v;
  },
  get NEXT_PUBLIC_SUPABASE_ANON_KEY(): string {
    const v = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!v) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return v;
  },
  get NEXT_PUBLIC_APP_URL(): string {
    return (
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    );
  },
};
