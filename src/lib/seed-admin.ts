import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local FIRST
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import connectToDatabase from "./db";
import { Admin } from "./models/Admin";

async function seedAdmin() {
  console.log("Starting Admin Seeder...");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("ERROR: ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env.local");
    process.exit(1);
  }

  try {
    await connectToDatabase();
    console.log("Connected to MongoDB.");

    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      console.log(`Admin with email ${adminEmail} already exists. Skipping seed.`);
      process.exit(0);
    }

    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(adminPassword, salt);

    const newAdmin = new Admin({
      name: "System Administrator",
      email: adminEmail.toLowerCase(),
      passwordHash: passwordHash,
      role: "Super Admin",
      status: "active",
    });

    await newAdmin.save();
    console.log(`Successfully created Super Admin: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedAdmin();
