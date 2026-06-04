import mongoose, { Schema, Document, models } from 'mongoose';

export type BookingStatusType =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'driver_en_route'
  | 'arrived'
  | 'journey_started'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type BookingPriority =
  | 'standard'
  | 'vip'
  | 'urgent'
  | 'airport'
  | 'group'
  | 'corporate';

export interface IBooking extends Document {
  bookingId: string;           // MHT-2025-000001
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropoffLocation: string;
  route: string;               // "Jeddah → Makkah"
  vehicleType: string;
  vehicleId?: mongoose.Types.ObjectId;
  travelDate: string;
  travelTime: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  luggage: number;
  tripType: string;
  status: BookingStatusType;
  priority: BookingPriority;
  driverAssigned?: string;
  totalPrice: number;
  extras: string[];
  specialRequests?: string;
  nationality?: string;
  language?: string;
  paymentMethod?: string;
  statusHistory: {
    status: BookingStatusType;
    timestamp: Date;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true, index: true },
  customerEmail: { type: String, default: '' },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  route: { type: String, required: true },
  vehicleType: { type: String, required: true, index: true },
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  travelDate: { type: String, required: true, index: true },
  travelTime: { type: String, required: true },
  returnDate: { type: String },
  returnTime: { type: String },
  passengers: { type: Number, required: true, default: 1 },
  luggage: { type: Number, default: 0 },
  tripType: { type: String, default: 'one-way' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'assigned', 'driver_en_route', 'arrived', 'journey_started', 'completed', 'cancelled', 'refunded'],
    default: 'pending',
    index: true
  },
  priority: {
    type: String,
    enum: ['standard', 'vip', 'urgent', 'airport', 'group', 'corporate'],
    default: 'standard'
  },
  driverAssigned: { type: String },
  totalPrice: { type: Number, required: true },
  extras: [{ type: String }],
  specialRequests: { type: String },
  nationality: { type: String },
  language: { type: String, default: 'en' },
  paymentMethod: { type: String, default: 'cash' },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
    note: { type: String }
  }]
}, {
  timestamps: true
});

// Compound indexes for common queries
BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ status: 1, createdAt: -1 });
BookingSchema.index({ travelDate: 1, status: 1 });

const Booking = models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
