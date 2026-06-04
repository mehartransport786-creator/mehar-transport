import mongoose, { Schema, Document, models } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  repliedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread',
    index: true
  },
  repliedAt: { type: Date },
  notes: { type: String }
}, {
  timestamps: true
});

ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ status: 1, createdAt: -1 });

const ContactMessage = models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);

export default ContactMessage;
