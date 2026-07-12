'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Mail, MailOpen, Reply, Archive, Clock, Search, Filter, Inbox } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export default function MessagesPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/admin/messages?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'read': return <MailOpen className="w-4 h-4 text-gray-400" />;
      case 'replied': return <Reply className="w-4 h-4 text-green-500" />;
      case 'archived': return <Archive className="w-4 h-4 text-gray-300" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const statusTabs = [
    { key: 'all', label: 'All', labelAr: 'الكل' },
    { key: 'unread', label: 'Unread', labelAr: 'غير مقروء' },
    { key: 'read', label: 'Read', labelAr: 'مقروء' },
    { key: 'replied', label: 'Replied', labelAr: 'تم الرد' },
    { key: 'archived', label: 'Archived', labelAr: 'مؤرشف' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#1B1E4F' }}>
            {isAr ? 'الرسائل' : 'Messages'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? `${unreadCount} رسالة غير مقروءة` : `${unreadCount} unread messages`}
          </p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              statusFilter === tab.key
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {isAr ? tab.labelAr : tab.label}
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">{isAr ? 'لا توجد رسائل' : 'No messages found'}</p>
              </div>
            ) : (
              messages.map(msg => (
                <button
                  key={msg._id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') updateStatus(msg._id, 'read');
                  }}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedMessage?._id === msg._id ? 'bg-blue-50/50 border-l-4 border-l-primary' : ''
                  } ${msg.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {statusIcon(msg.status)}
                      <span className={`text-sm font-semibold ${msg.status === 'unread' ? 'text-primary' : 'text-gray-700'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {msg.subject && (
                    <p className="text-sm font-medium text-gray-800 truncate mb-0.5">{msg.subject}</p>
                  )}
                  <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-1">
                    {selectedMessage.subject || isAr ? 'بدون عنوان' : 'No Subject'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isAr ? 'من' : 'From'}: <span className="font-semibold text-gray-800">{selectedMessage.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedMessage._id, 'replied')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" /> {isAr ? 'تم الرد' : 'Mark Replied'}
                  </button>
                  <button
                    onClick={() => updateStatus(selectedMessage._id, 'archived')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Archive className="w-3.5 h-3.5" /> {isAr ? 'أرشفة' : 'Archive'}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-center gap-4 text-gray-500">
                  <span>📧 {selectedMessage.email}</span>
                  {selectedMessage.phone && <span>📱 {selectedMessage.phone}</span>}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your inquiry'}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/80 transition-colors"
                >
                  <Reply className="w-4 h-4" /> {isAr ? 'رد بالبريد' : 'Reply via Email'}
                </a>
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
                  >
                    💬 {isAr ? 'واتساب' : 'WhatsApp'}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <Mail className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">{isAr ? 'اختر رسالة لعرضها' : 'Select a message to view'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
