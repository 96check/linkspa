"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateGoogleReview } from "@/server/actions/dashboard";
import { SubmitButton } from "@/components/submit-button";

/* ── Component ────────────────────────────────────────────────────────────── */

interface ReviewSectionProps {
  currentReviewUrl: string | null;
}

export function ReviewSection({ currentReviewUrl }: ReviewSectionProps) {
  const [input, setInput] = useState("");

  const [state, formAction] = useFormState(updateGoogleReview, {
    error: null,
    success: false,
  });
  const [saved, setSaved] = useState(false);

  const currentPlaceId = currentReviewUrl || null;

  /* ── success toast ── */
  useEffect(() => {
    if (state.success) {
      setSaved(true);
      setInput("");
      const t = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(t);
    }
  }, [state.success]);

  return (
    <div className="space-y-4">
      {/* ── Active status ── */}
      {currentPlaceId && !input && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-4 w-4 text-emerald-400"
            >
              <polyline
                points="20 6 9 17 4 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-emerald-400">
              Review link active
            </p>
            <p className="mt-0.5 truncate text-[11px] font-mono text-zinc-600">
              {currentPlaceId}
            </p>
          </div>
        </div>
      )}

      {/* ── Input Place ID ── */}
      <div>
        <p className="mb-2 text-xs font-medium text-zinc-500">
          {currentPlaceId ? "Update Place ID" : "Place ID"}
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your Google Place ID (starts with ChIJ)"
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
        />
      </div>

      {/* ── Nhập trực tiếp Place ID ── */}
      {input && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-orange-500/15 bg-orange-500/[0.06] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 text-orange-400"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-orange-400">
                Place ID
              </p>
              <p className="mt-0.5 break-all text-[11px] font-mono text-zinc-500">
                {input}
              </p>
            </div>
          </div>

          <form action={formAction}>
            <input
              type="hidden"
              name="google_review_url"
              value={input.trim()}
            />
            <SubmitButton>Save Place ID</SubmitButton>
          </form>
        </div>
      )}

      {/* ── Hint ── */}
      {!input && (
        <div className="flex items-center gap-3 rounded-xl border border-zinc-700/30 bg-white/[0.03] px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 text-zinc-500"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[12px] text-zinc-500">
            Paste your Google Place ID starting with{" "}
            <span className="font-mono text-zinc-400">ChIJ</span>.
          </p>
        </div>
      )}

      {/* ── Remove ── */}
      {currentPlaceId && !input && (
        <form action={formAction}>
          <input type="hidden" name="google_review_url" value="" />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 text-[13px] font-medium text-zinc-500 transition-all hover:border-red-500/20 hover:bg-red-500/[0.04] hover:text-red-400 active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-3.5 w-3.5"
            >
              <polyline
                points="3 6 5 6 21 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Remove review link
          </button>
        </form>
      )}

      {/* ── Success ── */}
      {saved && (
        <div className="flex items-center justify-center gap-2 py-1 text-[13px] font-medium text-emerald-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="h-4 w-4"
          >
            <polyline
              points="20 6 9 17 4 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Saved
        </div>
      )}

      {/* ── Error ── */}
      {state.error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
            <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
          </svg>
          {state.error}
        </div>
      )}
    </div>
  );
}
