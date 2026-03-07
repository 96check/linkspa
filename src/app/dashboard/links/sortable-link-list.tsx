"use client";

import { useState, useTransition } from "react";
import { reorderLinks } from "@/server/actions/dashboard";
import { LinkRow } from "./link-row";
import type { Link } from "@/types/database";

export function SortableLinkList({ initialLinks }: { initialLinks: Link[] }) {
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
    <div className="space-y-2">
      {links.map((link) => (
        <LinkRow
          key={link.id}
          link={link}
          isDragging={draggingId === link.id}
          isOver={overId === link.id}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
