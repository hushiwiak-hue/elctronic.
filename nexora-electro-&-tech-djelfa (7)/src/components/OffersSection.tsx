import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Timer, 
  ShoppingBag, 
  Check, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Flame 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeAssets } from '../data/assets';
import { products } from '../data/products';

export const OffersSection: React.FC = () => {
  const { t, language, addToCart, setIsCartOpen } = useApp();
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  // Live countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddBundle = () => {
    // Add the 3 items of the bundle
    const washer = products.find(p => p.id === 'prod-lg-twinwash-14-8');
    const dishwasher = products.find(p => p.id === 'prod-modern-dishwasher-14');
    const cooker = products.find(p => p.id === 'prod-cooker-inox-5b');

    if (washer) addToCart(washer, 1);
    if (dishwasher) addToCart(dishwasher, 1);
    if (cooker) addToCart(cooker, 1);

    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <section id="offers-section" className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0D1524] to-[#0B0F17]">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 -start-20 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 end-0 w-80 h-80 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.limitedTimeOffer}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {t.offersTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.offersSubtitle}
            </p>
          </div>

          {/* Countdown Clock Widget */}
          <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-3 sm:px-5 sm:py-2.5 flex items-center gap-3 self-start sm:self-auto shadow-xl">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <Timer className="w-4 h-4 animate-spin-slow" />
              <span className="hidden sm:inline">{t.dealEndsIn}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-center min-w-[36px]">
                <span className="block text-sm font-black text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 font-medium">{t.days}</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-center min-w-[36px]">
                <span className="block text-sm font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 font-medium">{t.hours}</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-center min-w-[36px]">
                <span className="block text-sm font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 font-medium">{t.minutes}</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-center min-w-[36px]">
                <span className="block text-sm font-black text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 font-medium">{t.seconds}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Bundle Promo Card */}
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/30 overflow-hidden shadow-2xl p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Promo Image */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                <img
                  src={storeAssets.promoTrio}
                  alt="Pack Trio Electromenager Nexora"
                  className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1 shadow-lg">
                  <Zap className="w-3.5 h-3.5" />
                  <span>تخفيض خاص: -40,500 د.ج</span>
                </div>
              </div>
            </div>

            {/* Promo Details */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  PACK TRIO PRESTIGE 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {t.bundleDealTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.bundleDealDesc}
                </p>
              </div>

              {/* Items included in the bundle */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium text-slate-200">
                    غسالة ومجفف LG توين واش 14 كغ مع درج خاص (LG TwinWash 14kg)
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium text-slate-200">
                    غسالة أواني هايسنس 14 فرد صامتة إنفرتر (Hisense 14 Couverts)
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium text-slate-200">
                    كوزينيار بيكو 90 سم ستانلس ستيل 5 شعلات مع فرن تيربو (Beko 90cm)
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">
                    السعر الإفرادي المجموع: <span className="line-through">338,500 د.ج</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                      298,000
                    </span>
                    <span className="text-sm font-bold text-slate-300">{t.currency}</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                    + توصيل مجاني مباشر إلى باب بيتك في الجلفة
                  </div>
                </div>

                {/* Add Bundle CTA */}
                <button
                  id="add-bundle-btn"
                  onClick={handleAddBundle}
                  disabled={isBundleAdded}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {isBundleAdded ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>{t.addedToCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-slate-950" />
                      <span>أضف باقة التجهيز للسلة (Demo)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
