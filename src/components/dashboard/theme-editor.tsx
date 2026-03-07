"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateTheme } from "@/server/actions/dashboard";
import {
  THEME_PRESETS,
  parseThemeConfig,
  configToPresetId,
  configsEqual,
  serializeForStorage,
} from "@/types/theme";
import type { ThemeConfig } from "@/types/theme";

/* ═══════════════════════════════════════════════════════════════════════════
   Live Preview — mirrors the actual ThemeLayout structure on the public page
   ═══════════════════════════════════════════════════════════════════════════ */

function LivePreview({ config }: { config: ThemeConfig }) {
  const bgGradient = `linear-gradient(160deg, ${config.bgPrimary} 0%, ${config.bgSecondary} 100%)`;
  const accentGradient = `linear-gradient(135deg, ${config.accentPrimary}, ${config.accentSecondary})`;

  // Derive card text contrast same as theme-layout
  const r = parseInt(config.cardBg.slice(1, 3), 16);
  const g = parseInt(config.cardBg.slice(3, 5), 16);
  const b = parseInt(config.cardBg.slice(5, 7), 16);
  const lum = (r * 299 + g * 587 + b * 114) / 1000;
  const onCard = lum > 140 ? "dark" : "light";
  const textColor = onCard === "dark" ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)";
  const pillBg = onCard === "dark" ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.1)";

  return (
    <div className="flex justify-center pb-2 pt-3">
      {/* Phone frame */}
      <div className="relative rounded-[2rem] border-[3px] border-zinc-700/80 bg-black p-[3px] shadow-2xl shadow-black/50">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
        <div className="absolute left-1/2 top-2 z-20 h-[10px] w-[44px] -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div
          className="relative w-[180px] overflow-hidden rounded-[1.7rem]"
          style={{ background: bgGradient }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[15%] h-[80px] w-[80px] -translate-x-1/2 rounded-full opacity-30 blur-[30px]"
            style={{ background: config.accentPrimary }}
          />
          <div
            className="pointer-events-none absolute bottom-[10%] right-[-10%] h-[60px] w-[60px] rounded-full opacity-20 blur-[25px]"
            style={{ background: config.accentSecondary }}
          />

          {/* Content */}
          <div className="relative z-0 flex min-h-[300px] flex-col items-center justify-center px-3 py-6 text-center">
            {/* Card */}
            <div
              className="w-full rounded-2xl px-3 py-4"
              style={{ background: config.cardBg, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
            >
              {/* Avatar ring + logoBg fill */}
              <div className="flex justify-center">
                <div
                  className="rounded-full p-[2px]"
                  style={{ background: accentGradient, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
                >
                  <div className="h-9 w-9 rounded-full" style={{ background: config.logoBg }} />
                </div>
              </div>

              {/* Name bar */}
              <div className="mt-2 h-[4px] w-14 rounded-full mx-auto" style={{ backgroundColor: textColor }} />
              {/* Bio bar */}
              <div className="mt-1 h-[2.5px] w-16 rounded-full mx-auto opacity-50" style={{ backgroundColor: textColor }} />

              {/* Info pills */}
              <div className="mt-2 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: pillBg }}>
                  <div className="h-[2.5px] w-[2.5px] rounded-full" style={{ backgroundColor: textColor }} />
                  <div className="h-[2.5px] w-10 rounded-full opacity-60" style={{ backgroundColor: textColor }} />
                </div>
                <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: pillBg }}>
                  <div className="h-[2.5px] w-[2.5px] rounded-full" style={{ backgroundColor: textColor }} />
                  <div className="h-[2.5px] w-7 rounded-full opacity-60" style={{ backgroundColor: textColor }} />
                </div>
              </div>

              {/* Divider */}
              <div className="mx-auto my-2 h-px w-6 rounded-full opacity-20" style={{ backgroundColor: textColor }} />

              {/* Icons row */}
              <div className="flex items-center justify-center gap-1.5">
                {[1, 0.8, 0.65, 0.5].map((op, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div
                      className="h-[15px] w-[15px] rounded-md"
                      style={{
                        background: onCard === "dark"
                          ? `rgba(15,23,42,${0.07 * op})`
                          : `rgba(255,255,255,${0.15 * op})`,
                        boxShadow: onCard === "dark"
                          ? `0 1px 3px rgba(15,23,42,${0.06 * op})`
                          : `0 1px 3px rgba(0,0,0,${0.2 * op})`,
                      }}
                    />
                    <div className="h-[2px] w-2.5 rounded-full opacity-20" style={{ backgroundColor: textColor }} />
                  </div>
                ))}
              </div>

              {/* Review button */}
              <div className="mx-auto mt-2.5 h-[11px] w-[80%] rounded-lg" style={{ background: accentGradient }} />

              {/* Footer */}
              <div className="mx-auto mt-2 h-[2px] w-8 rounded-full opacity-20" style={{ backgroundColor: textColor }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Color Picker
   ═══════════════════════════════════════════════════════════════════════════ */

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div
          className="h-9 w-9 rounded-full ring-2 ring-white/[0.08] ring-offset-2 ring-offset-[#09090b] transition-all hover:ring-white/[0.2]"
          style={{ backgroundColor: value }}
        />
      </div>
      <div>
        <span className="block text-xs font-medium text-zinc-400">{label}</span>
        <span className="block font-mono text-[10px] uppercase text-zinc-600">
          {value}
        </span>
      </div>
    </label>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Theme Editor
   ═══════════════════════════════════════════════════════════════════════════ */

export function ThemeEditor({ currentTheme }: { currentTheme: string }) {
  const initial = parseThemeConfig(currentTheme);
  const [config, setConfig] = useState<ThemeConfig>(initial);
  const [state, formAction] = useFormState(updateTheme, { error: null, success: false });
  const [saved, setSaved] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(t);
    }
  }, [state.success]);

  const isDirty = !configsEqual(config, initial);
  const activePresetId = configToPresetId(config);

  return (
    <div className="space-y-5">
      {/* ── Live Preview ── */}
      <LivePreview config={config} />

      {/* ── Preset Gallery ── */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
          Choose a theme
        </p>
        <div className="grid grid-cols-4 gap-2">
          {THEME_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setConfig({ ...preset.config })}
                className={`group relative overflow-hidden rounded-xl transition-all duration-200 ${
                  isActive
                    ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-[#09090b] shadow-lg shadow-orange-500/10"
                    : "ring-1 ring-white/[0.06] hover:ring-white/[0.15]"
                }`}
              >
                {/* Mini preview */}
                <div
                  className="relative flex h-16 items-center justify-center"
                  style={{
                    background: `linear-gradient(160deg, ${preset.config.bgPrimary}, ${preset.config.bgSecondary})`,
                  }}
                >
                  <div className="w-[70%] rounded-lg bg-white/95 px-1.5 py-1.5 shadow-sm">
                    <div
                      className="mx-auto h-3 w-3 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${preset.config.accentPrimary}, ${preset.config.accentSecondary})`,
                      }}
                    />
                    <div
                      className="mx-auto mt-1 h-[2px] w-6 rounded-full"
                      style={{ backgroundColor: preset.config.accentPrimary, opacity: 0.7 }}
                    />
                  </div>

                  {/* Checkmark badge */}
                  {isActive && (
                    <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 shadow-md">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3.5}
                        className="h-2 w-2 text-white"
                      >
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <div
                  className={`border-t px-1.5 py-1.5 transition-colors ${
                    isActive
                      ? "border-orange-500/20 bg-orange-500/[0.06]"
                      : "border-white/[0.04] bg-white/[0.02]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold ${
                      isActive ? "text-orange-400" : "text-zinc-400"
                    }`}
                  >
                    {preset.name}
                  </p>
                  <p className="text-[8px] text-zinc-600">{preset.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Custom Colors Toggle ── */}
      <div>
        <button
          type="button"
          onClick={() => setCustomOpen((v) => !v)}
          className="flex w-full items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition-all hover:border-white/[0.1] hover:bg-white/[0.04]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4 text-zinc-500"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1 text-xs font-medium text-zinc-400">
            Customize colors
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`h-4 w-4 text-zinc-600 transition-transform duration-200 ${
              customOpen ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {customOpen && (
          <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  Background
                </p>
                <ColorPicker
                  label="Start"
                  value={config.bgPrimary}
                  onChange={(v) => setConfig((p) => ({ ...p, bgPrimary: v }))}
                />
                <ColorPicker
                  label="End"
                  value={config.bgSecondary}
                  onChange={(v) => setConfig((p) => ({ ...p, bgSecondary: v }))}
                />
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  Accent
                </p>
                <ColorPicker
                  label="Primary"
                  value={config.accentPrimary}
                  onChange={(v) => setConfig((p) => ({ ...p, accentPrimary: v }))}
                />
                <ColorPicker
                  label="Secondary"
                  value={config.accentSecondary}
                  onChange={(v) => setConfig((p) => ({ ...p, accentSecondary: v }))}
                />
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                Logo &amp; card
              </p>
              <ColorPicker
                label="Logo background"
                value={config.logoBg}
                onChange={(v) => setConfig((p) => ({ ...p, logoBg: v }))}
              />
              <ColorPicker
                label="Card background"
                value={config.cardBg}
                onChange={(v) => setConfig((p) => ({ ...p, cardBg: v }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Save ── */}
      {isDirty && (
        <form action={formAction}>
          <input type="hidden" name="theme" value={serializeForStorage(config)} />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/15 transition-all hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.98]"
          >
            Apply theme
          </button>
        </form>
      )}

      {saved && !isDirty && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 py-3 text-[13px] font-medium text-emerald-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Theme applied
        </div>
      )}

      {state.error && (
        <p className="text-center text-xs text-red-400">{state.error}</p>
      )}
    </div>
  );
}
