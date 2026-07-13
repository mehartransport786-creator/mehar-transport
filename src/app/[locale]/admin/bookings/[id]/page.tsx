"use client";

import { useState, useEffect, use } from "react";
import { useLocale } from "next-intl";
import { useRealTime } from "@/components/admin/RealTimeProvider";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft, MapPin, Phone, Mail, Car, Users, Calendar, Clock,
  Globe, Luggage, CreditCard, FileText, CheckCircle, XCircle,
  Truck, Navigation, Flag, ChevronRight, UserPlus
} from "lucide-react";

const statusSteps = [
  { key: 'pending',        label: 'Pending',        labelAr: 'معلق',         icon: '📋', color: '#F59E0B' },
  { key: 'confirmed',      label: 'Confirmed',      labelAr: 'مؤكد',         icon: '✅', color: '#2563EB' },
  { key: 'assigned',       label: 'Assigned',       labelAr: 'تم التعيين',   icon: '🚗', color: '#7C3AED' },
  { key: 'driver_en_route',label: 'Driver En Route', labelAr: 'السائق بالطريق',icon: '🛣️', color: '#0891B2' },
  { key: 'arrived',        label: 'Arrived',        labelAr: 'وصل',          icon: '📍', color: '#0891B2' },
  { key: 'journey_started',label: 'Journey Started', labelAr: 'بدأت الرحلة', icon: '▶️', color: '#16A34A' },
  { key: 'completed',      label: 'Completed',      labelAr: 'مكتمل',        icon: '🏁', color: '#16A34A' },
];

const cancelledStatus = { key: 'cancelled', label: 'Cancelled', labelAr: 'ملغى', icon: '❌', color: '#DC2626' };

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const locale = useLocale();
  const isAr = locale === "ar";
  const { bookings } = useRealTime();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);

  // Fetch booking data
  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        if (data.success) {
          setBooking(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch booking:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  // Live update from SSE
  useEffect(() => {
    const liveBooking = bookings.find((b) => b.bookingId === id);
    if (liveBooking) {
      setBooking((prev: any) => prev ? { ...prev, ...liveBooking } : liveBooking);
    }
  }, [bookings, id]);

  // Fetch drivers
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch('/api/drivers');
        const data = await res.json();
        if (data.success) {
          setDrivers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      }
    }
    fetchDrivers();
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBooking(data.data);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignDriver = async (driverId: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverAssigned: driverId, status: 'assigned' })
      });
      const data = await res.json();
      if (data.success) {
        setBooking(data.data);
      }
    } catch (error) {
      console.error('Failed to assign driver:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold text-gray-400">Booking not found</p>
        <Link href="/admin/bookings" className="text-secondary font-semibold mt-4 inline-block">← Back to Bookings</Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.key === booking.status);
  const isCancelled = booking.status === 'cancelled' || booking.status === 'refunded';

  // Determine next status action
  const nextStatusMap: Record<string, { status: string; label: string; labelAr: string; color: string }> = {
    pending:        { status: 'confirmed',       label: 'Confirm Booking',  labelAr: 'تأكيد الحجز',     color: '#2563EB' },
    confirmed:      { status: 'assigned',        label: 'Assign Driver',    labelAr: 'تعيين سائق',      color: '#7C3AED' },
    assigned:       { status: 'driver_en_route', label: 'Driver En Route',  labelAr: 'السائق في الطريق', color: '#0891B2' },
    driver_en_route:{ status: 'arrived',         label: 'Driver Arrived',   labelAr: 'وصل السائق',      color: '#0891B2' },
    arrived:        { status: 'journey_started', label: 'Start Journey',    labelAr: 'بدء الرحلة',      color: '#16A34A' },
    journey_started:{ status: 'completed',       label: 'Complete Trip',    labelAr: 'إكمال الرحلة',    color: '#16A34A' },
  };

  const nextAction = nextStatusMap[booking.status];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#1B1E4F' }}>
                {booking.bookingId}
              </h1>
              {booking.priority !== 'standard' && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase" style={{
                  background: booking.priority === 'vip' ? '#FEF3C7' : booking.priority === 'urgent' ? '#FEE2E2' : '#DBEAFE',
                  color: booking.priority === 'vip' ? '#D97706' : booking.priority === 'urgent' ? '#DC2626' : '#2563EB'
                }}>
                  {booking.priority}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {isAr ? 'تم الإنشاء' : 'Created'}: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {nextAction && !isCancelled && (
            <button
              onClick={() => handleStatusChange(nextAction.status)}
              disabled={updating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50"
              style={{ background: nextAction.color }}
            >
              {updating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {isAr ? nextAction.labelAr : nextAction.label}
            </button>
          )}
          {!isCancelled && booking.status !== 'completed' && (
            <button
              onClick={() => handleStatusChange('cancelled')}
              disabled={updating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" />
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold mb-6" style={{ color: '#1B1E4F' }}>
          {isAr ? 'تتبع الحالة' : 'Status Timeline'}
        </h2>
        <div className="flex items-center overflow-x-auto pb-2">
          {statusSteps.map((step, i) => {
            const isActive = i <= currentStepIndex && !isCancelled;
            const isCurrent = step.key === booking.status;
            return (
              <div key={step.key} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                      isCurrent ? 'ring-4 scale-110' : ''
                    }`}
                    style={{
                      background: isActive ? step.color + '20' : '#F3F4F6',
                    }}
                  >
                    {isActive ? step.icon : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                  </div>
                  <span className={`text-[10px] font-bold mt-2 whitespace-nowrap ${isActive ? 'text-gray-700' : 'text-gray-300'}`}>
                    {isAr ? step.labelAr : step.label}
                  </span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 ${i < currentStepIndex && !isCancelled ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
          {isCancelled && (
            <div className="flex items-center shrink-0 ml-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-red-100 ring-4 ring-red-100 scale-110">
                  ❌
                </div>
                <span className="text-[10px] font-bold mt-2 text-red-600">{booking.status === 'refunded' ? 'Refunded' : 'Cancelled'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1B1E4F' }}>
            {isAr ? 'معلومات العميل' : 'Customer Information'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white text-lg font-bold">
                {(booking.customerName || 'G')[0]}
              </div>
              <div>
                <div className="font-bold text-gray-800">{booking.customerName}</div>
                <div className="text-xs text-gray-400">{booking.customerEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              {booking.customerPhone}
            </div>
            {booking.nationality && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Globe className="w-4 h-4 text-gray-400" />
                {booking.nationality}
              </div>
            )}
          </div>
        </div>

        {/* Journey Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1B1E4F' }}>
            {isAr ? 'تفاصيل الرحلة' : 'Journey Details'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
              <div>
                <div className="text-xs text-gray-400 font-semibold uppercase">{isAr ? 'نقطة الالتقاط' : 'Pickup'}</div>
                <div className="text-sm font-medium text-gray-700">{booking.pickupLocation}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-100 shrink-0" />
              <div>
                <div className="text-xs text-gray-400 font-semibold uppercase">{isAr ? 'الوجهة' : 'Destination'}</div>
                <div className="text-sm font-medium text-gray-700">{booking.dropoffLocation}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                {booking.travelDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                {booking.travelTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Car className="w-4 h-4 text-gray-400" />
                {booking.vehicleType}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                {booking.passengers} {isAr ? 'ركاب' : 'passengers'}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1B1E4F' }}>
            {isAr ? 'تفاصيل الدفع' : 'Payment Details'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{isAr ? 'طريقة الدفع' : 'Payment Method'}</span>
              <span className="font-semibold text-gray-800 capitalize">{booking.paymentMethod || 'Cash'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{isAr ? 'نوع الرحلة' : 'Trip Type'}</span>
              <span className="font-semibold text-gray-800 capitalize">{booking.tripType || 'One-way'}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="text-base font-bold" style={{ color: '#1B1E4F' }}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className="text-xl font-black" style={{ color: '#F8A731' }}>
                {(booking.totalPrice || 0).toLocaleString()} SAR
              </span>
            </div>
          </div>
        </div>

        {/* Status History */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1B1E4F' }}>
            {isAr ? 'سجل الحالات' : 'Status History'}
          </h3>
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            {(booking.statusHistory || []).map((entry: any, i: number) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-secondary shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold capitalize text-gray-700">{entry.status?.replace(/_/g, ' ')}</span>
                  {entry.note && <span className="text-gray-400 ml-2">— {entry.note}</span>}
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Assignment */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1B1E4F' }}>
            {isAr ? 'تعيين السائق' : 'Driver Assignment'}
          </h3>
          
          {booking.driverAssigned ? (
            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <UserPlus className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-primary text-lg">{booking.driverAssigned}</div>
                <div className="text-xs font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {isAr ? 'تم التعيين بنجاح' : 'Assigned successfully'}
                </div>
              </div>
              <button 
                onClick={() => handleAssignDriver('')}
                disabled={updating}
                className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
              >
                {isAr ? 'إزالة' : 'Remove'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                {isAr ? 'الرجاء اختيار سائق لهذه الرحلة' : 'Please select a driver for this journey'}
              </p>
              <select
                onChange={(e) => {
                  if(e.target.value) handleAssignDriver(e.target.value);
                }}
                disabled={updating}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">{isAr ? 'اختيار سائق...' : 'Select driver...'}</option>
                {drivers.filter(d => d.availability === 'available').map(driver => (
                  <option key={driver._id} value={driver.name}>
                    {isAr ? driver.nameAr : driver.name} - Rating: {driver.rating}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Special Requests */}
      {booking.specialRequests && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-3" style={{ color: '#1B1E4F' }}>
            {isAr ? 'طلبات خاصة' : 'Special Requests'}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{booking.specialRequests}</p>
        </div>
      )}
    </div>
  );
}
