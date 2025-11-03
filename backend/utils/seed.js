import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Service from "../models/Service.js";
import TimeSlot from "../models/TimeSlot.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await connectDB(MONGO_URI);

  await Service.deleteMany();
  await TimeSlot.deleteMany();
  await User.deleteMany();

  const hash = await bcrypt.hash("adminpass", 10);
  const admin = await User.create({
    name: "Admin jack",
    email: "admin@timely.test",
    passwordHash: hash,
    role: "admin",
  });

  const userHash = await bcrypt.hash("userpass", 10);
  const user = await User.create({
    name: "Student john",
    email: "john@timely.test",
    passwordHash: userHash,
    role: "user",
  });

  const math = await Service.create({
    name: "Math",
    description: "Algebra & calculus help",
    duration: 60,
    price: 300,
    instructorName: "Alex Johnson",
    instructorTitle: "Math Specialist",
  });
  const eng = await Service.create({
    name: "Business",
    description: "From economics to entrepreneurship to finance",
    duration: 60,
    price: 420,
    instructorName: "Anna Forbes",
    instructorTitle: "MBA",
  });
  const coding = await Service.create({
    name: "Coding",
    description: "Learn to code from scratch",
    duration: 60,
    price: 450,
    instructorName: "David Lee",
    instructorTitle: "Software Engineer",
  });
  const design = await Service.create({
    name: "Design",
    description: "All about design, learn to create something",
    duration: 30,
    price: 290,
    instructorName: "Nicole Johnson",
    instructorTitle: "UI/UX Designer",
  });

  const dates = ["2025-10-13", "2025-10-14", "2025-10-15"];
  for (const d of dates) {
    await TimeSlot.create({ serviceId: math._id, date: d, startTime: "14:00", endTime: "15:00" });
    await TimeSlot.create({ serviceId: eng._id, date: d, startTime: "16:00", endTime: "17:00" });
    await TimeSlot.create({ serviceId: coding._id, date: d, startTime: "10:00", endTime: "11:00" });
    await TimeSlot.create({ serviceId: design._id, date: d, startTime: "10:00", endTime: "10:30" });
  }

  console.log("Seed complete. Admin:", admin.email, "user:", user.email);
  process.exit(0);
}

seed();
