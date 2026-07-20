import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import { requirePermission } from "@/lib/rbac";

// F06: Previously used bare auth() session check — any admin role could create/mutate routes.

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET(request: Request) {
  const denied = await requirePermission('routes', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const routeType = searchParams.get("routeType") || "";
    const city = searchParams.get("city") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameAr: { $regex: search, $options: "i" } },
        { origin: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ];
    }
    if (routeType) query.routeType = routeType;
    if (city) query.city = city;
    if (status) {
      query.status = status;
    } else {
      query.status = { $ne: 'archived' };
    }

    const total = await Route.countDocuments(query);
    const routes = await Route.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(routes)),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    console.error("Error fetching routes:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await requirePermission('routes', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.slug) {
      body.slug = generateSlug(body.name || '');
    }

    // Sync isActive with status
    body.isActive = body.status !== 'archived' && body.status !== 'draft';

    // Set defaults for pickup/dropoff from origin/destination
    if (!body.pickupLocation) body.pickupLocation = body.origin || '';
    if (!body.pickupLocationAr) body.pickupLocationAr = body.originAr || '';
    if (!body.dropoffLocation) body.dropoffLocation = body.destination || '';
    if (!body.dropoffLocationAr) body.dropoffLocationAr = body.destinationAr || '';

    const route = await Route.create(body);

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(route)) }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating route:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "A route with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
