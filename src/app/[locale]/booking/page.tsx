import { getTranslations, getLocale } from "next-intl/server";
import { BookingEngine } from "@/components/booking-page/BookingEngine";

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
    <main className="min-h-screen bg-[#F5F4F1]">
      <BookingEngine />
    </main>
  );
}
