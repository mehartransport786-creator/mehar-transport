import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { Role } from "@/lib/models/Role";
import { AuditLog } from "@/lib/models/AuditLog";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("settings", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    const roles = await Role.find().sort({ createdAt: 1 }).lean();
    
    return NextResponse.json({ success: true, data: roles });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const permissionError = await requirePermission("settings", "edit");
    if (permissionError) return permissionError;

    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name || !permissions) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return NextResponse.json({ success: false, error: "Role name already exists" }, { status: 400 });
    }

    const newRole = await Role.create({
      name,
      description,
      permissions
    });

    const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
    const browser = request.headers.get("user-agent") || "Unknown Browser";

    await AuditLog.create({
      adminId: session?.user?.id,
      adminEmail: session?.user?.email,
      ip,
      browser,
      action: "CREATE_ROLE",
      module: "settings",
      newValue: { id: newRole._id, name: newRole.name }
    });

    return NextResponse.json({ success: true, data: newRole }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
