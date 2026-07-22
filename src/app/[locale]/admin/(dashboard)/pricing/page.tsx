import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import Route from "@/lib/models/Route";
import Vehicle from "@/lib/models/Vehicle";
import PricingMatrixClient from "./PricingMatrixClient";

export default async function PricingDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  let pricings: any[] = [];
  let routes: any[] = [];
  let vehicles: any[] = [];
  
  try {
    await connectToDatabase();
    
    // Fetch all needed data
    const [fetchedRules, fetchedRoutes, fetchedVehicles] = await Promise.all([
      RoutePricing.find().lean(),
      Route.find({ status: { $ne: 'archived' } }).sort({ name: 1 }).lean(),
      Vehicle.find({ active: { $ne: false } }).sort({ name: 1 }).lean()
    ]);
    
    // Serialize for client components
    pricings = JSON.parse(JSON.stringify(fetchedRules));
    routes = JSON.parse(JSON.stringify(fetchedRoutes));
    vehicles = JSON.parse(JSON.stringify(fetchedVehicles));
    
  } catch (error) {
    console.error("Database connection failed for pricing matrix");
  }

  return (
    <div className="p-4 md:p-8 flex-1 flex flex-col h-full bg-white rounded-2xl shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {isAr ? "مصفوفة التسعير" : "Pricing Matrix"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isAr 
            ? "التحكم في أسعار الرحلات لجميع فئات المركبات."
            : "Complete control over route prices for all vehicle categories."}
        </p>
      </div>

      <PricingMatrixClient 
        pricings={pricings} 
        routes={routes} 
        vehicles={vehicles} 
        isAr={isAr} 
      />
    </div>
  );
}
