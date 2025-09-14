import mongoose, { Document, Schema, Types } from "mongoose";

export interface IToolFeedback extends Document {
    userId: Types.ObjectId;
    toolName: string;
    rating: number;
    checkIn: Types.ObjectId;
}

const ToolFeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toolName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    checkIn: {
        type: Schema.Types.ObjectId,
        ref: "CheckIn",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model<IToolFeedback>("ToolFeedback", ToolFeedbackSchema);
