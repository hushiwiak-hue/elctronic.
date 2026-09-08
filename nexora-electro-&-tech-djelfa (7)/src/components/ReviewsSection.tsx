import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { reviews } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useApp();

  return (
    <section id="reviews-section" className="py-14 md:py-20 bg-[#0C111D] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ثقة أهالي الجلفة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {t.reviewsTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.reviewsSubtitle}
            </p>
          </div>

          {/* Average Rating Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4 self-start md:self-auto shadow-xl">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 leading-none">
              4.9
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                بناءً على 128 تقييم حقيقي في ولاية الجلفة
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 hover:bg-slate-900/90 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>شراء مؤكد</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment[language]}"
                </p>

                {/* Product Name Tag */}
                <div className="text-[11px] font-medium text-emerald-300/80 bg-slate-800/60 px-2.5 py-1 rounded-lg truncate">
                  الجهاز: {rev.productName[language]}
                </div>
              </div>

              {/* Author & Location */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="font-bold text-white">
                  {rev.author[language]}
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{rev.location[language]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
