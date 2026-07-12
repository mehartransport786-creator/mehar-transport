'use client';

import { useState } from "react";
import { Calculator, Map, Car, CalendarDays, ArrowRight, Clock, Loader2 } from "lucide-react";

export default function SimulatorClient({ 
  routes, 
  vehicles, 
  isAr 
}: { 
  routes: any[]; 
  vehicles: any[]; 
  isAr: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    type: 'transfer',
    routeId: '',
    vehicleId: '',
    date: new Date().toISOString().split('T')[0],
    hours: 4
  });

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!formData.vehicleId || !formData.date) {
        throw new Error(isAr ? 'الرجاء تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields');
      }
      if (formData.type === 'transfer' && !formData.routeId) {
        throw new Error(isAr ? 'الرجاء اختيار المسار' : 'Please select a route');
      }

      const response = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || (isAr ? 'حدث خطأ أثناء حساب التسعيرة' : 'Error calculating price'));
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Calculator className="w-6 h-6 text-secondary" />
          {isAr ? "محاكي التسعير" : "Pricing Simulator"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "اختبر حسابات الأسعار المباشرة والمواسم الضريبية للعملاء قبل تطبيقها." : "Test live price calculations, seasonal rules, and taxes exactly as customers see them."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSimulate} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-4">{isAr ? "معايير المحاكاة" : "Simulation Parameters"}</h3>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-4 p-1 bg-gray-50 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'transfer' })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${formData.type === 'transfer' ? 'bg-white text-primary shadow' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {isAr ? 'مسار (نقل)' : 'Transfer Route'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'hourly' })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${formData.type === 'hourly' ? 'bg-white text-primary shadow' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {isAr ? 'بالساعة' : 'Hourly Chauffeur'}
                </button>
              </div>

              {formData.type === 'transfer' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Map className="w-4 h-4 text-gray-400" /> {isAr ? "المسار" : "Route"}
                  </label>
                  <select 
                    value={formData.routeId}
                    onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary"
                  >
                    <option value="">{isAr ? "اختر المسار..." : "Select Route..."}</option>
                    {routes.map(r => (
                      <option key={r._id} value={r._id}>{isAr ? r.nameAr : r.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.type === 'hourly' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" /> {isAr ? "عدد الساعات" : "Hours"}
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary" 
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {isAr ? 'ملاحظة: سيتم تطبيق الحد الأدنى للساعات تلقائياً إن وجد' : 'Note: Minimum vehicle hours will be automatically applied if applicable'}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-400" /> {isAr ? "المركبة" : "Vehicle"}
                </label>
                <select 
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary"
                >
                  <option value="">{isAr ? "اختر المركبة..." : "Select Vehicle..."}</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{isAr ? v.nameAr : v.name} ({v.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-400" /> {isAr ? "تاريخ الرحلة" : "Travel Date"}
                </label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
              {isAr ? "تشغيل المحاكي" : "Run Simulation"}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          {result ? (
            <div className="bg-primary text-white rounded-2xl p-8 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute top-0 right-0 p-32 bg-secondary blur-[120px] opacity-20 rounded-full"></div>
              
              <h3 className="font-bold text-xl text-white mb-6 border-b border-white/10 pb-4 relative z-10">
                {isAr ? "تفصيل السعر النهائي" : "Live Fare Breakdown"}
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "السعر الأساسي" : "Base Fare"}</span>
                  <span className="font-semibold">{result.basePrice.toFixed(2)} SAR</span>
                </div>
                
                {result.adjustments.map((adj: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className={`flex items-center gap-2 ${adj.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      <ArrowRight className="w-3 h-3" /> {adj.name} {adj.isPercentage && (adj.amount > 0 ? '(+)' : '(-)')}
                    </span>
                    <span className={`font-semibold ${adj.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {adj.amount > 0 ? '+' : ''}{adj.amount.toFixed(2)} SAR
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-semibold">{result.finalPriceBeforeTax.toFixed(2)} SAR</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}</span>
                  <span className="font-semibold">{result.taxAmount.toFixed(2)} SAR</span>
                </div>
                
                <div className="border-t border-secondary/50 pt-4 mt-2 flex justify-between items-end">
                  <span className="text-lg font-bold text-secondary">{isAr ? "الإجمالي المستحق" : "Total Payable"}</span>
                  <span className="text-3xl font-black text-secondary">{result.totalIncludingTax.toFixed(2)} <span className="text-lg">SAR</span></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-10 text-center bg-gray-50/50">
              <Calculator className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">{isAr ? "في انتظار المعطيات" : "Awaiting Input"}</h3>
              <p className="text-sm text-gray-400">
                {isAr ? "أدخل المعايير واضغط تشغيل المحاكي لرؤية التفصيل." : "Enter parameters and run simulation to view live fare breakdown."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
