import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICheckIn extends Document {
    emotion: Types.ObjectId;
    description?: string;
    activityTag?: Types.ObjectId;
    placeTag?: Types.ObjectId;
    peopleTag?: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CheckInSchema = new Schema<ICheckIn>(
    {
        emotion: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Emotion",
        },
        description: {
            type: String,
        },
        activityTag: {
            type: Schema.Types.ObjectId,
            ref: "ActivityTag",
        },
        placeTag: {
            type: Schema.Types.ObjectId,
            ref: "PlaceTag",
        },
        peopleTag: {
            type: Schema.Types.ObjectId,
            ref: "PeopleTag",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ICheckIn>("CheckIn", CheckInSchema);
