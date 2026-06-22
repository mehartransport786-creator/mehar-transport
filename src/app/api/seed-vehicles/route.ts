import { NextResponse } from 'next/server';
import { seedRichVehicles } from '@/lib/seed-rich-vehicles';

export async function GET() {
  const result = await seedRichVehicles();
  if (result.success) {
    return NextResponse.json({ message: 'Vehicles seeded successfully!' });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
