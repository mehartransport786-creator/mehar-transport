import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISeasonalPricing extends Document {
  seasonName: string;
  seasonNameAr: string;
  startDate: Date;
  endDate: Date;
  adjustmentType: 'percentage_increase' | 'percentage_decrease' | 'fixed_increase' | 'fixed_decrease';
  adjustmentValue: number;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SeasonalPricingSchema = new Schema<ISeasonalPricing>({
  seasonName: { type: String, required: true },
  seasonNameAr: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  adjustmentType: { 
    type: String, 
    enum: ['percentage_increase', 'percentage_decrease', 'fixed_increase', 'fixed_decrease'], 
    required: true 
  },
  adjustmentValue: { type: Number, required: true },
  description: { type: String },
  descriptionAr: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const SeasonalPricing = models.SeasonalPricing || mongoose.model<ISeasonalPricing>('SeasonalPricing', SeasonalPricingSchema);

export default SeasonalPricing;
