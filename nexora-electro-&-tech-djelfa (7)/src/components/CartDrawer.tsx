import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Info 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartTotal, 
    deliveryFee, 
    t, 
    language,
    setIsOrderModalOpen 
  } = useApp();

  if (!isCartOpen) return null;

  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleProceedToDemoOrder = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const formattedSubtotal = new Intl.NumberFormat('fr-FR').format(cartSubtotal);
  const formattedDelivery = deliveryFee === 0 
    ? t.freeDeliveryBadge 
    : `${new Intl.NumberFormat('fr-FR').format(deliveryFee)} ${t.currency}`;
  const formattedTotal = new Intl.NumberFormat('fr-FR').format(cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 end-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0F1626] border-s border-slate-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-none">{t.cartTitle}</h3>
                <span className="text-[11px] text-slate-400">{t.cartSubtitle}</span>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length > 0 ? (
              <>
                <div className="flex items-center justify-between pb-2 text-xs text-slate-400">
                  <span>{cart.length} أجهزة في السلة</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.clearCart}</span>
                  </button>
                </div>

                {cart.map((item) => {
                  const itemPrice = new Intl.NumberFormat('fr-FR').format(item.product.price * item.quantity);
                  return (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex gap-3 items-center"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name[language]}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-950 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase">
                          {item.product.brand}
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.product.name[language]}
                        </h4>
                        <div className="text-xs font-black text-slate-200">
                          {itemPrice} {t.currency}
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              /* Empty Cart State */
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <h4 className="text-base font-bold text-white">{t.emptyCartTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.emptyCartDesc}</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
                >
                  {t.browseNow}
                </button>
              </div>
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-4">
              
              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-slate-200">{formattedSubtotal} {t.currency}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.estimatedDelivery}</span>
                  </span>
                  <span className="font-semibold text-emerald-400">{formattedDelivery}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm sm:text-base font-bold text-white">
                  <span>{t.totalPrice}</span>
                  <span className="text-emerald-400 font-black">{formattedTotal} {t.currency}</span>
                </div>
              </div>

              {/* Demo Notice Disclaimer */}
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-tight">{t.cartDisclaimer}</p>
              </div>

              {/* Simulate Order Button */}
              <button
                id="simulate-order-btn"
                onClick={handleProceedToDemoOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t.simulateOrder}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
