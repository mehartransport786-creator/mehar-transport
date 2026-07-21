import mongoose, { Schema, Document, models } from 'mongoose';

export interface IVehicle extends Document {
  id?: string;
  slug: string;
  name: string;
  nameAr: string;
  type: string;
  typeAr: string;
  passengers: number;
  luggage: number;
  luxuryLevel: number;
  airportTransfer: boolean;
  umrahTransfer: boolean;
  intercityTravel: boolean;
  vipService: boolean;
  basePrice: number;
  image: string;
  gallery: string[];
  features: string[];
  featuresAr: string[];
  description: string;
  descriptionAr: string;
  targetAudience: string[];
  specialLabel?: string;
  specialLabelAr?: string;
  badge?: string;
  badgeAr?: string;
  active: boolean;
  hourlyRate: number;
}

const VehicleSchema = new Schema<IVehicle>({
  id: { type: String }, // optional, for mapping the mock data id
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  type: { type: String, required: true },
  typeAr: { type: String, required: true },
  passengers: { type: Number, required: true },
  luggage: { type: Number, required: true },
  luxuryLevel: { type: Number, required: true },
  airportTransfer: { type: Boolean, default: false },
  umrahTransfer: { type: Boolean, default: false },
  intercityTravel: { type: Boolean, default: false },
  vipService: { type: Boolean, default: false },
  basePrice: { type: Number, required: true },
  image: { type: String, required: true },
  gallery: { type: [String], required: true },
  features: { type: [String], required: true },
  featuresAr: { type: [String], required: true },
  description: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  targetAudience: { type: [String], required: true },
  specialLabel: { type: String },
  specialLabelAr: { type: String },
  badge: { type: String },
  badgeAr: { type: String },
  active: { type: Boolean, default: true },
  hourlyRate: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
// Fleet listing: active vehicles grouped by type
VehicleSchema.index({ active: 1, type: 1 });
// Individual vehicle page: slug lookup on active vehicles
VehicleSchema.index({ active: 1, slug: 1 });
// ─────────────────────────────────────────────────────────────────────────────

const Vehicle = models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default Vehicle;
