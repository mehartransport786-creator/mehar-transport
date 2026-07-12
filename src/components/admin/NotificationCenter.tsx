"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRealTime } from './RealTimeProvider';
import { Bell, Check, CheckCheck, Eye, Trash2 } from 'lucide-react';
import { toggleSound, isSoundEnabled } from '@/lib/notification-sound';

export function NotificationCenter() {
    const t = useTranslations('NotificationCenter');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const { notifications, unreadCount, markNotificationRead, clearAllNotifications } = useRealTime();
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return t("justNow");
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return isAr ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl transition-colors hover:bg-gray-100"
        style={{ color: '#6B7280' }}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center px-1 bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className={`absolute top-full mt-2 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 ${
            t("right0")
          }`}
          style={{ animation: 'fadeInScale 0.2s ease-out' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold" style={{ color: '#1B1E4F' }}>
              {t("notifications")}
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-red-50 text-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSound}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  soundOn ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                }`}
                title={soundOn ? 'Sound on' : 'Sound off'}
              >
                {soundOn ? '🔊' : '🔇'}
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-gray-400 hover:text-primary font-medium transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400 font-medium">
                  {t("noNotificationsYet")}
                </p>
              </div>
            ) : (
              notifications.slice(0, 20).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 ${
                    !notif.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <span className="text-lg mt-0.5 shrink-0">{notif.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {isAr ? notif.titleAr : notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {isAr ? notif.subtitleAr : notif.subtitle}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {timeAgo(notif.createdAt)}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
