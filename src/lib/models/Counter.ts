import mongoose, { Schema, models } from 'mongoose';

/**
 * Counter model for generating sequential booking IDs.
 * Uses atomic findOneAndUpdate with $inc to guarantee uniqueness.
 * Format: MHT-{YEAR}-{PADDED_SEQ} e.g. MHT-2025-000001
 */

interface ICounter {
  _id: string;       // e.g. "booking_2025"
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);

export async function getNextBookingId(): Promise<string> {
  const year = new Date().getFullYear();
  const counterId = `booking_${year}`;

  const counter = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedSeq = String(counter.seq).padStart(6, '0');
  return `MHT-${year}-${paddedSeq}`;
}

export default Counter;
