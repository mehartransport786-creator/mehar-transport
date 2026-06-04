import mongoose, { Schema, Document, models } from 'mongoose';

export type ActivityType =
  | 'booking_created'
  | 'booking_confirmed'
  | 'booking_assigned'
  | 'booking_completed'
  | 'booking_cancelled'
  | 'status_changed'
  | 'driver_assigned'
  | 'payment_received'
  | 'new_message'
  | 'new_review'
  | 'system_alert';

export interface IActivityLog extends Document {
  type: ActivityType;
  bookingId?: string;
  message: string;
  messageAr: string;
  icon: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  type: {
    type: String,
    enum: [
      'booking_created', 'booking_confirmed', 'booking_assigned',
      'booking_completed', 'booking_cancelled', 'status_changed',
      'driver_assigned', 'payment_received', 'new_message',
      'new_review', 'system_alert'
    ],
    required: true,
    index: true
  },
  bookingId: { type: String, index: true },
  message: { type: String, required: true },
  messageAr: { type: String, required: true },
  icon: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

ActivityLogSchema.index({ createdAt: -1 });

const ActivityLog = models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

export default ActivityLog;
