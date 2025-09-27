import { Router } from 'express';
import {handleSageChat} from "../utils/chatController";

const router = Router();

router.post('/', handleSageChat);

export default router;