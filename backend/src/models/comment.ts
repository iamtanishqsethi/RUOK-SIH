import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    postId: mongoose.Schema.Types.ObjectId;
    parentId?: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    content: string;
    timestamp: Date;
    likes: number;
    likers: mongoose.Schema.Types.ObjectId[];
}

const CommentSchema: Schema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);