"use client";

import { useState } from "react";
import { downloadQrAsPng } from "@/lib/download-qr";
import type { QrMode } from "@/lib/styled-qr";

interface Props {
  qrLightUrl: string;
  qrDarkUrl: string;
  publicUrl: string;
  slug: string;
}

export function DashboardQrCard({ qrLightUrl, qrDarkUrl, publicUrl, slug }: Props) {
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
        await navigator.share({ url: publicUrl, title: slug });
      } catch {}
    } else {
      await handleCopy();
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02]">

      {/* Header + mode toggle */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <h2 className="text-[13px] font-semibold text-zinc-400">Your QR Code</h2>

        {/* Dark / Light pill toggle */}
        <div className="flex items-center rounded-lg bg-white/[0.05] p-0.5 ring-1 ring-white/[0.06]">
          <button
            onClick={() => setMode("light")}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${
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
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${
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
      </div>

      <div className="px-5 pb-5">

        {/* QR + info row */}
        <div className="mt-2 flex gap-4">

          {/* QR image */}
          <div
            className="shrink-0 overflow-hidden rounded-2xl p-2 transition-colors duration-300"
            style={{
              backgroundColor: mode === "light" ? "#ffffff" : "#111111",
              boxShadow:
                "0 0 0 1px rgba(245,158,11,0.10), 0 6px 24px rgba(0,0,0,0.3), 0 0 40px rgba(245,158,11,0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="QR Code"
              width={110}
              className="block"
              style={{ borderRadius: 6 }}
            />
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-col justify-between py-0.5">
            <div>
              <p className="text-[13px] font-medium text-zinc-200">
                Share your page
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                Customers can scan this code to instantly visit your salon page.
              </p>
            </div>

            {/* Quick actions */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 px-3 py-1.5 text-[11px] font-bold text-black transition-all active:scale-[0.97]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Save
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-zinc-300 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.1] active:scale-[0.97]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* URL row */}
        <button
          onClick={handleCopy}
          className="mt-3 flex w-full items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.07] active:scale-[0.99]"
        >
          <span className="flex-1 truncate text-left text-[11px] text-zinc-500">
            {publicUrl}
          </span>
          <span className={`shrink-0 text-[10px] font-medium transition-colors ${copied ? "text-amber-400" : "text-zinc-600"}`}>
            {copied ? "Copied ✓" : "Copy"}
          </span>
        </button>

      </div>
    </section>
  );
}
