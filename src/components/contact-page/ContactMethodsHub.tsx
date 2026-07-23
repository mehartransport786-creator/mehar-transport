"use client";

import { useTranslations } from "next-intl";
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
      link: "tel:+966565638132"
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: t("whatsapp.title"),
      details: [t("whatsapp.status"), t("whatsapp.responseTime")],
      action: t("whatsapp.button"),
      status: t("whatsapp.status"),
      link: "https://wa.me/966565638132"
    },
    {
      id: "email",
      icon: Mail,
      title: t("email.title"),
      details: [t("email.support"), t("email.bookings")],
      action: "Send Email",
      status: "24h Response",
      link: "mailto:support@mehartransport.com"
    },
    {
      id: "emergency",
      icon: AlertTriangle,
      title: t("emergency.title"),
      details: [t("emergency.desc"), t("emergency.number")],
      action: "Call Emergency",
      status: "Immediate",
      link: "tel:+966565638132"
    }
  ];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950 relative z-30 -mt-10 pt-16">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className="group bg-white dark:bg-slate-900 rounded-[var(--radius-card)] p-8 border border-border shadow-sm hover:shadow-[var(--shadow-luxury)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-[var(--radius-sm)] bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-primary group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-[var(--duration-instant)]">
                <method.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-4">
                {method.title}
              </h3>
              
              <div className="space-y-2 mb-8">
                {method.details.filter(Boolean).map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground font-medium text-sm">
                    {detail}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-border">
                <a href={method.link} className="flex items-center justify-between group/link" target={method.id === "whatsapp" ? "_blank" : undefined} rel={method.id === "whatsapp" ? "noopener noreferrer" : undefined}>
                  <span className="text-sm font-semibold text-primary group-hover/link:text-secondary transition-colors duration-[var(--duration-instant)]">
                    {method.action}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                    {method.status}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
