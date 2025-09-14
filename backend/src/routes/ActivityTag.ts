import express, { Request, Response } from "express";
import Activity from "../models/activityTag";
import userAuth from "../middleware/userAuth";
import {IUser} from "../models/user";
const router=express.Router();


interface AuthenticatedRequest extends Request {
    user: IUser;
}

router.get('/getAll',userAuth,async (req:Request,res:Response)=>{
    try{
        const userId = (req as AuthenticatedRequest).user._id;
        const allPeopleTags=await Activity.find({userId:userId})
        res.status(200).json({message:"Fetched All Activities",data:allPeopleTags})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
export default router;
