import mongoose, { Schema, Document, models } from 'mongoose';

export interface IPricingAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminEmail: string;
  entityType: 'route' | 'hourly' | 'seasonal' | 'vehicle_base';
  entityId: mongoose.Types.ObjectId;
  oldPrice?: number;
  newPrice?: number;
  oldValue?: any;
  newValue?: any;
  reason: string;
  createdAt: Date;
}

const PricingAuditLogSchema = new Schema<IPricingAuditLog>({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  adminEmail: { type: String, required: true },
  entityType: { 
    type: String, 
    enum: ['route', 'hourly', 'seasonal', 'vehicle_base'], 
    required: true 
  },
  entityId: { type: Schema.Types.ObjectId, required: true },
  oldPrice: { type: Number },
  newPrice: { type: Number },
  oldValue: { type: Schema.Types.Mixed },
  newValue: { type: Schema.Types.Mixed },
  reason: { type: String, required: true }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

const PricingAuditLog = models.PricingAuditLog || mongoose.model<IPricingAuditLog>('PricingAuditLog', PricingAuditLogSchema);

export default PricingAuditLog;
