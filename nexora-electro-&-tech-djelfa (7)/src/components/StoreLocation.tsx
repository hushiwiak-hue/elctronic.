import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  Store, 
  ExternalLink, 
  CheckCircle2, 
  Mail 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StoreLocation: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="showroom-section" className="py-14 md:py-20 bg-[#0B0F17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Store className="w-3.5 h-3.5" />
            <span>زيارة صالة العرض الكبرى</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {t.locationTitle}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            {t.locationSubtitle}
          </p>
        </div>

        {/* 2-Column Info & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact & Hours Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0F1626] border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            
            <div className="space-y-6">
              
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>مفتوح الآن — نتشرف باستقبالكم طيلة أيام الأسبوع</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">العنوان الدقيق</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.addressValue}
                  </p>
                  <div className="text-[11px] text-slate-400">
                    بجوار ساحة محمد بوضياف، مقابل البنك المركزي، الجلفة
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-teal-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">أوقات العمل والاستقبال</h4>
                  <p className="text-xs text-slate-300">
                    {t.workingHoursValue}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    الجمعة: 14:30 بعد صلاة الجمعة حتى 21:00 مساءً
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">الهاتف وخدمة الزبائن</h4>
                  <div className="flex flex-col text-xs text-slate-300 font-mono gap-0.5">
                    <a href="tel:+21327870000" className="hover:text-emerald-400 transition-colors">
                      +213 (0) 27 87 00 00 (الهاتف الثابت)
                    </a>
                    <a href="tel:+213661000000" className="hover:text-emerald-400 transition-colors">
                      +213 (0) 661 00 00 00 (موبايل ومبيعات)
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/213661000000?text=Salam%20Nexora%20Djelfa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مراسلة واتساب فورية</span>
              </a>

              <a
                href="https://maps.google.com/?q=Djelfa+Centre+Algeria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>الاتجاهات عبر GPS</span>
              </a>
            </div>

          </div>

          {/* Map Visual / Blueprint Simulation */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F1626] border border-slate-800 overflow-hidden relative flex flex-col shadow-2xl min-h-[380px]">
            
            {/* Interactive styled Map Interface */}
            <div className="relative flex-1 w-full bg-[#080c14] flex items-center justify-center p-6 overflow-hidden">
              
              {/* Radial Grid lines simulating GPS Map */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
              <div className="absolute w-80 h-80 rounded-full border border-emerald-500/20 animate-ping opacity-20 pointer-events-none" />

              {/* Map Road Vector Graphic Simulation */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#334155" strokeWidth="6" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#334155" strokeWidth="4" />
                <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#334155" strokeWidth="8" />
                <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#1e293b" strokeWidth="3" />
                <circle cx="45%" cy="50%" r="35" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Central Nexora Showroom Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-2xl shadow-emerald-500/50 animate-bounce">
                    <Store className="w-7 h-7" />
                  </div>
                  <span className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>

                <div className="mt-3 px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-center shadow-xl">
                  <div className="text-xs font-black text-white">معرض NEXORA الجلفة الرئيسي</div>
                  <div className="text-[10px] text-emerald-400 font-medium">شارع الأمير عبد القادر، الجلفة 17000</div>
                </div>
              </div>

              {/* Nearby Landmarks tags on map */}
              <div className="absolute top-6 start-6 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400">
                ساحة محمد بوضياف (200m)
              </div>
              <div className="absolute bottom-6 end-6 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400">
                حي 5 جويلية الجلفة
              </div>
            </div>

            {/* Bottom Bar on Map */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>موقف سيارات مجاني متوفر لزبائن المعرض</span>
              </div>

              <a
                href="https://maps.google.com/?q=Djelfa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
