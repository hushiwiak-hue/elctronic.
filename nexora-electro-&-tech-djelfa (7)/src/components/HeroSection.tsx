import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  BadgeCheck, 
  Sparkles, 
  MapPin, 
  ChevronDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeAssets } from '../data/assets';

export const HeroSection: React.FC = () => {
  const { t, language } = useApp();
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:py-16 lg:py-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 end-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Visuals & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Showroom Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>الجلفة — صالة العرض الكبرى (Showroom 17)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] md:leading-[1.18]">
              {language === 'ar' ? (
                <>
                  أجهزة بيتك العصرية... <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    بأعلى معايير الجودة
                  </span>{' '}
                  وأوفر سعر
                </>
              ) : language === 'fr' ? (
                <>
                  L’excellence de l’électroménager <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    haut de gamme
                  </span>{' '}
                  à Djelfa
                </>
              ) : (
                <>
                  Premium Household <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Electronics & Tech
                  </span>{' '}
                  in Djelfa
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                id="hero-explore-btn"
                onClick={() => scrollTo('catalog-section')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t.exploreCatalog}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                id="hero-showroom-btn"
                onClick={() => scrollTo('showroom-section')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{t.visitShowroom}</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 w-full">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                <div className="text-xs text-slate-400 font-medium">{t.badgeOriginal}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">24 شهر</div>
                <div className="text-xs text-slate-400 font-medium">{t.badgeWarranty}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400">58 ولاية</div>
                <div className="text-xs text-slate-400 font-medium">{t.badgeDelivery}</div>
              </div>
            </div>

          </div>

          {/* Cinematic Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-emerald-950/40 group bg-slate-900">
              <img
                src={storeAssets.heroBanner}
                alt="NEXORA Luxury Showroom Djelfa"
                className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">تشكيلة 2026 الجديدة متوفرة</div>
                    <div className="text-[11px] text-slate-400">Samsung • LG • Haier • SMEG • TCL</div>
                  </div>
                </div>

                <button
                  onClick={() => scrollTo('offers-section')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0"
                >
                  {t.navOffers}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Trust Bar */}
        <div className="mt-10 lg:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.badgeOriginal}</div>
              <div className="text-[11px] text-slate-400">مباشرة من الوكلاء الرسميين</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.badgeWarranty}</div>
              <div className="text-[11px] text-slate-400">شهادة ضمان مرفقة بكل جهاز</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.badgeDelivery}</div>
              <div className="text-[11px] text-slate-400">شحن آمن وسريع حتى الباب</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t.badgeAfterSale}</div>
              <div className="text-[11px] text-slate-400">صيانة وتوفير قطع الغيار الأصلية</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
