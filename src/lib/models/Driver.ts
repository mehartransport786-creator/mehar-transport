import mongoose, { Schema, Document, models } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  nameAr: string;
  phone: string;
  email: string;
  photo: string;
  license: string;
  languages: string[];
  rating: number;
  trips: number;
  revenue: number;
  availability: 'available' | 'on_trip' | 'off_duty';
  vehicleAssigned?: string;
  joinDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DriverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  photo: { type: String, default: '/images/drivers/default.jpg' },
  license: { type: String, required: true },
  languages: [{ type: String }],
  rating: { type: Number, default: 5.0 },
  trips: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  availability: {
    type: String,
    enum: ['available', 'on_trip', 'off_duty'],
    default: 'available'
  },
  vehicleAssigned: { type: String },
  joinDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
});

DriverSchema.index({ availability: 1 });
DriverSchema.index({ active: 1 });

const Driver = models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);

export default Driver;
