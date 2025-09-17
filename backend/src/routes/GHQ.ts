import { Router, Request, Response } from 'express';
import GHQEntry from '../models/ghq'; 

const router = Router();

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const newEntry = new GHQEntry(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'GHQ form submitted successfully!', entry: newEntry });
  } catch (error: any) {
    console.error('Error saving GHQ entry:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const entries = await GHQEntry.find();
    res.status(200).json(entries);
  } catch (error: any) {
    console.error('Error fetching GHQ entries:', error);
    res.status(500).json({ message: 'Error fetching entries', error: error.message });
  }
});

export default router;