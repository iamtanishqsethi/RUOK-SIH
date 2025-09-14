import express, {Request, Response} from 'express'
const router=express.Router()
import userAuth from '../middleware/userAuth'
import Checkin from '../models/checkIn'
import Emotion from '../models/emotion'
import ActivityTag from '../models/activityTag'
import PlaceTag from '../models/placeTag'
import PeopleTag from '../models/peopleTag'
import {IUser} from "../models/user";

interface AuthenticatedRequest extends Request {
    user: IUser;
}
router.get('/getAll',userAuth,async (req:Request, res:Response)=>{
    try{
        const userId = (req as AuthenticatedRequest).user._id;        const checkIn=await Checkin.find({userId}).populate('emotion activityTag placeTag peopleTag')
        res.status(200).json({message:"Fetched All checkIn",data:checkIn})
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post('/new',userAuth,async (req:Request, res:Response)=>{

    try{
        const userId = (req as AuthenticatedRequest).user._id;
        const {emotion,description,activityTag,placeTag,peopleTag}=req.body

        //validate the emotion first
        const validEmotion=await Emotion.findOne({title:emotion})

        if(!validEmotion){
            return res.status(400).send({message:"Not a valid emotion"})
        }

        //validate tags , if new tag create a new one for user
        let activityTagId=null
        let placeTagId=null
        let peopleTagId=null

        if(activityTag){
            //need to check the value so trim it down to lowercase
            const normalizedTagValue=activityTag.toLowerCase().trim()
            let existingActivityTag=await ActivityTag.findOne({title:normalizedTagValue,userId})

            if(!existingActivityTag){
                const newTag=new ActivityTag({
                    title:normalizedTagValue,
                    userId:userId
                })
                existingActivityTag=await newTag.save()
            }
            activityTagId=existingActivityTag._id
        }
        if(placeTag){
            const normalizedTagValue=placeTag.toLowerCase().trim()
            let existingPlaceTag=await PlaceTag.findOne({title:normalizedTagValue,userId})

            if(!existingPlaceTag){
                const newTag=new PlaceTag({
                    title:normalizedTagValue,
                    userId:userId
                })
                existingPlaceTag=await newTag.save()
            }
            placeTagId=existingPlaceTag._id
        }
        if(peopleTag){
            const normalizedTagValue=peopleTag.toLowerCase().trim()
            let existingPeopleTag=await PeopleTag.findOne({title:normalizedTagValue,userId})

            if(!existingPeopleTag){
                const newTag=new PeopleTag({
                    title:normalizedTagValue,
                    userId:userId
                })
                existingPeopleTag=await newTag.save()
            }
            peopleTagId=existingPeopleTag._id
        }

        //create new emotion and populate the data
        const newCheckin = await new Checkin({
            userId,
            description,
            emotion: validEmotion._id,
            activityTag: activityTagId,
            placeTag: placeTagId,
            peopleTag: peopleTagId,
        }).populate('emotion activityTag placeTag peopleTag');
        await newCheckin.save()

        res.status(200).json({message:"Successfully created new Checkin",data:newCheckin})

    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.delete('/delete/:id',userAuth,async (req:Request, res:Response)=>{
    const checkinId = req.params.id
    const userId = (req as AuthenticatedRequest).user._id;
    try {
        const deletedCheckin = await Checkin.findOneAndDelete({_id:checkinId, userId})
        res.status(200).json({message:"Deleted checkIn",data:deletedCheckin})
    }catch (err){
        res.status(500).json({message:"Internal Server Error In Deleting Checkin"})
    }
})

router.patch('/update/:id', userAuth, async (req:Request, res:Response) => {
    const checkinId = req.params.id;
    const userId = (req as AuthenticatedRequest).user._id;
    const { emotion, description, activityTag, placeTag, peopleTag } = req.body;

    try {
        // Find the checkin for this user
        const presentCheckin = await Checkin.findOne({ _id: checkinId, userId });
        if (!presentCheckin) {
            return res.status(404).json({ message: "Checkin not found for this user" });
        }

        // Update tag titles if provided
        if (activityTag && presentCheckin.activityTag) {
            const normalized = activityTag.toLowerCase().trim();
            await ActivityTag.findOneAndUpdate(
                { _id: presentCheckin.activityTag, userId },
                { title: normalized }
            );
        }

        if (placeTag && presentCheckin.placeTag) {
            const normalized = placeTag.toLowerCase().trim();
            await PlaceTag.findOneAndUpdate(
                { _id: presentCheckin.placeTag, userId },
                { title: normalized }
            );
        }

        if (peopleTag && presentCheckin.peopleTag) {
            const normalized = peopleTag.toLowerCase().trim();
            await PeopleTag.findOneAndUpdate(
                { _id: presentCheckin.peopleTag, userId },
                { title: normalized }
            );
        }

        // If emotion is provided, validate and update
        let emotionId:any = presentCheckin.emotion;
        if (emotion) {
            const validEmotion = await Emotion.findOne({ title: emotion.trim() });
            if (!validEmotion) return res.status(400).json({ message: "Invalid emotion" });
            emotionId = validEmotion._id;
        }

        // Update the checkin description and emotion if changed
        const updateFields :any= {};
        if (description) updateFields.description = description;
        if (emotionId) updateFields.emotion = emotionId;

        const updateCheckin = await Checkin.findByIdAndUpdate(
            checkinId,
            { $set: updateFields },
            { new: true }
        ).populate('emotion activityTag placeTag peopleTag');

        res.status(200).json({
            message: "Checkin updated successfully",
            updatedCheckin: updateCheckin
        });

    } catch (err) {
        console.error("Error updating checkin:", err);
        res.status(500).json({ message: "Internal Server Error In Updating Checkin" });
    }
});



export default router;