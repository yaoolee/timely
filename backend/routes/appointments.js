import express from "express";
import Appointment from "../models/Appointment.js";
import TimeSlot from "../models/TimeSlot.js";
import Service from "../models/Service.js";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";
import { sendBookingConfirmation } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", authMiddleware(), async (req, res) => {
  const { serviceId, timeSlotId } = req.body;
  const slot = await TimeSlot.findById(timeSlotId);
  if (!slot) return res.status(400).json({ message: "Time slot not found" });
  if (slot.isBooked) return res.status(400).json({ message: "Time slot already booked" });

  const appt = await Appointment.create({
    userId: req.user.id,
    serviceId,
    timeSlotId,
    status: "booked",
  });

  slot.isBooked = true;
  await slot.save();

  const populated = await Appointment.findById(appt._id).populate("serviceId timeSlotId");

  (async () => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        await sendBookingConfirmation({
          to: user.email,
          name: user.name,
          serviceName: populated?.serviceId?.name,
          instructorName: populated?.serviceId?.instructorName,
          date: populated?.timeSlotId?.date,
          startTime: populated?.timeSlotId?.startTime,
          endTime: populated?.timeSlotId?.endTime,
          appointmentId: populated?._id?.toString(),
        });
      }
    } catch (e) {
      console.warn("SendGrid booking email failed:", e?.message);
    }
  })();

  res.status(201).json(populated);
});

router.delete("/:id", authMiddleware(), async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ message: "Appointment not found" });

  if (String(appt.userId) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const slotId = appt.timeSlotId;
  await Appointment.findByIdAndDelete(appt._id);
  if (slotId) {
    await TimeSlot.findByIdAndUpdate(slotId, { isBooked: false });
  }

  return res.status(204).end();
});

router.get("/", authMiddleware("admin"), async (req, res) => {
  const appts = await Appointment.find().populate("userId serviceId timeSlotId");
  res.json(appts);
});

// filepath: add user-scoped listing
router.get("/me", authMiddleware(), async (req, res) => {
  const appts = await Appointment.find({ userId: req.user.id }).populate("serviceId timeSlotId");
  res.json(appts);
});

// filepath: add reschedule endpoint
router.put("/:id/reschedule", authMiddleware(), async (req, res) => {
  const { timeSlotId } = req.body;
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ message: "Appointment not found" });
  if (String(appt.userId) !== String(req.user.id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const newSlot = await TimeSlot.findById(timeSlotId);
  if (!newSlot) return res.status(400).json({ message: "Time slot not found" });
  if (newSlot.isBooked) return res.status(400).json({ message: "Time slot already booked" });

  const oldSlot = await TimeSlot.findById(appt.timeSlotId);
  if (oldSlot) {
    oldSlot.isBooked = false;
    await oldSlot.save();
  }

  appt.timeSlotId = newSlot._id;
  appt.status = "rescheduled";
  await appt.save();

  newSlot.isBooked = true;
  await newSlot.save();

  const updated = await Appointment.findById(appt._id).populate("serviceId timeSlotId");
  res.json(updated);
});

// Quick booking for UI that doesn’t load timeslots
router.post("/quick", authMiddleware(), async (req, res) => {
  const { serviceId, date, startTime } = req.body;
  if (!serviceId || !date || !startTime) return res.status(400).json({ message: "Missing fields" });

  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: "Service not found" });

  const start24 = to24h(startTime);
  const end24 = addMinutes(start24, service.duration || 60);

  let slot = await TimeSlot.findOne({ serviceId, date, startTime: start24, endTime: end24 });
  if (slot && slot.isBooked) {
    return res.status(400).json({ message: "Time slot already booked" });
  }
  if (!slot) {
    slot = await TimeSlot.create({
      serviceId,
      date,
      startTime: start24,
      endTime: end24,
      isBooked: false,
    });
  }

  slot.isBooked = true;
  await slot.save();

  const appt = await Appointment.create({
    userId: req.user.id,
    serviceId,
    timeSlotId: slot._id,
    status: "booked",
  });

  const populated = await Appointment.findById(appt._id).populate("serviceId timeSlotId");

  (async () => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        await sendBookingConfirmation({
          to: user.email,
          name: user.name,
          serviceName: populated?.serviceId?.name,
          instructorName: populated?.serviceId?.instructorName,
          date: populated?.timeSlotId?.date,
          startTime: populated?.timeSlotId?.startTime,
          endTime: populated?.timeSlotId?.endTime,
          appointmentId: populated?._id?.toString(),
        });
      }
    } catch (e) {
      console.warn("SendGrid booking email failed:", e?.message);
    }
  })();

  return res.status(201).json(populated);
});

function to24h(str) {
  const [time, ampm] = str.trim().split(" ");
  let [h, m] = time.split(":").map(Number);
  const u = (ampm || "").toUpperCase();
  if (u === "PM" && h !== 12) h += 12;
  if (u === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function addMinutes(hhmm, minutes) {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export default router;
