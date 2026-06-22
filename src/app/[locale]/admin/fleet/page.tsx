import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";
import FleetManagementClient from "./FleetManagementClient";

export default async function AdminFleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  let vehicles: any[] = [];
  try {
    await connectToDatabase();
    const fetchedVehicles = await Vehicle.find({ active: { $ne: false } })
      .sort({ name: 1 })
      .lean();
    vehicles = JSON.parse(JSON.stringify(fetchedVehicles));
  } catch (error) {
    console.error("Failed to fetch vehicles for admin:", error);
  }

  return <FleetManagementClient vehicles={vehicles} isAr={isAr} />;
}
