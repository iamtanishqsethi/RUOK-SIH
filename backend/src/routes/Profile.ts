import express, { Request, Response } from "express";
import userAuth from "../middleware/userAuth";
import User, {IUser} from "../models/user";
import { editProfileValidation } from "../utils/validations";

const router = express.Router();
interface AuthenticatedRequest extends Request {
    user: IUser;
}
router.get("/get", userAuth, async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user._id;
        const user = await User.findById(userId).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "fetched", data: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error" });
    }
});

router.patch("/edit", userAuth, async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0)
            return res.status(400).json({ message: "Invalid Body" });

        if (!editProfileValidation(req))
            return res.status(400).json({ message: "Invalid Edit Fields" });

        const user = (req as AuthenticatedRequest).user
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true });

        res.status(200).json({ message: "Updated User Profile", data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
