import React from 'react';
import { Sparkles, MessageCircle, Phone, Heart, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BrandCTA: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-12 md:py-16 bg-[#0B0F17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/30 p-8 md:p-12 overflow-hidden shadow-2xl">
          
          {/* Ambient light */}
          <div className="absolute top-0 end-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>باقات تجهيز العرائس والمنازل الجديدة بالجلفة</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              تجهيز كامل لبيتك بأجهزة أصلية مع خصومات خاصة للطلبات المجمعة
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              نوفر في صالة عرض نيكسورا بالجلفة عروضاً مخصصة للمقبلين على الزواج وتجهيز الفيلات والشقق السكنية الجديدة، مع إمكانية جدولة التوصيل وتركيب المكيفات والشاشات بحرفية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خصم إضافي عند اقتناء 3 أجهزة فأكثر</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ضمان صيانة موثق في الجلفة</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>توصيل دقيق ومعاينة قبل الدفع</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/213661000000?text=Salam%20استفسار%20بخصوص%20باقة%20تجهيز%20العرائس"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب استشارة تجهيز مجانية (واتساب)</span>
              </a>

              <a
                href="tel:+21327870000"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>الاتصال بالمستشار التجاري</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
