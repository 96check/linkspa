"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "salonlink-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so the page loads first, then the banner slides up
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, choice);
    document.cookie = `salonlink-consent=${choice};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
        {/* Text */}
        <div className="flex-1 text-sm leading-relaxed text-gray-400">
          <span className="mr-1.5">🍪</span>
          We use essential cookies to keep SalonLink running smoothly. Read our{" "}
          <Link
            href="/cookies"
            className="text-orange-400 underline underline-offset-2 transition-colors hover:text-orange-300"
          >
            Cookie Policy
          </Link>{" "}
          to learn more.
        </div>

        {/* Buttons */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => handleConsent("rejected")}
            className="rounded-xl border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-gray-400 transition-all hover:border-white/[0.2] hover:text-white"
          >
            Reject
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
