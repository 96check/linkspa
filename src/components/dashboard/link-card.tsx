"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { editLink, removeLinkAction, toggleLinkAction } from "@/server/actions/dashboard";
import { BottomSheet } from "@/components/bottom-sheet";
import { SubmitButton } from "@/components/submit-button";
import { PlatformIcon } from "@/components/platform-icon";
import { PlatformSelector } from "@/components/platform-selector";
import { SmartUrlInput } from "@/components/smart-url-input";
import { LINK_TYPE_META, type LinkType } from "@/types/link";
import type { Link } from "@/types/database";

export function LinkCard({ link }: { link: Link }) {
  const [open, setOpen] = useState(false);
  const initType = (link.type as LinkType) || "website";
  const [platform, setPlatform] = useState<LinkType>(initType);
  const [title, setTitle] = useState(link.title ?? "");

  const [state, formAction] = useFormState(editLink, { error: null, success: false });
  const meta = LINK_TYPE_META[initType] || LINK_TYPE_META.website;

  useEffect(() => { if (state.success) setOpen(false); }, [state.success]);

  const handlePlatformChange = (t: LinkType) => {
    const oldDefault = LINK_TYPE_META[platform].defaultTitle;
    setPlatform(t);
    if (!title || title === oldDefault) setTitle(LINK_TYPE_META[t].defaultTitle);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] ${!link.active ? "opacity-40" : ""}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <PlatformIcon type={initType} className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`truncate text-[14px] font-medium text-white ${!link.active ? "line-through decoration-zinc-700" : ""}`}>
            {link.title || meta.label}
          </p>
          <p className="mt-0.5 truncate text-[12px] text-zinc-600">{meta.label}</p>
        </div>

        {!link.active && (
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-500">Hidden</span>
        )}

        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-zinc-700 transition-colors group-hover:text-zinc-400">
          <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Edit sheet */}
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Edit link">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="id" value={link.id} />
          {state.error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" /><line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" /></svg>
              {state.error}
            </div>
          )}
          <div>
            <p className="mb-3 text-xs font-medium text-zinc-500">Platform</p>
            <PlatformSelector name="type" defaultValue={platform} onChange={handlePlatformChange} />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">{LINK_TYPE_META[platform].baseUrl ? LINK_TYPE_META[platform].label : "Link URL"}</p>
            <SmartUrlInput platform={platform} defaultValue={link.url ?? ""} name="url" />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Button label</p>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder={LINK_TYPE_META[platform].defaultTitle} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20" />
          </div>
          <input type="hidden" name="order" value={link.order} />
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-emerald-400"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Visible</p>
                <p className="text-[11px] text-zinc-600">Show on page</p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer">
              <input type="checkbox" name="active" defaultChecked={link.active} className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-white/[0.08] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-zinc-500 after:shadow after:transition-all peer-checked:bg-orange-500 peer-checked:after:translate-x-5 peer-checked:after:bg-white" />
            </label>
          </div>
          <SubmitButton>Save changes</SubmitButton>
        </form>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <form action={toggleLinkAction}>
            <input type="hidden" name="id" value={link.id} />
            <button type="submit" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-[13px] font-medium text-zinc-400 transition-all hover:bg-white/[0.06] active:scale-[0.98]">{link.active ? "Hide" : "Show"}</button>
          </form>
          <form action={removeLinkAction} onSubmit={(e) => { if (!confirm("Delete this link?")) e.preventDefault(); }}>
            <input type="hidden" name="id" value={link.id} />
            <button type="submit" className="w-full rounded-xl border border-red-500/10 bg-red-500/[0.05] py-2.5 text-[13px] font-medium text-red-400 transition-all hover:bg-red-500/[0.1] active:scale-[0.98]">Delete</button>
          </form>
        </div>
      </BottomSheet>
    </>
  );
}
