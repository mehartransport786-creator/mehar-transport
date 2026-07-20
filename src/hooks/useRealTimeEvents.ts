"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler = (data: any) => void;

interface UseRealTimeEventsOptions {
  onBookingCreated?: EventHandler;
  onBookingUpdated?: EventHandler;
  onActivityCreated?: EventHandler;
  onConnected?: EventHandler;
  enabled?: boolean;
  /** How often to poll in milliseconds. Defaults to 30 000 (30 s). */
  pollInterval?: number;
}

/**
 * Replaces the previous SSE-based hook.
 *
 * Instead of holding a persistent EventSource open (which kept a Vercel Fluid
 * function instance provisioned for the entire browser-tab lifetime), this hook
 * polls /api/admin/feed every `pollInterval` ms.
 *
 * Key behaviours:
 *  - Polling is paused automatically when the browser tab is hidden
 *    (visibilitychange) and resumes + immediately fetches on tab focus.
 *  - Returns `{ isConnected, lastEvent }` — same public API as before,
 *    so call-sites (AdminLayoutClient, dashboard pages) need no changes.
 */
export function useRealTimeEvents(options: UseRealTimeEventsOptions = {}) {
  const { enabled = true, pollInterval = 30_000 } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<{ type: string; data: unknown } | null>(null);

  // Track the last successful fetch time so we only receive new items
  const lastFetchedAt = useRef<string>(new Date().toISOString());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const optionsRef = useRef(options);

  // Keep options ref fresh without re-creating the effect
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchFeed = useCallback(async () => {
    // Do nothing while the tab is in the background
    if (typeof document !== 'undefined' && document.hidden) return;
    if (optionsRef.current.enabled === false) return;

    try {
      const res = await fetch(
        `/api/admin/feed?since=${encodeURIComponent(lastFetchedAt.current)}`,
        { cache: 'no-store' }
      );

      if (!res.ok) {
        setIsConnected(false);
        return;
      }

      const data = await res.json();

      // Advance the cursor so the next poll only returns newer items
      lastFetchedAt.current = data.serverTime ?? new Date().toISOString();
      setIsConnected(true);

      // Fire onConnected only once (first successful response)
      optionsRef.current.onConnected?.(data);

      // Dispatch new activity events
      for (const activity of (data.activities ?? []) as unknown[]) {
        setLastEvent({ type: 'activity:new', data: activity });
        optionsRef.current.onActivityCreated?.(activity);
      }

      // Dispatch new/updated booking events
      for (const booking of (data.bookings ?? []) as Record<string, string>[]) {
        const createdAt = new Date(booking.createdAt).getTime();
        const updatedAt = new Date(booking.updatedAt).getTime();
        // Allow 5 s tolerance for "just created" vs "updated"
        const isNew = Math.abs(updatedAt - createdAt) < 5_000;
        if (isNew) {
          setLastEvent({ type: 'booking:created', data: booking });
          optionsRef.current.onBookingCreated?.(booking);
        } else {
          setLastEvent({ type: 'booking:updated', data: booking });
          optionsRef.current.onBookingUpdated?.(booking);
        }
      }
    } catch {
      setIsConnected(false);
    }
  }, []); // stable; reads options via optionsRef

  useEffect(() => {
    if (!enabled) {
      setIsConnected(false);
      return;
    }

    // Fetch immediately on mount
    fetchFeed();

    // Regular polling
    intervalRef.current = setInterval(fetchFeed, pollInterval);

    // Resume + fetch immediately when the tab regains focus
    const handleVisibility = () => {
      if (!document.hidden) fetchFeed();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled, pollInterval, fetchFeed]);

  return { isConnected, lastEvent };
}
