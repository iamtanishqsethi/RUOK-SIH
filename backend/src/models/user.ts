import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    bio?: string;
    photoUrl?: string;
    isGuest: boolean;
    isGoogleAuth: boolean;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true },
        bio: { type: String },
        photoUrl: {
            type: String,
            default: "https://ui-private.shadcn.com/avatars/02.png",
        },
        isGuest: { type: Boolean, default: false },
        isGoogleAuth: { type: Boolean, default: false },
        password: {
            type: String,
            required: function (this: IUser) {
                return !this.isGoogleAuth;
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
