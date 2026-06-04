import mongoose, { Schema, Document, models } from 'mongoose';

export interface IRoutePricing extends Document {
  routeId: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  basePrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoutePricingSchema = new Schema<IRoutePricing>({
  routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  basePrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Ensure a vehicle only has one pricing record per route
RoutePricingSchema.index({ routeId: 1, vehicleId: 1 }, { unique: true });

const RoutePricing = models.RoutePricing || mongoose.model<IRoutePricing>('RoutePricing', RoutePricingSchema);

export default RoutePricing;
