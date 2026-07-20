import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, Calendar, MapPin, Car, Users, Wallet, Download, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Booking from "@/lib/models/Booking";
import mongoose from "mongoose";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
};

async function getBookingDetails(bookingId: string) {
  try {
    await connectToDatabase();
    // find by bookingId string (e.g. "MHT-2026-XXXX") or by MongoDB ObjectId if they passed that
    let booking = await Booking.findOne({ bookingId }).lean();
    if (!booking && mongoose.Types.ObjectId.isValid(bookingId)) {
      booking = await Booking.findById(bookingId).lean();
    }
    return booking;
  } catch (error) {
    console.error("Failed to fetch booking details:", error);
    return null;
  }
}

export default async function BookingSuccessPage({ params, searchParams }: Props) {
  const [{ locale }, { id }] = await Promise.all([params, searchParams]);
  
  if (!id) {
    return notFound();
  }

  const booking = await getBookingDetails(id);
  
  // F04: A booking that doesn't exist in the DB must not show a success page.
  // This was previously masked by the fake-success fallback in the POST handler.
  // Now that the API returns a real error on failure, an unknown ID means the
  // booking was never persisted — show 404 rather than a ghost confirmation.
  if (!booking) {
    return notFound();
  }

  const displayData = booking;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 py-12 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Success Hero */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-4 tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            Thank you, {displayData.customerName}. Your reservation has been successfully received.
          </p>
          <div className="inline-block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-3 shadow-sm mt-4">
            <span className="text-sm text-slate-500 block mb-1">Booking Reference ID</span>
            <span className="text-2xl font-bold text-secondary tracking-wider">{displayData.bookingId}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Trip Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-lg">Trip Summary</h3>
            </div>
            <div className="p-6">
              <div className="font-semibold text-xl mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                {displayData.route}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Date & Time</div>
                    <div className="font-medium">{displayData.travelDate} at {displayData.travelTime}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Passengers</div>
                    <div className="font-medium">{displayData.passengers}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Vehicle</div>
                    <div className="font-medium">{displayData.vehicleType}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Payment</div>
                    <div className="font-medium capitalize">{displayData.paymentMethod.replace('-', ' ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Card — always shown now that booking is always real */}
          <div className="bg-primary text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div>
              <div className="text-indigo-200 text-sm mb-1">Total Amount</div>
              <div className="text-3xl font-black text-secondary tabular-nums">
                {displayData.totalPrice} <span className="text-base font-semibold text-white/60">SAR</span>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10">
              <Download className="w-4 h-4" />
              Receipt
            </button>
          </div>

          {/* Next Steps / Info */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6">
            <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-2">What happens next?</h4>
            <p className="text-sm text-amber-800 dark:text-amber-400/80 leading-relaxed">
              We've sent a confirmation email to you. Our team will review your booking and assign a driver shortly. You'll receive a WhatsApp message with the driver's details before your trip.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={`/${locale}`}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link 
            href={`/${locale}/booking`}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-secondary text-white hover:bg-secondary/80 transition-colors shadow-lg shadow-secondary/20"
          >
            Book Another Trip
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
