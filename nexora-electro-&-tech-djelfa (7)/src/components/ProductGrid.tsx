import React from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  X, 
  RotateCcw, 
  Search 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { categories } from '../data/categories';

export const ProductGrid: React.FC = () => {
  const { 
    t, 
    language, 
    filteredProducts, 
    filters, 
    setFilters, 
    resetFilters, 
    setIsFilterDrawerOpen 
  } = useApp();

  const brands = ['all', 'Samsung', 'LG', 'Haier', 'TCL', 'SMEG', 'Hisense', 'Silver Crest', 'Kenwood', 'Ninja'];

  const currentCategoryObj = categories.find(c => c.key === filters.category);

  return (
    <section id="catalog-section" className="py-12 md:py-16 bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.navCatalog}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {currentCategoryObj ? currentCategoryObj.name[language] : t.featuredTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.featuredSubtitle}
            </p>
          </div>

          {/* Filter Trigger & Sort Options */}
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            
            {/* Filter Drawer Trigger Button */}
            <button
              id="open-filter-drawer-btn"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/40 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span>{t.filterTitle}</span>
              {(filters.brand !== 'all' || filters.category !== 'all' || filters.inStockOnly || filters.maxPrice < 400000) && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                id="sort-products-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="appearance-none px-3.5 py-2 pe-8 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">{t.sortPopular}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="rating">{t.sortRating}</option>
                <option value="newest">{t.sortNewest}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Brand Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setFilters(prev => ({ ...prev, brand }))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                filters.brand === brand
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {brand === 'all' ? t.allFilter : brand}
            </button>
          ))}
        </div>

        {/* Active Filter Tags */}
        {(filters.category !== 'all' || filters.brand !== 'all' || filters.inStockOnly || filters.searchQuery) && (
          <div className="flex items-center gap-2 flex-wrap mb-6 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">الفلاتر النشطة:</span>
            
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                <span>{currentCategoryObj?.name[language]}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.brand !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                <span>{filters.brand}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, brand: 'all' }))} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                <span>{t.filterStock}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, inStockOnly: false }))} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                <span>"{filters.searchQuery}"</span>
                <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="ms-auto inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        )}

        {/* Products Count Indicator */}
        <div className="text-xs text-slate-400 font-medium mb-4">
          {t.showingProducts.replace('{count}', String(filteredProducts.length))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="py-16 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{t.searchNoResults}</h3>
              <p className="text-xs text-slate-400">
                جرب تغيير خيارات التصفية أو البحث عن أجهزة أخرى مثل ثلاجة، مكيف، أو تلفاز.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
