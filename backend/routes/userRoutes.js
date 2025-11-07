import express from "express";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import TimeSlot from "../models/TimeSlot.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware("admin"), async (req, res) => {
  const users = await User.find({}, "name email role createdAt")
    .sort({ createdAt: -1 })
    .select("-passwordHash");
  res.json(users);
});

router.put("/:id", authMiddleware("admin"), async (req, res) => {
  const { name, role } = req.body || {};
  const update = {};
  if (typeof name === "string") update.name = name.trim();
  if (role && ["user", "admin"].includes(role)) update.role = role;

  const user = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
    select: "name email role createdAt",
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  const { id } = req.params;
  if (String(req.user.id) === String(id)) {
    return res.status(400).json({ message: "You cannot delete your own admin account" });
  }

  const user = await User.findById(id).select("_id");
  if (!user) return res.status(404).json({ message: "User not found" });

  const appts = await Appointment.find({ userId: id }).select("timeSlotId");
  const slotIds = appts.map((a) => a.timeSlotId).filter(Boolean);
  if (slotIds.length) {
    await TimeSlot.updateMany({ _id: { $in: slotIds } }, { $set: { isBooked: false } });
  }
  await Appointment.deleteMany({ userId: id });
  await User.findByIdAndDelete(id);

  return res.status(204).end();
});

export default router;
