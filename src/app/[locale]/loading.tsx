import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
