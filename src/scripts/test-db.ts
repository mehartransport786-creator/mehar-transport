import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");
  const db = mongoose.connection.db;
  const vehicles = await db?.collection('vehicles').find({}).toArray();
  console.log("Vehicles in DB:", vehicles?.map(v => v.slug));
  process.exit(0);
}

check();
