import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: mongoose.Types.ObjectId;
  status: "active" | "inactive" | "locked";
  avatar?: string;
  phone?: string;
  department?: string;
  language?: string;
  timeZone?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  recoveryCodes?: string[];
  passwordHistory?: string[]; // to prevent reuse
  failedLoginAttempts: number;
  lockedUntil?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    status: { 
      type: String, 
      enum: ["active", "inactive", "locked"],
      default: "active",
      required: true 
    },
    avatar: { type: String },
    phone: { type: String },
    department: { type: String },
    language: { type: String, default: "en" },
    timeZone: { type: String, default: "Asia/Riyadh" },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    recoveryCodes: [{ type: String }],
    passwordHistory: [{ type: String }],
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
    lastLogin: { type: Date }
  },
  { timestamps: true }
);

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
