import { eventBus } from '@/lib/event-bus';

/**
 * SSE Streaming Endpoint: GET /api/admin/events
 * 
 * Opens a persistent HTTP connection and pushes real-time events
 * to all connected admin browsers. No polling, no WebSocket server needed.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const encoder = new TextEncoder();

  // Store listeners so we can clean them up
  let onBookingCreated: ((booking: any) => void) | null = null;
  let onBookingUpdated: ((data: any) => void) | null = null;
  let onActivityCreated: ((activity: any) => void) | null = null;
  let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  let isClosed = false;

  const stream = new ReadableStream({
    start(controller) {
      // Helper to send SSE formatted data
      const send = (event: string, data: any) => {
        if (isClosed) return;
        try {
          const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Stream closed, clean up
          cleanup();
        }
      };

      // Send initial connection confirmation
      send('connected', { 
        message: 'Real-time connection established',
        timestamp: new Date().toISOString()
      });

      // Listen for booking events
      onBookingCreated = (booking: any) => send('booking:created', booking);
      onBookingUpdated = (data: any) => send('booking:updated', data);
      onActivityCreated = (activity: any) => send('activity:new', activity);

      eventBus.on('booking:created', onBookingCreated);
      eventBus.on('booking:updated', onBookingUpdated);
      eventBus.on('activity:new', onActivityCreated);

      // Heartbeat ping every 30 seconds to keep connection alive
      heartbeatInterval = setInterval(() => {
        send('ping', { timestamp: new Date().toISOString() });
      }, 30000);

      // Cleanup function
      function cleanup() {
        if (isClosed) return;
        isClosed = true;

        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }
        if (onBookingCreated) {
          eventBus.off('booking:created', onBookingCreated);
          onBookingCreated = null;
        }
        if (onBookingUpdated) {
          eventBus.off('booking:updated', onBookingUpdated);
          onBookingUpdated = null;
        }
        if (onActivityCreated) {
          eventBus.off('activity:new', onActivityCreated);
          onActivityCreated = null;
        }
      }

      // Store cleanup on the controller for access in cancel()
      (controller as any).__cleanup = cleanup;
    },
    cancel(controller) {
      // Called when client disconnects
      if ((this as any).__cleanup) {
        (this as any).__cleanup();
      }
      // Also try the stored cleanup
      isClosed = true;
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (onBookingCreated) eventBus.off('booking:created', onBookingCreated);
      if (onBookingUpdated) eventBus.off('booking:updated', onBookingUpdated);
      if (onActivityCreated) eventBus.off('activity:new', onActivityCreated);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
