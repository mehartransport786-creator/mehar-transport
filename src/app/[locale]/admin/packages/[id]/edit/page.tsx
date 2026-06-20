import PackageForm from "@/components/admin/PackageForm";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import { notFound } from "next/navigation";

export default async function EditPackagePage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  let packageData = null;

  try {
    await connectToDatabase();
    const pkg = await Package.findById(id).lean();
    if (!pkg) {
      return notFound();
    }
    
    // Convert ObjectIds to strings for passing to Client Component
    packageData = {
      ...pkg,
      _id: pkg._id.toString(),
      includedRoutes: pkg.includedRoutes.map((r: any) => r.toString()),
      availableVehicles: pkg.availableVehicles.map((v: any) => v.toString()),
      createdAt: pkg.createdAt?.toISOString(),
      updatedAt: pkg.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch package for editing:", error);
    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-xl font-bold">Database Connection Error</h2>
        <p>Could not connect to the database to load this package.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PackageForm locale={locale} packageData={packageData} />
    </div>
  );
}
