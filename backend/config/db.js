import mongoose from "mongoose";
export async function connectDB(uri){
 try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("database connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}