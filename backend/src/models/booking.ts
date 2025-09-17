import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  therapistId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const BookingSchema: Schema = new Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);