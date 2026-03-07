"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addLink } from "@/server/actions/dashboard";
import { BottomSheet } from "@/components/bottom-sheet";
import { PlatformSelector } from "@/components/platform-selector";
import { SmartUrlInput } from "@/components/smart-url-input";
import { LINK_TYPE_META, type LinkType } from "@/types/link";

function AddLinkButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98] disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-3">
          {/* Animated chain link icon */}
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute h-5 w-5 animate-ping rounded-full bg-white/30" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="relative h-3.5 w-3.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </span>
          <span className="flex items-baseline gap-0.5">
            Adding
            <span className="inline-flex gap-0.5 pl-0.5">
              <span className="animate-bounce [animation-delay:0ms] h-1 w-1 rounded-full bg-white/80 mt-1" />
              <span className="animate-bounce [animation-delay:150ms] h-1 w-1 rounded-full bg-white/80 mt-1" />
              <span className="animate-bounce [animation-delay:300ms] h-1 w-1 rounded-full bg-white/80 mt-1" />
            </span>
          </span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-4 w-4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add link
        </span>
      )}
    </button>
  );
}

export function AddLinkSheet() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<LinkType>("instagram");
  const [title, setTitle] = useState(LINK_TYPE_META.instagram.defaultTitle);
  const titleTouched = useRef(false);

  const [state, formAction] = useFormState(addLink, { error: null, success: false });

  useEffect(() => { if (state.success) setOpen(false); }, [state.success]);

  const handlePlatformChange = (t: LinkType) => {
    setPlatform(t);
    if (!titleTouched.current) setTitle(LINK_TYPE_META[t].defaultTitle);
  };

  return (
    <>
      {/* Bold CTA button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 p-[1px] shadow-lg shadow-orange-500/15 transition-all hover:shadow-xl hover:shadow-orange-500/25 active:scale-[0.98]"
      >
        <div className="relative flex items-center justify-center gap-2.5 rounded-[15px] bg-[#09090b] py-3.5 transition-colors group-hover:bg-[#09090b]/80">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="h-3 w-3 text-black">
              <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Add new link
          </span>
        </div>
      </button>

      {/* Sheet */}
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Add a link">
        <form action={formAction} className="space-y-5">
          {state.error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" /><line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" /></svg>
              {state.error}
            </div>
          )}
          <div>
            <p className="mb-3 text-xs font-medium text-zinc-500">Choose a platform</p>
            <PlatformSelector name="type" defaultValue={platform} onChange={handlePlatformChange} />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">{LINK_TYPE_META[platform].baseUrl ? LINK_TYPE_META[platform].label : "Link URL"}</p>
            <SmartUrlInput platform={platform} name="url" />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Button label</p>
            <input
              name="title"
              value={title}
              onChange={(e) => { setTitle(e.target.value); titleTouched.current = true; }}
              required
              placeholder={LINK_TYPE_META[platform].defaultTitle}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
            />
            <p className="mt-1.5 text-[11px] text-zinc-600">This is what visitors see on your page</p>
          </div>
          <input type="hidden" name="order" value="0" />
          <input type="hidden" name="active" value="on" />
          <AddLinkButton />
        </form>
      </BottomSheet>
    </>
  );
}
