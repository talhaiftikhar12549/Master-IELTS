import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Check if superadmin already exists
    const existingAdmin = await User.findOne({ role: "superadmin" });
    if (existingAdmin) {
      console.log("⚠️ Superadmin already exists:", existingAdmin.email);
      process.exit();
    }

    // Create superadmin user
    const hashedPassword = await bcrypt.hash("admin12345", 10);
    const superAdmin = await User.create({
      name: "Super Admin",
      email: "admin@trickleup.co.uk",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("✅ Superadmin created:", superAdmin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding superadmin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();