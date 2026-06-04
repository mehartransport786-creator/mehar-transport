"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, AlertTriangle } from "lucide-react";

export function ContactMethodsHub() {
  const t = useTranslations("ContactPage.methods");

  const methods = [
    {
      id: "phone",
      icon: Phone,
      title: t("phone.title"),
      details: [t("phone.primary"), t("phone.secondary")],
      action: t("phone.callButton"),
      status: t("phone.availability"),
      color: "bg-blue-500",
      hover: "hover:border-blue-500/50",
      link: "tel:+966565638120"
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: t("whatsapp.title"),
      details: [t("whatsapp.status"), t("whatsapp.responseTime")],
      action: t("whatsapp.button"),
      status: t("whatsapp.status"),
      color: "bg-emerald-500",
      hover: "hover:border-emerald-500/50",
      link: "https://wa.me/966565638120"
    },
    {
      id: "email",
      icon: Mail,
      title: t("email.title"),
      details: [t("email.support"), t("email.bookings")],
      action: "Send Email",
      status: "24h Response",
      color: "bg-purple-500",
      hover: "hover:border-purple-500/50",
      link: "mailto:support@mehartransport.com"
    },
    {
      id: "emergency",
      icon: AlertTriangle,
      title: t("emergency.title"),
      details: [t("emergency.desc"), t("emergency.number")],
      action: "Call Emergency",
      status: "Immediate",
      color: "bg-red-500",
      hover: "hover:border-red-500/50",
      link: "tel:+966567809832"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative -mt-10 z-30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => (
            <motion.a
              href={method.link}
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all duration-300 hover:-translate-y-2 ${method.hover}`}
            >
              <div className={`w-14 h-14 rounded-xl ${method.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                <method.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {method.title}
              </h3>
              
              <div className="space-y-2 mb-8">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-400 font-medium">
                    {detail}
                  </p>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {method.action}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {method.status}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
