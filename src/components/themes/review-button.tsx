"use client";

import { useState } from "react";

const WRITEREVIEW_PREFIX =
  "https://search.google.com/local/writereview?placeid=";

interface Props {
  googleReviewPlaceId: string | null;
  accentGradient?: string;
}

export function ReviewButton({ googleReviewPlaceId, accentGradient = "linear-gradient(135deg, #00b09b, #96c93d)" }: Props) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [noModalOpen, setNoModalOpen] = useState(false);

  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  const handleGreat = async () => {
    if (!googleReviewPlaceId) {
      setReviewModalOpen(false);
      return;
    }
    setReviewModalOpen(false);
    window.open(`${WRITEREVIEW_PREFIX}${googleReviewPlaceId}`, "_blank");
  };

  const handleNotGood = () => {
    setReviewModalOpen(false);
    setNoModalOpen(true);
  };

  const handleCloseNoModal = () => {
    setNoModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleReviewClick}
          className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{
            background: accentGradient,
            boxShadow: "0 6px 24px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <svg
            className="relative h-[18px] w-[18px] drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="relative">Leave a Review</span>
        </button>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 pb-8 backdrop-blur-sm sm:items-center sm:pb-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setReviewModalOpen(false); }}
        >
          <div
            className="mx-auto w-full max-w-[360px] rounded-[24px] p-7 text-center"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 32px 80px rgba(15,23,42,0.25), 0 0 0 1px rgba(15,23,42,0.06)",
            }}
          >
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: accentGradient }}
            >
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h2 id="review-modal-title" className="mb-1.5 text-[18px] font-bold text-slate-900">
              How was your experience?
            </h2>
            <p className="mb-5 text-[13px] text-slate-500">Your feedback means a lot to us.</p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleGreat}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-[14px] font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                Great!
              </button>
              <button
                type="button"
                onClick={handleNotGood}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-semibold text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
                Not Good
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sorry Modal */}
      {noModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 pb-8 backdrop-blur-sm sm:items-center sm:pb-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="no-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setNoModalOpen(false); }}
        >
          <div
            className="mx-auto w-full max-w-[360px] rounded-[24px] p-7 text-center"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 32px 80px rgba(15,23,42,0.25), 0 0 0 1px rgba(15,23,42,0.06)",
            }}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <svg className="h-6 w-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <h2 id="no-modal-title" className="mb-1.5 text-[18px] font-bold text-slate-900">
              We&apos;re sorry to hear that
            </h2>
            <p className="mb-5 text-[13px] text-slate-500">We appreciate your feedback and will work to improve.</p>
            <button
              type="button"
              onClick={handleCloseNoModal}
              className="w-full rounded-xl bg-slate-900 px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
