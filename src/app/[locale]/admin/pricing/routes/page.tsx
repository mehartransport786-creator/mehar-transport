import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import Route from "@/lib/models/Route";
import Vehicle from "@/lib/models/Vehicle";
import RoutePricingClient from "./RoutePricingClient";

export default async function RoutePricingPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  let pricingRules: any[] = [];
  let routes: any[] = [];
  let vehicles: any[] = [];
  
  try {
    await connectToDatabase();
    
    // Fetch all needed data
    const [fetchedRules, fetchedRoutes, fetchedVehicles] = await Promise.all([
      RoutePricing.find()
        .populate("routeId", "name nameAr origin originAr destination destinationAr")
        .populate("vehicleId", "name nameAr type typeAr image")
        .sort({ createdAt: -1 })
        .lean(),
      Route.find().sort({ name: 1 }).lean(),
      Vehicle.find({ isActive: true }).sort({ name: 1 }).lean()
    ]);
    
    // Serialize for client components
    pricingRules = JSON.parse(JSON.stringify(fetchedRules));
    routes = JSON.parse(JSON.stringify(fetchedRoutes));
    vehicles = JSON.parse(JSON.stringify(fetchedVehicles));
    
  } catch (error) {
    console.error("Database connection failed, using mock data for admin view");
    // Fallback data if DB fails
    // ... we can just return empty arrays or minimal mock data since this is a real feature now
    pricingRules = [];
    routes = [];
    vehicles = [];
  }

  return (
    <RoutePricingClient 
      pricingRules={pricingRules} 
      routes={routes} 
      vehicles={vehicles} 
      isAr={isAr} 
    />
  );
}
