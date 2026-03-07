export default function SpaNotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
        🔍
      </div>
      <h1 className="mb-2 text-xl font-bold">Page not found</h1>
      <p className="text-sm text-gray-500">
        This spa page doesn&apos;t exist yet.
      </p>
    </main>
  );
}
