import mongoose, { Document, Schema } from "mongoose";

export interface IEmotion extends Document {
    title: string;
    description: string;
    type: "High Energy Unpleasant" | "Low Energy Unpleasant" | "High Energy Pleasant" | "Low Energy Pleasant";
    intensity: number;
    createdAt: Date;
    updatedAt: Date;
}

const EmotionSchema = new Schema<IEmotion>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: [
                "High Energy Unpleasant",
                "Low Energy Unpleasant",
                "High Energy Pleasant",
                "Low Energy Pleasant",
            ],
            required: true,
        },
        intensity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IEmotion>("Emotion", EmotionSchema);
