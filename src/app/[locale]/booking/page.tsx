import { getTranslations, getLocale } from "next-intl/server";
import { BookingApp } from "@/components/booking-v2/BookingApp";

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
      <BookingApp />
    </main>
  );
}
