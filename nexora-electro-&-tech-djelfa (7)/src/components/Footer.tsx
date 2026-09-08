import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ArrowUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';

export const Footer: React.FC = () => {
  const { t, language, setFilters } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catKey: any) => {
    setFilters(prev => ({ ...prev, category: catKey }));
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A10] border-t border-slate-800/80 pt-16 pb-24 lg:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-[1.5px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 text-xl">
                    N
                  </span>
                </div>
              </div>

              <div>
                <span className="font-black text-xl tracking-wider text-white">
                  NEXORA
                </span>
                <span className="ms-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  DJELFA • 17
                </span>
                <div className="text-[11px] text-slate-400 font-medium">
                  {t.brandSub}
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              المتجر الرائد والمتخصص في بيع الأجهزة الكهرومنزلية والإلكترونية الحديثة في ولاية الجلفة. تشكيلة من كبرى العلامات العالمية بضمان رسمي وخدمات ما بعد البيع.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>شارع الأمير عبد القادر، وسط مدينة الجلفة (17000)</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.navCategories}
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.key)}
                    className="hover:text-emerald-400 transition-colors text-start"
                  >
                    {cat.name[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Brands */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              العلامات المعتمدة
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Samsung', 'LG Electronics', 'Haier', 'TCL', 'SMEG', 'Hisense', 'Beko', 'Kenwood', 'Ninja', 'Silver Crest'].map((b) => (
                <span
                  key={b}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              ساعات العمل
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>السبت - الخميس: 08:30 - 20:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>الجمعة: 14:30 - 21:00</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">+213 (0) 27 87 00 00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Demo Notice Banner Box */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.demoShowroomTag}</span>
          </div>
          <p className="text-slate-300 text-xs max-w-2xl mx-auto leading-relaxed">
            {t.demoShowroomDisclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px] text-center sm:text-start">
            © 2026 NEXORA Electro Djelfa. جميع الحقوق محفوظة لمتجر نيكسورا للإلكترونيات بالجلفة.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
