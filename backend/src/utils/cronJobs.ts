import cron from "node-cron";
import User from "../models/user";
import mongoose from "mongoose";

// Check if mongoose is connected
const isDatabaseConnected = (): boolean => mongoose.connection.readyState === 1;

const deleteGuestUsers = async (): Promise<void> => {
    try {
        if (!isDatabaseConnected()) {
            console.error("Database not connected. Skipping guest user cleanup.");
            return;
        }

        const result = await User.deleteMany({ isGuest: true });
        console.log(
            `Deleted ${result.deletedCount} guest users at ${new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
            })}`
        );
    } catch (err) {
        console.error("Error deleting guest users:", err);
    }
};

// Schedule daily at 09:30 IST
cron.schedule("30 9 * * *", deleteGuestUsers, {
    scheduled: true,
    timezone: "Asia/Kolkata",
} as any);
