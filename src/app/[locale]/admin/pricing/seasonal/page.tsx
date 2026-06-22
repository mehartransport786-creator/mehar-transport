import connectToDatabase from "@/lib/db";
import SeasonalPricing from "@/lib/models/SeasonalPricing";
import SeasonalPricingClient from "./SeasonalPricingClient";

export default async function SeasonalPricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  let seasons: any[] = [];
  try {
    await connectToDatabase();
    const fetchedSeasons = await SeasonalPricing.find().sort({ startDate: 1 }).lean();
    seasons = JSON.parse(JSON.stringify(fetchedSeasons));
  } catch (error) {
    console.error("Failed to fetch seasonal pricing rules");
  }

  return <SeasonalPricingClient initialSeasons={seasons} isAr={isAr} />;
}
