import express from "express";
import TimeSlot from "../models/TimeSlot.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { serviceId, date } = req.query;
  const query = {};
  if (serviceId) query.serviceId = serviceId;
  if (date) query.date = date;
  const slots = await TimeSlot.find(query).sort({ date: 1, startTime: 1 });
  res.json(slots);
});

router.post("/", authMiddleware("admin"), async (req, res) => {
  const { serviceId, date, startTime, endTime } = req.body;
  const slot = await TimeSlot.create({ serviceId, date, startTime, endTime });
  res.status(201).json(slot);
});

router.put("/:id", authMiddleware("admin"), async (req, res) => {
  const slot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(slot);
});

router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  await TimeSlot.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
