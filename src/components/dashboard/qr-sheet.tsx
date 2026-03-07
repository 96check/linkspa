"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/bottom-sheet";

interface QrSheetProps {
  qrDataUrl: string;
  publicUrl: string;
  slug: string;
}

export function QrSheet({ qrDataUrl, publicUrl, slug }: QrSheetProps) {
  const [open, setOpen] = useState(false);

  function handleDownload() {
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${slug}-qr-code.png`;
    link.click();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-gray-500 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.1] hover:text-white active:scale-95"
        title="QR Code"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="14" width="3" height="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="21" y1="14" x2="21" y2="14.01" strokeLinecap="round" />
          <line x1="14" y1="21" x2="14" y2="21.01" strokeLinecap="round" />
          <line x1="21" y1="21" x2="21" y2="21.01" strokeLinecap="round" />
        </svg>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="Your QR Code">
        <div className="space-y-5">
          {/* QR Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.04] via-transparent to-yellow-500/[0.03]" />
            <div className="relative flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-2xl shadow-2xl"
              />
              <p className="mt-4 text-center text-xs text-gray-500">{publicUrl}</p>
            </div>
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="relative h-4 w-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="relative">Download QR Code</span>
          </button>

          {/* Tips */}
          <div className="overflow-hidden rounded-2xl border border-orange-500/15 bg-orange-500/[0.06]">
            <div className="flex items-center gap-2 border-b border-orange-500/10 px-4 py-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-orange-400">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" />
                <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" />
              </svg>
              <p className="text-xs font-semibold text-orange-400">How to use</p>
            </div>
            <ol className="space-y-2 px-4 py-3 text-xs text-orange-300/60">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-[9px] font-bold text-orange-400">1</span>
                Download and print the QR code
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-[9px] font-bold text-orange-400">2</span>
                Place it at your front desk or on a card
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-[9px] font-bold text-orange-400">3</span>
                Customers scan to see all your links
              </li>
            </ol>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
