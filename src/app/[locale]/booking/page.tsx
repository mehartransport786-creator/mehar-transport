import { BookingApp } from "@/components/booking-v2/BookingApp";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  return {
    title: isAr ? "احجز رحلتك | ميهار للنقل" : "Book Your Journey | Mehar Transport",
    description: isAr 
      ? "احجز وسيلة النقل الفاخرة الخاصة بك بكل سهولة عبر منصة الحجز المتقدمة من ميهار للنقل."
      : "Book your luxury transportation easily with Mehar Transport's premium booking platform.",
  };
}

export default async function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Suspense is required: the BookingApp client tree contains hooks
          (useSearchParams, useRouter) that opt out of static rendering.
          Without this boundary, Next.js throws during SSR on Vercel cold starts
          and the error escalates to global-error.tsx. */}
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }>
        <BookingApp />
      </Suspense>
    </main>
  );
}
