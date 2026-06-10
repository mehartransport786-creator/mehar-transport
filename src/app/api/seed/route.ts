import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Vehicle from '@/lib/models/Vehicle';
import Booking from '@/lib/models/Booking';
import Customer from '@/lib/models/Customer';
import Driver from '@/lib/models/Driver';
import ActivityLog from '@/lib/models/ActivityLog';
import { mockFleet } from '@/lib/data';
import { mockCustomers, mockDrivers, mockBookings, liveActivities } from '@/lib/admin-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    await connectToDatabase();
    
    // Check if we already have vehicles
    const count = await Vehicle.countDocuments();
    if (count > 0 && !force) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database is already seeded. Use ?force=true to clear and re-seed.' 
      });
    }

    if (force) {
      console.log('Clearing existing collections...');
      await Vehicle.deleteMany({});
      await Booking.deleteMany({});
      await Customer.deleteMany({});
      await Driver.deleteMany({});
      await ActivityLog.deleteMany({});
    }

    console.log('Seeding Vehicles...');
    await Vehicle.insertMany(mockFleet);

    console.log('Seeding Customers...');
    const mappedCustomers = mockCustomers.map(c => ({
      name: c.name,
      phone: c.phone,
      email: c.email,
      totalBookings: c.totalBookings,
      lifetimeValue: c.lifetimeValue,
      favoriteRoute: c.favoriteRoute,
      preferredVehicle: c.preferredVehicle,
      tags: c.tags,
      lastBooking: c.lastBooking,
    }));
    await Customer.insertMany(mappedCustomers);

    console.log('Seeding Drivers...');
    await Driver.insertMany(mockDrivers);

    console.log('Seeding Bookings...');
    const mappedBookings = mockBookings.map(b => {
      // Parse pickup/dropoff from route string (e.g. "Jeddah Airport → Makkah")
      const [pickupLocation, dropoffLocation] = b.route.split(' → ').map(s => s.trim());
      
      return {
        bookingId: b.id,
        customerName: b.customer,
        customerPhone: b.phone,
        customerEmail: 'example@email.com',
        pickupLocation: pickupLocation || b.route,
        dropoffLocation: dropoffLocation || b.route,
        route: b.route,
        vehicleType: b.vehicle,
        travelDate: b.date,
        travelTime: '10:00',
        passengers: b.passengers,
        status: b.status === 'in_progress' ? 'journey_started' : b.status,
        totalPrice: b.amount,
        driverAssigned: b.driver,
        priority: 'standard'
      };
    });
    await Booking.insertMany(mappedBookings);

    console.log('Seeding Activity Logs...');
    const mappedActivities = liveActivities.map(a => {
      // Map legacy activity types to schema types
      const typeMap: Record<string, string> = {
        booking: 'booking_created',
        payment: 'payment_received',
        driver: 'driver_assigned',
        message: 'new_message',
        completed: 'booking_completed',
        cancelled: 'booking_cancelled',
        review: 'new_review',
        alert: 'system_alert'
      };

      return {
        type: typeMap[a.type] || 'system_alert',
        message: a.message,
        messageAr: a.messageAr,
        icon: a.icon,
        createdAt: new Date(Date.now() - Math.random() * 86400000) // Spread over last 24h
      };
    });
    await ActivityLog.insertMany(mappedActivities);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully seeded database with all admin data!',
    });
  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    
    console.log('Wiping all seeded dummy data...');
    // We do NOT wipe Vehicles here because they act as the permanent fleet.
    await Booking.deleteMany({});
    await Customer.deleteMany({});
    await Driver.deleteMany({});
    await ActivityLog.deleteMany({});

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully wiped all demo bookings, customers, drivers, and activities from the database!',
    });
  } catch (error: any) {
    console.error("Wipe Error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to wipe database', details: error.message },
      { status: 500 }
    );
  }
}
