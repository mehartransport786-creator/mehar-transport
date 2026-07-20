import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
        <p className="text-sm font-semibold text-muted-foreground animate-pulse uppercase tracking-[0.2em] mt-2">Loading...</p>
      </div>
    </div>
  );
}
