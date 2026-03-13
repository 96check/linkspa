import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salonlink.io"),
  title: "SalonLink",
  description: "Social links for your spa, one scan away.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SalonLink",
    description:
      "Social links for your spa, one scan away. Create a stunning page, generate a QR code, and let customers discover your business.",
    url: "https://salonlink.io",
    siteName: "SalonLink",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "SalonLink Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SalonLink",
    description: "Social links for your spa, one scan away.",
    images: ["/logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
