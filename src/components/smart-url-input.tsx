"use client";

import { useState } from "react";
import { LINK_TYPE_META, extractHandle, buildUrl, type LinkType } from "@/types/link";
import { PlatformIcon } from "@/components/platform-icon";

interface SmartUrlInputProps {
  platform: LinkType;
  defaultValue?: string;
  name?: string;
}

export function SmartUrlInput({ platform, defaultValue = "", name = "url" }: SmartUrlInputProps) {
  const meta = LINK_TYPE_META[platform];
  const [handle, setHandle] = useState(() => extractHandle(defaultValue, platform));
  const [prevPlatform, setPrevPlatform] = useState(platform);

  if (platform !== prevPlatform) {
    setHandle("");
    setPrevPlatform(platform);
  }

  const fullUrl = buildUrl(handle, platform);

  if (meta.baseUrl) {
    return (
      <div>
        <input type="hidden" name={name} value={fullUrl} />
        <div className="group flex items-stretch overflow-hidden rounded-2xl border-2 border-white/[0.06] bg-[#111] transition-all focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20">
          <span className="flex items-center gap-2 border-r border-white/[0.06] px-3">
            <PlatformIcon type={platform} className="h-5 w-5 text-gray-500" />
            <span className="text-xs font-medium text-gray-500">{meta.displayPrefix}</span>
          </span>
          <input
            type={meta.inputType || "text"}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder={meta.inputPlaceholder}
            required
            className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none"
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-600">
          Just enter your {meta.label} handle — we build the link for you
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="group flex items-stretch overflow-hidden rounded-2xl border-2 border-white/[0.06] bg-[#111] transition-all focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20">
        <span className="flex items-center border-r border-white/[0.06] px-3">
          <PlatformIcon type={platform} className="h-5 w-5 text-gray-500" />
        </span>
        <input
          type={meta.inputType || "url"}
          name={name}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder={meta.inputPlaceholder}
          required
          className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none"
        />
      </div>
      <p className="mt-1.5 text-xs text-gray-600">
        Paste the full {meta.label} link
      </p>
    </div>
  );
}
