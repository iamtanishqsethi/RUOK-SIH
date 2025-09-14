import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
};
