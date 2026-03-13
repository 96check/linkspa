export const runtime = "nodejs";

import { requireSpa } from "@/server/auth";
import { logout } from "@/server/actions/auth";
import { env } from "@/lib/env";
import { CopyUrlButton } from "@/components/copy-url-button";
import { QrSheet } from "@/components/dashboard/qr-sheet";
import { buildStyledQrDataUrl } from "@/lib/styled-qr";
import { BrandLogo } from "@/components/brand-logo";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { spa } = await requireSpa();
  const publicUrl = `${env.NEXT_PUBLIC_APP_URL}/${spa.slug}`;

  const qrOpts = { size: 400, accentSeed: spa.slug };
  const [qrLight, qrDark] = await Promise.all([
    buildStyledQrDataUrl(publicUrl, { ...qrOpts, mode: "light" as const }),
    buildStyledQrDataUrl(publicUrl, { ...qrOpts, mode: "dark" as const }),
  ]);

  return (
    <div className="min-h-[100dvh] bg-[#09090b]">
      {/* Very subtle top glow for warmth */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-gradient-to-b from-orange-500/[0.03] to-transparent" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-5">
          <a href="/dashboard" className="flex items-center text-[14px]">
            <BrandLogo />
          </a>

          <div className="flex items-center gap-1">
            <CopyUrlButton url={publicUrl} />
            <QrSheet qrLightUrl={qrLight} qrDarkUrl={qrDark} publicUrl={publicUrl} slug={spa.slug} />
            <a
              href={`/${spa.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
              title="View my page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[15px] w-[15px]">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
                title="Log out"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[15px] w-[15px]">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-lg px-5 pb-28 pt-8">{children}</main>
    </div>
  );
}
