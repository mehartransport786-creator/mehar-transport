import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string; // If using custom auth, otherwise omit if using OAuth
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  loyaltyTier: 'Member' | 'Gold' | 'Platinum';
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  loyaltyPoints: { type: Number, default: 0 },
  loyaltyTier: { type: String, enum: ['Member', 'Gold', 'Platinum'], default: 'Member' }
}, {
  timestamps: true
});

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
