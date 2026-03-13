/**
 * Converts an SVG data URL to a high-res PNG and triggers browser download.
 * The SVG data URL (image/svg+xml;base64) cannot be saved directly as .png —
 * we draw it on a canvas first to produce a real PNG blob.
 */
export async function downloadQrAsPng(svgDataUrl: string, filename: string) {
  const img = new Image();

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = svgDataUrl;
  });

  // Render at 2× for crisp printing
  const scale = 2;
  const w = (img.naturalWidth || 300) * scale;
  const h = (img.naturalHeight || 300) * scale;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.replace(/\.(svg|png)$/i, "") + ".png";
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
