import { auth } from "@/auth";
import { Admin } from "@/lib/models/Admin";
import "@/lib/models/Role";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Enterprise RBAC Utility
 * Call this function at the start of your protected API routes.
 * 
 * @param module The module being accessed (e.g., 'bookings', 'users', 'settings')
 * @param requiredAction The action being performed (e.g., 'view', 'edit', 'delete')
 * @returns Error Response if unauthorized, or null if authorized
 */
export async function requirePermission(module: string, requiredAction: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const admin = await Admin.findById(session.user.id).populate("role");

  if (!admin || admin.status !== "active") {
    return NextResponse.json({ success: false, error: "Account inactive or not found" }, { status: 403 });
  }

  // Super Admin bypasses all permission checks
  // Support both ObjectId populated roles and legacy string roles
  if (admin.role?.name === "Super Admin" || admin.role === "Super Admin") {
    return null;
  }

  // Check role permissions map
  const rolePermissions = admin.role?.permissions;
  if (!rolePermissions) {
    return NextResponse.json({ success: false, error: "No permissions assigned to role" }, { status: 403 });
  }

  // Map is stored in Mongoose as a Map object or plain object depending on `.lean()`
  const moduleActions = rolePermissions.get ? rolePermissions.get(module) : rolePermissions[module];

  if (!moduleActions || !moduleActions.includes(requiredAction)) {
    return NextResponse.json({ 
      success: false, 
      error: `Forbidden: Requires '${requiredAction}' permission on '${module}'` 
    }, { status: 403 });
  }

  return null; // Authorized
}

/**
 * Frontend hook equivalent: Server Action wrapper for RBAC
 */
export async function checkServerPermission(module: string, requiredAction: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;

  await connectToDatabase();
  const admin = await Admin.findById(session.user.id).populate("role");
  
  if (!admin || admin.status !== "active") return false;
  if (admin.role?.name === "Super Admin" || admin.role === "Super Admin") return true;

  const rolePermissions = admin.role?.permissions;
  if (!rolePermissions) return false;

  const moduleActions = rolePermissions.get ? rolePermissions.get(module) : rolePermissions[module];
  return moduleActions && moduleActions.includes(requiredAction);
}
