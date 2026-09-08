import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Award, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  CheckCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: t.why1Title,
      desc: t.why1Desc,
      tag: 'أصلي 100%'
    },
    {
      icon: <Award className="w-6 h-6 text-teal-400" />,
      title: t.why2Title,
      desc: t.why2Desc,
      tag: 'ضمان معتمد'
    },
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: t.why3Title,
      desc: t.why3Desc,
      tag: 'توصيل 58 ولاية'
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-400" />,
      title: t.why4Title,
      desc: t.why4Desc,
      tag: 'دعم محلي بالجلفة'
    }
  ];

  return (
    <section id="whyus-section" className="py-14 md:py-20 border-t border-slate-800/80 bg-[#0C111C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معايير الثقة والاحترافية</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {t.whyTitle}
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>خدمة مضمونة من نيكسورا</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
