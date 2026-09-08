import React from 'react';
import { X, Scale, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompareModal: React.FC = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    addToCart, 
    t, 
    language 
  } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCompareOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-5xl rounded-3xl bg-[#0F1626] border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-none">{t.compareTitle}</h3>
                <span className="text-xs text-slate-400">{t.compareDesc}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {compareList.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearCompare}</span>
                </button>
              )}

              <button
                id="close-compare-modal-btn"
                onClick={() => setIsCompareOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Compare Content */}
          {compareList.length > 0 ? (
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-start text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-start text-slate-400 font-semibold w-1/4">الجهاز</th>
                    {compareList.map((product) => (
                      <th key={product.id} className="p-3 text-start w-1/4 min-w-[200px]">
                        <div className="relative p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-2 end-2 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                            title="إزالة من المقارنة"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <img
                            src={product.images[0]}
                            alt={product.name[language]}
                            className="w-full h-32 object-cover rounded-xl bg-slate-950"
                            referrerPolicy="no-referrer"
                          />

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase">
                              {product.brand}
                            </span>
                            <h4 className="font-bold text-white text-xs line-clamp-2">
                              {product.name[language]}
                            </h4>
                          </div>

                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-sm font-black text-emerald-400">
                              {new Intl.NumberFormat('fr-FR').format(product.price)} {t.currency}
                            </span>

                            <button
                              onClick={() => addToCart(product, 1)}
                              className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
                              title={t.addToCart}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {/* Brand & Model */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">العلامة والموديل</td>
                    {compareList.map(p => (
                      <td key={p.id} className="p-3 font-medium text-slate-200">
                        {p.brand} ({p.modelCode})
                      </td>
                    ))}
                  </tr>

                  {/* Energy Class */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">{t.energyLabel}</td>
                    {compareList.map(p => (
                      <td key={p.id} className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                          {p.energyClass || 'قياسي'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">الضمان المعتمد</td>
                    {compareList.map(p => (
                      <td key={p.id} className="p-3 text-slate-300 font-medium">
                        {p.warranty[language]}
                      </td>
                    ))}
                  </tr>

                  {/* Short Specs */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">أبرز المواصفات</td>
                    {compareList.map(p => (
                      <td key={p.id} className="p-3 space-y-1">
                        {p.shortSpecs.map((s, i) => (
                          <div key={i} className="text-[11px] text-slate-300">
                            • {s[language]}
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty Compare State */
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
                <Scale className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">{t.compareEmpty}</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">{t.compareEmptyDesc}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
