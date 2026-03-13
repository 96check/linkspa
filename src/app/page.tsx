"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import Footer from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";
import {
  Instagram,
  TikTokDark as TikTok,
  Facebook,
  GoogleMaps,
  Booking,
  YouTube,
  WhatsApp,
  LinkedIn,
  Snapchat,
} from "@/components/icons/platform-icons";

/* ── Scroll Reveal Hook ── */
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Reusable Components ── */

function GradientText({ children, className = "", shimmer = false }: { children: React.ReactNode; className?: string; shimmer?: boolean }) {
  return (
    <span
      className={`bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent ${shimmer ? "animate-shimmer" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

function AnimatedBorderCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative rounded-2xl p-px ${className}`}>
      <div className="absolute -inset-px overflow-hidden rounded-2xl">
        <div className="animate-spin-slow absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#f97316_50%,transparent_60%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="relative h-full rounded-2xl bg-[#0a0a0a] ring-1 ring-white/[0.08] transition-all duration-300 group-hover:ring-orange-500/20">
        {children}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: string }) {
  return (
    <div className={`reveal ${delay}`}>
      <AnimatedBorderCard>
        <div className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 text-orange-400 ring-1 ring-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/10">
            {icon}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        </div>
      </AnimatedBorderCard>
    </div>
  );
}

/* ── How It Works Interactive Section ── */

const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Create your account",
    description: "Sign up free with your email. No credit card, no commitments — just instant access.",
  },
  {
    number: 2,
    title: "Add your links",
    description: "Drop in your Instagram, Facebook, TikTok, Google Maps, booking page — all in one place.",
  },
  {
    number: 3,
    title: "Share & grow",
    description: "Get your unique link and QR code. Print it, share it, and watch your connections grow.",
  },
];

function PhoneScreenRegister() {
  return (
    <div className="animate-screen-fade flex flex-col items-center px-4 pt-6 pb-4">
      {/* Logo */}
      <Image src="/logo.png" alt="SalonLink" width={36} height={36} className="mb-4 h-9 w-9 rounded-full shadow-lg shadow-orange-500/30" />
      <p className="mb-1 text-[13px] font-bold text-white">Create your page</p>
      <p className="mb-5 text-[10px] text-zinc-500">Free forever · No credit card</p>

      {/* Fields */}
      <div className="w-full space-y-2.5">
        <div className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
          <p className="text-[9px] text-zinc-600 mb-0.5">Email address</p>
          <p className="text-[11px] text-zinc-400">you@example.com</p>
        </div>
        <div className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
          <p className="text-[9px] text-zinc-600 mb-0.5">Password</p>
          <p className="text-[11px] text-zinc-500 tracking-widest">••••••••</p>
        </div>
        <div className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 py-2.5 text-center text-[11px] font-bold text-black shadow-md shadow-orange-500/30">
          Get started free →
        </div>
      </div>

      {/* Social proof */}
      <p className="mt-4 text-[9px] text-zinc-700">Join 500+ spa owners</p>
    </div>
  );
}

function PhoneScreenLinks() {
  const links = [
    { label: "Instagram", Icon: Instagram },
    { label: "TikTok", Icon: TikTok },
    { label: "Google Maps", Icon: GoogleMaps },
    { label: "Book Now", Icon: Booking },
  ];

  return (
    <div className="animate-screen-fade px-3 pt-4 pb-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12px] font-bold text-white">My Links</p>
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-yellow-400 text-[10px] font-black text-black">+</div>
      </div>

      {/* Link rows */}
      <div className="space-y-1.5">
        {links.map((link) => (
          <div key={link.label} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <link.Icon className="h-5 w-5" />
            </div>
            <span className="flex-1 text-[11px] font-medium text-zinc-300">{link.label}</span>
            <div className="h-2.5 w-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/20" />
          </div>
        ))}
      </div>

      {/* Add link CTA */}
      <button className="mt-3 w-full rounded-lg border border-dashed border-white/[0.1] py-2 text-[10px] text-zinc-600">
        + Add new link
      </button>
    </div>
  );
}

function PhoneScreenShare() {
  // Fixed QR data modules: [x, y, isOrange]
  const dataModules: [number, number, boolean][] = [
    // row 1 (y=46)
    [46,46,false],[54,46,false],[62,46,false],[70,46,true],[78,46,false],[86,46,false],
    // row 2 (y=54)
    [46,54,false],[54,54,true],[70,54,false],[78,54,false],[86,54,false],
    // row 3 (y=62)
    [46,62,false],[62,62,false],[78,62,false],[86,62,true],
    // row 4 (y=70)
    [46,70,true],[54,70,false],[62,70,false],[70,70,false],[86,70,false],
    // row 5 (y=78)
    [54,78,false],[62,78,true],[70,78,false],[78,78,false],
    // row 6 (y=86)
    [46,86,false],[54,86,false],[70,86,true],[78,86,false],[86,86,false],
  ];

  return (
    <div className="animate-screen-fade flex flex-col items-center px-4 pt-5 pb-4">
      <p className="mb-4 text-[12px] font-bold text-white">Share your page</p>

      {/* QR Code mock */}
      <div className="relative mb-4">
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 blur-md" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-white p-3 shadow-lg">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* ── Corner: Top-left ── */}
            <rect x="4" y="4" width="34" height="34" rx="6" ry="6" fill="#111" />
            <rect x="9" y="9" width="24" height="24" rx="3" ry="3" fill="white" />
            <rect x="13" y="13" width="16" height="16" rx="2" ry="2" fill="#111" />

            {/* ── Corner: Top-right ── */}
            <rect x="62" y="4" width="34" height="34" rx="6" ry="6" fill="#111" />
            <rect x="67" y="9" width="24" height="24" rx="3" ry="3" fill="white" />
            <rect x="71" y="13" width="16" height="16" rx="2" ry="2" fill="#111" />

            {/* ── Corner: Bottom-left ── */}
            <rect x="4" y="62" width="34" height="34" rx="6" ry="6" fill="#111" />
            <rect x="9" y="67" width="24" height="24" rx="3" ry="3" fill="white" />
            <rect x="13" y="71" width="16" height="16" rx="2" ry="2" fill="#111" />

            {/* ── Data modules (bottom-right area) ── */}
            {dataModules.map(([x, y, isOrange], i) => (
              <rect
                key={i}
                x={x} y={y}
                width="6" height="6"
                rx="1.5" ry="1.5"
                fill={isOrange ? "#f97316" : "#111"}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* URL chip */}
      <div className="mb-3 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] text-zinc-400">salonlink.app/</span>
        <span className="text-[10px] font-semibold text-orange-400">mybeautyspa</span>
      </div>

      {/* Share button */}
      <div className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 py-2.5 text-center text-[11px] font-bold text-black">
        Share link
      </div>
    </div>
  );
}

const PHONE_SCREENS = [PhoneScreenRegister, PhoneScreenLinks, PhoneScreenShare];

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [screenKey, setScreenKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToStep = useCallback((idx: number) => {
    setActiveStep(idx);
    setScreenKey((k) => k + 1);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 3;
        setScreenKey((k) => k + 1);
        return next;
      });
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const ActiveScreen = PHONE_SCREENS[activeStep];

  return (
    <section id="how-it-works" className="relative z-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01] py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[800px] rounded-full bg-orange-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="reveal mb-14 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">How it works</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready in <GradientText shimmer>three steps</GradientText>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-gray-400">
            No technical skills required. Set up your spa&apos;s link page faster than it takes to make a cup of coffee.
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">

          {/* ── Step tabs (left on desktop, top on mobile) ── */}
          <div className="w-full space-y-3 lg:w-[300px] lg:shrink-0">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    goToStep(i);
                    timerRef.current = setInterval(() => {
                      setActiveStep((prev) => {
                        const next = (prev + 1) % 3;
                        setScreenKey((k) => k + 1);
                        return next;
                      });
                    }, 3500);
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 shadow-lg shadow-orange-500/5"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Step number */}
                    <div className={`relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-md shadow-orange-500/30"
                        : "bg-white/[0.06] text-zinc-500"
                    }`}>
                      {isActive && (
                        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/20 blur-sm animate-pulse-glow" />
                      )}
                      <span className="relative">{step.number}</span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400"}`}>
                        {step.title}
                      </p>
                      <p className={`mt-1 text-xs leading-relaxed transition-all duration-300 ${isActive ? "text-zinc-400 max-h-20 opacity-100" : "text-zinc-600 max-h-0 overflow-hidden opacity-0 lg:max-h-20 lg:opacity-100"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isActive && (
                    <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div key={screenKey} className="animate-progress h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Phone preview (center/right) ── */}
          <div className="relative flex flex-1 justify-center">
            {/* Outer glow */}
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-b from-orange-500/15 via-orange-500/5 to-transparent blur-3xl" />
            <div className="absolute -inset-4 animate-pulse-glow rounded-[3rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-2xl" />

            {/* Phone frame */}
            <div className="relative w-[220px] overflow-hidden rounded-[2.5rem] border-[3px] border-white/[0.08] bg-gradient-to-b from-[#111] to-[#0a0a0a] p-2 shadow-2xl shadow-black/50">
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-20 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />

              {/* Screen */}
              <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#0d0d0d] to-[#080808] pt-7">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1.5">
                  <span className="text-[9px] font-semibold text-zinc-500">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-3 rounded-sm bg-zinc-600" />
                    <div className="h-1.5 w-1 rounded-sm bg-zinc-600" />
                    <div className="h-2 w-2 rounded-full border border-zinc-600" />
                  </div>
                </div>

                {/* Dynamic screen content */}
                <ActiveScreen key={screenKey} />
              </div>

              {/* Home indicator */}
              <div className="flex justify-center py-2">
                <div className="h-1 w-16 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Step dots indicator */}
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
              {HOW_IT_WORKS_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    goToStep(i);
                    timerRef.current = setInterval(() => {
                      setActiveStep((prev) => {
                        const next = (prev + 1) % 3;
                        setScreenKey((k) => k + 1);
                        return next;
                      });
                    }, 3500);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    activeStep === i
                      ? "w-5 h-1.5 bg-orange-400"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold tracking-tight md:text-4xl">
        <GradientText shimmer>{value}</GradientText>
      </p>
      <p className="mt-1.5 text-sm text-gray-500">{label}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, role, delay }: { quote: string; name: string; role: string; delay: string }) {
  return (
    <div className={`reveal ${delay}`}>
      <div className="relative h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/[0.06] backdrop-blur-sm">
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="mb-5 text-sm leading-relaxed text-gray-300">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/40 to-yellow-500/30 text-sm font-bold text-orange-300">
            {name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SVG Icons ── */
const QrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

/* ── Mock social links for the phone preview ── */
const MOCK_LINKS = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "TikTok", Icon: TikTok },
  { label: "Google Maps", Icon: GoogleMaps },
  { label: "Book Now", Icon: Booking },
];

/* ── Floating hero icons — each with unique signature animation ── */
const HERO_ICONS: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  pos: string;
  orbit: string;
  orbitDur: string;
  glow: string;
  delay: string;
  size: string;
  color: string;
}[] = [
  // LEFT SIDE
  {
    Icon: Instagram, pos: "left-[3%] top-[14%]",
    orbit: "orbit-instagram", orbitDur: "14s",
    glow: "rgba(225,48,108,0.12)", color: "#E1306C",
    delay: "0s", size: "h-8 w-8",
  },
  {
    Icon: TikTok, pos: "left-[15%] top-[2%]",
    orbit: "orbit-tiktok", orbitDur: "10s",
    glow: "rgba(37,244,238,0.10)", color: "#25F4EE",
    delay: "0.6s", size: "h-7 w-7",
  },
  {
    Icon: Facebook, pos: "left-[2%] top-[44%]",
    orbit: "orbit-facebook", orbitDur: "18s",
    glow: "rgba(8,102,255,0.10)", color: "#0866FF",
    delay: "1.2s", size: "h-7 w-7",
  },
  {
    Icon: Snapchat, pos: "left-[11%] bottom-[18%]",
    orbit: "orbit-snapchat", orbitDur: "11s",
    glow: "rgba(255,252,0,0.08)", color: "#FFFC00",
    delay: "2s", size: "h-6 w-6",
  },
  // RIGHT SIDE
  {
    Icon: YouTube, pos: "right-[13%] top-[3%]",
    orbit: "orbit-youtube", orbitDur: "16s",
    glow: "rgba(255,0,0,0.10)", color: "#FF0000",
    delay: "0.3s", size: "h-7 w-7",
  },
  {
    Icon: WhatsApp, pos: "right-[2%] top-[18%]",
    orbit: "orbit-whatsapp", orbitDur: "13s",
    glow: "rgba(37,211,102,0.12)", color: "#25D366",
    delay: "0.9s", size: "h-8 w-8",
  },
  {
    Icon: LinkedIn, pos: "right-[3%] top-[46%]",
    orbit: "orbit-linkedin", orbitDur: "20s",
    glow: "rgba(10,102,194,0.10)", color: "#0A66C2",
    delay: "1.6s", size: "h-7 w-7",
  },
  {
    Icon: GoogleMaps, pos: "right-[12%] bottom-[16%]",
    orbit: "orbit-gmaps", orbitDur: "12s",
    glow: "rgba(52,168,83,0.08)", color: "#34A853",
    delay: "2.3s", size: "h-6 w-6",
  },
];

/* Curved paths from each icon position → hero center */
const HERO_PATHS = [
  { d: "M70,100 C200,70 350,160 500,300",   i: 0 },
  { d: "M170,25 C290,90 400,170 500,280",   i: 1 },
  { d: "M50,340 C170,320 340,310 490,310",  i: 2 },
  { d: "M130,610 C270,500 400,380 490,330", i: 3 },
  { d: "M930,25 C800,100 660,190 510,280",  i: 4 },
  { d: "M970,135 C840,170 690,230 520,300", i: 5 },
  { d: "M950,355 C830,340 680,320 520,310", i: 6 },
  { d: "M870,600 C740,490 620,370 520,330", i: 7 },
];

function HeroFloatingIcons() {
  return (
    <div className="hero-icons-layer pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {/* ── SVG: glowing dots traveling along invisible paths ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 750"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {HERO_ICONS.map((icon, i) => (
            <radialGradient key={i} id={`dot-${i}`}>
              <stop offset="0%" stopColor={icon.color} stopOpacity="0.9" />
              <stop offset="35%" stopColor={icon.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={icon.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {HERO_PATHS.map((p) => {
          const icon = HERO_ICONS[p.i];
          const d = parseFloat(icon.delay);
          const sp = "0.4 0 0.6 1"; // smooth easing
          return (
            <g key={p.i}>
              {/* Soft glow halo */}
              <circle r="8" fill={`url(#dot-${p.i})`}>
                <animateMotion dur="7s" repeatCount="indefinite" begin={`${d}s`} path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
                <animate attributeName="opacity" dur="7s" repeatCount="indefinite" begin={`${d}s`} values="0;0.5;0.7;0.7;0.3;0" keyTimes="0;0.1;0.3;0.7;0.9;1" calcMode="spline" keySplines={`${sp};${sp};${sp};${sp};${sp}`} />
              </circle>
              {/* Bright core */}
              <circle r="1.5" fill={icon.color}>
                <animateMotion dur="7s" repeatCount="indefinite" begin={`${d}s`} path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
                <animate attributeName="opacity" dur="7s" repeatCount="indefinite" begin={`${d}s`} values="0;0.6;0.9;0.9;0.4;0" keyTimes="0;0.1;0.3;0.7;0.9;1" calcMode="spline" keySplines={`${sp};${sp};${sp};${sp};${sp}`} />
              </circle>

              {/* Wave 2 — offset, smaller */}
              <circle r="6" fill={`url(#dot-${p.i})`}>
                <animateMotion dur="7s" repeatCount="indefinite" begin={`${d + 3.5}s`} path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
                <animate attributeName="opacity" dur="7s" repeatCount="indefinite" begin={`${d + 3.5}s`} values="0;0.35;0.5;0.5;0.2;0" keyTimes="0;0.1;0.3;0.7;0.9;1" calcMode="spline" keySplines={`${sp};${sp};${sp};${sp};${sp}`} />
              </circle>
              <circle r="1" fill={icon.color}>
                <animateMotion dur="7s" repeatCount="indefinite" begin={`${d + 3.5}s`} path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
                <animate attributeName="opacity" dur="7s" repeatCount="indefinite" begin={`${d + 3.5}s`} values="0;0.4;0.7;0.7;0.3;0" keyTimes="0;0.1;0.3;0.7;0.9;1" calcMode="spline" keySplines={`${sp};${sp};${sp};${sp};${sp}`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* ── Floating platform icons ── */}
      {HERO_ICONS.map((icon, i) => (
        <div
          key={i}
          className={`absolute ${icon.pos}`}
          style={{
            animation: `icon-emerge 0.8s cubic-bezier(0.16,1,0.3,1) ${icon.delay} both, ${icon.orbit} ${icon.orbitDur} ease-in-out ${icon.delay} infinite`,
          }}
        >
          <div
            className="rounded-2xl border border-white/[0.08] bg-black/60 p-3 backdrop-blur-md"
            style={{ boxShadow: `0 0 15px 2px ${icon.glow}` }}
          >
            <icon.Icon className={icon.size} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ██  MAIN PAGE
   ══════════════════════════════════════════════════════════ */

export default function HomePage() {
  const revealRef = useReveal();

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
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-20 text-center md:pt-32">
        <HeroFloatingIcons />
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-yellow-500/5 px-5 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
          Social links for your spa, one scan away
        </div>

        <h1 className="animate-fade-up delay-100 mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          One link for
          <br />
          <GradientText shimmer className="inline">every connection</GradientText>
        </h1>

        <p className="animate-fade-up delay-200 mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
          Create a stunning page with all your social links, generate a scannable
          QR code, and let customers discover your spa in seconds.
        </p>

        <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-4 text-base font-bold text-black shadow-2xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative">Create your page</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="relative h-5 w-5 transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium text-gray-300 backdrop-blur-sm transition-all hover:border-orange-500/20 hover:bg-white/[0.06] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-orange-400 transition-transform group-hover:scale-110">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            See how it works
          </Link>
        </div>

        <p className="animate-fade-up delay-400 mt-5 text-xs text-gray-600">
          No credit card required &middot; Setup in under 60 seconds
        </p>

        {/* ── Phone Mockup ── */}
        <div className="animate-scale-in delay-500 relative mx-auto mt-16 w-[280px] md:mt-24 md:w-[320px]">
          {/* Outer glow */}
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent blur-3xl" />
          <div className="absolute -inset-4 animate-pulse-glow rounded-[3rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-2xl" />

          {/* Phone frame */}
          <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-white/[0.08] bg-gradient-to-b from-[#111] to-[#0a0a0a] p-2 shadow-2xl shadow-black/50">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />

            {/* Screen */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0c0c0c]">
              {/* Top ambient glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(249,115,22,0.12),transparent)]" />

              <div className="animate-phone-scroll relative px-5 pb-6 pt-12">
                {/* ── Avatar ── */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500/40 to-amber-400/20 blur-xl" />
                    <div className="relative h-[72px] w-[72px] rounded-full bg-gradient-to-br from-orange-500 to-amber-400 p-[2.5px]">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0c0c0c]">
                        <Image src="/logo.png" alt="S" width={36} height={36} className="h-9 w-9 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center gap-1">
                    <h3 className="text-[15px] font-bold tracking-tight text-white">Serenity Spa</h3>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-orange-400">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="mt-0.5 text-[10px] text-zinc-500">New York, NY</p>
                </div>

                {/* ── Contact row ── */}
                <div className="mt-4 flex items-center justify-center gap-2.5">
                  {[
                    { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
                    { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
                    { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z" },
                  ].map((icon, i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-orange-400">
                        <path d={icon.d} />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* ── Divider ── */}
                <div className="mx-auto my-4 h-px w-4/5 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* ── Links ── */}
                <div className="space-y-2">
                  {MOCK_LINKS.map((link) => (
                    <div
                      key={link.label}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                        <link.Icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1 text-[11px] font-semibold text-white/90">{link.label}</span>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-zinc-700">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* ── Google Review ── */}
                <div className="mt-3 flex items-center justify-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-amber-400">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                  <span className="ml-1 text-[9px] text-zinc-600">4.9</span>
                </div>

                {/* ── Powered by ── */}
                <p className="mt-4 text-center text-[8px] tracking-wide text-zinc-700">
                  powered by <span className="font-semibold text-zinc-500">SalonLink</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Trusted By / Stats ── */}
      <section className="relative z-10 border-y border-white/[0.04] bg-white/[0.01] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="reveal mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-600">
            Trusted by spa businesses everywhere
          </p>
          <div className="reveal delay-100 grid grid-cols-2 gap-10 md:grid-cols-4">
            <StatItem value="500+" label="Active spas" />
            <StatItem value="50K+" label="Links clicked" />
            <StatItem value="100%" label="Free forever" />
            <StatItem value="<60s" label="Setup time" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Features
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Everything to make your spa{" "}
              <GradientText shimmer>shine online</GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-gray-400">
              A complete toolkit built for spa businesses to connect with customers
              across every platform — beautifully.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              delay="delay-100"
              icon={<QrIcon />}
              title="Instant QR Code"
              description="Generate a unique QR code for your spa. Print it on cards, display at reception, and let customers scan to find everything."
            />
            <FeatureCard
              delay="delay-200"
              icon={<LinkIcon />}
              title="Unlimited Links"
              description="Instagram, Facebook, TikTok, Google Maps, booking platforms — add them all in one beautiful, organized page."
            />
            <FeatureCard
              delay="delay-300"
              icon={<ChartIcon />}
              title="Smart Analytics"
              description="See real-time stats on page visits and link clicks. Understand which platforms drive the most engagement for your spa."
            />
            <FeatureCard
              delay="delay-400"
              icon={<PaletteIcon />}
              title="Beautiful by Default"
              description="No design skills needed. Your page looks stunning on every device, with a clean and modern aesthetic out of the box."
            />
            <FeatureCard
              delay="delay-500"
              icon={<ShieldIcon />}
              title="Secure & Reliable"
              description="Enterprise-grade security keeps your data safe. Your page is always online, always fast, and links never break."
            />
            <FeatureCard
              delay="delay-600"
              icon={<BoltIcon />}
              title="Lightning Fast"
              description="Optimized for speed. Pages load instantly on any device, anywhere in the world. Zero bloat, pure performance."
            />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <HowItWorksSection />

      {/* ── Testimonials ── */}
      <section className="relative z-10 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Loved by <GradientText shimmer>spa owners</GradientText>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <TestimonialCard
              delay="delay-100"
              quote="We put the QR code at our front desk and customers immediately started following us on Instagram. Our follower count doubled in a month!"
              name="Mai Tran"
              role="Owner, Lotus Wellness Spa"
            />
            <TestimonialCard
              delay="delay-300"
              quote="Setting up took literally 30 seconds. Now all our social media links, booking page, and Google Maps location are in one beautiful page."
              name="David Nguyen"
              role="Manager, Zen Day Spa"
            />
            <TestimonialCard
              delay="delay-500"
              quote="The analytics are amazing. I can finally see which platforms bring in the most customers. SalonLink is a must-have for any spa business."
              name="Sarah Kim"
              role="Founder, Glow Beauty Spa"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="reveal relative overflow-hidden rounded-3xl border border-white/[0.06]">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-black to-yellow-600/10" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-500/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-yellow-500/10 blur-[80px]" />
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative px-8 py-20 text-center md:px-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-300">
                Start for free today
              </div>
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                Ready to transform your spa&apos;s{" "}
                <GradientText shimmer>online presence</GradientText>?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-gray-400 md:text-lg">
                Join hundreds of spa owners connecting with customers through
                SalonLink. Your beautiful link page is just one click away.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 px-10 py-4 text-base font-bold text-black shadow-2xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">Get started for free</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="relative h-5 w-5 transition-transform group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-600">
                Free forever &middot; No credit card &middot; 60-second setup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
