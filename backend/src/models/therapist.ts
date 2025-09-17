import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'therapist';
  specialization?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, enum: ['user', 'therapist'], default: 'user' },
  specialization: { type: String },
});

export const User = mongoose.model<IUser>('User', UserSchema);

export interface ITherapist extends IUser {
  specialization: string;
}