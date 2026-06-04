import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description: string;
  // A map of module names to an array of allowed actions
  // e.g., { "bookings": ["view", "create", "edit"], "users": ["view"] }
  permissions: Map<string, string[]>;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: { 
      type: Map, 
      of: [String], // Array of actions like 'view', 'edit', 'delete', 'create', 'export'
      default: {}
    }
  },
  { timestamps: true }
);

export const Role = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
