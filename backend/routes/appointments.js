import express from "express";
import Appointment from "../models/Appointment.js";
import TimeSlot from "../models/TimeSlot.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// to book an appointment 
router.post("/", authMiddleware(), async (req, res) => {
  const { userId } = req.user ? req.user : {}; 
  const { serviceId, timeSlotId } = req.body;

  const slot = await TimeSlot.findById(timeSlotId);
  if (!slot)
    return res.status(400).json({ message: "Time slot not found" });
  if (slot.isBooked)
    return res.status(400).json({ message: "Time slot already booked" });

  // create appointment
  const appt = await Appointment.create({ userId: req.user.id, serviceId, timeSlotId, status: "booked" });

  // mark slot booked
  slot.isBooked = true;
  await slot.save();

  res.status(201).json(appt);
});


router.delete("/:id", authMiddleware(), async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt)
    return res.status(404).json({ message: "Appointment not found" });

  if (String(appt.userId) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  appt.status = "canceled";
  await appt.save();

  // free timeslot
  const slot = await TimeSlot.findById(appt.timeSlotId);
  if (slot) {
    slot.isBooked = false;
    await slot.save();
  }

  res.json({ message: "Appointment canceled" });
});

// get all appointments or filtered
router.get("/", authMiddleware("admin"), async (req, res) => {
  const appts = await Appointment.find().populate("userId serviceId timeSlotId");
  res.json(appts);
});

export default router;
