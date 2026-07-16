'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Save, X, TrendingUp, AlertCircle, ArrowUp, ArrowDown, Calculator, Download, Route, Car } from 'lucide-react';

interface PricingMatrixProps {
  routes: any[];
  vehicles: any[];
  pricings: any[];
  isAr: boolean;
}

export default function PricingMatrixClient({ routes, vehicles, pricings: initialPricings, isAr }: PricingMatrixProps) {
  const [pricings, setPricings] = useState(initialPricings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  
  // Matrix State
  const [editingCell, setEditingCell] = useState<{ rId: string; vId: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [savingCell, setSavingCell] = useState<{ rId: string; vId: string } | null>(null);
  
  // Bulk Modal
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'increase' | 'decrease'>('increase');
  const [bulkType, setBulkType] = useState<'percentage' | 'fixed'>('percentage');
  const [bulkValue, setBulkValue] = useState(10);
  const [bulkSaving, setBulkSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCell]);

  // Map for fast O(1) lookups
  const pricingMap = new Map();
  pricings.forEach(p => {
    pricingMap.set(`${p.routeId}-${p.vehicleId}`, p);
  });

  const filteredRoutes = routes.filter(r => {
    const matchSearch = !searchTerm || [r.name, r.nameAr, r.origin, r.destination, r.city]
      .join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = !filterType || r.routeType === filterType;
    return matchSearch && matchType;
  });

  const handleCellClick = (rId: string, vId: string, currentVal: number | string) => {
    setEditingCell({ rId, vId });
    setEditValue(currentVal === '—' ? '' : currentVal.toString());
  };

  const handleCellSave = async (rId: string, vId: string) => {
    const val = parseInt(editValue);
    if (isNaN(val) || val < 0) {
      setEditingCell(null);
      return;
    }

    const existing = pricingMap.get(`${rId}-${vId}`);
    if (existing && existing.currentPrice === val) {
      setEditingCell(null);
      return;
    }

    setEditingCell(null);
    setSavingCell({ rId, vId });

    try {
      const res = await fetch('/api/admin/pricing/routes/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: rId,
          vehicleId: vId,
          basePrice: existing?.basePrice || val,
          currentPrice: val
        })
      });
      const data = await res.json();
      if (data.success) {
        setPricings(prev => {
          const idx = prev.findIndex(p => p.routeId === rId && p.vehicleId === vId);
          if (idx >= 0) {
            const up = [...prev];
            up[idx] = data.data;
            return up;
          }
          return [...prev, data.data];
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, rId: string, vId: string) => {
    if (e.key === 'Enter') handleCellSave(rId, vId);
    if (e.key === 'Escape') setEditingCell(null);
  };

  const handleBulkSubmit = async () => {
    setBulkSaving(true);
    try {
      const res = await fetch('/api/admin/pricing/bulk/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: bulkAction,
          type: bulkType,
          value: bulkValue,
          filters: {
            routeIds: filterType ? filteredRoutes.map(r => r._id) : undefined
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        // Just reload the page to refresh matrix cleanly for now
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      setBulkSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Route', ...vehicles.map(v => v.name)];
    const rows = filteredRoutes.map(r => {
      return [
        `"${r.name} (${r.origin} -> ${r.destination})"`,
        ...vehicles.map(v => {
          const p = pricingMap.get(`${r._id}-${v._id}`);
          return p ? p.currentPrice : '';
        })
      ].join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pricing-matrix-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-[500px] h-full flex-1">
      {/* Header & Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-primary">{isAr ? 'مصفوفة التسعير' : 'Pricing Matrix'}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isAr ? 'تعديل أسعار المسارات لكل مركبة بنظام الشبكة (اضغط للتعديل المباشر)' : 'Inline-edit matrix for routes and vehicles.'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setIsBulkModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm font-bold transition-colors">
            <Calculator className="w-4 h-4" /> {isAr ? 'تعديل جماعي' : 'Bulk Adjust'}
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors">
            <Download className="w-4 h-4" /> {isAr ? 'تصدير' : 'Export'}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 shrink-0 w-full">
        <div className="w-full sm:flex-1 flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-lg shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" placeholder={isAr ? 'ابحث عن مسار...' : 'Search routes...'} 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none text-sm w-full"
          />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full sm:w-auto bg-white px-3 py-2 border border-gray-200 rounded-lg shadow-sm text-sm outline-none">
          <option value="">{isAr ? 'كل الأنواع' : 'All Route Types'}</option>
          <option value="airport_transfer">Airport Transfer</option>
          <option value="intercity">Intercity</option>
          <option value="ziyarat">Ziyarat</option>
        </select>
      </div>

      {/* Spreadsheet Grid */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col relative">
        <div className="overflow-auto flex-1 custom-scrollbar relative">
          <table className="w-full text-sm border-collapse min-w-max">
            <thead className="sticky top-0 z-20 bg-gray-50 shadow-sm shadow-gray-200/50">
              <tr>
                <th className="sticky left-0 z-30 bg-gray-50 p-4 border-b border-r border-gray-200 text-left rtl:text-right min-w-[280px]">
                  <div className="font-bold text-gray-700">{isAr ? 'المسار' : 'Route'}</div>
                  <div className="text-xs text-gray-400 font-normal">{filteredRoutes.length} {isAr ? 'مسارات' : 'Routes'}</div>
                </th>
                {vehicles.map(v => (
                  <th key={v._id} className="p-3 border-b border-r border-gray-200 text-center min-w-[120px]">
                    <div className="flex flex-col items-center">
                      {v.image ? <img src={v.image} alt={v.name} className="h-8 object-contain mb-1" /> : <Car className="w-6 h-6 text-gray-400 mb-1" />}
                      <span className="font-bold text-gray-700 text-xs truncate w-full">{isAr ? v.nameAr : v.name}</span>
                      <span className="text-[10px] text-gray-400">{v.type}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map(route => (
                <tr key={route._id} className="hover:bg-gray-50/50 group">
                  <td className="sticky left-0 z-10 bg-white group-hover:bg-gray-50/50 p-4 border-b border-r border-gray-200 transition-colors">
                    <div className="font-bold text-gray-800">{isAr ? route.nameAr : route.name}</div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      {isAr ? route.originAr : route.origin} → {isAr ? route.destinationAr : route.destination}
                    </div>
                  </td>
                  
                  {vehicles.map(v => {
                    const pricing = pricingMap.get(`${route._id}-${v._id}`);
                    const val = pricing ? pricing.currentPrice : '—';
                    const isEditing = editingCell?.rId === route._id && editingCell?.vId === v._id;
                    const isSaving = savingCell?.rId === route._id && savingCell?.vId === v._id;
                    
                    const delta = pricing ? (pricing.currentPrice - pricing.basePrice) : 0;

                    return (
                      <td key={v._id} className="border-b border-r border-gray-200 relative bg-white">
                        {isEditing ? (
                          <div className="absolute inset-0 border-2 border-secondary bg-white z-20 flex items-center px-2">
                            <input
                              ref={inputRef}
                              type="number"
                              className="w-full text-center outline-none font-bold text-primary"
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => handleKeyDown(e, route._id, v._id)}
                              onBlur={() => handleCellSave(route._id, v._id)}
                            />
                          </div>
                        ) : (
                          <div 
                            className={`p-4 text-center cursor-cell hover:bg-amber-50/50 transition-colors h-full flex flex-col items-center justify-center ${isSaving ? 'opacity-50' : ''}`}
                            onClick={() => handleCellClick(route._id, v._id, val)}
                          >
                            <span className={`font-bold text-lg ${val === '—' ? 'text-gray-300' : 'text-primary'}`}>
                              {val}
                            </span>
                            {delta !== 0 && (
                              <span className={`text-[10px] font-bold flex items-center gap-0.5 mt-0.5 ${delta > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {delta > 0 ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                                {Math.abs(delta)}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={vehicles.length + 1} className="p-12 text-center text-gray-400">
                    <Route className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    No routes found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Adjust Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-primary">{isAr ? 'تعديل أسعار جماعي' : 'Bulk Price Adjustment'}</h3>
              <button onClick={() => setIsBulkModalOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>

            <div className="space-y-4">
              {filterType && (
                <div className="bg-indigo-50 text-indigo-700 text-xs px-3 py-2 rounded-lg font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {isAr ? `سيطابق هذا التعديل على ${filteredRoutes.length} مسار من نوع ${filterType} فقط` : `This will apply to ${filteredRoutes.length} filtered ${filterType} routes only.`}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setBulkAction('increase')}
                  className={`py-2 rounded-xl text-sm font-bold border-2 ${bulkAction === 'increase' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 text-gray-500'}`}
                >
                  {isAr ? 'زيادة الأسعار' : 'Increase Prices'}
                </button>
                <button 
                  onClick={() => setBulkAction('decrease')}
                  className={`py-2 rounded-xl text-sm font-bold border-2 ${bulkAction === 'decrease' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-100 text-gray-500'}`}
                >
                  {isAr ? 'تخفيض الأسعار' : 'Decrease Prices'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setBulkType('percentage')}
                  className={`py-2 rounded-xl text-sm font-bold border-2 ${bulkType === 'percentage' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                >
                  {isAr ? 'نسبة مئوية (%)' : 'Percentage (%)'}
                </button>
                <button 
                  onClick={() => setBulkType('fixed')}
                  className={`py-2 rounded-xl text-sm font-bold border-2 ${bulkType === 'fixed' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                >
                  {isAr ? 'مبلغ ثابت (SAR)' : 'Fixed Amount (SAR)'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'القيمة' : 'Value'}</label>
                <div className="relative">
                  <input 
                    type="number" min="1" 
                    value={bulkValue} onChange={e => setBulkValue(Number(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    {bulkType === 'percentage' ? '%' : 'SAR'}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBulkSubmit}
                disabled={bulkSaving}
                className="w-full py-3 mt-4 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/80 shadow-lg disabled:opacity-50"
              >
                {bulkSaving ? (isAr ? 'جاري التطبيق...' : 'Applying...') : (isAr ? 'تطبيق التعديلات' : 'Apply Bulk Update')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
