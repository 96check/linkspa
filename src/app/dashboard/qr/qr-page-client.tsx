"use client";

import { useState } from "react";
import { downloadQrAsPng } from "@/lib/download-qr";
import { CopyUrlButton } from "@/components/copy-url-button";
import type { QrMode } from "@/lib/styled-qr";

interface Props {
  qrLightUrl: string;
  qrDarkUrl: string;
  publicUrl: string;
  slug: string;
}

export function QrPageClient({ qrLightUrl, qrDarkUrl, publicUrl, slug }: Props) {
  const [mode, setMode] = useState<QrMode>("light");

  const qrDataUrl = mode === "light" ? qrLightUrl : qrDarkUrl;

  async function handleDownload() {
    await downloadQrAsPng(qrDataUrl, `${slug}-qr`);
  }

  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-8">

      {/* Mode toggle */}
      <div className="mb-5 flex items-center rounded-xl bg-white/[0.05] p-1 ring-1 ring-white/[0.06]">
        <button
          onClick={() => setMode("light")}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            mode === "light"
              ? "bg-white/[0.12] text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path d="M8 1a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 1zm0 10a3 3 0 100-6 3 3 0 000 6zm5-3a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1a.5.5 0 01.5.5zm-10 0a.5.5 0 01-.5.5h-1a.5.5 0 010-1h1A.5.5 0 013 8zm8.354-4.354a.5.5 0 010 .708l-.708.707a.5.5 0 11-.707-.707l.707-.708a.5.5 0 01.708 0zM5.061 10.06a.5.5 0 010 .708l-.707.707a.5.5 0 11-.708-.707l.708-.708a.5.5 0 01.707 0zm6.878.708a.5.5 0 00-.708-.708l-.707.708a.5.5 0 00.707.707l.708-.707zM5.06 5.354a.5.5 0 00-.707-.708l-.708.708a.5.5 0 00.708.707l.707-.707zM8 13a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 018 13z" />
          </svg>
          Light
        </button>
        <button
          onClick={() => setMode("dark")}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            mode === "dark"
              ? "bg-white/[0.12] text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z" />
          </svg>
          Dark
        </button>
      </div>

      {/* QR code */}
      <div
        className="rounded-[2rem] p-4 shadow-2xl shadow-black/60 transition-colors duration-300"
        style={{ backgroundColor: mode === "light" ? "#ffffff" : "#111111" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt="QR Code"
          width={220}
          height={220}
          className="block"
        />
      </div>

      {/* URL */}
      <div className="mt-5 flex items-center gap-2">
        <p className="font-mono text-xs text-zinc-500">{publicUrl}</p>
        <CopyUrlButton url={publicUrl} />
      </div>

      {/* Download button */}
      <div className="mt-5 w-full">
        <button
          onClick={handleDownload}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="relative h-4 w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="relative">Download QR Code</span>
        </button>
      </div>
    </div>
  );
}
