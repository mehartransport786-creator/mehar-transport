"use client";

import { useLocale } from "next-intl";
import { ShieldCheck, HeartPulse, Clock, Sparkles } from "lucide-react";

export function SafetyCenter() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const features = isAr ? [
    {
      icon: ShieldCheck,
      title: "مركبات مؤمنة بالكامل",
      desc: "جميع مركباتنا مؤمنة تأميناً شاملاً لضمان راحة بالك."
    },
    {
      icon: HeartPulse,
      title: "تعقيم مستمر",
      desc: "يتم تعقيم كل مركبة قبل وبعد كل رحلة لضمان أعلى معايير النظافة."
    },
    {
      icon: Clock,
      title: "دعم على مدار الساعة",
      desc: "فريق خدمة العملاء متواجد 24/7 للرد على استفساراتك وحل أي مشكلة."
    },
    {
      icon: Sparkles,
      title: "سائقون محترفون",
      desc: "نخبة من السائقين المعتمدين والمدربين على أعلى مستوى."
    }
  ] : [
    {
      icon: ShieldCheck,
      title: "Fully Insured Fleet",
      desc: "All our vehicles are comprehensively insured for your peace of mind."
    },
    {
      icon: HeartPulse,
      title: "Regular Sanitization",
      desc: "Every vehicle is thoroughly sanitized before and after each trip."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "Our customer service team is available 24/7 to assist you."
    },
    {
      icon: Sparkles,
      title: "Professional Drivers",
      desc: "Elite, certified drivers trained to the highest standards."
    }
  ];

  return (
    <div className="bg-primary rounded-2xl shadow-xl border border-white/10 p-8 text-white relative overflow-hidden mt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4 border border-secondary/30">
            <ShieldCheck className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isAr ? "مركز الأمان والثقة" : "Safety & Trust Center"}
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            {isAr 
              ? "سلامتك وراحتك هما أولويتنا القصوى في ميهار للنقل." 
              : "Your safety and comfort are our top priorities at Mehar Transport."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/5 text-center hover:border-secondary/50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
