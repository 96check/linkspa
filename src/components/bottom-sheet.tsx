"use client";

import { useEffect, useRef } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-xl open:flex open:items-end open:justify-center"
      style={{ overscrollBehavior: "contain" }}
    >
      <div
        className={`w-full max-w-lg overflow-hidden rounded-t-3xl bg-[#0c0c0c] pb-[env(safe-area-inset-bottom)] shadow-2xl shadow-black/50 transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-[5px] w-9 rounded-full bg-white/[0.12]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <h2 className="text-[15px] font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-gray-500 transition-all hover:bg-white/[0.1] hover:text-white active:scale-90"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mx-6 mb-4 h-px bg-white/[0.04]" />

        {/* Content */}
        <div className="max-h-[72dvh] overflow-y-auto px-6 pb-8 scrollbar-thin">
          {children}
        </div>
      </div>
    </dialog>
  );
}
