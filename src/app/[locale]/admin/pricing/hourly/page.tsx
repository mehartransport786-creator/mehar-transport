import connectToDatabase from "@/lib/db";
import HourlyPricing from "@/lib/models/HourlyPricing";
import Vehicle from "@/lib/models/Vehicle";
import HourlyPricingClient from "./HourlyPricingClient";

export default async function HourlyPricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  // Fetch pricing rules and active vehicles
  const [pricingRules, vehicles] = await Promise.all([
    HourlyPricing.find()
      .populate("vehicleId", "name nameAr type typeAr image")
      .sort({ createdAt: -1 })
      .lean(),
    Vehicle.find({ status: { $ne: 'archived' } })
      .sort({ name: 1 })
      .lean()
  ]);

  return (
    <HourlyPricingClient 
      initialPricingRules={JSON.parse(JSON.stringify(pricingRules))} 
      vehicles={JSON.parse(JSON.stringify(vehicles))}
      isAr={isAr} 
    />
  );
}
