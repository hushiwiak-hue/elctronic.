import React from 'react';
import { 
  Building2, 
  MapPin, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeAssets } from '../data/assets';

export const AboutSection: React.FC = () => {
  const { t, language } = useApp();
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about-section" className="py-14 md:py-20 bg-[#0B0F17] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Showroom Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 group">
              <img
                src={storeAssets.showroomPhoto}
                alt="Showroom NEXORA Djelfa"
                className="w-full h-[320px] sm:h-[400px] md:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">معرض نيكسورا كهرومنزلية — الجلفة</div>
                  <div className="text-[11px] text-slate-400">شارع الأمير عبد القادر، وسط المدينة، الجلفة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>عن نيكسورا كهرومنزلية</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {t.aboutTitle}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.aboutDesc}
              </p>
            </div>

            {/* Value Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold">أصالة وجودة مضمونة</strong>
                  جميع التلفزيونات، الثلاجات، المكيفات والغسالات مستوردة ومعبأة بكرتونها الأصلي ومرفقة بفواتير قانونية وضمان مصنعي.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold">مستشارون متخصصون لحساب الأحمال والاستهلاك</strong>
                  نساعدك في اختيار قوة المكيف (9000, 12000, 18000, 24000 BTU) وحجم الثلاجات بحسب مساحة منزلك وعدد أفراد عائلتك.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold">فريق توصيل وتركيب محترف</strong>
                  توصيل سريع وآمن داخل تراب ولاية الجلفة وجميع الدوائر المجاورة (مسعد، عين وسارة، حاسي بحبح، دار الشيوخ، سيدي بايزيد).
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('showroom-section')}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors"
              >
                <span>{t.navShowroom}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('catalog-section')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                {t.exploreCatalog}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
