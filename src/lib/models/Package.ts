import mongoose, { Schema, Document, models } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  category: 'Umrah' | 'Airport' | 'VIP' | 'Family' | 'Group' | 'Custom';
  idealFor: string[];
  features: string[];
  featuresAr: string[];
  images: string[];
  includedRoutes: mongoose.Types.ObjectId[];
  availableVehicles: mongoose.Types.ObjectId[];
  isActive: boolean;
  isPopular: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Umrah', 'Airport', 'VIP', 'Family', 'Group', 'Custom'],
    required: true 
  },
  idealFor: [{ type: String }],
  features: [{ type: String }],
  featuresAr: [{ type: String }],
  images: [{ type: String }],
  includedRoutes: [{ type: Schema.Types.ObjectId, ref: 'Route' }],
  availableVehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
  isActive: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Package = models.Package || mongoose.model<IPackage>('Package', PackageSchema);

export default Package;
