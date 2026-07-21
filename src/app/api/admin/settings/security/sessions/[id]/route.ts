import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { AdminSession } from "@/lib/models/AdminSession";
import { AuditLog } from "@/lib/models/AuditLog";

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const resolvedParams = await params;
    const sessionId = resolvedParams.id;
    const targetSession = await AdminSession.findById(sessionId);

    if (!targetSession) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }

    // Only allow terminating your own session unless you're a Super Admin (we'll keep it simple: can only terminate own sessions here)
    if (targetSession.adminId.toString() !== session.user.id) {
      return NextResponse.json({ success: false, error: "Unauthorized to terminate this session" }, { status: 403 });
    }

    // Prevent terminating the current active session via this endpoint
    if ((session.user as any).sessionId === targetSession.sessionToken) {
      return NextResponse.json({ success: false, error: "Cannot terminate your current active session here. Use logout." }, { status: 400 });
    }

    // Revoke the session
    targetSession.status = "revoked";
    await targetSession.save();

    // Log the audit event
    const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
    const browser = request.headers.get("user-agent") || "Unknown Browser";

    await AuditLog.create({
      adminId: session.user.id,
      adminEmail: session.user.email,
      ip,
      browser,
      action: "REVOKE_SESSION",
      module: "security",
      oldValue: { sessionId: targetSession._id },
    });

    return NextResponse.json({ success: true, message: "Session terminated successfully" });

  } catch (error: any) {
    console.error("Session termination error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
