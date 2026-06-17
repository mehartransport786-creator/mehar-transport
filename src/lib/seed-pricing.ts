import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import connectToDatabase from './db';
import Vehicle from './models/Vehicle';
import Route from './models/Route';
import RoutePricing from './models/RoutePricing';
import HourlyPricing from './models/HourlyPricing';

const vehiclesData = [
  { name: 'Car (4 Seater)', nameAr: 'سيارة (4 مقاعد)', type: 'Sedan', typeAr: 'سيدان', passengers: 4, luggage: 2, image: '/fleet/kia-k5.webp', isActive: true },
  { name: 'Hiace (11 Seater)', nameAr: 'هايس (11 مقعد)', type: 'Van', typeAr: 'فان', passengers: 11, luggage: 10, image: '/fleet/hiace.webp', isActive: true },
  { name: 'GMC (7 Seater)', nameAr: 'جمس (7 مقاعد)', type: 'SUV', typeAr: 'سيارة دفع رباعي', passengers: 7, luggage: 7, image: '/fleet/yukon.webp', isActive: true },
  { name: 'Starex (7 Seater)', nameAr: 'ستاريكس (7 مقاعد)', type: 'Van', typeAr: 'فان', passengers: 7, luggage: 6, image: '/fleet/starex.webp', isActive: true },
  { name: 'Staria (7 Seater)', nameAr: 'ستاريا (7 مقاعد)', type: 'Luxury Van', typeAr: 'فان فاخر', passengers: 7, luggage: 6, image: '/fleet/staria.webp', isActive: true },
  { name: 'Coaster (17 Seater)', nameAr: 'كوستر (17 مقعد)', type: 'Bus', typeAr: 'حافلة', passengers: 17, luggage: 15, image: '/fleet/coaster.webp', isActive: true }
];

// Price mapping index: [Car, Hiace, GMC, Starex, Staria, Coaster]
const routesData = [
  { name: 'Jeddah Airport to Jeddah Hotel', origin: 'Jeddah Airport', destination: 'Jeddah Hotel', prices: [150, 250, 300, 200, 200, 400] },
  { name: 'Jeddah Airport to Makkah Hotel', origin: 'Jeddah Airport', destination: 'Makkah Hotel', prices: [200, 350, 500, 300, 300, 550] },
  { name: 'Jeddah Airport to Madinah Hotel', origin: 'Jeddah Airport', destination: 'Madinah Hotel', prices: [400, 550, 1000, 500, 500, 1100] },
  { name: 'Madina Hotel to Jeddah Airport', origin: 'Madina Hotel', destination: 'Jeddah Airport', prices: [400, 550, 800, 450, 450, 900] },
  { name: 'Makkah Ziyarat', origin: 'Makkah', destination: 'Ziyarat Tour', prices: [200, 300, 400, 250, 250, 500] },
  { name: 'Madinah Ziyarat', origin: 'Madinah', destination: 'Ziyarat Tour', prices: [200, 250, 400, 200, 200, 500] },
  { name: 'Makkah to Taif and Return', origin: 'Makkah', destination: 'Taif', prices: [400, 550, 800, 450, 450, 900] },
  { name: 'Jeddah to Taif and Return', origin: 'Jeddah', destination: 'Taif', prices: [500, 700, 1000, 600, 600, 1000] },
  { name: 'Makkah Hotel to Madinah Hotel', origin: 'Makkah Hotel', destination: 'Madinah Hotel', prices: [400, 550, 900, 450, 500, 900] },
  { name: 'Madinah Hotel to Makkah Hotel', origin: 'Madinah Hotel', destination: 'Makkah Hotel', prices: [400, 550, 900, 450, 450, 900] },
  { name: 'Madinah Hotel to Madinah Airport', origin: 'Madinah Hotel', destination: 'Madinah Airport', prices: [150, 250, 300, 200, 200, 400] },
  { name: 'Madinah Airport to Madinah Hotel', origin: 'Madinah Airport', destination: 'Madinah Hotel', prices: [150, 250, 300, 200, 250, 400] },
  { name: 'Makkah Hotel to Jeddah Airport', origin: 'Makkah Hotel', destination: 'Jeddah Airport', prices: [150, 300, 450, 250, 250, 600] },
  { name: 'Makkah Hotel to Train Station', origin: 'Makkah Hotel', destination: 'Train Station', prices: [100, 200, 250, 180, 180, 350] },
  { name: 'Madinah Hotel to Train Station', origin: 'Madinah Hotel', destination: 'Train Station', prices: [120, 200, 250, 180, 180, 350] }
];

const hourlyRates = [80, 120, 140, 100, 100, 250];

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Connected!');

    // Clear existing
    console.log('Clearing existing pricing data...');
    await RoutePricing.deleteMany({});
    await HourlyPricing.deleteMany({});
    await Route.deleteMany({});
    // We do NOT clear vehicles entirely to avoid breaking existing bookings, 
    // but we will upsert them based on name.

    console.log('Upserting Vehicles...');
    const vehicleDocs = [];
    for (const v of vehiclesData) {
      const doc = await Vehicle.findOneAndUpdate({ name: v.name }, v, { upsert: true, new: true });
      vehicleDocs.push(doc);
    }

    console.log('Inserting Hourly Pricing...');
    for (let i = 0; i < vehicleDocs.length; i++) {
      await HourlyPricing.create({
        vehicleId: vehicleDocs[i]._id,
        hourlyRate: hourlyRates[i],
        minimumHours: 4,
        extraHourRate: Math.round(hourlyRates[i] * 0.8), // Mock logic for extra hour
        isActive: true
      });
    }

    console.log('Inserting Routes and Route Pricing...');
    for (const r of routesData) {
      // We will make nameAr the same for now, unless we want to translate them all.
      const routeDoc = await Route.create({
        name: r.name,
        nameAr: r.name, // Simplified for seed
        origin: r.origin,
        originAr: r.origin,
        destination: r.destination,
        destinationAr: r.destination,
        distanceKm: 0, // Mock
        averageDurationMins: 0, // Mock
        isActive: true
      });

      for (let i = 0; i < vehicleDocs.length; i++) {
        await RoutePricing.create({
          routeId: routeDoc._id,
          vehicleId: vehicleDocs[i]._id,
          basePrice: r.prices[i],
          currentPrice: r.prices[i],
          isActive: true
        });
      }
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
