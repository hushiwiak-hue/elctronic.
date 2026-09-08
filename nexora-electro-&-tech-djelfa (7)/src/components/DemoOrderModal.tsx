import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Store, 
  ShieldCheck, 
  Printer, 
  Phone, 
  User, 
  MapPin, 
  Info 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoOrderModal: React.FC = () => {
  const { 
    isOrderModalOpen, 
    setIsOrderModalOpen, 
    cart, 
    cartTotal, 
    cartSubtotal, 
    deliveryFee, 
    clearCart, 
    t, 
    language 
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [wilaya, setWilaya] = useState('الجلفة (17 - Djelfa)');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isOrderModalOpen) return null;

  const handleSubmitSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `NX-${Math.floor(1000 + Math.random() * 9000)}-17`;
    setOrderRef(randomRef);
    setIsSubmitted(true);
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setIsOrderModalOpen(false);
    clearCart();
  };

  const formattedTotal = new Intl.NumberFormat('fr-FR').format(
    deliveryMethod === 'pickup' ? cartSubtotal : cartTotal
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOrderModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-lg rounded-3xl bg-[#0F1626] border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Close Button */}
          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="absolute top-4 end-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            /* Order Simulation Form */
            <form onSubmit={handleSubmitSimulation} className="space-y-5">
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{t.demoBadge}</span>
                </div>
                <h3 className="text-xl font-black text-white">{t.demoOrderTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.demoOrderNotice}
                </p>
              </div>

              {/* Products Preview */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-300">ملخص الأجهزة ({cart.length}):</div>
                <div className="max-h-24 overflow-y-auto space-y-1 text-slate-400 divide-y divide-slate-800/40">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-1 flex justify-between">
                      <span className="truncate max-w-[200px]">{item.quantity}x {item.product.name[language]}</span>
                      <span className="text-white font-medium">
                        {new Intl.NumberFormat('fr-FR').format(item.product.price * item.quantity)} {t.currency}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400">
                  <span>المجموع التقديري:</span>
                  <span>{formattedTotal} {t.currency}</span>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الاسم واللقب (تجريبي)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: عبد القادر بن سالم"
                      className="w-full px-3.5 py-2.5 ps-10 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    رقم الهاتف (الجزائر)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="06 XX XX XX XX / 05 XX..."
                      className="w-full px-3.5 py-2.5 ps-10 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الولاية / المدينة
                  </label>
                  <div className="relative">
                    <select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full px-3.5 py-2.5 ps-10 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="الجلفة (17 - Djelfa)">الجلفة (17 - Djelfa)</option>
                      <option value="الجزائر العاصمة (16 - Alger)">الجزائر العاصمة (16 - Alger)</option>
                      <option value="الأغواط (03 - Laghouat)">الأغواط (03 - Laghouat)</option>
                      <option value="المسيلة (28 - M'Sila)">المسيلة (28 - M'Sila)</option>
                      <option value="غرداية (47 - Ghardaïa)">غرداية (47 - Ghardaïa)</option>
                      <option value="سطيف (19 - Sétif)">سطيف (19 - Sétif)</option>
                      <option value="وهران (31 - Oran)">وهران (31 - Oran)</option>
                    </select>
                    <MapPin className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Delivery method choice */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  طريقة الاستلام المفضلة
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 rounded-xl border text-xs text-start transition-colors flex items-center gap-2 ${
                      deliveryMethod === 'delivery'
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="font-bold">توصيل منزلي</div>
                      <div className="text-[10px] text-slate-400">حتى باب المنزل</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-xl border text-xs text-start transition-colors flex items-center gap-2 ${
                      deliveryMethod === 'pickup'
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="font-bold">معرض الجلفة</div>
                      <div className="text-[10px] text-slate-400">استلام شخصي مجاني</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment note */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الدفع بعد المعاينة والتأكد التام من سلامة الأجهزة.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t.confirmSimulatedOrder}</span>
              </button>

            </form>
          ) : (
            /* Order Success Screen */
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  طلب تجريبي ناجح
                </span>
                <h3 className="text-2xl font-black text-white">{t.orderSimSuccess}</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {t.orderSimDesc}
                </p>
              </div>

              {/* Invoice Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-start space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">رقم الوصل التجريبي:</span>
                  <span className="font-mono font-bold text-emerald-400">{orderRef}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">العميل:</span>
                  <span className="font-semibold text-white">{customerName || 'عميل تجريبي'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">الوجهة:</span>
                  <span className="font-semibold text-white">{wilaya}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">طريقة الاستلام:</span>
                  <span className="font-semibold text-white">
                    {deliveryMethod === 'delivery' ? 'توصيل منزلي' : 'استلام من معرض الجلفة'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="text-emerald-400">{formattedTotal} {t.currency}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleCloseAndReset}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  العودة لتصفح المعرض
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
