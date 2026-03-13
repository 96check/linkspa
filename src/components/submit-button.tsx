"use client";

import { useFormStatus } from "react-dom";

const styles = {
  default:
    "w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-400 active:scale-[0.98] disabled:opacity-40",
  gradient:
    "w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-40",
} as const;

export function SubmitButton({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles[variant]}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
          </svg>
          Saving...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
