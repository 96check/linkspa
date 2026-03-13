/* QR code with Salonlink branding — text is embedded in the SVG */
export function QrWithAccent({ dataUrl, size = 200 }: { dataUrl: string; size?: number }) {
  return (
    <div style={{ width: size, flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dataUrl} alt="QR Code" width={size} style={{ display: "block", borderRadius: 12 }} />
    </div>
  );
}
