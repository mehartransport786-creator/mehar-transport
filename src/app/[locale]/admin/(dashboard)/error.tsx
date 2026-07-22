"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only. Calling reset() here would re-render, re-throw, and loop —
    // which is what generated 250 requests in four minutes.
    console.error("[admin] render error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center">
        <h1 className="mb-2 text-lg font-semibold text-white">Something went wrong</h1>
        <p className="mb-6 text-sm text-neutral-400">
          The admin area failed to load.
          {error.digest && (
            <> Reference: <code className="text-neutral-300">{error.digest}</code></>
          )}
        </p>
        {/* Manual retry only. Never automatic. */}
        <button
          onClick={() => reset()}
          className="rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
