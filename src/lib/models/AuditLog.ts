import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminEmail: string;
  ip: string;
  browser: string;
  action: string; // e.g. "UPDATE_USER", "LOGIN_SUCCESS", "DELETE_BOOKING"
  module: string; // e.g. "users", "bookings", "settings"
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  details?: Record<string, unknown>; // legacy field, kept for backwards compatibility
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    adminEmail: { type: String, required: true },
    ip: { type: String, default: "Unknown" },
    browser: { type: String, default: "Unknown" },
    action: { type: String, required: true },
    module: { type: String, required: true, default: "system" },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    details: { type: Schema.Types.Mixed }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
