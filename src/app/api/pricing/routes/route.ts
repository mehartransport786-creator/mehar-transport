import { NextResponse } from 'next/server';
import { getFormattedRoutes } from '@/lib/services/routeService';

export async function GET() {
  try {
    const formattedRoutes = await getFormattedRoutes();

    if (formattedRoutes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No active routes configured. Please add routes in the admin panel.' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ success: true, routes: formattedRoutes });

    // HTTP cache: public CDN cache 5 min, serve stale for 1 min while revalidating
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=60'
    );

    return response;
  } catch (error) {
    console.error('[GET /api/pricing/routes] DB error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load routes. Please try again.' },
      { status: 500 }
    );
  }
}
