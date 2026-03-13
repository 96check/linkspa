import QRCode from "qrcode";

export type QrMode = "light" | "dark";

interface QrSvgOptions {
  size?: number;
  accentSeed?: string;
  mode?: QrMode;
}

export async function buildStyledQrSvg(
  url: string,
  { size = 300, accentSeed = "", mode = "light" }: QrSvgOptions = {}
): Promise<string> {

  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });

  const n = qr.modules.size;
  const data = qr.modules.data as Uint8Array;

  let seed = 0;
  for (let i = 0; i < accentSeed.length; i++) {
    seed += accentSeed.charCodeAt(i);
  }

  function rand(i: number) {
    const x = Math.sin(seed + i * 999) * 10000;
    return x - Math.floor(x);
  }

  function isFinder(r: number, c: number) {
    return (r <= 7 && c <= 7) ||
           (r <= 7 && c >= n - 8) ||
           (r >= n - 8 && c <= 7);
  }

  function isTiming(r: number, c: number) {
    return r === 6 || c === 6;
  }

  // Colors based on mode
  const bg     = mode === "dark" ? "#111111" : "white";
  const dotFg  = mode === "dark" ? "#ffffff" : "#000000";
  const ringMid = mode === "dark" ? "#111111" : "white";

  // Quiet zone for camera detection
  const quiet = 5;
  const cell = size / (n + quiet * 2);
  const offset = quiet * cell;
  const rDot = cell * 0.48;

  const modules: string[] = [];

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {

      if (!data[r * n + c]) continue;
      if (isFinder(r, c)) continue;

      const cx = offset + c * cell + cell / 2;
      const cy = offset + r * cell + cell / 2;

      const accent =
        !isTiming(r, c) && rand(r * n + c) < 0.02;

      const fill = accent
        ? "url(#gold)"
        : dotFg;

      modules.push(
        `<circle cx="${cx}" cy="${cy}" r="${rDot}" fill="${fill}"/>`
      );
    }
  }

  function finder(row: number, col: number) {
    const cx = offset + (col + 3.5) * cell;
    const cy = offset + (row + 3.5) * cell;

    return `
<circle cx="${cx}" cy="${cy}" r="${cell * 3.5}" fill="${dotFg}"/>
<circle cx="${cx}" cy="${cy}" r="${cell * 2.3}" fill="${ringMid}"/>
<circle cx="${cx}" cy="${cy}" r="${cell * 1.3}" fill="${dotFg}"/>
`;
  }

  const finders =
    finder(0, 0) +
    finder(0, n - 7) +
    finder(n - 7, 0);

  return `
<svg xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 ${size} ${size}"
width="${size}"
height="${size}">

<defs>

<linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#f59e0b"/>
<stop offset="100%" stop-color="#fcd34d"/>
</linearGradient>

</defs>

<rect width="${size}" height="${size}" fill="${bg}" rx="0"/>

${modules.join("")}

${finders}

</svg>
`;
}

export async function buildStyledQrDataUrl(
  url: string,
  options?: QrSvgOptions
) {

  const svg = await buildStyledQrSvg(url, options);

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
