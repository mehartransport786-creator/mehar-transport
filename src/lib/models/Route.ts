import mongoose, { Schema, Document, models } from 'mongoose';

export interface IRoute extends Document {
  name: string;
  nameAr: string;
  slug: string;
  origin: string;
  originAr: string;
  destination: string;
  destinationAr: string;
  pickupLocation: string;
  pickupLocationAr: string;
  dropoffLocation: string;
  dropoffLocationAr: string;
  distanceKm: number;
  averageDurationMins: number;
  routeType: 'airport_transfer' | 'intercity' | 'ziyarat' | 'hourly' | 'vip' | 'custom';
  city: string;
  description: string;
  descriptionAr: string;
  image: string;
  seoMeta: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
  };
  status: 'active' | 'draft' | 'archived';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RouteSchema = new Schema<IRoute>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  originAr: { type: String, required: true },
  destination: { type: String, required: true },
  destinationAr: { type: String, required: true },
  pickupLocation: { type: String, default: '' },
  pickupLocationAr: { type: String, default: '' },
  dropoffLocation: { type: String, default: '' },
  dropoffLocationAr: { type: String, default: '' },
  distanceKm: { type: Number, required: true, default: 0 },
  averageDurationMins: { type: Number, required: true, default: 0 },
  routeType: {
    type: String,
    enum: ['airport_transfer', 'intercity', 'ziyarat', 'hourly', 'vip', 'custom'],
    default: 'intercity'
  },
  city: { type: String, default: '' },
  description: { type: String, default: '' },
  descriptionAr: { type: String, default: '' },
  image: { type: String, default: '' },
  seoMeta: {
    title: { type: String, default: '' },
    titleAr: { type: String, default: '' },
    description: { type: String, default: '' },
    descriptionAr: { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

RouteSchema.index({ slug: 1 });
RouteSchema.index({ routeType: 1 });
RouteSchema.index({ city: 1 });
RouteSchema.index({ status: 1 });

const Route = models.Route || mongoose.model<IRoute>('Route', RouteSchema);

export default Route;
