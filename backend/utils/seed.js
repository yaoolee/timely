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
    description: `Master core and advanced mathematics concepts through a structured, tutor‑guided approach. 
This service covers algebra fundamentals (expressions, equations, factoring), functions and graphs, 
polynomials, inequalities, and an introduction to calculus: limits, differentiation basics, and real optimization examples. 
Each session blends problem breakdown, intuitive visualization, and exam‑style practice so students build durable reasoning skills 
rather than memorizing patterns. Ideal for high school through early university students seeking confidence in STEM prerequisites.`,
    duration: 60,
    price: 300,
    instructorName: "Alex Johnson",
    instructorTitle: "Math Specialist",
  });
  const eng = await Service.create({
    name: "Business",
    description: `Explore foundational and applied business topics in a practical, scenario‑driven format. 
Sessions rotate through micro & macro economic principles, financial statement interpretation, pricing & unit economics, 
market positioning, lean startup validation, and basic entrepreneurial finance. 
We emphasize translating theory into actionable decision frameworks, using mini case studies and light spreadsheet modeling. 
Perfect for aspiring founders, MBA prep, or students wanting real‑world context behind classroom terminology.`,
    duration: 60,
    price: 420,
    instructorName: "Anna Forbes",
    instructorTitle: "MBA",
  });
  const coding = await Service.create({
    name: "Coding",
    description: `Build programming fluency from first principles to project execution. 
Starting with syntax fundamentals (variables, types, control flow) we move into data structures (arrays, maps, objects), 
modular design, asynchronous patterns, and API integration. 
Later sessions introduce clean code practices, debugging strategies, version control (Git), and performance awareness. 
Hands‑on mini challenges reinforce pattern recognition and problem decomposition—ideal for absolute beginners or those bridging to real project work.`,
    duration: 60,
    price: 450,
    instructorName: "David Lee",
    instructorTitle: "Software Engineer",
  });
  const design = await Service.create({
    name: "Design",
    description: `Learn user‑centric design fundamentals to produce clear, modern interfaces. 
We cover layout hierarchy, spacing rhythm, color systems, typography pairing, component consistency, accessibility basics (contrast, semantics), 
and rapid wireframing workflows. Sessions include critique loops, redesign exercises, and style guide assembly to instill repeatable processes. 
Great for developers leveling up UI skills or beginners entering product and UX collaboration.`,
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
