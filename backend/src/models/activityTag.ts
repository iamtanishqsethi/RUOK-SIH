import mongoose ,{Document,Schema,Types} from "mongoose";

export interface IActivityTag extends Document {
    userId: Types.ObjectId;
    title: string;

}


const ActivityTagSchema = new Schema<IActivityTag>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
});

export default mongoose.model<IActivityTag>("ActivityTag", ActivityTagSchema);