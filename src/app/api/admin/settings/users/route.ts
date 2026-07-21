import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";
import { AuditLog } from "@/lib/models/AuditLog";
import bcryptjs from "bcryptjs";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("users", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    const users = await Admin.find().populate("role", "name").select("-passwordHash -passwordHistory").sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const permissionError = await requirePermission("users", "create");
    if (permissionError) return permissionError;

    const body = await request.json();
    const { name, email, password, role, department, phone } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await Admin.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already in use" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(12);
    const passwordHash = await bcryptjs.hash(password, salt);

    const newUser = await Admin.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      department,
      phone,
      status: "active",
      twoFactorEnabled: false
    });

    const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
    const browser = request.headers.get("user-agent") || "Unknown Browser";

    await AuditLog.create({
      adminId: session?.user?.id,
      adminEmail: session?.user?.email,
      ip,
      browser,
      action: "CREATE_USER",
      module: "users",
      newValue: { id: newUser._id, email: newUser.email, role: newUser.role }
    });

    return NextResponse.json({ success: true, data: { _id: newUser._id, name, email } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
