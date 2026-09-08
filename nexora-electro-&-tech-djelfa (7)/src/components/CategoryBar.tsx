import React from 'react';
import { 
  Tv, 
  Wind, 
  Refrigerator, 
  Shirt, 
  Flame, 
  Utensils, 
  Coffee, 
  Fan, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { CategoryKey } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Tv: <Tv className="w-4 h-4 md:w-5 md:h-5" />,
  Wind: <Wind className="w-4 h-4 md:w-5 md:h-5" />,
  Refrigerator: <Refrigerator className="w-4 h-4 md:w-5 md:h-5" />,
  Shirt: <Shirt className="w-4 h-4 md:w-5 md:h-5" />,
  Flame: <Flame className="w-4 h-4 md:w-5 md:h-5" />,
  Utensils: <Utensils className="w-4 h-4 md:w-5 md:h-5" />,
  Coffee: <Coffee className="w-4 h-4 md:w-5 md:h-5" />,
  Fan: <Fan className="w-4 h-4 md:w-5 md:h-5" />
};

export const CategoryBar: React.FC = () => {
  const { t, language, filters, setFilters } = useApp();

  const handleSelectCategory = (catKey: CategoryKey) => {
    setFilters(prev => ({ ...prev, category: catKey }));
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-10 border-t border-slate-800/80 bg-[#0E131F]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.navCategories}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.categoriesTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.categoriesSubtitle}
            </p>
          </div>

          <button
            onClick={() => handleSelectCategory('all')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-auto"
          >
            {t.viewAllCategories}
          </button>
        </div>

        {/* Categories Grid / Horizontal Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
          
          {/* 'All' Category */}
          <button
            id="cat-all"
            onClick={() => handleSelectCategory('all')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
              filters.category === 'all'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className={`p-2.5 rounded-xl mb-2 transition-colors ${
              filters.category === 'all' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800/80 text-slate-400'
            }`}>
              <Layers className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-xs font-bold leading-snug line-clamp-1">{t.allProducts}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">24 {t.productsCount}</span>
          </button>

          {/* Individual Categories */}
          {categories.map((cat) => {
            const isSelected = filters.category === cat.key;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.key}`}
                onClick={() => handleSelectCategory(cat.key)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl mb-2 transition-colors ${
                  isSelected 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-slate-800/80 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-800'
                }`}>
                  {iconMap[cat.icon] || <Layers className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {cat.name[language]}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {cat.count} {t.productsCount}
                </span>
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
};
