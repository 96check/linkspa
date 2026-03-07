"use client";

import { useState } from "react";

interface PhoneInputProps {
  defaultValue?: string | null;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

/** Pull local digits out of a stored/DB value (handles raw digits or formatted strings). */
function seedDigits(raw: string | null | undefined): string {
  if (!raw) return "";
  let d = raw.replace(/\D/g, "");
  // Drop country code if it looks like a full E.164: 11 digits starting with 1
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.slice(0, 10);
}

/** Build the display string from an array of up to 10 local digit characters. */
function buildDisplay(ds: string[]): string {
  if (ds.length === 0) return "";
  const area   = ds.slice(0, 3).join("");
  const prefix = ds.slice(3, 6).join("");
  const line   = ds.slice(6, 10).join("");
  if (ds.length <= 3) return `+1 (${area}`;
  if (ds.length <= 6) return `+1 (${area}) ${prefix}`;
  return `+1 (${area}) ${prefix}-${line}`;
}

/** Build the stored/submitted value from the digit array. */
function buildValue(ds: string[]): string {
  return buildDisplay(ds);
}

export function PhoneInput({
  defaultValue,
  name = "phone",
  id,
  className,
  placeholder = "+1 (216) 661-4471",
}: PhoneInputProps) {
  const seed = seedDigits(defaultValue);
  const [digitArr, setDigitArr] = useState<string[]>(() => seed.split(""));
  const [error, setError]       = useState<string | null>(null);

  function sync(next: string[]) {
    setDigitArr(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    // Allow: tab, arrow keys, home/end, copy/cut/paste shortcuts
    if (
      key === "Tab" || key === "ArrowLeft" || key === "ArrowRight" ||
      key === "Home" || key === "End" ||
      ((e.ctrlKey || e.metaKey) && ["a","c","x","v"].includes(key.toLowerCase()))
    ) return;

    // Prevent the browser from mutating the input value for anything we handle
    e.preventDefault();

    if (key === "Backspace" || key === "Delete") {
      if (error) setError(null);
      sync(digitArr.slice(0, -1));
      return;
    }

    // Only accept digit keys
    if (!/^\d$/.test(key)) return;
    if (digitArr.length >= 10) return; // at capacity — ignore

    if (error) setError(null);
    sync([...digitArr, key]);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    let d = pasted.replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
    const next = [...digitArr, ...d.split("")].slice(0, 10);
    if (error) setError(null);
    sync(next);
  }

  function handleBlur() {
    if (digitArr.length === 0) { setError(null); return; }
    if (digitArr.length !== 10) {
      setError("Enter a valid 10-digit US phone number, e.g. +1 (216) 661-4471");
    } else {
      setError(null);
    }
  }

  // Suppress onChange — all mutations go through keydown/paste
  function handleChange() {}

  const baseClass =
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white transition-all placeholder:text-zinc-700 focus:outline-none focus:ring-1";
  const stateClass = error
    ? "border-red-500/40 focus:border-red-500/40 focus:ring-red-500/20"
    : "border-white/[0.08] focus:border-orange-500/40 focus:ring-orange-500/20";

  return (
    <div>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={buildDisplay(digitArr)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className ?? `${baseClass} ${stateClass}`}
      />
      <input
        type="hidden"
        name={name}
        value={buildValue(digitArr)}
        onChange={() => {}}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-red-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0">
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
