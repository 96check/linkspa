export const runtime = "nodejs";

import { requireSpa } from "@/server/auth";
import { getLinksForCurrentUser } from "@/server/links";
import { ProfileSection } from "@/components/dashboard/profile-section";
import { DashboardLinkList } from "@/components/dashboard/dashboard-link-list";
import { AddLinkSheet } from "@/components/dashboard/add-link-sheet";
import { ThemeEditor } from "@/components/dashboard/theme-editor";
import { ReviewSection } from "@/components/dashboard/review-section";
import { DashboardQrCard } from "@/components/dashboard/dashboard-qr-card";
import { buildStyledQrDataUrl } from "@/lib/styled-qr";
import { env } from "@/lib/env";

export default async function DashboardPage() {
  const { spa } = await requireSpa();
  const links = await getLinksForCurrentUser();
  const activeCount = links.filter((l) => l.active).length;
  const publicUrl = `${env.NEXT_PUBLIC_APP_URL}/${spa.slug}`;

  const qrOpts = { size: 400, accentSeed: spa.slug };
  const [qrLight, qrDark] = await Promise.all([
    buildStyledQrDataUrl(publicUrl, { ...qrOpts, mode: "light" }),
    buildStyledQrDataUrl(publicUrl, { ...qrOpts, mode: "dark" }),
  ]);

  return (
    <div className="animate-slide-up space-y-5">
      {/* ── Profile Card ── */}
      <ProfileSection
        spaName={spa.spa_name ?? "My Spa"}
        bio={spa.bio ?? null}
        logoUrl={spa.logo_url ?? null}
        address={spa.address ?? null}
        addressParts={{
          address_line1: spa.address_line1 ?? null,
          address_line2: spa.address_line2 ?? null,
          city: spa.city ?? null,
          state_region: spa.state_region ?? null,
          postal_code: spa.postal_code ?? null,
          country: spa.country ?? null,
        }}
        phone={spa.phone ?? null}
        publicUrl={publicUrl}
        linkCount={links.length}
        activeCount={activeCount}
      />

      {/* ── Add Link CTA ── */}
      <section>
        <AddLinkSheet />
      </section>

      {/* ── Links Card ── */}
      {links.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02]">
          <div className="flex items-center justify-between px-5 py-3.5">
            <h2 className="text-[13px] font-semibold text-zinc-400">Your links</h2>
            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold tabular-nums text-zinc-500">{links.length}</span>
          </div>
          <DashboardLinkList initialLinks={links} />
        </section>
      )}

      {/* ── Empty State ── */}
      {links.length === 0 && (
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-zinc-500">
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[15px] font-semibold text-zinc-200">No links yet</p>
          <p className="mt-1.5 text-[13px] text-zinc-600">
            Tap the button above to add your first link.
          </p>
        </section>
      )}

      {/* ── Google Review Card ── */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02]">
        <div className="px-5 pt-4 pb-1">
          <h2 className="text-[13px] font-semibold text-zinc-400">Leave a Review</h2>
        </div>
        <div className="px-5 pb-5">
          <ReviewSection currentReviewUrl={spa.google_review_url ?? null} />
        </div>
      </section>

      {/* ── QR Code Card ── */}
      <DashboardQrCard qrLightUrl={qrLight} qrDarkUrl={qrDark} publicUrl={publicUrl} slug={spa.slug} />

      {/* ── Appearance Card ── */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02]">
        <div className="px-5 pt-4 pb-1">
          <h2 className="text-[13px] font-semibold text-zinc-400">Appearance</h2>
        </div>
        <div className="px-5 pb-5">
          <ThemeEditor currentTheme={spa.theme ?? "midnight"} />
        </div>
      </section>
    </div>
  );
}
