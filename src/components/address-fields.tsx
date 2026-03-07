"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { COUNTRY_OPTIONS } from "@/lib/countries";
import {
  suggestAddresses,
  retrieveAddress,
  type AddressSuggestion,
} from "@/lib/mapbox";

export interface AddressValues {
  address_line1: string;
  address_line2: string;
  city: string;
  state_region: string;
  postal_code: string;
  country: string;
}

interface AddressFieldsProps {
  defaults?: Partial<AddressValues>;
  variant?: "onboarding" | "dashboard";
}

const inputClass = {
  onboarding:
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20",
  dashboard:
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all placeholder:text-zinc-700 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20",
};

const labelClass = {
  onboarding: "mb-1.5 block text-sm font-medium text-gray-300",
  dashboard: "mb-2 block text-xs font-medium text-zinc-500",
};

const hintClass = {
  onboarding: "mt-1 text-xs text-gray-600",
  dashboard: "mt-1.5 text-xs text-zinc-600",
};

function generateSessionToken() {
  return crypto.randomUUID();
}

export function AddressFields({ defaults = {}, variant = "onboarding" }: AddressFieldsProps) {
  const inputCn = inputClass[variant];
  const labelCn = labelClass[variant];
  const hintCn = hintClass[variant];

  /* ── Controlled state ─────────────────────────── */
  const [values, setValues] = useState<AddressValues>({
    address_line1: defaults.address_line1 ?? "",
    address_line2: defaults.address_line2 ?? "",
    city: defaults.city ?? "",
    state_region: defaults.state_region ?? "",
    postal_code: defaults.postal_code ?? "",
    country: defaults.country ?? "",
  });

  const updateField = (field: keyof AddressValues, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  /* ── Autocomplete state ───────────────────────── */
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const sessionTokenRef = useRef(generateSessionToken());
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Country dropdown state ───────────────────── */
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryActiveIndex, setCountryActiveIndex] = useState(-1);
  const countryRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  const filteredCountries = COUNTRY_OPTIONS.filter(
    (opt) =>
      opt.value === "" ||
      opt.label.toLowerCase().includes(countrySearch.toLowerCase()) ||
      opt.value.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  /* ── Click outside to close (both dropdowns) ──── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Auto-focus country search ────────────────── */
  useEffect(() => {
    if (countryOpen) countrySearchRef.current?.focus();
  }, [countryOpen]);

  /* ── Debounced address search ─────────────────── */
  const handleAddressInput = useCallback((query: string) => {
    updateField("address_line1", query);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await suggestAddresses(query, sessionTokenRef.current);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
      setActiveIndex(-1);
      setLoading(false);
    }, 300);
  }, []);

  /* ── Select a suggestion ──────────────────────── */
  const handleSelect = useCallback(async (suggestion: AddressSuggestion) => {
    setShowDropdown(false);
    setSuggestions([]);
    setLoading(true);

    const parsed = await retrieveAddress(suggestion.mapbox_id, sessionTokenRef.current);

    if (parsed) {
      setValues((prev) => ({
        ...prev,
        address_line1: parsed.address_line1,
        city: parsed.city,
        state_region: parsed.state_region,
        postal_code: parsed.postal_code,
        country: COUNTRY_OPTIONS.some((o) => o.value === parsed.country)
          ? parsed.country
          : parsed.country
            ? "OTHER"
            : prev.country,
      }));
    } else {
      updateField("address_line1", suggestion.name);
    }

    sessionTokenRef.current = generateSessionToken();
    setLoading(false);
  }, []);

  /* ── Address keyboard navigation ──────────────── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showDropdown && suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
          return;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
          return;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < suggestions.length) {
            e.preventDefault();
            handleSelect(suggestions[activeIndex]);
          }
          // When no suggestion highlighted, do not preventDefault — form submits
          return;
        case "Escape":
          e.preventDefault();
          setShowDropdown(false);
          return;
        case "Tab":
          setShowDropdown(false);
          break;
      }
    }
  };

  /* ── Country keyboard navigation ──────────────── */
  const handleCountryKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setCountryActiveIndex((i) => (i < filteredCountries.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setCountryActiveIndex((i) => (i > 0 ? i - 1 : filteredCountries.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (countryActiveIndex >= 0 && countryActiveIndex < filteredCountries.length) {
          updateField("country", filteredCountries[countryActiveIndex].value);
          setCountryOpen(false);
          setCountrySearch("");
        }
        break;
      case "Escape":
        setCountryOpen(false);
        setCountrySearch("");
        break;
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Address Line 1 — with autocomplete ───── */}
      <div ref={wrapperRef} className="relative">
        <label htmlFor="address_line1" className={labelCn}>
          Address
        </label>
        <input
          id="address_line1"
          name="address_line1"
          type="text"
          autoComplete="off"
          value={values.address_line1}
          onChange={(e) => handleAddressInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          placeholder="Street address, P.O. box, company name, c/o"
          className={inputCn}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="address-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        />

        {/* Suggestion dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul
            id="address-suggestions"
            role="listbox"
            className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-white/[0.1] bg-zinc-900 py-1 shadow-xl shadow-black/40"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.mapbox_id}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={() => handleSelect(s)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-orange-500/10 text-orange-300"
                    : "text-zinc-300 hover:bg-white/[0.05]"
                }`}
              >
                <span className="block truncate font-medium">{s.name}</span>
                {s.full_address !== s.name && (
                  <span className="block truncate text-xs text-zinc-500">
                    {s.full_address}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className={hintCn}>Start typing to search, or enter manually</p>

        {/* Loading spinner — pointer-events-none so it doesn't block input clicks */}
        {loading && (
          <div className="pointer-events-none absolute right-3 top-[38px]" aria-hidden>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-orange-500" />
          </div>
        )}
      </div>

      {/* ── Address Line 2 ───────────────────────── */}
      <div>
        <label htmlFor="address_line2" className={labelCn}>
          Apt / Suite / Unit
        </label>
        <input
          id="address_line2"
          name="address_line2"
          type="text"
          value={values.address_line2}
          onChange={(e) => updateField("address_line2", e.target.value)}
          placeholder="Apartment, suite, unit, floor, etc."
          className={inputCn}
        />
      </div>

      {/* ── Grid: City + State | ZIP + Country ───── */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {/* City */}
        <div>
          <label htmlFor="address_city" className={labelCn}>
            City
          </label>
          <input
            id="address_city"
            name="city"
            type="text"
            value={values.city}
            onChange={(e) => updateField("city", e.target.value)}
            className={inputCn}
          />
        </div>

        {/* State / Region */}
        <div>
          <label htmlFor="address_state_region" className={labelCn}>
            State / Region
          </label>
          <input
            id="address_state_region"
            name="state_region"
            type="text"
            value={values.state_region}
            onChange={(e) => updateField("state_region", e.target.value)}
            className={inputCn}
          />
        </div>

        {/* ZIP Code */}
        <div>
          <label htmlFor="address_postal_code" className={labelCn}>
            ZIP Code
          </label>
          <input
            id="address_postal_code"
            name="postal_code"
            type="text"
            value={values.postal_code}
            onChange={(e) => updateField("postal_code", e.target.value)}
            className={inputCn}
          />
        </div>

        {/* Country — Custom dropdown */}
        <div ref={countryRef} className="relative">
          <label htmlFor="address_country" className={labelCn}>
            Country
          </label>

          {/* Hidden input for form submission */}
          <input type="hidden" name="country" value={values.country} />

          {/* Trigger button */}
          <button
            type="button"
            id="address_country"
            onClick={() => {
              setCountryOpen((prev) => !prev);
              setCountrySearch("");
              setCountryActiveIndex(-1);
            }}
            className={`${inputCn} flex items-center justify-between text-left`}
            aria-expanded={countryOpen}
            aria-haspopup="listbox"
          >
            <span className={`truncate ${values.country ? "text-white" : variant === "onboarding" ? "text-gray-600" : "text-zinc-700"}`}>
              {COUNTRY_OPTIONS.find((o) => o.value === values.country)?.label ?? "Select country"}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`ml-2 h-4 w-4 shrink-0 text-zinc-500 transition-transform ${countryOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown panel */}
          {countryOpen && (
            <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900 shadow-xl shadow-black/40">
              {/* Search */}
              <div className="border-b border-white/[0.06] p-2">
                <input
                  ref={countrySearchRef}
                  type="text"
                  placeholder="Search..."
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setCountryActiveIndex(-1);
                  }}
                  onKeyDown={handleCountryKeyDown}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
                />
              </div>

              {/* Options */}
              <ul role="listbox" className="max-h-48 overflow-auto py-1 scrollbar-thin">
                {filteredCountries.map((opt, i) => (
                  <li
                    key={opt.value || "empty"}
                    role="option"
                    aria-selected={values.country === opt.value}
                    onMouseDown={() => {
                      updateField("country", opt.value);
                      setCountryOpen(false);
                      setCountrySearch("");
                    }}
                    onMouseEnter={() => setCountryActiveIndex(i)}
                    className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      i === countryActiveIndex
                        ? "bg-orange-500/10 text-orange-300"
                        : values.country === opt.value && opt.value !== ""
                          ? "bg-white/[0.06] text-white"
                          : "text-zinc-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {values.country === opt.value && opt.value !== "" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        className="ml-2 h-3.5 w-3.5 shrink-0 text-orange-500"
                      >
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                ))}
                {filteredCountries.length === 0 && (
                  <li className="px-4 py-3 text-sm text-zinc-600">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
