import { EventEmitter } from 'events';

/**
 * Server-side singleton EventBus for broadcasting real-time events.
 * 
 * Uses globalThis caching to survive Next.js hot reloads (same pattern as the MongoDB connection).
 * 
 * Events:
 *   - booking:created   → { booking }
 *   - booking:updated   → { booking, previousStatus }
 *   - activity:new      → { activity }
 */

interface GlobalWithEventBus {
  __eventBus?: EventEmitter;
}

function getEventBus(): EventEmitter {
  const g = globalThis as GlobalWithEventBus;

  if (!g.__eventBus) {
    g.__eventBus = new EventEmitter();
    g.__eventBus.setMaxListeners(100); // Support many concurrent admin connections
  }

  return g.__eventBus;
}

export const eventBus = getEventBus();

// Type-safe event helpers
export function emitBookingCreated(booking: any) {
  eventBus.emit('booking:created', booking);
}

export function emitBookingUpdated(booking: any, previousStatus?: string) {
  eventBus.emit('booking:updated', { booking, previousStatus });
}

export function emitActivityCreated(activity: any) {
  eventBus.emit('activity:new', activity);
}
