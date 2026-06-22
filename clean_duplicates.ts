import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Vehicle Schema
const VehicleSchema = new mongoose.Schema({
  slug: String,
  name: String,
}, { strict: false });

const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('No URI');
  
  console.log('Connecting to DB...');
  await mongoose.connect(uri);
  console.log('Connected.');
  
  const vehicles = await Vehicle.find({});
  console.log(`Found ${vehicles.length} total vehicles`);
  
  const nameMap = new Map();
  const toDelete = [];
  
  for (const v of vehicles) {
    if (nameMap.has(v.name)) {
      toDelete.push(v._id);
      console.log(`Duplicate found: ${v.name} (${v.slug}) - ID: ${v._id}`);
    } else {
      nameMap.set(v.name, v._id);
    }
  }
  
  if (toDelete.length > 0) {
    console.log(`Deleting ${toDelete.length} duplicates...`);
    await Vehicle.deleteMany({ _id: { $in: toDelete } });
    console.log('Done.');
  } else {
    console.log('No duplicates found.');
  }
  
  process.exit(0);
}

run().catch(console.error);
