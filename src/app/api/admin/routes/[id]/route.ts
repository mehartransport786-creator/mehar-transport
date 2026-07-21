import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import { requirePermission } from "@/lib/rbac";

export const dynamic = 'force-dynamic';

// F06: Previously used bare auth() session check on all methods.

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('routes', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const { id } = await params;
    const route = await Route.findById(id).lean();

    if (!route) {
      return NextResponse.json({ success: false, error: "Route not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(route)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('routes', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    // Sync isActive with status
    if (body.status) {
      body.isActive = body.status === 'active';
    }

    const route = await Route.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();

    if (!route) {
      return NextResponse.json({ success: false, error: "Route not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(route)) });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('routes', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const { id } = await params;

    // Soft delete — archive instead of removing
    const route = await Route.findByIdAndUpdate(id, { status: 'archived', isActive: false }, { new: true }).lean();

    if (!route) {
      return NextResponse.json({ success: false, error: "Route not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(route)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
