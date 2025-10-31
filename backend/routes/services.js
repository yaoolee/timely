import express from "express";
import Service from "../models/Service.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find().sort({ name: 1 });
  res.json(services);
});

router.post("/", authMiddleware("admin"), async (req, res) => {
  const { name, description, duration } = req.body;
  const s = await Service.create({ name, description, duration });
  res.status(201).json(s);
});

export default router;
