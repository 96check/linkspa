import Image from "next/image";

/**
 * Brand logo: sal[🔵]nlink.io
 * The circular logo.png replaces the "o" in "salonlink.io"
 * Uses em-based sizing so it scales with any parent font-size.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight ${className}`}
    >
      <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
        sal
      </span>
      <Image
        src="/logo.png"
        alt="o"
        width={32}
        height={32}
        className="mx-[0.5px] h-[1.2em] w-[1.2em] rounded-full object-contain drop-shadow-[0_0_4px_rgba(249,115,22,0.3)]"
      />
      <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        nlink
      </span>
      <span className="text-gray-500">.io</span>
    </span>
  );
}
