import express, { Request, Response } from "express";
import Emotion from "../models/emotion";
import userAuth from "../middleware/userAuth";

const router = express.Router();

// TODO: Restrict this endpoint to admin only
router.post("/new", userAuth, async (req: Request, res: Response) => {
    const { title, description, type, intensity } = req.body;

    try {
        const existingEmotion = await Emotion.findOne({ title });
        if (existingEmotion) return res.status(400).json({ message: "Emotion already exists" });

        const emotion = new Emotion({ title, description, type, intensity });
        await emotion.save();

        res.status(200).json({ message: "Emotion created successfully", emotion });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getAll", userAuth, async (_req: Request, res: Response) => {
    try {
        const allEmotions = await Emotion.find();
        res.status(200).json({ message: "Fetched All emotions", data: allEmotions });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
