import { PlatformIcon } from "@/components/platform-icon";
import { LINK_TYPE_META } from "@/types/link";
import type { LinkType } from "@/types/link";
import type { Spa, Link } from "@/types/database";
import { formatAddressFromParts } from "@/types/database";
import type { ThemeConfig } from "@/types/theme";
import { ReviewButton } from "./review-button";
import { ContactPills } from "./contact-pills";

interface Props {
  spa: Spa;
  links: Link[];
  config: ThemeConfig;
}

function linkType(link: Link): LinkType {
  return (link.type as LinkType) || "website";
}

function initial(spa: Spa) {
  return (spa.spa_name ?? spa.slug).charAt(0).toUpperCase();
}

function LinkIcon({ link, accentGradient, iconBg, iconShadow, iconLabelColor, iconMode }: {
  link: Link;
  accentGradient: string;
  iconBg: string;
  iconShadow: string;
  iconLabelColor: string;
  iconMode: "light" | "dark";
}) {
  const type = linkType(link);
  const meta = LINK_TYPE_META[type] ?? LINK_TYPE_META.website;
  const label = link.title || meta.label;

  return (
    <a
      href={link.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-shrink-0 flex-col items-center gap-2.5 no-underline"
      aria-label={label}
    >
      <div
        className="relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-active:scale-100"
        style={{ background: iconBg, boxShadow: iconShadow }}
      >
        <PlatformIcon type={type} background={iconMode} className="h-[26px] w-[26px]" />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: accentGradient, opacity: 0 }}
        />
      </div>
      <span
        className="max-w-[64px] truncate text-center text-[10.5px] font-semibold tracking-wide uppercase"
        style={{ color: iconLabelColor }}
      >
        {meta.label}
      </span>
    </a>
  );
}

/* ── Main Layout ──────────────────────────────────────────────────────────── */

export function ThemeLayout({ spa, links, config }: Props) {
  const bgGradient = `linear-gradient(150deg, ${config.bgPrimary} 0%, ${config.bgSecondary} 100%)`;
  const accentGradient = `linear-gradient(135deg, ${config.accentPrimary}, ${config.accentSecondary})`;
  const displayAddress = formatAddressFromParts(spa);

  // Derive whether card content should be dark or light based on cardBg luminance
  const cardR = parseInt(config.cardBg.slice(1, 3), 16);
  const cardG = parseInt(config.cardBg.slice(3, 5), 16);
  const cardB = parseInt(config.cardBg.slice(5, 7), 16);
  const cardLuminance = (cardR * 299 + cardG * 587 + cardB * 114) / 1000;
  const onCard = cardLuminance > 140 ? "dark" : "light";

  const textPrimary   = onCard === "dark" ? "rgb(15,23,42)"    : "rgb(248,250,252)";
  const textSecondary = onCard === "dark" ? "rgb(100,116,139)"  : "rgba(248,250,252,0.65)";
  const dividerColor  = onCard === "dark" ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.15)";
  const pillBg        = onCard === "dark" ? "rgba(15,23,42,0.05)" : "rgba(255,255,255,0.08)";
  const pillBorder    = onCard === "dark" ? "rgba(15,23,42,0.09)" : "rgba(255,255,255,0.12)";
  const iconBg        = onCard === "dark"
    ? "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)"
    : "rgba(255,255,255,0.12)";
  const iconShadow    = onCard === "dark"
    ? "0 2px 8px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
    : "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)";
  const iconLabelColor = onCard === "dark" ? "rgb(100,116,139)" : "rgba(248,250,252,0.6)";
  // onCard="dark" means the card is light (high luminance) → pass background="light" so PlatformIcon picks dark icons
  // onCard="light" means the card is dark (low luminance) → pass background="dark" so PlatformIcon picks light icons
  const iconMode: "light" | "dark" = onCard === "dark" ? "light" : "dark";
  const cardBorderColor = onCard === "dark" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)";
  const cardShadow = onCard === "dark"
    ? "0 32px 80px rgba(15,23,42,0.28), 0 0 0 1px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,1)"
    : "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)";

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        background: bgGradient,
        fontFamily: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Background texture ── */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      {/* ── Ambient glows ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-[15%] h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[120px] animate-breathe"
        style={{ background: config.accentPrimary, opacity: 0.18 }}
      />
      <div
        className="pointer-events-none absolute bottom-[5%] right-[-15%] h-[500px] w-[500px] rounded-full blur-[140px] animate-float-reverse"
        style={{ background: config.accentSecondary, opacity: 0.12 }}
      />
      <div
        className="pointer-events-none absolute left-[-10%] top-[60%] h-[300px] w-[300px] rounded-full blur-[100px]"
        style={{ background: config.accentPrimary, opacity: 0.1 }}
      />

      {/* ── Content Card ── */}
      <div className="relative z-10 w-full max-w-[400px] animate-fade-up">
        <div
          className="mx-auto rounded-[32px] px-7 py-8 text-center"
          style={{
            background: config.cardBg,
            border: `1px solid ${cardBorderColor}`,
            boxShadow: cardShadow,
            backdropFilter: "blur(24px)",
          }}
        >

          {/* ── Logo / Avatar ── */}
          <div className="relative mx-auto w-fit animate-scale-in">
            {/* Outer glow halo */}
            <div
              className="absolute -inset-[10px] rounded-full blur-[20px] opacity-35 animate-pulse-glow"
              style={{ background: accentGradient }}
            />
            {/* Gradient border ring */}
            <div
              className="relative rounded-full p-[3px]"
              style={{ background: accentGradient, boxShadow: "0 8px 32px rgba(15,23,42,0.18)" }}
            >
              {spa.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={spa.logo_url}
                  alt={spa.spa_name ?? spa.slug}
                  width={148}
                  height={148}
                  className="h-[148px] w-[148px] rounded-full object-cover"
                  style={{ background: config.logoBg }}
                />
              ) : (
                <div
                  className="flex h-[148px] w-[148px] items-center justify-center rounded-full text-5xl font-bold text-white"
                  style={{
                    background: accentGradient,
                    textShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  {initial(spa)}
                </div>
              )}
            </div>
          </div>

          {/* ── Name ── */}
          <h1
            className="mt-5 text-[26px] font-bold leading-tight tracking-tight animate-fade-up delay-100"
            style={{ color: textPrimary }}
          >
            {spa.spa_name ?? spa.slug}
          </h1>

          {/* ── @username badge ── */}
          {spa.spa_name && (
            <div className="mt-2 inline-flex items-center gap-1 animate-fade-up delay-200">
              <span
                className="rounded-full px-3 py-1 text-[11.5px] font-semibold tracking-wide"
                style={{
                  background: `linear-gradient(135deg, ${config.accentPrimary}18, ${config.accentSecondary}18)`,
                  color: config.accentPrimary,
                  border: `1px solid ${config.accentPrimary}30`,
                }}
              >
                /{spa.slug}
              </span>
            </div>
          )}

          {/* ── Bio ── */}
          {spa.bio && (
            <p
              className="mx-auto mt-3.5 max-w-[320px] text-[14px] leading-relaxed line-clamp-3 animate-fade-up delay-200"
              style={{ color: textSecondary }}
            >
              {spa.bio}
            </p>
          )}

          {/* ── Address & Phone ── */}
          {(displayAddress || spa.phone) && (
            <div className="animate-fade-up delay-300">
              <ContactPills
                address={displayAddress}
                phone={spa.phone}
                accentPrimary={config.accentPrimary}
                pillBg={pillBg}
                pillBorder={pillBorder}
                textSecondary={textSecondary}
              />
            </div>
          )}

          {/* ── Divider ── */}
          {links.length > 0 && (
            <div className="my-6 flex items-center gap-3 animate-fade-up delay-300">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${dividerColor}, transparent)` }} />
              <div className="h-1 w-1 rounded-full" style={{ background: accentGradient }} />
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${dividerColor}, transparent)` }} />
            </div>
          )}

          {/* ── Platform Icons — always horizontal scroll ── */}
          {links.length > 0 && (
            <div
              className="scrollbar-none -mx-7 overflow-x-auto scroll-smooth animate-fade-up delay-400"
              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              <div className={`flex flex-nowrap gap-4 px-7 py-1 ${links.length <= 4 ? "justify-center" : "justify-start"}`}>
                {links.map((link) => (
                  <LinkIcon key={link.id} link={link} accentGradient={accentGradient} iconBg={iconBg} iconShadow={iconShadow} iconLabelColor={iconLabelColor} iconMode={iconMode} />
                ))}
              </div>
            </div>
          )}

          {/* ── Review Button ── */}
          <div className="mt-7 animate-fade-up delay-500">
            <ReviewButton googleReviewPlaceId={spa.google_review_url} accentGradient={accentGradient} />
          </div>

          {/* ── Footer ── */}
          <footer className="mt-7 flex items-center justify-center gap-1.5">
            <div className="h-1 w-1 rounded-full opacity-40" style={{ background: accentGradient }} />
            <span className="text-[10.5px] font-medium tracking-widest uppercase" style={{ color: textSecondary }}>
              Powered by{" "}
              <span
                style={{
                  background: accentGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LinkSpa
              </span>
            </span>
            <div className="h-1 w-1 rounded-full opacity-40" style={{ background: accentGradient }} />
          </footer>
        </div>
      </div>
    </main>
  );
}
