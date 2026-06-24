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
import SeasonalPricing from './models/SeasonalPricing';

const vehiclesData = [
  { name: 'Kia K5', nameAr: 'كيا كيه 5', type: 'Sedan', typeAr: 'سيدان', passengers: 4, luggage: 2, image: '/fleet/kia-k5.png', active: true, slug: 'kia-k5' },
  { name: 'Mitsubishi Xpander', nameAr: 'ميتسوبيشي إكسباندر', type: 'SUV', typeAr: 'عائلية', passengers: 7, luggage: 4, image: '/fleet/xpander.png', active: true, slug: 'mitsubishi-xpander' },
  { name: 'Hyundai Staria', nameAr: 'هيونداي ستاريا', type: 'Luxury Van', typeAr: 'فان فاخر', passengers: 7, luggage: 6, image: '/fleet/staria.png', active: true, slug: 'hyundai-staria' },
  { name: 'Toyota Hiace', nameAr: 'تويوتا هايس', type: 'Van', typeAr: 'فان', passengers: 11, luggage: 10, image: '/fleet/hiace.png', active: true, slug: 'toyota-hiace' },
  { name: 'GMC Yukon', nameAr: 'جمس يوكون', type: 'SUV', typeAr: 'سيارة دفع رباعي', passengers: 7, luggage: 7, image: '/fleet/gmc.png', active: true, slug: 'gmc-yukon' },
  { name: 'Toyota Coaster', nameAr: 'تويوتا كوستر', type: 'Bus', typeAr: 'حافلة', passengers: 22, luggage: 15, image: '/fleet/coaster.png', active: true, slug: 'toyota-coaster' },
];

// 15 Routes
const routesData = [
  { name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'jeddah-airport-to-makkah-hotel', prices: [200, 250, 300, 350, 500, 600] },
  { name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'makkah-hotel-to-jeddah-airport', prices: [150, 200, 250, 300, 450, 500] },
  { name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'jeddah-airport-to-madinah-hotel', prices: [500, 600, 700, 800, 1200, 1500] },
  { name: 'Madinah Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'madinah-hotel-to-jeddah-airport', prices: [450, 550, 650, 750, 1100, 1400] },
  { name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'intercity', city: 'Madinah', distanceKm: 450, averageDurationMins: 270, slug: 'makkah-hotel-to-madinah-hotel', prices: [450, 550, 650, 750, 1100, 1400] },
  { name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'intercity', city: 'Makkah', distanceKm: 450, averageDurationMins: 270, slug: 'madinah-hotel-to-makkah-hotel', prices: [450, 550, 650, 750, 1100, 1400] },
  { name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', origin: 'Madinah Airport', originAr: 'مطار المدينة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-airport-to-madinah-hotel', prices: [100, 120, 150, 200, 300, 400] },
  { name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Madinah Airport', destinationAr: 'مطار المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-hotel-to-madinah-airport', prices: [100, 120, 150, 200, 300, 400] },
  { name: 'Makkah Ziyarat', nameAr: 'مزارات مكة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Makkah', distanceKm: 30, averageDurationMins: 180, slug: 'makkah-ziyarat', prices: [200, 250, 300, 350, 500, 600] },
  { name: 'Madinah Ziyarat', nameAr: 'مزارات المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Madinah', distanceKm: 30, averageDurationMins: 180, slug: 'madinah-ziyarat', prices: [150, 200, 250, 300, 450, 500] },
  { name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', origin: 'Makkah', originAr: 'مكة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 180, averageDurationMins: 360, slug: 'makkah-to-taif-return', prices: [400, 500, 600, 700, 1000, 1200] },
  { name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', origin: 'Jeddah', originAr: 'جدة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 320, averageDurationMins: 480, slug: 'jeddah-to-taif-return', prices: [500, 600, 700, 800, 1200, 1500] },
  { name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Jeddah Hotel', destinationAr: 'فندق جدة', routeType: 'airport_transfer', city: 'Jeddah', distanceKm: 25, averageDurationMins: 30, slug: 'jeddah-airport-to-jeddah-hotel', prices: [100, 120, 150, 200, 300, 400] },
  { name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 15, averageDurationMins: 20, slug: 'makkah-hotel-to-train-station', prices: [80, 100, 120, 150, 250, 350] },
  { name: 'Madinah Hotel to Train Station', nameAr: 'فندق المدينة إلى محطة القطار', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 15, averageDurationMins: 20, slug: 'madinah-hotel-to-train-station', prices: [80, 100, 120, 150, 250, 350] }
];

const hourlyRates = [60, 80, 100, 120, 200, 300];

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Connected!');

    // Clear existing
    console.log('Clearing existing pricing, routes, and seasonal data...');
    await RoutePricing.deleteMany({});
    await HourlyPricing.deleteMany({});
    await Route.deleteMany({});
    await SeasonalPricing.deleteMany({});
    // Delete vehicles to ensure clean state with 9 named vehicles
    await Vehicle.deleteMany({});

    console.log('Inserting Vehicles...');
    const vehicleDocs = await Vehicle.insertMany(vehiclesData);

    console.log('Inserting Hourly Pricing...');
    for (let i = 0; i < vehicleDocs.length; i++) {
      await HourlyPricing.create({
        vehicleId: vehicleDocs[i]._id,
        hourlyRate: hourlyRates[i],
        minimumHours: 4,
        extraHourRate: Math.round(hourlyRates[i] * 0.8),
        isActive: true
      });
    }

    console.log('Inserting Routes and Route Pricing...');
    for (const r of routesData) {
      const routeDoc = await Route.create({
        name: r.name,
        nameAr: r.nameAr,
        slug: r.slug,
        origin: r.origin,
        originAr: r.originAr,
        destination: r.destination,
        destinationAr: r.destinationAr,
        pickupLocation: r.origin,
        pickupLocationAr: r.originAr,
        dropoffLocation: r.destination,
        dropoffLocationAr: r.destinationAr,
        distanceKm: r.distanceKm,
        averageDurationMins: r.averageDurationMins,
        routeType: r.routeType,
        city: r.city,
        status: 'active',
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

    console.log('Inserting Seasonal Rules...');
    const now = new Date();
    
    // Ramadan
    const ramadanStart = new Date(now.getFullYear(), 2, 1); // March
    const ramadanEnd = new Date(now.getFullYear(), 2, 30);
    
    // Hajj
    const hajjStart = new Date(now.getFullYear(), 5, 1); // June
    const hajjEnd = new Date(now.getFullYear(), 5, 15);
    
    // National Day
    const nationalStart = new Date(now.getFullYear(), 8, 20); // Sept
    const nationalEnd = new Date(now.getFullYear(), 8, 25);

    await SeasonalPricing.insertMany([
      {
        seasonName: 'Ramadan Peak',
        seasonNameAr: 'موسم رمضان',
        startDate: ramadanStart,
        endDate: ramadanEnd,
        adjustmentType: 'percentage_increase',
        adjustmentValue: 15,
        priority: 5,
        isActive: true
      },
      {
        seasonName: 'Hajj Season',
        seasonNameAr: 'موسم الحج',
        startDate: hajjStart,
        endDate: hajjEnd,
        adjustmentType: 'percentage_increase',
        adjustmentValue: 40,
        priority: 10,
        isActive: true
      },
      {
        seasonName: 'Saudi National Day',
        seasonNameAr: 'اليوم الوطني',
        startDate: nationalStart,
        endDate: nationalEnd,
        adjustmentType: 'percentage_decrease',
        adjustmentValue: 10,
        priority: 8,
        isActive: true
      }
    ]);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
