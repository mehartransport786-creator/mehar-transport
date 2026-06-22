import { mockFleet } from './data';
import connectToDatabase from './db';
import Vehicle from './models/Vehicle';

export async function seedRichVehicles() {
  try {
    await connectToDatabase();
    
    console.log("Starting vehicle seed process...");
    
    // Upsert each vehicle based on slug
    for (const vehicle of mockFleet) {
      const updateData = {
        ...vehicle,
        // Ensure id maps correctly to slug if not present
        id: vehicle.id || vehicle.slug
      };

      await Vehicle.findOneAndUpdate(
        { slug: vehicle.slug },
        updateData,
        { upsert: true, new: true }
      );
      console.log(`✅ Upserted ${vehicle.name}`);
    }

    console.log("Vehicle seed completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Failed to seed vehicles:", error);
    return { success: false, error };
  }
}
