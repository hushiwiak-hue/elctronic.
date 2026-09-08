import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { CategoryKey } from '../types';

export const FilterDrawer: React.FC = () => {
  const { 
    isFilterDrawerOpen, 
    setIsFilterDrawerOpen, 
    filters, 
    setFilters, 
    resetFilters, 
    t, 
    language 
  } = useApp();

  if (!isFilterDrawerOpen) return null;

  const brands = ['all', 'Samsung', 'LG', 'Haier', 'TCL', 'SMEG', 'Hisense', 'Beko', 'Carrier', 'Silver Crest', 'Kenwood', 'Ninja', 'DeLonghi', 'Philips'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsFilterDrawerOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 end-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0F1626] border-s border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">{t.filterTitle}</h3>
              </div>

              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Select */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t.categoriesTitle}
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-start border transition-colors ${
                    filters.category === 'all'
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {t.allProducts}
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters(prev => ({ ...prev, category: cat.key }))}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-start border transition-colors truncate ${
                      filters.category === cat.key
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {cat.name[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t.filterBrand}
              </label>

              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setFilters(prev => ({ ...prev, brand: b }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      filters.brand === b
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {b === 'all' ? t.allFilter : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.filterPrice}
                </label>
                <span className="text-xs text-emerald-400 font-black">
                  حتى {new Intl.NumberFormat('fr-FR').format(filters.maxPrice)} {t.currency}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="400000"
                step="5000"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-emerald-400 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5,000 {t.currency}</span>
                <span>400,000 {t.currency}</span>
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                <span className="text-xs font-bold text-slate-200">{t.filterStock}</span>
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                />
              </label>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t.applyFilters}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
