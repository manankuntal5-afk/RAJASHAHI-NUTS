import React, { useState, useEffect } from 'react';
import { OrderAddress, OrderConfirmation, PaymentMethod } from '../types';
import { INDIAN_STATES } from '../data/productData';
import {
  ShieldCheck,
  Lock,
  QrCode,
  Smartphone,
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  ArrowLeft,
  User,
  Phone,
  Home,
  MapPin,
  X
} from 'lucide-react';

interface OnlinePaymentModalProps {
  orderAddress: OrderAddress | null;
  onBack: () => void;
  onPaymentSuccess: (order: OrderConfirmation) => void;
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  orderAddress: initialAddress,
  onBack,
  onPaymentSuccess
}) => {
  // If initial address is null (user clicked "Order Now" directly from hero/header), let them enter quick details
  const [address, setAddress] = useState<OrderAddress>(
    initialAddress || {
      fullName: '',
      phone: '',
      altPhone: '',
      addressLine: '',
      landmark: '',
      city: '',
      state: 'Rajasthan',
      pincode: '',
      quantity: 1
    }
  );

  const [activeStep, setActiveStep] = useState<'address' | 'payment'>(
    initialAddress && initialAddress.fullName && initialAddress.phone ? 'payment' : 'address'
  );

  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});

  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'phonepe' | 'gpay' | 'paytm' | 'bhim'>('phonepe');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes payment countdown
  const [customUpiId, setCustomUpiId] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('sbi');

  const totalAmount = address.quantity === 1 ? 265 : 499;

  useEffect(() => {
    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('rajshahi.nuts@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const validateAddress = () => {
    const errs: { [key: string]: string } = {};
    if (!address.fullName.trim() || address.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your name (minimum 3 characters)';
    }
    const cleanPhone = address.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!address.addressLine.trim() || address.addressLine.trim().length < 6) {
      errs.addressLine = 'Please enter your delivery street / area address';
    }
    if (!address.city.trim()) {
      errs.city = 'Please enter your city';
    }
    const cleanPin = address.pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'Please enter a 6-digit pincode';
    }
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setActiveStep('payment');
    }
  };

  const processPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const confirmation: OrderConfirmation = {
        orderId: `RN-${Math.floor(100000 + Math.random() * 900000)}`,
        transactionId: `TXN${Date.now().toString().slice(-9)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        amount: totalAmount,
        customer: address,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        paymentMethod:
          method === 'upi'
            ? `UPI (${selectedUpiApp.toUpperCase()})`
            : method === 'qr'
            ? 'UPI QR Scan & Pay'
            : method === 'card'
            ? 'Debit / Credit Card'
            : `Netbanking (${selectedBank.toUpperCase()})`
      };

      setIsProcessing(false);
      onPaymentSuccess(confirmation);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md overscroll-contain">
      <div className="flex min-h-full items-start sm:items-center justify-center p-2.5 sm:p-6 pt-5 pb-8 sm:py-8">
        <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#092218] via-[#061811] to-[#04120c] border-2 border-[#dfba5d] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl text-white my-auto sm:my-4">
          {/* Processing Spinner Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 z-50 bg-[#061811]/95 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#dfba5d] border-t-transparent animate-spin mb-4" />
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#fae69e] mb-1">
                Processing Secure Online Payment...
              </h3>
              <p className="text-sm text-gray-300">
                Please do not refresh or click back. Connecting to bank gateway.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-[#10b981]">
                <Lock className="w-4 h-4" />
                <span>256-Bit SSL Encrypted Bank Transaction</span>
              </div>
            </div>
          )}

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#c59b27]/30 gap-2">
            {activeStep === 'payment' && initialAddress ? (
              <button
                onClick={onBack}
                className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Address</span>
              </button>
            ) : activeStep === 'payment' ? (
              <button
                onClick={() => setActiveStep('address')}
                className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>
            ) : (
              <button
                onClick={onBack}
                className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Store</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 text-xs text-[#10b981] bg-[#0c2e1f] px-2.5 sm:px-3 py-1 rounded-full border border-[#10b981]/40 shrink-0 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10b981]" />
              <span>Secure Online Checkout</span>
            </div>

            <button
              onClick={onBack}
              className="cursor-pointer text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        {/* Step 1: Quick Address Entry (if not yet provided) */}
        {activeStep === 'address' && (
          <form onSubmit={handleContinueToPayment} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-[#fae69e] font-cinzel">
                Step 1: Enter Delivery Address
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Rajshahi Nuts 4 KG Combo Pack @ ₹265 (Free All-India Home Delivery)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
                {addressErrors.fullName && <p className="text-red-400 text-xs mt-0.5">{addressErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
                {addressErrors.phone && <p className="text-red-400 text-xs mt-0.5">{addressErrors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Complete Delivery Address (House No, Street, Area) *
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 301, Sunshine Heights, Civil Lines"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                />
              </div>
              {addressErrors.addressLine && <p className="text-red-400 text-xs mt-0.5">{addressErrors.addressLine}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  City / District *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
                {addressErrors.city && <p className="text-red-400 text-xs mt-0.5">{addressErrors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="302001"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                />
                {addressErrors.pincode && <p className="text-red-400 text-xs mt-0.5">{addressErrors.pincode}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  State
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-[#092218] text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-[0.99] text-[#082116] font-black text-base shadow-xl flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Continue to Payment (Pay ₹{totalAmount}) →</span>
            </button>
          </form>
        )}

        {/* Step 2: Payment Gateway Options */}
        {activeStep === 'payment' && (
          <div>
            {/* Order Summary Strip */}
            <div className="bg-[#0b2b1d] p-4 rounded-2xl border border-[#c59b27]/30 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-[#d8cfbe] block">Order Summary:</span>
                <h4 className="font-bold text-[#fae69e] text-sm sm:text-base">
                  {address.quantity}x Rajshahi Nuts 4 KG Combo Pack
                </h4>
                <p className="text-xs text-gray-300">
                  Deliver to: {address.fullName || 'Customer'}, {address.city || 'India'} ({address.pincode})
                </p>
              </div>
              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                <span className="text-xs text-gray-400 block">Total Payable:</span>
                <span className="text-2xl font-black text-gold-gradient">₹{totalAmount}</span>
              </div>
            </div>

            {/* Strict Online Only Notice & Timer */}
            <div className="bg-[#241306] border border-[#f59e0b]/50 rounded-xl p-3 mb-5 flex items-center justify-between text-xs text-[#fed7aa]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span><strong>Promotional Online Price:</strong> ₹{totalAmount} offer valid for instant digital checkout.</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[#fef08a] shrink-0 ml-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timerSeconds)}</span>
              </div>
            </div>

            {/* Payment Methods Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`cursor-pointer p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  method === 'upi'
                    ? 'bg-[#0e3b26] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/30 font-bold'
                    : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c]'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#dfba5d]" />
                <span className="text-xs">UPI Apps</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('qr')}
                className={`cursor-pointer p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  method === 'qr'
                    ? 'bg-[#0e3b26] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/30 font-bold'
                    : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c]'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#dfba5d]" />
                <span className="text-xs">Scan QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`cursor-pointer p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  method === 'card'
                    ? 'bg-[#0e3b26] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/30 font-bold'
                    : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#dfba5d]" />
                <span className="text-xs">Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`cursor-pointer p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  method === 'netbanking'
                    ? 'bg-[#0e3b26] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/30 font-bold'
                    : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c]'
                }`}
              >
                <Building className="w-5 h-5 text-[#dfba5d]" />
                <span className="text-xs">Net Banking</span>
              </button>
            </div>

            {/* Tab 1: UPI Instant Apps */}
            {method === 'upi' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#fae69e]">
                  Select your preferred UPI app:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                    { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                    { id: 'paytm', name: 'Paytm', icon: '🔷' },
                    { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳' }
                  ].map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedUpiApp(app.id as any)}
                      className={`cursor-pointer p-3 rounded-xl border-2 flex items-center gap-2.5 transition-all ${
                        selectedUpiApp === app.id
                          ? 'bg-[#0e3b26] border-[#dfba5d] shadow-md ring-1 ring-[#dfba5d]'
                          : 'bg-[#071a12] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl">{app.icon}</span>
                      <span className="text-xs font-bold">{app.name}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs text-gray-300 mb-1">
                    Or enter any custom UPI VPA ID:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                    value={customUpiId}
                    onChange={(e) => setCustomUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061911] border border-[#c59b27]/40 text-white text-xs focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Dynamic Scan QR Code */}
            {method === 'qr' && (
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="text-xs text-[#fae69e]">
                  Scan using any UPI App (PhonePe, Google Pay, Paytm, CRED) to pay ₹{totalAmount}:
                </p>

                <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-[#dfba5d]">
                  <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner 1 */}
                    <rect x="5" y="5" width="26" height="26" fill="#061811" />
                    <rect x="9" y="9" width="18" height="18" fill="white" />
                    <rect x="13" y="13" width="10" height="10" fill="#061811" />
                    {/* Corner 2 */}
                    <rect x="69" y="5" width="26" height="26" fill="#061811" />
                    <rect x="73" y="9" width="18" height="18" fill="white" />
                    <rect x="77" y="13" width="10" height="10" fill="#061811" />
                    {/* Corner 3 */}
                    <rect x="5" y="69" width="26" height="26" fill="#061811" />
                    <rect x="9" y="73" width="18" height="18" fill="white" />
                    <rect x="13" y="77" width="10" height="10" fill="#061811" />
                    {/* Data patterns */}
                    <rect x="36" y="8" width="8" height="8" fill="#061811" />
                    <rect x="48" y="8" width="6" height="6" fill="#061811" />
                    <rect x="58" y="12" width="6" height="8" fill="#061811" />
                    <rect x="36" y="22" width="12" height="6" fill="#061811" />
                    <rect x="52" y="24" width="8" height="8" fill="#061811" />
                    <rect x="8" y="36" width="10" height="10" fill="#061811" />
                    <rect x="22" y="42" width="8" height="6" fill="#061811" />
                    <rect x="36" y="36" width="28" height="28" fill="#dfba5d" rx="4" />
                    <text x="50" y="53" fill="#092218" fontSize="8" fontWeight="bold" textAnchor="middle">
                      ₹{totalAmount}
                    </text>
                    <rect x="68" y="38" width="10" height="8" fill="#061811" />
                    <rect x="82" y="42" width="10" height="10" fill="#061811" />
                    <rect x="36" y="68" width="10" height="10" fill="#061811" />
                    <rect x="50" y="72" width="8" height="10" fill="#061811" />
                    <rect x="64" y="68" width="10" height="8" fill="#061811" />
                    <rect x="78" y="74" width="14" height="14" fill="#061811" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 text-xs bg-[#092418] px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 text-[#fae69e]">
                  <span>UPI VPA: <strong>rajshahi.nuts@icici</strong></span>
                  <button
                    onClick={handleCopyUpi}
                    className="cursor-pointer ml-1 p-1 hover:text-white transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-[11px] text-gray-400">
                  After scanning and making payment on your phone, click the button below to confirm.
                </p>
              </div>
            )}

            {/* Tab 3: Debit / Credit Card */}
            {method === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#fae69e] mb-1">
                    Card Number (Visa / Mastercard / RuPay):
                  </label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8921"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061911] border border-[#c59b27]/40 text-white text-xs focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#fae69e] mb-1">
                      Expiry (MM / YY):
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061911] border border-[#c59b27]/40 text-white text-xs focus:outline-none focus:border-[#dfba5d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#fae69e] mb-1">
                      CVV (3 Digits):
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061911] border border-[#c59b27]/40 text-white text-xs focus:outline-none focus:border-[#dfba5d]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Net Banking */}
            {method === 'netbanking' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#fae69e]">
                  Select your Bank:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'sbi', name: 'State Bank of India' },
                    { id: 'hdfc', name: 'HDFC Bank' },
                    { id: 'icici', name: 'ICICI Bank' },
                    { id: 'pnb', name: 'Punjab National Bank' },
                    { id: 'bob', name: 'Bank of Baroda' },
                    { id: 'axis', name: 'Axis Bank' }
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`cursor-pointer p-2.5 rounded-lg border text-xs text-left transition-all ${
                        selectedBank === bank.id
                          ? 'bg-[#0e3b26] border-[#dfba5d] text-[#fae69e] font-bold'
                          : 'bg-[#071911] border-white/10 text-gray-300'
                      }`}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Action Button */}
            <div className="mt-6 pt-4 border-t border-[#c59b27]/30">
              <button
                type="button"
                id="confirm-pay-now-btn"
                onClick={processPayment}
                className="cursor-pointer w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-[0.99] text-[#082116] font-black text-lg sm:text-xl shadow-xl flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                <span>
                  {method === 'qr'
                    ? `I have paid ₹${totalAmount} (Confirm Order)`
                    : `Pay ₹${totalAmount} Securely Now`}
                </span>
              </button>

              <p className="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>100% Encrypted & Safe • Immediate confirmation and tracking receipt provided</span>
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
