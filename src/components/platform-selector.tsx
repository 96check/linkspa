"use client";

import { useState, useMemo } from "react";
import { PlatformIcon } from "@/components/platform-icon";
import { LINK_TYPES, LINK_TYPE_META, CATEGORIES, type LinkType } from "@/types/link";

interface PlatformSelectorProps {
  name?: string;
  defaultValue?: string;
  onChange?: (type: LinkType) => void;
}

const CAT_ICONS: Record<string, string> = {
  all: "✦",
  social: "◉",
  messaging: "◈",
  business: "◆",
  music: "♫",
  payment: "◇",
  general: "◎",
};

export function PlatformSelector({ name = "type", defaultValue = "website", onChange }: PlatformSelectorProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<string>(defaultValue);

  const selectedMeta = LINK_TYPE_META[selected as LinkType] ?? LINK_TYPE_META.website;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return LINK_TYPES.filter((t) => {
      const meta = LINK_TYPE_META[t];
      const matchesSearch = !q || meta.label.toLowerCase().includes(q) || t.includes(q);
      const matchesCategory = category === "all" || meta.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleSelect = (t: LinkType) => {
    setSelected(t);
    onChange?.(t);
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={selected} />

      {/* Selected preview */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
        <div className="flex items-center gap-3.5 px-4 py-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
            <PlatformIcon type={selected} className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{selectedMeta.label}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">{selectedMeta.category.charAt(0).toUpperCase() + selectedMeta.category.slice(1)}</p>
          </div>
          <div className="flex h-7 items-center rounded-full bg-orange-500/15 px-2.5">
            <span className="text-[10px] font-semibold text-orange-400">Selected</span>
          </div>
        </div>
      </div>

      {/* Picker card */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a]">
        {/* Search */}
        <div className="px-3.5 py-2.5">
          <div className="relative flex items-center rounded-xl bg-white/[0.04] px-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-gray-600">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search platforms..."
              className="w-full bg-transparent py-2 pl-2.5 text-[13px] text-white placeholder-gray-600 focus:outline-none"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="shrink-0 rounded-full p-0.5 text-gray-600 hover:text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-0 overflow-x-auto border-y border-white/[0.04] bg-white/[0.015] scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              className={`relative flex shrink-0 items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                category === cat.key
                  ? "text-orange-400"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              <span className="text-[9px]">{CAT_ICONS[cat.key]}</span>
              {cat.label}
              {category === cat.key && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500" />
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-h-[240px] overflow-y-auto scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <span className="text-2xl text-gray-700">∅</span>
              <p className="mt-2 text-xs text-gray-600">No platforms found</p>
            </div>
          ) : (
            <div className="p-1.5">
              {filtered.map((t) => {
                const meta = LINK_TYPE_META[t];
                const isSelected = selected === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSelect(t)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500/[0.12] to-yellow-500/[0.06]"
                        : "hover:bg-white/[0.04] active:scale-[0.99]"
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                      <PlatformIcon type={t} className="h-6 w-6" />
                    </div>

                    {/* Label */}
                    <div className="flex-1 text-left">
                      <span className={`text-[13px] font-medium transition-colors ${isSelected ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                        {meta.label}
                      </span>
                    </div>

                    {/* Radio */}
                    <div className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500 shadow-lg shadow-orange-500/25"
                        : "border-white/[0.1] group-hover:border-white/[0.2]"
                    }`}>
                      {isSelected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} className="h-3 w-3 text-black">
                          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
