"use client";

import { useState, useTransition } from "react";
import { reorderLinks } from "@/server/actions/dashboard";
import { LinkCard } from "./link-card";
import type { Link } from "@/types/database";

export function DashboardLinkList({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [, startTransition] = useTransition();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingId(id);
    setOverId(null);
  };

  const handleDragOver = (id: string) => {
    if (id !== draggingId) setOverId(id);
  };

  const handleDragEnd = () => {
    if (!draggingId || !overId || draggingId === overId) {
      setDraggingId(null);
      setOverId(null);
      return;
    }

    const sourceIndex = links.findIndex((l) => l.id === draggingId);
    const targetIndex = links.findIndex((l) => l.id === overId);
    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggingId(null);
      setOverId(null);
      return;
    }

    const reordered = [...links];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    setLinks(reordered);
    setDraggingId(null);
    setOverId(null);

    startTransition(async () => {
      await reorderLinks(reordered.map((l) => l.id));
    });
  };

  return (
    <div className="divide-y divide-white/[0.06]">
      {links.map((link) => {
        const isDragging = draggingId === link.id;
        const isOver = overId === link.id;
        return (
          <div
            key={link.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              handleDragStart(link.id);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              handleDragOver(link.id);
            }}
            onDragEnd={handleDragEnd}
            className={[
              "relative flex items-center transition-all",
              isDragging ? "opacity-40 scale-[0.99]" : "",
              isOver ? "bg-orange-500/[0.06] ring-inset ring-1 ring-orange-500/20" : "",
            ].join(" ")}
          >
            {/* Drag handle — sits to the left, outside the LinkCard button */}
            <div
              className="absolute left-0 flex h-full w-5 cursor-grab touch-none select-none items-center justify-center text-zinc-700 transition-colors hover:text-zinc-400 active:cursor-grabbing"
              title="Drag to reorder"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <circle cx="9" cy="6" r="1.5" />
                <circle cx="15" cy="6" r="1.5" />
                <circle cx="9" cy="12" r="1.5" />
                <circle cx="15" cy="12" r="1.5" />
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="15" cy="18" r="1.5" />
              </svg>
            </div>

            {/* Offset the card content so it clears the handle */}
            <div className="w-full pl-5">
              <LinkCard link={link} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
