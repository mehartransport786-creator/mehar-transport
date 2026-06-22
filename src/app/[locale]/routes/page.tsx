import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import RoutesClient from "./RoutesClient";
import { fallbackRoutesData } from "@/lib/fallbackData";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات النقل | ميهار للنقل" : "Our Routes | Mehar Transport",
    description: isAr ? "استكشف مسارات النقل الشائعة لدينا وتعرف على الأسعار وأوقات الرحلات" : "Explore our popular transport routes, pricing, and travel times.",
  };
}

export default async function RoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  let routes = [];
  
  try {
    await connectToDatabase();
    const fetchedRoutes = await Route.find({ status: { $ne: 'archived' }, isActive: true })
      .sort({ name: 1 })
      .lean();
    routes = JSON.parse(JSON.stringify(fetchedRoutes));
  } catch (error) {
    console.error("Failed to fetch routes, using fallback");
    routes = fallbackRoutesData;
  }

  // If DB was empty (not seeded properly), use fallback
  if (routes.length === 0) {
    routes = fallbackRoutesData;
  }

  return <RoutesClient routes={routes} isAr={isAr} />;
}
