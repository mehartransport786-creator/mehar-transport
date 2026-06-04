import mongoose, { Schema, Document, models } from 'mongoose';

export interface IRoute extends Document {
  name: string;
  nameAr: string;
  origin: string;
  originAr: string;
  destination: string;
  destinationAr: string;
  distanceKm: number;
  averageDurationMins: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RouteSchema = new Schema<IRoute>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  origin: { type: String, required: true },
  originAr: { type: String, required: true },
  destination: { type: String, required: true },
  destinationAr: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  averageDurationMins: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Route = models.Route || mongoose.model<IRoute>('Route', RouteSchema);

export default Route;
