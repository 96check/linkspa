"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { updateProfile, uploadAvatar, removeAvatar } from "@/server/actions/dashboard";
import { BottomSheet } from "@/components/bottom-sheet";
import { SubmitButton } from "@/components/submit-button";
import { AddressFields } from "@/components/address-fields";
import { PhoneInput } from "@/components/phone-input";
import { formatAddressFromParts } from "@/types/database";

export interface ProfileAddress {
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state_region: string | null;
  postal_code: string | null;
  country: string | null;
}

interface ProfileSectionProps {
  spaName: string;
  bio: string | null;
  logoUrl: string | null;
  address?: string | null;
  addressParts?: ProfileAddress | null;
  phone: string | null;
  publicUrl: string;
  linkCount: number;
  activeCount: number;
}

export function ProfileSection({
  spaName,
  bio,
  logoUrl,
  address: legacyAddress,
  addressParts,
  phone,
  publicUrl,
  linkCount,
  activeCount,
}: ProfileSectionProps) {
  const address = addressParts
    ? formatAddressFromParts({ address: legacyAddress ?? null, ...addressParts })
    : legacyAddress;

  const [editOpen, setEditOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const [editState, editAction] = useFormState(updateProfile, { error: null, success: false });
  const [avatarState, avatarAction] = useFormState(uploadAvatar, { error: null, success: false });
  const [removeState, removeAction] = useFormState(removeAvatar, { error: null, success: false });

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [bioLen, setBioLen] = useState(() => bio?.length ?? 0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editState.success) { setEditOpen(false); router.refresh(); } }, [editState.success, router]);
  useEffect(() => {
    if (avatarState.success) { setAvatarOpen(false); setPreview(null); setFileName(null); }
  }, [avatarState.success]);
  useEffect(() => {
    if (removeState.success) { setAvatarOpen(false); setPreview(null); setFileName(null); }
  }, [removeState.success]);
  useEffect(() => { if (editOpen && bio != null) setBioLen(bio.length); }, [editOpen, bio]);

  const initial = spaName?.charAt(0)?.toUpperCase() ?? "S";

  function handleFileSelect(file: File | undefined) {
    if (!file || file.size > 2 * 1024 * 1024) return;
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
    if (fileRef.current && file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileRef.current.files = dt.files;
    }
  }

  function clearPreview() {
    setPreview(null);
    setFileName(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  // Friendly display slug: strip protocol
  const displayUrl = publicUrl.replace(/^https?:\/\//, "");

  return (
    <>
      {/* ══════════════════════════════════════════
          PROFILE HERO
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111113]">

        {/* Ambient top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(249,115,22,0.11),transparent)]" />

        {/* ── Top action row ── */}
        <div className="relative flex items-center justify-between px-5 pt-4">
          {/* Live pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500">Live</span>
          </div>

          {/* Edit profile button */}
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-zinc-400 transition-all hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white active:scale-[0.96]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3 w-3">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Edit
          </button>
        </div>

        {/* ── Avatar + identity ── */}
        <div className="relative flex flex-col items-center px-5 pb-6 pt-5">

          {/* Avatar with camera overlay */}
          <button
            type="button"
            onClick={() => setAvatarOpen(true)}
            className="group relative mb-4"
            aria-label="Change photo"
          >
            {/* Glowing ring behind avatar */}
            <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-orange-500/30 to-amber-400/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={spaName}
                className="relative h-20 w-20 rounded-[20px] object-cover ring-1 ring-white/[0.1]"
              />
            ) : (
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-orange-500 to-amber-400 text-3xl font-black text-black ring-1 ring-white/[0.1]">
                {initial}
              </div>
            )}

            {/* Camera overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-white">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </button>

          {/* Name */}
          <h1 className="text-center text-[20px] font-bold leading-tight tracking-tight text-white">
            {spaName}
          </h1>

          {/* Bio */}
          {bio ? (
            <p className="mt-1.5 line-clamp-2 max-w-[280px] text-center text-[13px] leading-relaxed text-zinc-500">
              {bio}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="mt-1.5 text-[12px] text-zinc-700 transition-colors hover:text-zinc-500"
            >
              + Add a bio
            </button>
          )}

          {/* Public URL chip */}
          <button
            type="button"
            onClick={handleCopy}
            className={`mt-4 flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition-all active:scale-[0.97] ${
              copied
                ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400"
                : "border-white/[0.09] bg-white/[0.04] text-zinc-400 hover:border-orange-500/30 hover:bg-orange-500/[0.06] hover:text-orange-300"
            }`}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3 shrink-0">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 shrink-0 text-zinc-600">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="max-w-[200px] truncate">{displayUrl}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0 text-zinc-700">
                  <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>

          {/* Address + Phone — full-width contact block */}
          {(address || phone) && (
            <div className="mt-5 w-full space-y-2">
              {address && (
                <div className="flex items-start gap-3 rounded-2xl border border-orange-500/[0.12] bg-gradient-to-r from-orange-500/[0.07] to-amber-500/[0.04] px-4 py-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-400/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 text-orange-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-orange-500/60">Address</p>
                    <p className="text-[13px] font-medium leading-snug text-zinc-200">{address}</p>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3 rounded-2xl border border-amber-500/[0.12] bg-gradient-to-r from-amber-500/[0.07] to-orange-500/[0.04] px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-400/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 text-amber-400">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-500/60">Phone</p>
                    <p className="text-[13px] font-medium text-zinc-200">{phone}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
          <div className="flex flex-col items-center gap-0.5 py-3.5">
            <span className="text-[18px] font-bold tabular-nums text-white">{linkCount}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Links</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 py-3.5">
            <span className="text-[18px] font-bold tabular-nums text-emerald-400">{activeCount}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Active</span>
          </div>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-0.5 py-3.5 transition-colors hover:bg-white/[0.03]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-orange-400">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 transition-colors group-hover:text-orange-400">Preview</span>
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          AVATAR SHEET
      ══════════════════════════════════════════ */}
      <BottomSheet open={avatarOpen} onClose={() => { setAvatarOpen(false); clearPreview(); }} title="Change photo">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview" className="h-24 w-24 rounded-2xl object-cover ring-2 ring-orange-500/40" />
              ) : logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={spaName} className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/[0.08]" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-3xl font-bold text-black">{initial}</div>
              )}
              {preview && (
                <div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white ring-2 ring-[#0c0c0c]">New</div>
              )}
            </div>
            {fileName && (
              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5">
                <span className="max-w-[180px] truncate text-[11px] text-zinc-400">{fileName}</span>
                <button type="button" onClick={clearPreview} className="text-zinc-600 hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <form action={avatarAction} className="space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all ${dragging ? "border-orange-500/50 bg-orange-500/[0.06]" : preview ? "border-orange-500/20 bg-white/[0.03] hover:border-orange-500/30" : "border-white/[0.1] bg-white/[0.03] hover:border-white/[0.2]"}`}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-zinc-500">
                    <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">{preview ? "Choose different" : "Upload image"}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">JPG, PNG, WebP, GIF · Max 2 MB</p>
                </div>
              </div>
              <input ref={fileRef} type="file" name="avatar" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => handleFileSelect(e.target.files?.[0])} />
            </div>
            {(avatarState.error || removeState.error) && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" /><line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" /></svg>
                {avatarState.error || removeState.error}
              </div>
            )}
            {preview && <SubmitButton>Save photo</SubmitButton>}
          </form>
          {logoUrl && !preview && (
            <form action={removeAction}>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 text-sm font-medium text-zinc-500 transition-all hover:border-red-500/20 hover:bg-red-500/[0.04] hover:text-red-400 active:scale-[0.98]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Remove photo
              </button>
            </form>
          )}
        </div>
      </BottomSheet>

      {/* ══════════════════════════════════════════
          EDIT PROFILE SHEET
      ══════════════════════════════════════════ */}
      <BottomSheet open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <form action={editAction} className="space-y-6">
          {editState.error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" /><line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" /></svg>
              {editState.error}
            </div>
          )}

          {/* Business */}
          <div>
            <div className="flex items-center gap-2 pb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06] text-zinc-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-2.5 w-2.5">
                  <path d="M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-xs font-medium text-zinc-500">Business</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="edit_spa_name" className="mb-2 block text-xs font-medium text-zinc-500">Business name</label>
                <input id="edit_spa_name" name="spa_name" defaultValue={spaName} required className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all placeholder:text-zinc-700 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20" placeholder="Your business name" />
              </div>
              <div>
                <label htmlFor="edit_bio" className="mb-2 block text-xs font-medium text-zinc-500">Bio</label>
                <textarea id="edit_bio" name="bio" defaultValue={bio ?? ""} maxLength={160} rows={2} onChange={(e) => setBioLen(e.target.value.length)} className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white transition-all placeholder:text-zinc-700 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20" placeholder="Short description..." />
                <p className="mt-1.5 text-right text-[10px] tabular-nums text-zinc-700">{bioLen}/160</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.04]" />

          {/* Location */}
          <div>
            <div className="flex items-center gap-2 pb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06] text-zinc-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-2.5 w-2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <h3 className="text-xs font-medium text-zinc-500">Location</h3>
              <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-600">optional</span>
            </div>
            <AddressFields
              variant="dashboard"
              defaults={{
                address_line1: addressParts?.address_line1 ?? "",
                address_line2: addressParts?.address_line2 ?? "",
                city: addressParts?.city ?? "",
                state_region: addressParts?.state_region ?? "",
                postal_code: addressParts?.postal_code ?? "",
                country: addressParts?.country ?? "",
              }}
            />
          </div>

          <div className="h-px bg-white/[0.04]" />

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 pb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06] text-zinc-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-2.5 w-2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-xs font-medium text-zinc-500">Contact</h3>
              <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-600">optional</span>
            </div>
            <div>
              <label htmlFor="edit_phone" className="mb-2 block text-xs font-medium text-zinc-500">Phone</label>
              <PhoneInput id="edit_phone" defaultValue={phone} />
            </div>
          </div>

          <SubmitButton>Save changes</SubmitButton>
        </form>
      </BottomSheet>
    </>
  );
}
