"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

type EventHandler = (data: any) => void;

interface UseRealTimeEventsOptions {
  onBookingCreated?: EventHandler;
  onBookingUpdated?: EventHandler;
  onActivityCreated?: EventHandler;
  onConnected?: EventHandler;
  enabled?: boolean;
}

export function useRealTimeEvents(options: UseRealTimeEventsOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<{ type: string; data: unknown } | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const optionsRef = useRef(options);
  
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (optionsRef.current.enabled === false) return;

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource('/api/admin/events');
    eventSourceRef.current = es;

    es.addEventListener('connected', (e) => {
      setIsConnected(true);
      const data = JSON.parse(e.data);
      optionsRef.current.onConnected?.(data);
    });

    es.addEventListener('booking:created', (e) => {
      const data = JSON.parse(e.data);
      setLastEvent({ type: 'booking:created', data });
      optionsRef.current.onBookingCreated?.(data);
    });

    es.addEventListener('booking:updated', (e) => {
      const data = JSON.parse(e.data);
      setLastEvent({ type: 'booking:updated', data });
      optionsRef.current.onBookingUpdated?.(data);
    });

    es.addEventListener('activity:new', (e) => {
      const data = JSON.parse(e.data);
      setLastEvent({ type: 'activity:new', data });
      optionsRef.current.onActivityCreated?.(data);
    });

    es.addEventListener('ping', () => {
      // Heartbeat received — connection is alive
      setIsConnected(true);
    });

    es.onerror = () => {
      setIsConnected(false);
      // Browser will automatically reconnect (native EventSource behavior)
    };

    es.onopen = () => {
      setIsConnected(true);
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [connect]);

  return { isConnected, lastEvent };
}
