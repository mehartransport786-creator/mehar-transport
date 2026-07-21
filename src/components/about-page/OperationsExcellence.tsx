"use client";

import { motion } from "@/lib/motion";
import { Plane, Navigation2, Map, CalendarCheck, Headset, CheckCircle, Activity } from "lucide-react";

export function OperationsExcellence({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const operations = [
    {
      icon: Plane,
      title: "Flight Monitoring",
      titleAr: "مراقبة الرحلات الجوية",
      desc: "Real-time tracking of flight statuses to ensure your driver is always there when you land, even if delayed."
    },
    {
      icon: Navigation2,
      title: "Driver Dispatching",
      titleAr: "توجيه السائقين",
      desc: "Advanced algorithmic dispatching ensures the nearest suitable vehicle is assigned promptly."
    },
    {
      icon: Map,
      title: "Vehicle Tracking",
      titleAr: "تتبع المركبات",
      desc: "Live GPS tracking of our entire fleet for safety, security, and exact ETA calculations."
    },
    {
      icon: CalendarCheck,
      title: "Booking Management",
      titleAr: "إدارة الحجوزات",
      desc: "Seamless digital management of all reservations with instant confirmations and modifications."
    },
    {
      icon: Headset,
      title: "Customer Support",
      titleAr: "دعم العملاء",
      desc: "Dedicated 24/7 multilingual support team ready to assist with any journey requirements."
    },
    {
      icon: Activity,
      title: "Real-Time Operations",
      titleAr: "عمليات حية",
      desc: "24/7 centralized control room monitoring every active journey for quality assurance."
    }
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm">
            {isAr ? 'العمليات والتكنولوجيا' : 'Operations Excellence'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            {isAr ? 'الدقة خلف الكواليس' : 'Precision Behind The Scenes'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations.map((op, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-8 rounded-[var(--radius-card)] shadow-sm hover:shadow-[var(--shadow-luxury)] transition-shadow border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary mb-6">
                <op.icon className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-bold text-primary mb-3 ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? op.titleAr : op.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {op.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
