'use client';

import { useState } from 'react';
import { CalendarDays, Plus, AlertTriangle, ArrowUp, ArrowDown, Edit3, Trash2, ShieldAlert } from 'lucide-react';
import SeasonalRuleFormModal from '@/components/admin/pricing/SeasonalRuleFormModal';

export default function SeasonalPricingClient({ initialSeasons, isAr }: { initialSeasons: any[]; isAr: boolean }) {
  const [seasons, setSeasons] = useState(initialSeasons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const now = new Date();
  const activeSeasons = seasons.filter(s => new Date(s.startDate) <= now && new Date(s.endDate) >= now && s.isActive);
  const upcomingSeasons = seasons.filter(s => new Date(s.startDate) > now && s.isActive);
  const pastSeasons = seasons.filter(s => new Date(s.endDate) < now || !s.isActive);

  const openCreate = () => { setSelectedSeason(null); setIsFormOpen(true); };
  const openEdit = (season: any) => { setSelectedSeason(season); setIsFormOpen(true); };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذه القاعدة؟' : 'Are you sure you want to delete this rule?')) return;
    try {
      const res = await fetch(`/api/admin/pricing/seasonal/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSeasons(prev => prev.filter(s => s._id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaved = (savedRule: any) => {
    setSeasons(prev => {
      const idx = prev.findIndex(s => s._id === savedRule._id);
      if (idx >= 0) {
        const up = [...prev];
        up[idx] = savedRule;
        return up.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      }
      return [...prev, savedRule].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "التسعير الموسمي والمناسبات" : "Seasonal & Peak Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "برمجة القواعد الديناميكية لمواسم الحج، العمرة، والأعياد." : "Configure automated price surges or discounts for Hajj, Ramadan, and holidays."}
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#D9A63A] text-white font-bold rounded-xl text-sm hover:bg-[#c29333] transition-all shadow-lg shadow-[#D9A63A]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة موسم جديد" : "Add Seasonal Rule"}
        </button>
      </div>

      {activeSeasons.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            {isAr ? "القواعد النشطة حالياً" : "Currently Active"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSeasons.map(s => renderSeasonCard(s))}
          </div>
        </div>
      )}

      {upcomingSeasons.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-700 mb-4">{isAr ? "المواسم القادمة" : "Upcoming Seasons"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSeasons.map(s => renderSeasonCard(s))}
          </div>
        </div>
      )}

      {pastSeasons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-400 mb-4">{isAr ? "السجل والمواسم المنتهية" : "Past & Inactive"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            {pastSeasons.map(s => renderSeasonCard(s))}
          </div>
        </div>
      )}

      <SeasonalRuleFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        rule={selectedSeason}
        isAr={isAr}
        onSaved={handleSaved}
      />
    </div>
  );

  function renderSeasonCard(season: any) {
    const isIncrease = season.adjustmentType.includes("increase");
    const isPercentage = season.adjustmentType.includes("percentage");
    
    return (
      <div key={season._id.toString()} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-gray-800 text-lg">{isAr ? season.seasonNameAr : season.seasonName}</h4>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <CalendarDays className="w-3 h-3" />
              {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
            </div>
            {season.priority > 0 && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-2 w-fit">
                <ShieldAlert className="w-3 h-3" /> {isAr ? `أولوية: ${season.priority}` : `Priority: ${season.priority}`}
              </div>
            )}
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${isIncrease ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}>
            {isIncrease ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {isAr ? "التعديل" : "Adjustment"}
            </span>
            <span className={`text-2xl font-black ${isIncrease ? "text-red-600" : "text-emerald-600"}`}>
              {isIncrease ? "+" : "-"}{season.adjustmentValue}{isPercentage ? "%" : " SAR"}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openEdit(season)} className="p-2 text-gray-400 hover:text-[#1B1E4F] hover:bg-gray-50 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(season._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {(season.description || season.descriptionAr) && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 line-clamp-2">
              {isAr ? season.descriptionAr : season.description}
            </p>
          </div>
        )}
      </div>
    );
  }
}
