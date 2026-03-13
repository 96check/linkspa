"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/bottom-sheet";
import { downloadQrAsPng } from "@/lib/download-qr";
import type { QrMode } from "@/lib/styled-qr";

interface QrSheetProps {
  qrLightUrl: string;
  qrDarkUrl: string;
  publicUrl: string;
  slug: string;
}

export function QrSheet({ qrLightUrl, qrDarkUrl, publicUrl, slug }: QrSheetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<QrMode>("light");

  const qrDataUrl = mode === "light" ? qrLightUrl : qrDarkUrl;

  async function handleDownload() {
    await downloadQrAsPng(qrDataUrl, `${slug}-qr-code`);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ url: publicUrl, title: "My Salon Page" });
      } catch {}
    } else {
      await handleCopy();
    }
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
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="3" height="3" />
        </svg>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="QR Code">
        <div className="space-y-4 pb-3">

          {/* QR CARD */}
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-zinc-900/80 px-6 pb-6 pt-5">

            {/* Animated ambient glow */}
            <div
              className="pointer-events-none absolute inset-0 animate-pulse"
              style={{
                animationDuration: "4s",
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(245,158,11,0.10) 0%, transparent 75%)",
              }}
            />

            {/* Mode toggle */}
            <div className="relative z-10 mb-4 flex items-center rounded-lg bg-white/[0.06] p-0.5 ring-1 ring-white/[0.06]">
              <button
                onClick={() => setMode("light")}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-[10px] font-semibold transition-all ${
                  mode === "light"
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-2.5 w-2.5">
                  <path d="M8 1a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 1zm0 10a3 3 0 100-6 3 3 0 000 6zm5-3a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1a.5.5 0 01.5.5zm-10 0a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1A.5.5 0 013 8zm8.354-4.354a.5.5 0 010 .708l-.708.707a.5.5 0 11-.707-.707l.707-.708a.5.5 0 01.708 0zM5.061 10.06a.5.5 0 010 .708l-.707.707a.5.5 0 11-.708-.707l.708-.708a.5.5 0 01.707 0zm6.878.708a.5.5 0 00-.708-.708l-.707.708a.5.5 0 00.707.707l.708-.707zM5.06 5.354a.5.5 0 00-.707-.708l-.708.708a.5.5 0 00.708.707l.707-.707zM8 13a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 13z" />
                </svg>
                Light
              </button>
              <button
                onClick={() => setMode("dark")}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-[10px] font-semibold transition-all ${
                  mode === "dark"
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-400"
                }`}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-2.5 w-2.5">
                  <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z" />
                </svg>
                Dark
              </button>
            </div>

            {/* Gradient border wrapper */}
            <div className="relative rounded-[22px] p-[2px]" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.35), rgba(252,211,77,0.15), rgba(245,158,11,0.35))" }}>
              <div
                className="rounded-[20px] p-3.5 transition-colors duration-300"
                style={{
                  backgroundColor: mode === "light" ? "#ffffff" : "#111111",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.45), 0 0 64px rgba(245,158,11,0.08)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  width={220}
                  className="block"
                  style={{ borderRadius: 10 }}
                />
              </div>
            </div>

            {/* Description */}
            <p className="relative mt-5 text-center text-xs leading-relaxed text-zinc-500">
              Customers can scan this code to<br />instantly visit your salon page.
            </p>
          </div>

          {/* URL */}
          <button
            onClick={handleCopy}
            className="flex w-full items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.07] transition-all hover:bg-white/[0.07] active:scale-[0.99]"
          >
            <span className="flex-1 truncate text-left text-xs text-zinc-400">
              {publicUrl}
            </span>
            <span className={`shrink-0 text-[11px] font-medium transition-colors ${copied ? "text-amber-400" : "text-zinc-500"}`}>
              {copied ? "Copied ✓" : "Copy"}
            </span>
          </button>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition-all active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.07] py-3.5 text-sm font-semibold text-white ring-1 ring-white/[0.1] transition-all hover:bg-white/[0.1] active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </button>
          </div>

        </div>
      </BottomSheet>
    </>
  );
}
