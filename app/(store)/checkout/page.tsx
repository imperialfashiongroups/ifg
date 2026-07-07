'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, ChevronRight, Truck, Banknote, Shield, ShoppingBag } from 'lucide-react';
import { checkoutSchema, CheckoutFormValues, INDIAN_STATES } from '@/lib/validations';
import { useCartStore } from '@/lib/store/cart';
import { formatINR } from '@/lib/utils';

type Step = 'address' | 'payment' | 'review';

const STEPS = [
  { id: 'address', label: 'Address',  icon: MapPin },
  { id: 'payment', label: 'Payment',  icon: CreditCard },
  { id: 'review',  label: 'Review',   icon: CheckCircle },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('address');
  const [loading, setLoading] = useState(false);
  const { items, subtotal, gstAmount, discountAmount, total, coupon, clearCart } = useCartStore();
  const shipping = subtotal() > 499 ? 0 : 49;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      payment_method: 'razorpay' as const,
      address: { is_default: false as boolean },
    },
  });

  const paymentMethod = watch('payment_method');

  const goToPayment = async () => {
    const valid = await trigger(['address']);
    if (valid) setStep('payment');
  };

  const goToReview = async () => {
    const valid = await trigger(['payment_method']);
    if (valid) setStep('review');
  };

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const onSubmit = async (data: CheckoutFormValues) => {
    setLoading(true);
    setPaymentError(null);
    try {
      if (data.payment_method === 'razorpay') {
        const orderTotal = total();

        // Guard: Razorpay minimum is ₹1 (100 paise)
        if (orderTotal < 1) {
          setPaymentError('Order total must be at least ₹1 to pay online.');
          setLoading(false);
          return;
        }

        // Step 1: Create Razorpay order on backend
        const res = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to create payment order. Please try again.');
        }

        const order = await res.json();

        // Step 2: Open Razorpay Standard Checkout modal
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // NEXT_PUBLIC_ is safe on client
          amount: order.amount,
          currency: order.currency || 'INR',
          order_id: order.id,
          name: 'Imperial Fashion Groups',
          description: `Purchase – ${items.length} item${items.length > 1 ? 's' : ''}`,
          image: '/icons/razorpay.svg',
          prefill: {
            name:    data.address.full_name,
            contact: `+91${data.address.phone}`,
          },
          notes: {
            shipping_address: `${data.address.address_line1}, ${data.address.city}, ${data.address.state} - ${data.address.pincode}`,
            gst_number:       '22ASVPC0275C1Z4',
          },
          theme: { color: '#C9A84C' },

          // Step 3: On payment success — verify signature on backend
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id:   string;
            razorpay_signature:  string;
          }) => {
            try {
              const verifyRes = await fetch('/api/razorpay/verify', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id:   response.razorpay_order_id,
                  razorpay_signature:  response.razorpay_signature,
                  orderData:           { ...data, email: '' },
                  items,
                }),
              });

              const verifyData = await verifyRes.json();

              if (!verifyRes.ok) {
                throw new Error(verifyData.error || 'Payment verification failed.');
              }

              clearCart();
              window.location.href = `/account/orders?success=true&order=${verifyData.order_number}`;
            } catch (err: any) {
              setPaymentError(err.message || 'Payment verified but order could not be saved. Please contact support.');
              setLoading(false);
            }
          },

          modal: {
            // User closed the payment modal without paying
            ondismiss: () => {
              setPaymentError('Payment was cancelled. Your cart is still saved — try again when ready.');
              setLoading(false);
            },
          },
        };

        const razorpayInstance = new (window as any).Razorpay(razorpayOptions);

        // Handle payment failure events from Razorpay
        razorpayInstance.on('payment.failed', (response: any) => {
          const reason = response?.error?.description || response?.error?.reason || 'Payment failed.';
          setPaymentError(`Payment failed: ${reason}. Please try a different payment method.`);
          setLoading(false);
        });

        razorpayInstance.open();
        // Don't call setLoading(false) here — loader stays until handler/dismiss/failure fires

      } else {
        // COD order
        const res = await fetch('/api/orders', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ ...data, items, payment_method: 'cod' }),
        });
        if (res.ok) {
          clearCart();
          window.location.href = '/account/orders?success=true';
        } else {
          const err = await res.json();
          throw new Error(err.error || 'Could not place COD order. Please try again.');
        }
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };


  const currentStepIndex = STEPS.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {/* Top */}
      <div className="bg-brand-black py-5">
        <div className="section">
          <div className="flex items-center justify-center gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive    = i === currentStepIndex;
              const isCompleted = i < currentStepIndex;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 ${isActive ? 'text-gold-400' : isCompleted ? 'text-green-400' : 'text-gray-600'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      isActive ? 'border-gold-400 bg-gold-400/10' :
                      isCompleted ? 'border-green-400 bg-green-400/10' :
                      'border-gray-700 bg-transparent'
                    }`}>
                      {isCompleted ? '✓' : i + 1}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-600 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT: Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">

                {/* STEP 1: ADDRESS */}
                {step === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gold-50 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-gold-500" />
                      </div>
                      <h2 className="font-serif text-xl font-bold text-brand-black">Delivery Address</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="form-label">Full Name *</label>
                        <input {...register('address.full_name')} className="form-input" placeholder="Your full name" id="full-name" />
                        {errors.address?.full_name && <p className="form-error">{errors.address.full_name.message}</p>}
                      </div>

                      <div>
                        <label className="form-label">Mobile Number *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+91</span>
                          <input
                            {...register('address.phone')}
                            className="form-input pl-12"
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            id="phone"
                          />
                        </div>
                        {errors.address?.phone && <p className="form-error">{errors.address.phone.message}</p>}
                      </div>

                      <div>
                        <label className="form-label">Pincode *</label>
                        <input {...register('address.pincode')} className="form-input" placeholder="6-digit pincode" maxLength={6} id="pincode" />
                        {errors.address?.pincode && <p className="form-error">{errors.address.pincode.message}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="form-label">Address Line 1 *</label>
                        <input {...register('address.address_line1')} className="form-input" placeholder="House/Flat number, Building, Street" id="address-line1" />
                        {errors.address?.address_line1 && <p className="form-error">{errors.address.address_line1.message}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="form-label">Address Line 2 <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input {...register('address.address_line2')} className="form-input" placeholder="Landmark, Area, Colony" id="address-line2" />
                      </div>

                      <div>
                        <label className="form-label">City *</label>
                        <input {...register('address.city')} className="form-input" placeholder="Your city" id="city" />
                        {errors.address?.city && <p className="form-error">{errors.address.city.message}</p>}
                      </div>

                      <div>
                        <label className="form-label">State *</label>
                        <select {...register('address.state')} className="form-input" id="state">
                          <option value="">Select State</option>
                          {INDIAN_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {errors.address?.state && <p className="form-error">{errors.address.state.message}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="form-label">Order Notes <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <textarea {...register('notes')} className="form-input resize-none" rows={2} placeholder="Any special instructions for delivery" id="notes" />
                      </div>
                    </div>

                    <button type="button" onClick={goToPayment} className="btn-primary w-full mt-6 py-4 text-base justify-center">
                      Continue to Payment <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: PAYMENT */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gold-50 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-gold-500" />
                      </div>
                      <h2 className="font-serif text-xl font-bold text-brand-black">Payment Method</h2>
                    </div>

                    <div className="space-y-3">
                      {/* Razorpay Option */}
                      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'razorpay' ? 'border-gold-400 bg-gold-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type="radio"
                          value="razorpay"
                          {...register('payment_method')}
                          className="mt-1 accent-gold-400"
                          id="payment-razorpay"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-5 h-5 text-gold-500" />
                            <span className="font-semibold text-brand-black">Online Payment</span>
                            <span className="badge-gold text-[10px]">RECOMMENDED</span>
                          </div>
                          <p className="text-sm text-gray-500">UPI · Cards · Net Banking · Wallets</p>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Secured by Razorpay
                          </p>
                        </div>
                      </label>

                      {/* COD Option */}
                      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-gold-400 bg-gold-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type="radio"
                          value="cod"
                          {...register('payment_method')}
                          className="mt-1 accent-gold-400"
                          id="payment-cod"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Banknote className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-brand-black">Cash on Delivery</span>
                          </div>
                          <p className="text-sm text-gray-500">Pay in cash when your order arrives</p>
                          <p className="text-xs text-amber-500 mt-1">Note: Please keep exact change ready</p>
                        </div>
                      </label>
                    </div>

                    {/* Coupon */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <label className="form-label">Coupon Code</label>
                      <div className="flex gap-2">
                        <input
                          {...register('coupon_code')}
                          className="form-input flex-1"
                          placeholder="Enter coupon code"
                          id="coupon-code"
                        />
                        <button type="button" className="btn-secondary px-4 py-3 whitespace-nowrap">Apply</button>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setStep('address')} className="btn-secondary flex-1 py-4">
                        Back
                      </button>
                      <button type="button" onClick={goToReview} className="btn-primary flex-1 py-4 justify-center">
                        Review Order <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: REVIEW */}
                {step === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {/* Items */}
                    <div className="bg-white rounded-2xl p-6 shadow-card">
                      <h2 className="font-serif text-lg font-bold text-brand-black mb-4">Order Items ({items.length})</h2>
                      <div className="space-y-3">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                            <div className="w-14 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gold-500 shrink-0"><ShoppingBag className="w-6 h-6" /></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-brand-black line-clamp-1">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.variant_name || 'Standard'}</p>
                              <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-brand-black shrink-0">{formatINR(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Error Banner */}
                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-sm">
                        <span className="text-red-500 text-lg leading-none mt-0.5">⚠</span>
                        <div>
                          <p className="font-semibold text-red-700 mb-0.5">Payment Issue</p>
                          <p className="text-red-600">{paymentError}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep('payment')} className="btn-secondary flex-1 py-4">
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex-1 py-4 justify-center text-base"
                        id="place-order-btn"
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                            Processing...
                          </span>
                        ) : paymentMethod === 'cod' ? (
                          <><Banknote className="w-5 h-5" /> Place COD Order</>
                        ) : (
                          <><CreditCard className="w-5 h-5" /> Pay Now</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
              <h2 className="font-serif text-lg font-bold text-brand-black mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatINR(subtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST</span>
                  <span>{formatINR(gstAmount())}</span>
                </div>
                {discountAmount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(discountAmount())}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatINR(shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-brand-black text-base">
                  <span>Total</span>
                  <span className="text-gold-500">{formatINR(total())}</span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs text-green-700 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Your order is protected. 7-day hassle-free returns.
                </p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-medium mb-1">Tax Invoice</p>
                <p className="text-xs text-gray-400">GST: 22ASVPC0275C1Z4</p>
                <p className="text-xs text-gray-400">Imperial Fashion Groups</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
