import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Scale, 
  Star, 
  ShieldCheck, 
  Truck, 
  Share2, 
  MessageCircle, 
  Minus, 
  Plus, 
  Zap, 
  Award 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    language, 
    t, 
    addToCart, 
    compareList, 
    addToCompare 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProduct) return null;

  const isCompared = compareList.some(p => p.id === selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(selectedProduct.price);
  const formattedOldPrice = selectedProduct.oldPrice 
    ? new Intl.NumberFormat('fr-FR').format(selectedProduct.oldPrice) 
    : null;

  const whatsappText = encodeURIComponent(
    `السلام عليكم، أستفسر بخصوص جهاز ${selectedProduct.name.ar} (الموديل: ${selectedProduct.modelCode}) المعروض في متجر نيكسورا بالجلفة.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F1626] border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            id="close-product-modal-btn"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 end-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Section */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 flex items-center justify-center p-3">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name[language]}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />

                {/* Energy Badge */}
                {selectedProduct.energyClass && (
                  <div className="absolute top-3 start-3 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black">
                    {selectedProduct.energyClass}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges below image */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{selectedProduct.warranty[language]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-300">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>توصيل 58 ولاية وضمان بالجلفة</span>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="md:col-span-6 space-y-5">
              
              {/* Brand & Model Code */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {selectedProduct.brand}
                </span>

                <span className="text-xs font-mono text-slate-400">
                  {t.modelLabel} {selectedProduct.modelCode}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedProduct.name[language]}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedProduct.rating}</span>
                </div>
                <span className="text-slate-400">({selectedProduct.reviewCount} تقييم حقيقي)</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">{t.inStock}</span>
              </div>

              {/* Price Area */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div>
                  {formattedOldPrice && (
                    <span className="text-xs text-slate-400 line-through block">
                      {formattedOldPrice} {t.currency}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                      {formattedPrice}
                    </span>
                    <span className="text-sm font-bold text-slate-300">{t.currency}</span>
                  </div>
                </div>

                {selectedProduct.discountPercent && (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold">
                    وفّر {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedProduct.description[language]}
              </p>

              {/* Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {t.specifications}
                </h4>
                <div className="rounded-xl border border-slate-800 overflow-hidden text-xs divide-y divide-slate-800">
                  {selectedProduct.detailedSpecs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-2 p-2.5 bg-slate-900/40">
                      <span className="text-slate-400 font-medium">{spec.name[language]}</span>
                      <span className="text-slate-200 font-semibold">{spec.value[language]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-2">
                
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700/80 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      isAdded
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.addedToCart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t.addToCart}</span>
                      </>
                    )}
                  </button>

                  {/* Compare Toggle */}
                  <button
                    id="modal-compare-btn"
                    onClick={() => addToCompare(selectedProduct)}
                    className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      isCompared
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                    title={isCompared ? t.compareRemove : t.compareAdd}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>

                {/* Secondary Inquiry & Share Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/213661000000?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>{t.inquireWhatsApp}</span>
                  </a>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    title={t.shareProduct}
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
