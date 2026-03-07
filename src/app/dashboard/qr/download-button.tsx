"use client";

export function DownloadButton({
  dataUrl,
  filename,
}: {
  dataUrl: string;
  filename: string;
}) {
  function handleDownload() {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

  return (
    <button
      onClick={handleDownload}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="relative h-4 w-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="relative">Download QR Code</span>
    </button>
  );
}
