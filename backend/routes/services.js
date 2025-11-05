import express from "express";
import Service from "../models/Service.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find().sort({ name: 1 });
  res.json(services);
});

router.get("/:id", async (req, res) => {
  const s = await Service.findById(req.params.id);
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json(s);
});

router.post("/", authMiddleware("admin"), async (req, res) => {
  const { name, description, duration, price, instructorName, instructorTitle } = req.body;
  const s = await Service.create({ name, description, duration, price, instructorName, instructorTitle });
  res.status(201).json(s);
});

router.put("/:id", authMiddleware("admin"), async (req, res) => {
  const { name, description, duration, price, instructorName, instructorTitle } = req.body;
  const s = await Service.findByIdAndUpdate(
    req.params.id,
    { name, description, duration, price, instructorName, instructorTitle },
    { new: true }
  );
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json(s);
});

router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  const s = await Service.findByIdAndDelete(req.params.id);
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.status(204).end();
});

export default router;
