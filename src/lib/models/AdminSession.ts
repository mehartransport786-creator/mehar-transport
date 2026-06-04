import mongoose, { Schema, Document } from "mongoose";

export interface IAdminSession extends Document {
  adminId: mongoose.Types.ObjectId;
  sessionToken: string;
  ip: string;
  browser: string;
  os: string;
  location: string;
  status: "active" | "revoked";
  lastActivity: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSessionSchema: Schema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    sessionToken: { type: String, required: true, unique: true },
    ip: { type: String, default: "Unknown" },
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    location: { type: String, default: "Unknown" },
    status: { 
      type: String, 
      enum: ["active", "revoked"], 
      default: "active" 
    },
    lastActivity: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

// Auto-delete expired sessions
AdminSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AdminSession = mongoose.models.AdminSession || mongoose.model<IAdminSession>("AdminSession", AdminSessionSchema);
