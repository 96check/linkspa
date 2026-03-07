"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { createSpa } from "@/server/actions/onboarding";
import { SubmitButton } from "@/components/submit-button";
import { AddressFields } from "@/components/address-fields";
import { PhoneInput } from "@/components/phone-input";

/* ── Section header ─────────────────────────────── */
function SectionHeader({
  icon,
  title,
  optional,
}: {
  icon: React.ReactNode;
  title: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 pb-3">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-500">
        {icon}
      </span>
      <h3 className={`text-sm font-medium ${optional ? "text-zinc-500" : "text-gray-300"}`}>
        {title}
      </h3>
      {optional && (
        <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-700">
          optional
        </span>
      )}
    </div>
  );
}

/* ── Icons ──────────────────────────────────────── */
const BuildingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
    <path d="M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MapPinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Form ───────────────────────────────────────── */
const inputCn =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20";

export function OnboardingForm() {
  const [state, formAction] = useFormState(createSpa, { error: null });
  const [bioLength, setBioLength] = useState(0);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* ═══════ Section 1: Business ═══════ */}
      <div>
        <SectionHeader title="Business" icon={BuildingIcon} />

        <div className="space-y-4">
          {/* Business name */}
          <div>
            <label htmlFor="spa_name" className="mb-1.5 block text-sm font-medium text-gray-300">
              Business name
            </label>
            <input
              id="spa_name"
              name="spa_name"
              placeholder="e.g. Queen Nails & Spa"
              required
              className={inputCn}
            />
          </div>

          {/* Bio — textarea with character counter */}
          <div>
            <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="e.g. Nail salon in downtown LA · Book online 24/7"
              maxLength={160}
              rows={3}
              onChange={(e) => setBioLength(e.target.value.length)}
              className={`${inputCn} resize-none`}
            />
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-gray-600">Short description for your page</p>
              <p className={`text-xs tabular-nums ${bioLength > 140 ? "text-orange-400" : "text-zinc-700"}`}>
                {bioLength}/160
              </p>
            </div>
          </div>

          {/* Page address (slug) */}
          <div>
            <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-gray-300">
              Page address
            </label>
            <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-colors focus-within:border-orange-500/40 focus-within:ring-1 focus-within:ring-orange-500/20">
              <span className="shrink-0 pl-4 text-sm text-gray-600">
                salonlink.io/
              </span>
              <input
                id="slug"
                name="slug"
                placeholder="queen-nails"
                required
                className="min-w-0 flex-1 rounded-r-xl border-0 bg-transparent px-1 py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
            <p className="mt-1.5 text-xs text-gray-600">
              Lowercase letters, numbers, and hyphens only
            </p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.06]" />

      {/* ═══════ Section 2: Location ═══════ */}
      <div>
        <SectionHeader title="Location" optional icon={MapPinIcon} />
        <AddressFields variant="onboarding" />
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.06]" />

      {/* ═══════ Section 3: Contact ═══════ */}
      <div>
        <SectionHeader title="Contact" optional icon={PhoneIcon} />
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-300">
            Phone number
          </label>
          <PhoneInput id="phone" />
        </div>
      </div>

      <SubmitButton>Create my page</SubmitButton>
    </form>
  );
}
