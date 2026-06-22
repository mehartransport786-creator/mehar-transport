import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import Vehicle from "@/lib/models/Vehicle";
import SimulatorClient from "./SimulatorClient";

export default async function PricingSimulatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  // Fetch active routes and vehicles for the simulator dropdowns
  const [routes, vehicles] = await Promise.all([
    Route.find({ status: { $ne: 'archived' }, isActive: true })
      .sort({ name: 1 })
      .lean(),
    Vehicle.find({ status: { $ne: 'archived' }, active: true })
      .sort({ name: 1 })
      .lean()
  ]);

  return (
    <SimulatorClient 
      routes={JSON.parse(JSON.stringify(routes))} 
      vehicles={JSON.parse(JSON.stringify(vehicles))} 
      isAr={isAr} 
    />
  );
}
