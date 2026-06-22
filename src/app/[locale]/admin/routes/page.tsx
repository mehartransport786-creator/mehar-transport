import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import RoutesManagementClient from "./RoutesManagementClient";

export default async function AdminRoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  let routes: any[] = [];
  try {
    await connectToDatabase();
    const fetchedRoutes = await Route.find({ status: { $ne: 'archived' } })
      .sort({ createdAt: -1 })
      .lean();
    routes = JSON.parse(JSON.stringify(fetchedRoutes));
  } catch (error) {
    console.error("Failed to fetch routes for admin:", error);
  }

  return <RoutesManagementClient routes={routes} isAr={isAr} />;
}
