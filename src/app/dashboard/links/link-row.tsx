"use client";

import Link from "next/link";
import { useRef } from "react";
import { deleteLink, toggleLinkActive } from "@/server/actions/links";
import { PlatformIcon } from "@/components/platform-icon";
import { LINK_TYPE_META } from "@/types/link";
import type { Link as LinkType } from "@/types/database";
import type { LinkType as LinkTypeEnum } from "@/types/link";

export function LinkRow({
  link,
  isDragging,
  isOver,
  onDragStart,
  onDragOver,
  onDragEnd,
}: {
  link: LinkType;
  isDragging?: boolean;
  isOver?: boolean;
  onDragStart?: (id: string) => void;
  onDragOver?: (id: string) => void;
  onDragEnd?: () => void;
}) {
  const type = (link.type as LinkTypeEnum) || "website";
  const meta = LINK_TYPE_META[type] ?? LINK_TYPE_META.website;

  // Pointer-based drag for touch devices
  const pointerStartY = useRef<number | null>(null);
  const didMove = useRef(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(link.id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver?.(link.id);
      }}
      onDragEnd={onDragEnd}
      onPointerDown={(e) => {
        // Only trigger on the drag-handle element itself
        const target = e.target as HTMLElement;
        if (!target.closest("[data-drag-handle]")) return;
        pointerStartY.current = e.clientY;
        didMove.current = false;
      }}
      onPointerMove={(e) => {
        if (pointerStartY.current === null) return;
        if (Math.abs(e.clientY - pointerStartY.current) > 4) {
          didMove.current = true;
          onDragStart?.(link.id);
        }
      }}
      onPointerUp={() => {
        if (didMove.current) onDragEnd?.();
        pointerStartY.current = null;
        didMove.current = false;
      }}
      className={[
        "group rounded-2xl border transition-all",
        isDragging
          ? "scale-[0.98] border-white/10 bg-white/[0.02] opacity-40"
          : isOver
            ? "border-orange-500/40 bg-orange-500/[0.06] ring-1 ring-orange-500/20"
            : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] hover:ring-1 hover:ring-orange-500/10",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Drag handle */}
        <div
          data-drag-handle
          className="shrink-0 cursor-grab touch-none select-none text-gray-700 transition-colors hover:text-gray-400 active:cursor-grabbing"
          title="Drag to reorder"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <circle cx="9" cy="6" r="1.5" />
            <circle cx="15" cy="6" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="18" r="1.5" />
            <circle cx="15" cy="18" r="1.5" />
          </svg>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <PlatformIcon type={type} className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium text-white">
              {link.title ?? meta.label}
            </p>
            {!link.active && (
              <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-gray-500">
                Hidden
              </span>
            )}
          </div>
          <p className="mt-0.5 max-w-[220px] truncate text-xs text-gray-600">
            {link.url}
          </p>
        </div>

        <div className="flex items-center gap-0.5">
          <form action={toggleLinkActive}>
            <input type="hidden" name="id" value={link.id} />
            <button
              type="submit"
              title={link.active ? "Hide from page" : "Show on page"}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-gray-300"
            >
              {link.active ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </form>

          <Link
            href={`/dashboard/links/${link.id}/edit`}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-orange-400"
            title="Edit"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <form
            action={deleteLink}
            onSubmit={(e) => {
              if (!window.confirm("Remove this link?")) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="id" value={link.id} />
            <button
              type="submit"
              title="Delete"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

