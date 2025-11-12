import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/services.js";
import timeSlotRoutes from "./routes/timeslots.js";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const reqHeaders = req.headers["access-control-request-headers"]; 
  if (reqHeaders) {
    res.setHeader("Access-Control-Allow-Headers", reqHeaders);
  } else {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/timeslots", timeSlotRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send({ ok: true, message: "Timely running" }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
