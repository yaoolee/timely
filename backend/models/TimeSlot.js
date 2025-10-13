import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: String, required: true }, // date string yyyy-mm-dd
  startTime: { type: String, required: true }, // "14:00"
  endTime: { type: String, required: true },   // "15:00"
  isBooked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("TimeSlot", timeSlotSchema);