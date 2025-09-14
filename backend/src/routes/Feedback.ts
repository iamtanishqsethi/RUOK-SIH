import express, { Request, Response } from "express";
import userAuth from "../middleware/userAuth";
import ToolFeedback from "../models/toolFeedback";
import CheckIn from "../models/checkIn";
import {IUser} from "../models/user";

const router = express.Router();

interface AuthenticatedRequest extends Request {
    user: IUser;
}

router.post("/new", userAuth, async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user._id;
        const { toolName, rating, checkIn } = req.body;

        const isCheckin = await CheckIn.findById(checkIn);
        if (!isCheckin) return res.status(404).json({ message: "Invalid Checkin Id" });

        const newFeedback = new ToolFeedback({ userId, toolName, rating, checkIn });
        await newFeedback.save();

        await newFeedback.populate({
            path: "checkIn",
            populate: [
                { path: "emotion" },
                { path: "activityTag" },
                { path: "placeTag" },
                { path: "peopleTag" },
            ],
        });

        res.status(200).json({ message: "Successfully created new Feedback", data: newFeedback });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/getAll", userAuth, async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user._id;

        const feedbacks = await ToolFeedback.find({ userId }).populate({
            path: "checkIn",
            populate: [
                { path: "emotion" },
                { path: "activityTag" },
                { path: "placeTag" },
                { path: "peopleTag" },
            ],
        });

        res.status(200).json({ message: "Fetched All Feedbacks", data: feedbacks });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
