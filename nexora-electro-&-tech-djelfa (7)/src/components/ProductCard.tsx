import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Check, 
  Scale, 
  Eye, 
  Star, 
  ShieldCheck, 
  Zap, 
  Tag 
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    t, 
    addToCart, 
    compareList, 
    addToCompare, 
    setSelectedProduct 
  } = useApp();

  const [isAdded, setIsAdded] = useState(false);
  const isCompared = compareList.some(p => p.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCompare(product);
  };

  const formattedPrice = new Intl.NumberFormat('fr-FR').format(product.price);
  const formattedOldPrice = product.oldPrice 
    ? new Intl.NumberFormat('fr-FR').format(product.oldPrice) 
    : null;

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-emerald-950/20"
    >
      {/* Card Header & Image Area */}
      <div className="relative p-3 pb-0">
        
        {/* Top Badges */}
        <div className="absolute top-5 inset-x-5 z-10 flex items-center justify-between gap-1 pointer-events-none">
          {/* Brand Tag */}
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-bold text-slate-200 tracking-wide">
            {product.brand}
          </span>

          {/* Discount or Energy Class */}
          <div className="flex items-center gap-1.5">
            {product.energyClass && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black tracking-tighter">
                {product.energyClass}
              </span>
            )}
            {product.discountPercent && (
              <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold">
                -{product.discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Product Image Container */}
        <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-slate-950/80 flex items-center justify-center p-2">
          <img
            src={product.images[0]}
            alt={product.name[language]}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Hover Quick View Overlay */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.quickView}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Rating and Model */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount})</span>
          </div>

          <span className="font-mono text-[10px] text-slate-400">{product.modelCode}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-emerald-400 transition-colors">
          {product.name[language]}
        </h3>

        {/* Short Specs Pills */}
        <div className="flex flex-wrap gap-1.5">
          {product.shortSpecs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="inline-block px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-300 font-medium truncate max-w-full"
            >
              {spec[language]}
            </span>
          ))}
        </div>

        {/* Price & Stock info */}
        <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between gap-2">
          <div className="flex flex-col">
            {formattedOldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formattedOldPrice} {t.currency}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-emerald-400">
                {formattedPrice}
              </span>
              <span className="text-xs font-bold text-slate-300">{t.currency}</span>
            </div>
          </div>

          <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{t.inStock}</span>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Compare */}
        <div className="pt-1 flex items-center gap-2">
          
          {/* Add to Cart Button */}
          <button
            id={`add-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t.addToCart}</span>
              </>
            )}
          </button>

          {/* Compare Button */}
          <button
            id={`compare-btn-${product.id}`}
            onClick={handleToggleCompare}
            title={isCompared ? t.compareRemove : t.compareAdd}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              isCompared
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
