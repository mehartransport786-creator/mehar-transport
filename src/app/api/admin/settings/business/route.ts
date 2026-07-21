import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { BusinessSettings } from "@/lib/models/BusinessSettings";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("settings", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    let settings = await BusinessSettings.findOne().lean();

    if (!settings) {
      settings = await BusinessSettings.create({
        companyName: "Mehar Transport",
        businessName: "Mehar Transport LLC",
        supportEmail: "support@mehar.sa",
        phoneNumbers: ["+966 56 563 8120"],
        whatsapp: "+966 56 563 8120",
        officeAddress: "Al Nawariyah, Makkah, Saudi Arabia",
        googleMapsLink: "",
        businessHours: "24/7",
        timeZone: "Asia/Riyadh",
        currency: "SAR",
        language: "en"
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const permissionError = await requirePermission("settings", "edit");
    if (permissionError) return permissionError;

    const body = await request.json();
    await connectToDatabase();

    const updatedSettings = await BusinessSettings.findOneAndUpdate(
      {}, // empty filter to match the first/only document
      { ...body, updatedBy: session?.user?.id },
      { new: true, upsert: true } // upsert creates it if it doesn't exist
    );

    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
