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

// Unique constraint: one price per route+vehicle combination
RoutePricingSchema.index({ routeId: 1, vehicleId: 1 }, { unique: true });

// Performance: booking page fetches all active pricings — this index prevents a full collection scan
RoutePricingSchema.index({ isActive: 1 });

// Performance: per-route pricing lookup on the route detail page
RoutePricingSchema.index({ routeId: 1, isActive: 1 });

const RoutePricing = models.RoutePricing || mongoose.model<IRoutePricing>('RoutePricing', RoutePricingSchema);

export default RoutePricing;
