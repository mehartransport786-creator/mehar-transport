import mongoose, { Schema, Document, models } from 'mongoose';

export interface IHourlyPricing extends Document {
  vehicleId: mongoose.Types.ObjectId;
  hourlyRate: number;
  minimumHours: number;
  extraHourRate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HourlyPricingSchema = new Schema<IHourlyPricing>({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, unique: true },
  hourlyRate: { type: Number, required: true },
  minimumHours: { type: Number, required: true, default: 4 },
  extraHourRate: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const HourlyPricing = models.HourlyPricing || mongoose.model<IHourlyPricing>('HourlyPricing', HourlyPricingSchema);

export default HourlyPricing;
