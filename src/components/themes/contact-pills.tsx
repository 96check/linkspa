"use client";

import { useState } from "react";

interface Props {
  address?: string | null;
  phone?: string | null;
  accentPrimary: string;
  pillBg: string;
  pillBorder: string;
  textSecondary: string;
}

export function ContactPills({ address, phone, accentPrimary, pillBg, pillBorder, textSecondary }: Props) {
  const [mapOpen, setMapOpen] = useState(false);

  const iconColor = accentPrimary;

  const encodedAddress = address ? encodeURIComponent(address) : "";
  const appleMapsUrl = `https://maps.apple.com/?q=${encodedAddress}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  if (!address && !phone) return null;

  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-2">
        {/* ── Address pill ── */}
        {address && (
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 transition-opacity active:opacity-70"
            style={{ background: pillBg, border: `1px solid ${pillBorder}` }}
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: iconColor }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[12.5px] font-medium line-clamp-1" style={{ color: textSecondary }}>
              {address}
            </span>
          </button>
        )}

        {/* ── Phone pill ── */}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 transition-opacity active:opacity-70"
            style={{ background: pillBg, border: `1px solid ${pillBorder}` }}
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: iconColor }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="text-[12.5px] font-medium" style={{ color: textSecondary }}>
              {phone}
            </span>
          </a>
        )}
      </div>

      {/* ── Map picker dialog ── */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          onClick={() => setMapOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl"
            style={{ background: "#1c1c1e" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-white/[0.08] px-5 py-4 text-center">
              <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">Open in Maps</p>
              <p className="mt-1 text-[13px] font-medium text-zinc-300 line-clamp-2">{address}</p>
            </div>

            {/* Options */}
            <div className="divide-y divide-white/[0.06]">
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMapOpen(false)}
                className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-white/[0.04] active:bg-white/[0.07]"
              >
                {/* Apple Maps icon */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                  style={{
                    background: "linear-gradient(145deg, #3ecff7, #1f8fff)",
                    boxShadow: "0 2px 8px rgba(31,143,255,0.35)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">Apple Maps</p>
                  <p className="text-[11px] text-zinc-500">Open in Apple Maps</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ml-auto h-4 w-4 text-zinc-600">
                  <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMapOpen(false)}
                className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-white/[0.04] active:bg-white/[0.07]"
              >
                {/* Google Maps icon */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                  style={{
                    background: "linear-gradient(145deg, #34a853, #4285f4)",
                    boxShadow: "0 2px 8px rgba(52,168,83,0.35)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">Google Maps</p>
                  <p className="text-[11px] text-zinc-500">Open in Google Maps</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="ml-auto h-4 w-4 text-zinc-600">
                  <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Cancel */}
            <div className="p-3 pt-2">
              <button
                type="button"
                onClick={() => setMapOpen(false)}
                className="w-full rounded-2xl py-3.5 text-[15px] font-semibold text-zinc-300 transition-colors hover:bg-white/[0.06] active:bg-white/[0.09]"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
