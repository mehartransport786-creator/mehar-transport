"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Calendar, Users, MapPin, Car } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Valid phone number required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Valid email required"),
  country: z.string().min(2, "Country is required"),
  travelDate: z.string().min(1, "Date is required"),
  pickup: z.string().min(2, "Pickup location required"),
  destination: z.string().min(2, "Destination required"),
  vehicle: z.string().min(1, "Vehicle preference required"),
  passengers: z.string().min(1, "Passenger count required"),
  specialRequests: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AdvancedContactForm() {
  const t = useTranslations("ContactPage.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: `${data.pickup} → ${data.destination} | ${data.vehicle} | ${data.travelDate}`,
          message: [
            `Travel Date: ${data.travelDate}`,
            `Pickup: ${data.pickup}`,
            `Destination: ${data.destination}`,
            `Vehicle: ${data.vehicle}`,
            `Passengers: ${data.passengers}`,
            `Country: ${data.country}`,
            data.whatsapp ? `WhatsApp: ${data.whatsapp}` : '',
            data.specialRequests ? `Special Requests: ${data.specialRequests}` : '',
            data.message ? `Message: ${data.message}` : '',
          ].filter(Boolean).join('\n'),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-background border border-input rounded-[var(--radius-sm)] px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring transition-colors outline-none placeholder:text-muted-foreground";
  const labelClass = "block text-sm font-medium text-primary mb-2";
  const errorClass = "text-destructive text-xs mt-1 absolute -bottom-5 left-0";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t("title")}</h2>
        <p className="text-muted-foreground">Fill out the form below and our specialists will respond within 15 minutes.</p>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-card text-card-foreground p-8 lg:p-12 rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-card)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
          
          {/* Personal Details */}
          <div className="relative">
            <label className={labelClass}>{t("name")} *</label>
            <input {...register("name")} className={inputClass} placeholder="Mohammad" />
            {errors.name && <span className={errorClass}>{errors.name.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("email")} *</label>
            <input {...register("email")} type="email" className={inputClass} placeholder="john@example.com" />
            {errors.email && <span className={errorClass}>{errors.email.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("phone")} *</label>
            <input {...register("phone")} className={inputClass} placeholder="+1 234 567 890" />
            {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("whatsapp")}</label>
            <input {...register("whatsapp")} className={inputClass} placeholder="+1 234 567 890" />
          </div>

          <div className="relative">
            <label className={labelClass}>{t("country")} *</label>
            <input {...register("country")} className={inputClass} placeholder="United Kingdom" />
            {errors.country && <span className={errorClass}>{errors.country.message}</span>}
          </div>

          {/* Trip Details */}
          <div className="relative">
            <label className={labelClass}>{t("travelDate")} *</label>
            <div className="relative">
              <input {...register("travelDate")} type="date" className={inputClass} />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.travelDate && <span className={errorClass}>{errors.travelDate.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("pickup")} *</label>
            <div className="relative">
              <input {...register("pickup")} className={inputClass} placeholder="Jeddah Airport (JED)" />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.pickup && <span className={errorClass}>{errors.pickup.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("destination")} *</label>
            <div className="relative">
              <input {...register("destination")} className={inputClass} placeholder="Makkah Hotel" />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.destination && <span className={errorClass}>{errors.destination.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("vehicle")} *</label>
            <div className="relative">
              <select {...register("vehicle")} className={`${inputClass} appearance-none`}>
                <option value="">Select a vehicle...</option>
                <option value="sedan">Executive Sedan (Toyota Camry)</option>
                <option value="suv">Premium SUV (GMC Denali)</option>
                <option value="van">Executive Van (Hyundai Staria, Hyundai H1)</option>
                <option value="large-van">Large Van (Toyota Hiace)</option>
                <option value="minibus">Minibus (Coaster Bus)</option>
              </select>
              <Car className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.vehicle && <span className={errorClass}>{errors.vehicle.message}</span>}
          </div>

          <div className="relative">
            <label className={labelClass}>{t("passengers")} *</label>
            <div className="relative">
              <select {...register("passengers")} className={`${inputClass} appearance-none`}>
                <option value="">Number of passengers...</option>
                {[1, 2, 3, 4, 5, 6, 7, "8+"].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {errors.passengers && <span className={errorClass}>{errors.passengers.message}</span>}
          </div>
        </div>

        <div className="space-y-8 mb-8">
          <div className="relative">
            <label className={labelClass}>{t("special")}</label>
            <input {...register("specialRequests")} className={inputClass} placeholder="Wheelchair access, child seats, etc." />
          </div>

          <div className="relative">
            <label className={labelClass}>{t("message")}</label>
            <textarea {...register("message")} rows={4} className={`${inputClass} resize-none`} placeholder="Any other details we should know?" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg py-4 rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[var(--shadow-btn)] hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <span className="w-6 h-6 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
          ) : isSuccess ? (
            "Request Sent Successfully!"
          ) : (
            <>
              {t("submit")}
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
