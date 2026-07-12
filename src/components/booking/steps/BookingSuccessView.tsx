import React from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Copy, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Props {
  bookingRef: string | null;
  onClose: () => void;
}

export default function BookingSuccessView({ bookingRef, onClose }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const copyToClipboard = () => {
    if (bookingRef) {
      navigator.clipboard.writeText(bookingRef);
      // Could add a small toast here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
      
      {/* Animated Checkmark Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </motion.div>
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border border-green-500 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
      </motion.div>

      <h3 className="text-3xl font-bold text-white mb-4">
        {isAr ? "تم استلام الحجز بنجاح!" : "Booking Received!"}
      </h3>
      
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        {isAr 
          ? "سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً لتأكيد الترتيبات النهائية." 
          : "Our team will review your request and contact you shortly to confirm the final arrangements."}
      </p>

      {/* Booking Reference Box */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md mb-8">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
          {isAr ? "رقم الحجز المرجعي" : "Booking Reference"}
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-bold text-secondary tracking-widest">{bookingRef || 'MHT-XXXX'}</span>
          <button 
            onClick={copyToClipboard}
            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            title="Copy"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onClose}
          className="flex-1 bg-white/10 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
        >
          {isAr ? "العودة للرئيسية" : "Book Another Trip"}
        </button>
        <a
          href="https://wa.me/966500000000" // Replace with actual WhatsApp
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#20b958] transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          {isAr ? "تواصل واتساب" : "WhatsApp"}
        </a>
      </div>
      
    </div>
  );
}
