import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ArrowLeft, Tag, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export const SearchOverlay: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    t, 
    language, 
    setSelectedProduct,
    setFilters 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase().trim();
        return (
          p.name.ar.toLowerCase().includes(q) ||
          p.name.fr.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.modelCode.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  const handleSelectProduct = (prod: any) => {
    setIsSearchOpen(false);
    setSelectedProduct(prod);
  };

  const handleSearchEntireCatalog = () => {
    setIsSearchOpen(false);
    setFilters(prev => ({ ...prev, searchQuery: query }));
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center pt-16 sm:pt-24 p-4">
        <div className="relative w-full max-w-2xl rounded-3xl bg-[#0F1626] border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-400 shrink-0" />
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchEntireCatalog()}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-white text-base sm:text-lg placeholder-slate-500 focus:outline-none"
            />

            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions or Results */}
          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
            {query.trim() ? (
              filtered.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.searchResults} ({filtered.length})
                  </div>

                  {filtered.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/30 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name[language]}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-950 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase">
                            {product.brand} • {product.modelCode}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                            {product.name[language]}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-black text-emerald-400 shrink-0">
                        {new Intl.NumberFormat('fr-FR').format(product.price)} {t.currency}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleSearchEntireCatalog}
                    className="w-full py-2 text-center text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    عرض جميع النتائج في الكتالوج ←
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  {t.searchNoResults}
                </div>
              )
            ) : (
              /* Popular quick searches */
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  الأكثر بحثاً في الجلفة:
                </div>
                <div className="flex flex-wrap gap-2">
                  {['ثلاجة هاير', 'مكيف LG انفرتر', 'غسالة توين واش', 'تلفزيون 4K', 'خلاط سيلفر كريس', 'كوزينيار بيكو', 'صانعة قهوة ديلونجي'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 text-xs font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
