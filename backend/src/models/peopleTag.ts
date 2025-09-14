import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPeopleTag extends Document {
    userId: Types.ObjectId;
    title: string;
}

const PeopleTagSchema = new Schema<IPeopleTag>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
    }
);

export default mongoose.model<IPeopleTag>("PeopleTag", PeopleTagSchema);
