import mongoose, { Document, Schema } from 'mongoose';

export interface IGHQEntry extends Document {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  occupation?: string;
  feelingUnwell: boolean;
  sleepProblems: boolean;
  lostInterest: boolean;
  feelingDown: boolean;
  concentrationDifficulty: boolean;
  otherConcerns?: string;
  submissionDate: Date;
}

const GHQSchema: Schema = new Schema({
  fullName: {type: String, required: true },
  age: {type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  maritalStatus: { type: String, required: true, enum: ['single', 'married', 'divorced', 'widowed'] },
  occupation: { type: String, required: false },
  feelingUnwell: { type: Boolean, required: true },
  sleepProblems: { type: Boolean, required: true },
  lostInterest: {type: Boolean, required: true },
  feelingDown: { type: Boolean, required: true },
  concentrationDifficulty: {type: Boolean, required: true },
  otherConcerns: { type: String, required: false },
  submissionDate: { type: Date, default: Date.now },
});

const GHQEntry =mongoose.model<IGHQEntry>('GHQEntry', GHQSchema);
export default GHQEntry;