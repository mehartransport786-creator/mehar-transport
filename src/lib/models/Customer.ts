import mongoose, { Schema, Document, models } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string;
  email: string;
  nationality: string;
  language: string;
  totalBookings: number;
  lifetimeValue: number;
  favoriteRoute: string;
  preferredVehicle: string;
  lastBooking: string;
  tags: string[];
  notes: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, default: '' },
  nationality: { type: String, default: '' },
  language: { type: String, default: 'en' },
  totalBookings: { type: Number, default: 0 },
  lifetimeValue: { type: Number, default: 0 },
  favoriteRoute: { type: String, default: '' },
  preferredVehicle: { type: String, default: '' },
  lastBooking: { type: String, default: '' },
  tags: [{ type: String }],
  notes: { type: String, default: '' },
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
});

CustomerSchema.index({ phone: 1 }, { unique: true });
CustomerSchema.index({ tags: 1 });

const Customer = models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
