import QRCode from "qrcode";
import { requireSpa } from "@/server/auth";
import { env } from "@/lib/env";
import { CopyUrlButton } from "@/components/copy-url-button";
import { DownloadButton } from "./download-button";

export default async function QRPage() {
  const { spa } = await requireSpa();

  const publicUrl = `${env.NEXT_PUBLIC_APP_URL}/${spa.slug}`;

  const qrDataUrl = await QRCode.toDataURL(publicUrl, {
    width: 512,
    margin: 2,
    color: {
      dark: "#f97316",
      light: "#000000",
    },
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">QR Code</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Print and display at your spa
        </p>
      </div>

      {/* QR Card */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl border border-white/[0.06] bg-black p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt={`QR code for ${spa.spa_name}`}
              width={200}
              height={200}
              className="h-[200px] w-[200px]"
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <p className="font-mono text-xs text-gray-500">
              {env.NEXT_PUBLIC_APP_URL}/{spa.slug}
            </p>
            <CopyUrlButton url={publicUrl} />
          </div>

          <div className="mt-5 w-full">
            <DownloadButton
              dataUrl={qrDataUrl}
              filename={`${spa.slug}-qr.png`}
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
        <p className="text-sm font-medium text-orange-300">How to use</p>
        <ol className="mt-2 space-y-1.5 text-xs text-orange-300/70">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            Download the QR code image
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            Print it or add it to your menu / table card
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            Customers scan it to see your social links and booking
          </li>
        </ol>
      </div>
    </div>
  );
}
