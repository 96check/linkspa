export const runtime = "nodejs";

import { requireSpa } from "@/server/auth";
import { env } from "@/lib/env";
import { buildStyledQrDataUrl } from "@/lib/styled-qr";
import { QrPageClient } from "./qr-page-client";

export default async function QRPage() {
  const { spa } = await requireSpa();

  const publicUrl = `${env.NEXT_PUBLIC_APP_URL}/${spa.slug}`;
  const opts = { size: 400, accentSeed: spa.slug };

  const [qrLight, qrDark] = await Promise.all([
    buildStyledQrDataUrl(publicUrl, { ...opts, mode: "light" as const }),
    buildStyledQrDataUrl(publicUrl, { ...opts, mode: "dark" as const }),
  ]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">QR Code</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Print and display at your spa
        </p>
      </div>

      <QrPageClient
        qrLightUrl={qrLight}
        qrDarkUrl={qrDark}
        publicUrl={publicUrl}
        slug={spa.slug}
      />
    </div>
  );
}
