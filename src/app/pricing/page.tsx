"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Footer from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";

/* ─────────────────────────────────────────────
   DATA — edit plans here when ready
   ───────────────────────────────────────────── */

const plans = [
  {
    name: "Free",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Everything you need to get started. No credit card required.",
    cta: "Get Started Free",
    ctaHref: "/register",
    highlighted: false,
    features: [
      "Up to 5 social links",
      "1 custom QR code",
      "1 theme preset",
      "Basic page analytics",
      "SalonLink branding",
      "Community support",
    ],
  },
  {
    name: "Pro",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    monthlyPrice: 9,
    yearlyPrice: 7,
    description: "For growing spas that want more customization and insights.",
    cta: "Start 14-Day Free Trial",
    ctaHref: "/register?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited links",
      "Unlimited QR codes",
      "All theme presets + custom colors",
      "Advanced analytics & click tracking",
      "Remove SalonLink branding",
      "Custom link thumbnails",
      "Priority email support",
      "Link scheduling",
    ],
  },
  {
    name: "Business",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: "For multi-location spas and salon chains that need full control.",
    cta: "Contact Sales",
    ctaHref: "mailto:sales@salonlink.com",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Multi-location support",
      "Custom domain (yourspa.com)",
      "White-label branding",
      "API access",
      "Dedicated account manager",
      "Phone & video support",
    ],
  },
];

const faqs = [
  {
    q: "Can I try Pro features before paying?",
    a: "Absolutely. Every new account starts with a 14-day free trial of Pro — no credit card needed. At the end of the trial, you can continue on the Free plan or upgrade.",
  },
  {
    q: "Can I change plans at any time?",
    a: "Yes. Upgrade, downgrade, or cancel at any time from your dashboard. Changes take effect immediately, and we'll prorate the difference.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes! Pay annually and save 20%. That's $7/mo for Pro and $23/mo for Business instead of the monthly price.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is never deleted. If you exceed the Free plan limits, you'll keep your existing content but won't be able to add more until you upgrade or remove some items.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a full refund within 14 days of any paid charge, no questions asked. Contact support@salonlink.com and we'll process it immediately.",
  },
];

const comparisonFeatures = [
  { name: "Social links", free: "5", pro: "Unlimited", business: "Unlimited" },
  { name: "QR codes", free: "1", pro: "Unlimited", business: "Unlimited" },
  { name: "Theme presets", free: "1", pro: "All", business: "All + custom" },
  { name: "Custom colors", free: false, pro: true, business: true },
  { name: "Analytics", free: "Basic", pro: "Advanced", business: "Advanced" },
  { name: "Click tracking", free: false, pro: true, business: true },
  { name: "Remove branding", free: false, pro: true, business: true },
  { name: "Link thumbnails", free: false, pro: true, business: true },
  { name: "Link scheduling", free: false, pro: true, business: true },
  { name: "Team members", free: "1", pro: "1", business: "Up to 10" },
  { name: "Custom domain", free: false, pro: false, business: true },
  { name: "White-label", free: false, pro: false, business: true },
  { name: "API access", free: false, pro: false, business: true },
  { name: "Support", free: "Community", pro: "Priority email", business: "Dedicated" },
];

const testimonials = [
  { name: "Emily Rose", role: "Owner, Glow Studio", text: "SalonLink Pro paid for itself in the first week. Our bookings went up 35%." },
  { name: "James Chen", role: "Manager, Serenity Spa", text: "The QR codes are a game-changer. We put them everywhere — cards, posters, even receipts." },
  { name: "Sofia Laurent", role: "Founder, Belle & Co", text: "Switching from Linktree was the best decision. SalonLink actually understands our industry." },
];

/* ─────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────── */

function AnimatedPrice({ value, highlighted }: { value: number; highlighted: boolean }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <span
        key={value}
        className={`inline-block animate-price-slide ${
          highlighted
            ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        ${value}
      </span>
    </span>
  );
}

function CheckIcon({ className = "text-orange-400" }: { className?: string }) {
  return (
    <svg className={`mt-0.5 h-5 w-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="mx-auto mt-0.5 h-5 w-5 shrink-0 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-orange-500/20 bg-gradient-to-br from-orange-500/[0.04] to-transparent shadow-lg shadow-orange-500/[0.03]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-orange-500/40 bg-orange-500/10 text-orange-400"
              : "border-white/[0.1] text-gray-500"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function PricingPage() {
  const revealRef = useReveal();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = useCallback(
    (index: number) => setOpenFaq((prev) => (prev === index ? null : index)),
    [],
  );

  return (
    <div ref={revealRef} className="min-h-screen bg-black text-white selection:bg-orange-500/30 selection:text-orange-200">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-grid bg-noise absolute inset-0" />
        <div className="animate-float absolute -left-60 -top-60 h-[600px] w-[600px] rounded-full bg-orange-600/[0.07] blur-[150px]" />
        <div className="animate-float-reverse absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-yellow-500/[0.05] blur-[150px]" />
        <div className="animate-float absolute bottom-[-10%] left-[40%] h-[400px] w-[400px] rounded-full bg-orange-500/[0.04] blur-[150px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="animate-fade-in relative z-20 border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center text-xl">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white">
              Sign in
            </Link>
            <Link href="/register" className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-4 pt-20 text-center md:pt-28">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-yellow-500/5 px-5 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
          Simple, transparent pricing
        </div>

        <h1 className="animate-fade-up delay-100 mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Start free,{" "}
          <span className="animate-shimmer bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-[length:200%_auto] bg-clip-text text-transparent">
            grow without limits
          </span>
        </h1>

        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          No hidden fees. No surprises. Choose the plan that fits your business
          and upgrade anytime as you grow.
        </p>

        {/* ── Billing toggle ── */}
        <div className="animate-fade-up delay-300 mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors duration-300 ${!annual ? "text-white" : "text-gray-500"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-9 w-[60px] rounded-full border p-1 transition-all duration-300 ${
              annual
                ? "border-orange-500/30 bg-orange-500/10 shadow-lg shadow-orange-500/10"
                : "border-white/[0.1] bg-white/[0.04]"
            }`}
            aria-label="Toggle billing period"
          >
            <div
              className={`h-7 w-7 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg transition-all duration-300 ${
                annual
                  ? "translate-x-[26px] shadow-orange-500/40"
                  : "translate-x-0 shadow-orange-500/20"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors duration-300 ${annual ? "text-white" : "text-gray-500"}`}>
            Annual
          </span>
          <span
            className={`rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/10 px-3 py-1 text-xs font-bold text-orange-300 transition-all duration-300 ${
              annual ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            Save 20%
          </span>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Decorative sparkles around the section */}
        <div className="pointer-events-none absolute inset-0">
          <Sparkle className="absolute left-[10%] top-[5%] h-3 w-3 animate-pulse text-orange-500/20" />
          <Sparkle className="absolute right-[15%] top-[10%] h-2 w-2 animate-pulse text-yellow-500/15 [animation-delay:1s]" />
          <Sparkle className="absolute left-[5%] bottom-[20%] h-2.5 w-2.5 animate-pulse text-orange-400/15 [animation-delay:2s]" />
          <Sparkle className="absolute right-[8%] bottom-[30%] h-2 w-2 animate-pulse text-yellow-400/20 [animation-delay:0.5s]" />
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal delay-${(i + 1) * 100} group relative flex flex-col transition-all duration-500 ${
                plan.highlighted ? "z-10 lg:scale-105" : "z-0"
              }`}
            >
              {/* ── Animated spinning border for highlighted plan ── */}
              {plan.highlighted && (
                <>
                  <div className="absolute -inset-px overflow-hidden rounded-3xl">
                    <div className="animate-spin-slow absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_25%,#f97316_40%,#fbbf24_50%,#f97316_60%,transparent_75%,transparent_100%)]" />
                  </div>
                  <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-b from-orange-500/25 via-orange-500/5 to-transparent blur-3xl" />
                  <div className="absolute -inset-3 -z-10 animate-breathe rounded-[2rem] bg-gradient-to-b from-orange-500/15 to-transparent blur-2xl" />
                </>
              )}

              {/* Card inner */}
              <div
                className={`relative flex flex-1 flex-col overflow-hidden rounded-3xl border transition-all duration-500 ${
                  plan.highlighted
                    ? "border-transparent bg-[#0c0c0c]"
                    : "border-white/[0.06] bg-[#0a0a0a] hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-orange-500/[0.03]"
                }`}
              >
                {/* Decorative corner glows */}
                {plan.highlighted && (
                  <>
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/[0.15] blur-[80px]" />
                    <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-yellow-500/[0.08] blur-[60px]" />
                  </>
                )}

                <div className="relative p-8 lg:p-9">
                  {/* Header: icon + badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                        plan.highlighted
                          ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-black shadow-lg shadow-orange-500/30"
                          : "bg-white/[0.04] text-gray-400 ring-1 ring-white/[0.08] group-hover:bg-orange-500/10 group-hover:text-orange-400 group-hover:ring-orange-500/20"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    {plan.badge && (
                      <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3.5 py-1.5 text-xs font-bold text-black shadow-lg shadow-orange-500/20">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        {plan.badge}
                      </div>
                    )}
                  </div>

                  {/* Plan name */}
                  <h3 className="mt-5 text-xl font-bold text-white">{plan.name}</h3>

                  {/* Animated Price */}
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold tracking-tight">
                      <AnimatedPrice
                        value={annual ? plan.yearlyPrice : plan.monthlyPrice}
                        highlighted={!!plan.highlighted}
                      />
                    </span>
                    <span className="text-base text-gray-500">
                      {plan.monthlyPrice === 0 ? "forever" : "/month"}
                    </span>
                  </div>

                  {/* Annual savings info */}
                  <div className="mt-2 h-5">
                    {annual && plan.monthlyPrice > 0 ? (
                      <p className="animate-fade-in text-xs text-gray-600">
                        <span className="text-gray-500 line-through">${plan.monthlyPrice}/mo</span>
                        {" · "}
                        <span className="font-medium text-orange-400/80">
                          Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                        </span>
                      </p>
                    ) : plan.monthlyPrice === 0 ? (
                      <p className="text-xs text-green-500/60">Free forever, no catch</p>
                    ) : null}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={plan.ctaHref}
                    className={`group/btn relative mt-8 flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-300 active:scale-[0.97] ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-black shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/40"
                        : "border border-white/[0.1] text-gray-300 hover:border-orange-500/20 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                    )}
                    <span className="relative">{plan.cta}</span>
                    <svg className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  {/* Divider */}
                  <div className="my-8 border-t border-white/[0.06]" />

                  {/* Features */}
                  <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                    What&rsquo;s included
                  </p>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-400">
                        <CheckIcon className={plan.highlighted ? "text-orange-400" : "text-gray-500 group-hover:text-orange-400/70"} />
                        <span className="transition-colors duration-300 group-hover:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Money-back guarantee ── */}
        <div className="reveal mt-12 flex justify-center">
          <div className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 backdrop-blur-sm transition-all hover:border-orange-500/15 hover:bg-white/[0.03]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 text-orange-400 ring-1 ring-orange-500/10 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">14-day money-back guarantee</p>
              <p className="text-xs text-gray-500">Not happy? Get a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof / Testimonials ── */}
      <section className="reveal relative z-10 border-y border-white/[0.04] bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-600">
            Loved by spa owners worldwide
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]"
              >
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 text-xs font-bold text-orange-400 ring-1 ring-orange-500/10">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust stats row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {[
              { value: "500+", label: "Active spas" },
              { value: "99.9%", label: "Uptime" },
              { value: "<1s", label: "Page load" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature comparison table ── */}
      <section className="reveal relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Compare{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              every feature
            </span>
          </h2>
          <p className="mt-4 text-gray-500">
            See exactly what you get with each plan.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Free
                  </th>
                  <th className="relative px-4 py-4 text-center">
                    {/* Highlighted column indicator */}
                    <div className="absolute inset-0 border-x border-orange-500/10 bg-orange-500/[0.03]" />
                    <span className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 text-xs font-bold text-black">
                      Pro
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.02] ${
                      idx % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-6 py-3.5 font-medium text-gray-300">
                      {feature.name}
                    </td>
                    {[feature.free, feature.pro, feature.business].map((val, vi) => (
                      <td
                        key={vi}
                        className={`px-4 py-3.5 text-center ${vi === 1 ? "relative" : ""}`}
                      >
                        {vi === 1 && (
                          <div className="absolute inset-0 border-x border-orange-500/10 bg-orange-500/[0.02]" />
                        )}
                        <span className="relative">
                          {val === true ? (
                            <CheckIcon className={vi === 1 ? "mx-auto text-orange-400" : "mx-auto text-gray-500"} />
                          ) : val === false ? (
                            <CrossIcon />
                          ) : (
                            <span className={`text-sm ${vi === 1 ? "font-semibold text-orange-400" : "text-gray-400"}`}>
                              {val}
                            </span>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="reveal relative z-10 mx-auto max-w-3xl px-6 pb-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mt-4 text-gray-500">
            Can&rsquo;t find what you&rsquo;re looking for?{" "}
            <a
              href="mailto:support@salonlink.com"
              className="text-orange-400 underline underline-offset-2 transition-colors hover:text-orange-300"
            >
              Contact our team
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openFaq === idx}
              onToggle={() => toggleFaq(idx)}
            />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="reveal relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.1] via-transparent to-yellow-500/[0.06]" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange-500/[0.18] blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-yellow-500/[0.12] blur-[120px]" />

          {/* Decorative sparkles */}
          <Sparkle className="absolute right-[15%] top-[20%] h-4 w-4 animate-pulse text-orange-400/30" />
          <Sparkle className="absolute left-[10%] bottom-[25%] h-3 w-3 animate-pulse text-yellow-400/20 [animation-delay:1.5s]" />

          <div className="relative px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 shadow-2xl shadow-orange-500/30">
              <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Ready to grow your spa?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
              Join hundreds of spa and salon owners who use SalonLink to connect
              with their customers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 px-10 py-4.5 text-base font-bold text-black shadow-2xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-[0.97]"
              >
                <span>Get Started Free</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="mailto:sales@salonlink.com"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-4.5 text-base font-medium text-gray-300 backdrop-blur-sm transition-all hover:border-orange-500/20 hover:bg-white/[0.06] hover:text-white"
              >
                Talk to sales
              </Link>
            </div>
            <p className="mt-6 text-xs text-gray-600">
              Free forever plan &middot; No credit card required &middot; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
