import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";
import { AdminSession } from "@/lib/models/AdminSession";
import { AuditLog } from "@/lib/models/AuditLog";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Password strength validation (min 12 chars, upper, lower, number, special)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return NextResponse.json({ 
        success: false, 
        error: "Password must be at least 12 characters and include uppercase, lowercase, number, and special character." 
      }, { status: 400 });
    }

    await connectToDatabase();
    
    const admin = await Admin.findById(session.user.id);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await bcryptjs.compare(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Incorrect current password" }, { status: 400 });
    }

    // Check password history (prevent reuse of last 3 passwords)
    if (admin.passwordHistory && admin.passwordHistory.length > 0) {
      for (const oldHash of admin.passwordHistory) {
        const isReused = await bcryptjs.compare(newPassword, oldHash);
        if (isReused) {
          return NextResponse.json({ success: false, error: "You cannot reuse a recent password." }, { status: 400 });
        }
      }
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(12); // Higher cost factor for better security
    const newPasswordHash = await bcryptjs.hash(newPassword, salt);

    // Update history (keep only last 3)
    let history = admin.passwordHistory || [];
    history.unshift(admin.passwordHash); // Store the old hash
    if (history.length > 3) {
      history = history.slice(0, 3);
    }

    admin.passwordHash = newPasswordHash;
    admin.passwordHistory = history;
    await admin.save();

    const currentSessionId = (session.user as any).sessionId;

    // Revoke all OTHER active sessions
    await AdminSession.updateMany(
      { adminId: admin._id, sessionToken: { $ne: currentSessionId }, status: "active" },
      { $set: { status: "revoked" } }
    );

    // Log the audit event
    const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
    const browser = request.headers.get("user-agent") || "Unknown Browser";

    await AuditLog.create({
      adminId: admin._id,
      adminEmail: admin.email,
      ip,
      browser,
      action: "PASSWORD_CHANGED",
      module: "security",
    });

    return NextResponse.json({ success: true, message: "Password updated successfully. Other sessions revoked." });

  } catch (error: any) {
    console.error("Password change error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
