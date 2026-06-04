"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// Require actual token to prevent mapbox crash
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function InteractiveMap() {
  const t = useTranslations("ContactPage.map");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // default to dark for premium look

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const mapStyle = isDark 
    ? "mapbox://styles/mapbox/dark-v11" 
    : "mapbox://styles/mapbox/light-v11";

  if (!mounted) return <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-900 animate-pulse" />;

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[500px] lg:h-[600px] bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center">
        <MapPin className="w-12 h-12 text-slate-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Map Not Configured</h3>
        <p className="text-slate-500 max-w-md">Please add your NEXT_PUBLIC_MAPBOX_TOKEN to .env.local to view the interactive map.</p>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[500px] lg:h-[600px] bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 39.9450464, // Mehar Umrah Transport
          latitude: 22.8273029,
          zoom: 12
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        
        <Marker longitude={39.9450464} latitude={22.8273029} anchor="bottom">
          <motion.div 
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {t("office")}
            </div>
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30 border-4 border-white dark:border-slate-900 relative">
              <MapPin className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-50" />
            </div>
          </motion.div>
        </Marker>
      </Map>

      {/* Floating Panel for Nearby Landmarks */}
      <div className="absolute top-8 left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 hidden md:block w-72">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t("title")}</h3>
        <ul className="space-y-3">
          {["Jeddah Airport", "Makkah", "Madinah"].map((landmark, idx) => (
            <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium cursor-pointer hover:text-amber-500 transition-colors">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              {landmark}
            </li>
          ))}
        </ul>
        <a 
          href="https://www.google.com/maps/place/Mehar+Umrah+Transport/@22.8273029,39.9450463" 
          target="_blank"
          className="w-full mt-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors block text-center"
        >
          {t("directions")}
        </a>
      </div>
    </section>
  );
}
