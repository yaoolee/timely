import express from "express";
import { sendContactMessage } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ message: "Email and message required" });
  try {
    await sendContactMessage({
      fromEmail: email,
      fromName: name,
      subject,
      message,
    });
    return res.json({ ok: true });
  } catch (e) {
    console.error("Contact send failed:", e.message);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
