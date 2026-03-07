"use client";

import { useState, useRef } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submit-button";
import { PlatformSelector } from "@/components/platform-selector";
import { SmartUrlInput } from "@/components/smart-url-input";
import { LINK_TYPE_META, type LinkType } from "@/types/link";
import type { Link } from "@/types/database";

interface LinkFormProps {
  action: (
    prevState: { error: string | null },
    formData: FormData,
  ) => Promise<{ error: string | null }>;
  link?: Link;
}

export function LinkForm({ action, link }: LinkFormProps) {
  const initPlatform = (link?.type as LinkType) || "website";
  const [platform, setPlatform] = useState<LinkType>(initPlatform);
  const [title, setTitle] = useState(link?.title ?? LINK_TYPE_META[initPlatform].defaultTitle);
  const titleTouched = useRef(!!link?.title);

  const [state, formAction] = useFormState(action, { error: null });

  const handlePlatformChange = (t: LinkType) => {
    const oldDefault = LINK_TYPE_META[platform].defaultTitle;
    setPlatform(t);
    if (!titleTouched.current || title === oldDefault) {
      setTitle(LINK_TYPE_META[t].defaultTitle);
    }
  };

  return (
    <form action={formAction} className="space-y-5">
      {link && <input type="hidden" name="id" value={link.id} />}
      <input type="hidden" name="order" value={link?.order ?? 0} />

      {state.error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
            <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
          </svg>
          {state.error}
        </div>
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-white">Platform</legend>
        <PlatformSelector name="type" defaultValue={platform} onChange={handlePlatformChange} />
      </fieldset>

      {/* Smart URL */}
      <div>
        <p className="mb-2 text-sm font-semibold text-white">
          {LINK_TYPE_META[platform].baseUrl ? `Your ${LINK_TYPE_META[platform].label}` : "Link URL"}
        </p>
        <SmartUrlInput platform={platform} defaultValue={link?.url ?? ""} name="url" />
      </div>

      {/* Title */}
      <div>
        <p className="mb-2 text-sm font-semibold text-white">Button label</p>
        <input
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            titleTouched.current = true;
          }}
          placeholder={LINK_TYPE_META[platform].defaultTitle}
          className="w-full rounded-2xl border-2 border-white/[0.06] bg-[#111] px-4 py-3.5 text-sm text-white placeholder-gray-600 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
        <p className="mt-1.5 text-xs text-gray-600">
          This is what visitors see on your page
        </p>
      </div>

      {/* Active toggle */}
      <div className="overflow-hidden rounded-2xl border-2 border-white/[0.06] bg-[#111]">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-white">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Visible</p>
              <p className="text-xs text-gray-500">Show on your page</p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              name="active"
              type="checkbox"
              defaultChecked={link?.active ?? true}
              className="peer sr-only"
            />
            <div className="h-7 w-12 rounded-full bg-white/10 after:absolute after:left-[3px] after:top-[3px] after:h-[22px] after:w-[22px] after:rounded-full after:bg-gray-500 after:shadow-lg after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-yellow-500 peer-checked:after:translate-x-5 peer-checked:after:bg-black" />
          </label>
        </div>
      </div>

      <SubmitButton>{link ? "Save changes" : "Add link"}</SubmitButton>
    </form>
  );
}
