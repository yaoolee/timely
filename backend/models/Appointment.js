import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  timeSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot", required: true },
  status: { type: String, enum: ["booked", "canceled", "rescheduled"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", appointmentSchema);