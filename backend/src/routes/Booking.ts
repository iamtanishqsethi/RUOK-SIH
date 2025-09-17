import express from 'express';
import { Booking, IBooking } from '../models/booking';
import User, { IUser } from '../models/user';
import userAuth from '../middleware/userAuth';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const router = express.Router();

// routes/therapists.ts (or wherever your route is)
router.get('/therapists', userAuth, async (req, res) => {
    try {
      const users = await User.find({ role: 'therapist' }).lean();
  
      const therapists = users.map((u: any) => {
        const name = u.name ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
        return {
          _id: u._id,
          name,
          email: u.email,
          photoUrl: u.avatar ?? u.photoUrl ?? null,
          specialization: u.specialization ?? null,
          bio: u.bio ?? null,
        };
      });
  
      res.status(200).json(therapists);
    } catch (error) {
      console.error('Error fetching therapists:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.get('/therapists/:therapistId/availability', userAuth, async (req, res) => {
  const { therapistId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Date parameter is required' });
  }

  try {
    const therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== 'therapist') {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    const requestedDate = new Date(date as string);
    const existingBookings = await Booking.find({
      therapistId,
      date: {
        $gte: new Date(requestedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(requestedDate.setHours(23, 59, 59, 999)),
      },
      status: { $in: ['pending', 'confirmed'] } // Consider pending and confirmed as taken
    });

    const bookedTimeSlots = existingBookings.map(booking => booking.timeSlot);

    const allPossibleTimeSlots = [
      "09:00 am", "10:00 am", "11:00 am", "12:00 pm",
      "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm"
    ];

    const availableTimeSlots = allPossibleTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));

    res.status(200).json({ availability: availableTimeSlots });

  } catch (error) {
    console.error('Error fetching therapist availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/bookings', userAuth, async (req, res) => {
  const { therapistId, date, timeSlot } = req.body;
  
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const userId = req.user._id;

  if (!therapistId || !date || !timeSlot) {
    return res.status(400).json({ message: 'Missing required booking details' });
  }

  try {
    const therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== 'therapist') {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    const bookingDate = new Date(date);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const existingBooking = await Booking.findOne({
      therapistId,
      date: {
        $gte: new Date(bookingDate.setHours(0, 0, 0, 0)),
        $lt: new Date(bookingDate.setHours(23, 59, 59, 999)),
      },
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'This slot is already booked.' });
    }

    const newBooking: IBooking = new Booking({
      therapistId,
      userId,
      date: bookingDate,
      timeSlot,
      status: 'pending',
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;