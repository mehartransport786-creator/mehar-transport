"use client";

import { useLocale } from 'next-intl';
import { useRealTime, LiveBooking } from './RealTimeProvider';
import { X, Eye, UserPlus, MapPin, Car, Users, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useEffect, useState } from 'react';

function SingleToast({ booking, onDismiss }: { booking: LiveBooking; onDismiss: () => void }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const priorityColors: Record<string, { bg: string; border: string; accent: string }> = {
    standard:  { bg: '#FFFFFF', border: '#E5E7EB', accent: '#D9A63A' },
    vip:       { bg: '#FFFBEB', border: '#F59E0B', accent: '#D97706' },
    urgent:    { bg: '#FEF2F2', border: '#EF4444', accent: '#DC2626' },
    airport:   { bg: '#EFF6FF', border: '#3B82F6', accent: '#2563EB' },
    group:     { bg: '#F0FDF4', border: '#22C55E', accent: '#16A34A' },
    corporate: { bg: '#F5F3FF', border: '#8B5CF6', accent: '#7C3AED' },
  };

  const pc = priorityColors[booking.priority] || priorityColors.standard;

  return (
    <div
      className="w-[380px] rounded-2xl shadow-2xl border overflow-hidden"
      style={{
        background: pc.bg,
        borderColor: pc.border,
        animation: 'slideInRight 0.4s ease-out',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: pc.border + '40' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: pc.accent }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: pc.accent }}>
            {isAr ? 'حجز جديد' : 'New Booking'}
          </span>
          {booking.priority !== 'standard' && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
              style={{ background: pc.accent + '15', color: pc.accent }}
            >
              {booking.priority}
            </span>
          )}
        </div>
        <button onClick={onDismiss} className="p-1 rounded-lg hover:bg-black/5 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-base font-black" style={{ color: '#1B1E4F' }}>{booking.bookingId}</span>
          <span className="text-sm font-bold" style={{ color: pc.accent }}>
            {(booking.totalPrice || 0).toLocaleString()} SAR
          </span>
        </div>

        <div className="text-sm font-semibold text-gray-800">{booking.customerName}</div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{booking.route}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-3 h-3" />
            <span className="truncate">{booking.vehicleType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            <span>{booking.passengers} {isAr ? 'ركاب' : 'pax'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{booking.travelDate} {booking.travelTime}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: pc.border + '40' }}>
        <Link
          href={`/admin/bookings/${booking.bookingId}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
          style={{ background: '#1B1E4F', color: '#fff' }}
          onClick={onDismiss}
        >
          <Eye className="w-3.5 h-3.5" />
          {isAr ? 'عرض' : 'View'}
        </Link>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
          style={{ background: pc.accent, color: '#fff' }}
        >
          <UserPlus className="w-3.5 h-3.5" />
          {isAr ? 'تعيين سائق' : 'Assign Driver'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%`, background: pc.accent }}
        />
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function BookingToast() {
  const { toasts, dismissToast } = useRealTime();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3">
      {toasts.slice(0, 3).map((booking) => (
        <SingleToast
          key={booking.bookingId}
          booking={booking}
          onDismiss={() => dismissToast(booking.bookingId)}
        />
      ))}
    </div>
  );
}
