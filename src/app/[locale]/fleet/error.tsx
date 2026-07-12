"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function FleetError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("FleetError");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">
        {t("title") || "Something went wrong!"}
      </h2>
      <p className="text-gray-500 max-w-md">
        {t("message") || "We couldn't load the fleet data. Please try again or contact support if the issue persists."}
      </p>
      <Button 
        onClick={() => reset()}
        className="mt-6 bg-secondary hover:bg-secondary/80 text-white font-bold px-8 py-2 rounded-lg"
      >
        {t("tryAgain") || "Try again"}
      </Button>
    </div>
  );
}
