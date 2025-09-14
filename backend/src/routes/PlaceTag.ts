import express, { Request, Response } from "express";
import Place from "../models/placeTag";
import userAuth from "../middleware/userAuth";
import {IUser} from "../models/user";

const router = express.Router();
interface AuthenticatedRequest extends Request {
    user: IUser;
}
router.get("/getAll", userAuth, async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user._id;

        const allPlaceTags = await Place.find({ userId });
        res.status(200).json({ message: "Fetched All places", data: allPlaceTags });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;

