import mongoose, { Schema, Document } from "mongoose";

export interface IBusinessSettings extends Document {
  companyName: string;
  businessName: string;
  supportEmail: string;
  phoneNumbers: string[];
  whatsapp: string;
  officeAddress: string;
  googleMapsLink: string;
  businessHours: string;
  timeZone: string;
  currency: string;
  language: string;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const BusinessSettingsSchema: Schema = new Schema(
  {
    companyName: { type: String, default: "Mehar Transport" },
    businessName: { type: String, default: "Mehar Transport LLC" },
    supportEmail: { type: String, default: "support@mehar.sa" },
    phoneNumbers: [{ type: String, default: ["+966 50 000 0000"] }],
    whatsapp: { type: String, default: "+966 50 000 0000" },
    officeAddress: { type: String, default: "Jeddah, Saudi Arabia" },
    googleMapsLink: { type: String, default: "" },
    businessHours: { type: String, default: "24/7" },
    timeZone: { type: String, default: "Asia/Riyadh" },
    currency: { type: String, default: "SAR" },
    language: { type: String, default: "en" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin" }
  },
  { timestamps: true }
);

export const BusinessSettings = mongoose.models.BusinessSettings || mongoose.model<IBusinessSettings>("BusinessSettings", BusinessSettingsSchema);
