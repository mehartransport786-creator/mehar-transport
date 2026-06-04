"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useRealTimeEvents } from '@/hooks/useRealTimeEvents';
import { playNotificationSound } from '@/lib/notification-sound';

// ============================================================
// Types
// ============================================================
export interface LiveBooking {
  _id?: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropoffLocation: string;
  route: string;
  vehicleType: string;
  travelDate: string;
  travelTime: string;
  passengers: number;
  status: string;
  priority: string;
  driverAssigned?: string;
  totalPrice: number;
  extras: string[];
  tripType: string;
  createdAt: string;
  updatedAt?: string;
  statusHistory?: { status: string; timestamp: string; note?: string }[];
  isNew?: boolean; // For UI animation
}

export interface LiveActivity {
  _id?: string;
  type: string;
  bookingId?: string;
  message: string;
  messageAr: string;
  icon: string;
  metadata?: Record<string, any>;
  createdAt: string;
  isNew?: boolean;
}

export interface LiveNotification {
  id: string;
  type: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  bookingId?: string;
  icon: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardMetrics {
  totalBookings: number;
  todayBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  revenue: number;
  todayRevenue: number;
}

interface RealTimeContextType {
  // State
  bookings: LiveBooking[];
  activities: LiveActivity[];
  notifications: LiveNotification[];
  metrics: DashboardMetrics;
  toasts: LiveBooking[];
  isConnected: boolean;
  
  // Actions
  setBookings: (bookings: LiveBooking[]) => void;
  setActivities: (activities: LiveActivity[]) => void;
  setMetrics: (metrics: DashboardMetrics) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  dismissToast: (bookingId: string) => void;
  unreadCount: number;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

// ============================================================
// Provider
// ============================================================
export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<LiveBooking[]>([]);
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [toasts, setToasts] = useState<LiveBooking[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBookings: 0,
    todayBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    revenue: 0,
    todayRevenue: 0,
  });

  // Handle new booking from SSE
  const handleBookingCreated = useCallback((booking: LiveBooking) => {
    // Add to bookings list with animation flag
    const newBooking = { ...booking, isNew: true };

    setBookings((prev) => [newBooking, ...prev]);

    // Add notification
    const notif: LiveNotification = {
      id: `notif-${Date.now()}`,
      type: 'booking_created',
      title: `New Booking ${booking.bookingId}`,
      titleAr: `حجز جديد ${booking.bookingId}`,
      subtitle: `${booking.customerName} — ${booking.route}`,
      subtitleAr: `${booking.customerName} — ${booking.route}`,
      bookingId: booking.bookingId,
      icon: '📋',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    // Show toast
    setToasts((prev) => [newBooking, ...prev]);

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      totalBookings: prev.totalBookings + 1,
      todayBookings: prev.todayBookings + 1,
      pendingBookings: prev.pendingBookings + 1,
      revenue: prev.revenue + (booking.totalPrice || 0),
      todayRevenue: prev.todayRevenue + (booking.totalPrice || 0),
    }));

    // Play notification sound
    const soundType = booking.priority === 'vip' ? 'vip' :
                      booking.priority === 'urgent' ? 'urgent' : 'standard';
    playNotificationSound(soundType);

    // Auto-remove isNew flag after 5 seconds
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) => b.bookingId === booking.bookingId ? { ...b, isNew: false } : b)
      );
    }, 5000);

    // Auto-dismiss toast after 8 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.bookingId !== booking.bookingId));
    }, 8000);
  }, []);

  // Handle booking update from SSE
  const handleBookingUpdated = useCallback((data: { booking: LiveBooking; previousStatus?: string }) => {
    const { booking, previousStatus } = data;

    setBookings((prev) =>
      prev.map((b) => b.bookingId === booking.bookingId ? { ...booking, isNew: true } : b)
    );

    // Update metrics based on status change
    setMetrics((prev) => {
      const m = { ...prev };

      // Decrement old status counter
      if (previousStatus === 'pending') m.pendingBookings = Math.max(0, m.pendingBookings - 1);
      if (previousStatus === 'confirmed') m.confirmedBookings = Math.max(0, m.confirmedBookings - 1);

      // Increment new status counter
      if (booking.status === 'confirmed') m.confirmedBookings++;
      if (booking.status === 'completed') m.completedBookings++;
      if (booking.status === 'pending') m.pendingBookings++;

      return m;
    });

    // Add notification for status changes
    const notif: LiveNotification = {
      id: `notif-${Date.now()}`,
      type: 'status_changed',
      title: `Booking ${booking.bookingId} Updated`,
      titleAr: `تحديث الحجز ${booking.bookingId}`,
      subtitle: `Status: ${previousStatus} → ${booking.status}`,
      subtitleAr: `الحالة: ${previousStatus} → ${booking.status}`,
      bookingId: booking.bookingId,
      icon: '🔄',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    // Remove highlight after delay
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) => b.bookingId === booking.bookingId ? { ...b, isNew: false } : b)
      );
    }, 5000);
  }, []);

  // Handle new activity from SSE
  const handleActivityCreated = useCallback((activity: LiveActivity) => {
    setActivities((prev) => [{ ...activity, isNew: true }, ...prev.slice(0, 49)]); // Keep last 50

    setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) => a._id === activity._id ? { ...a, isNew: false } : a)
      );
    }, 3000);
  }, []);

  // Connect to SSE
  const { isConnected } = useRealTimeEvents({
    onBookingCreated: handleBookingCreated,
    onBookingUpdated: handleBookingUpdated,
    onActivityCreated: handleActivityCreated,
  });

  // Actions
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissToast = useCallback((bookingId: string) => {
    setToasts((prev) => prev.filter((t) => t.bookingId !== bookingId));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch initial data on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [bookingsRes, activitiesRes] = await Promise.all([
          fetch('/api/bookings?limit=50'),
          fetch('/api/admin/activities?limit=20').catch(() => null),
        ]);

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          if (bookingsData.success && bookingsData.data) {
            setBookings(bookingsData.data);

            // Calculate initial metrics
            const all = bookingsData.data as LiveBooking[];
            const today = new Date().toISOString().split('T')[0];
            const todayBookings = all.filter((b: LiveBooking) => b.createdAt?.startsWith(today));

            setMetrics({
              totalBookings: bookingsData.pagination?.total || all.length,
              todayBookings: todayBookings.length,
              pendingBookings: all.filter((b: LiveBooking) => b.status === 'pending').length,
              confirmedBookings: all.filter((b: LiveBooking) => b.status === 'confirmed').length,
              completedBookings: all.filter((b: LiveBooking) => b.status === 'completed').length,
              revenue: all.reduce((sum: number, b: LiveBooking) => sum + (b.totalPrice || 0), 0),
              todayRevenue: todayBookings.reduce((sum: number, b: LiveBooking) => sum + (b.totalPrice || 0), 0),
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

  return (
    <RealTimeContext.Provider
      value={{
        bookings, activities, notifications, metrics, toasts, isConnected,
        setBookings, setActivities, setMetrics,
        markNotificationRead, clearAllNotifications, dismissToast,
        unreadCount,
      }}
    >
      {children}
    </RealTimeContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================
export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}
