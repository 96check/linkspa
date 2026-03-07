"use client";

import { useState } from "react";

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium transition-all active:scale-95 ${
        copied
          ? "bg-emerald-500/10 text-emerald-400"
          : "text-gray-500 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
            <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
