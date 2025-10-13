import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Service", serviceSchema);