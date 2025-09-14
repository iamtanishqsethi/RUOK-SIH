import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPlaceTag extends Document {
    userId: Types.ObjectId;
    title: string;
}

const PlaceTagSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
});

export default mongoose.model<IPlaceTag>("PlaceTag", PlaceTagSchema);
