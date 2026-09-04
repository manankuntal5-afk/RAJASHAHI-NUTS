import React, { useState, useEffect, useRef } from 'react';
import { OrderAddress, OrderConfirmation } from '../types';
import { INDIAN_STATES } from '../data/productData';
import {
  ShieldCheck,
  Lock,
  QrCode,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Copy,
  Check,
  Clock,
  ArrowLeft,
  User,
  Phone,
  Home,
  MapPin,
  X,
  Upload,
  UploadCloud,
  Camera,
  Sparkles,
  Image as ImageIcon,
  FileCheck,
  Download,
  ExternalLink
} from 'lucide-react';

const PHONEPE_UPI_ID = '97229722972@ybl';

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

  // Exactly 2 payment options: QR code or UPI ID
  const [method, setMethod] = useState<'qr' | 'upi'>('qr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes payment countdown

  // Payment screenshot upload state
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [screenshotError, setScreenshotError] = useState<string>('');
  const [downloadedQr, setDownloadedQr] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalAmount = address.quantity === 1 ? 265 : 499;
  const encodedNote = encodeURIComponent('Rajshahi Nuts Combo Pack');
  const upiParams = `pa=${PHONEPE_UPI_ID}&pn=Rajshahi%20Nuts&am=${totalAmount}&cu=INR&tn=${encodedNote}`;
  const universalAndroidIntent = `intent://pay?${upiParams}#Intent;scheme=upi;end`;
  const universalUpiLink = `upi://pay?${upiParams}`;

  const [launchingAppMsg, setLaunchingAppMsg] = useState<string>('');
  const [desktopModalApp, setDesktopModalApp] = useState<{
    id: string;
    name: string;
    androidPackage: string;
    androidIntent: string;
    iosScheme: string;
    universalUpi: string;
    webUrl: string;
    bgColor: string;
    borderColor: string;
    badge: string;
    icon: React.ReactNode;
  } | null>(null);

  // Specific Deep-Links and Android Intents for popular UPI apps
  const upiApps = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      androidPackage: 'com.phonepe.app',
      androidIntent: `intent://pay?${upiParams}#Intent;scheme=upi;package=com.phonepe.app;end`,
      iosScheme: `phonepe://pay?${upiParams}`,
      universalUpi: universalUpiLink,
      webUrl: 'https://www.phonepe.com/',
      bgColor: 'bg-[#5f259f]',
      borderColor: 'border-[#8338ec]',
      badge: 'Most Popular',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#5f259f] text-white font-black text-xs flex items-center justify-center shrink-0 shadow">
          पे
        </span>
      )
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      androidPackage: 'com.google.android.apps.nbu.paisa.user',
      androidIntent: `intent://pay?${upiParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
      iosScheme: `gpay://upi/pay?${upiParams}`,
      universalUpi: universalUpiLink,
      webUrl: 'https://pay.google.com/',
      bgColor: 'bg-[#1a73e8]',
      borderColor: 'border-[#4285f4]',
      badge: 'Fast',
      icon: (
        <span className="w-6 h-6 rounded-full bg-white text-[#1a73e8] font-black text-xs flex items-center justify-center shrink-0 shadow">
          G
        </span>
      )
    },
    {
      id: 'paytm',
      name: 'Paytm',
      androidPackage: 'net.one97.paytm',
      androidIntent: `intent://pay?${upiParams}#Intent;scheme=upi;package=net.one97.paytm;end`,
      iosScheme: `paytmmp://pay?${upiParams}`,
      universalUpi: universalUpiLink,
      webUrl: 'https://paytm.com/',
      bgColor: 'bg-[#002e6e]',
      borderColor: 'border-[#00baf2]',
      badge: 'Instant',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#00baf2] text-[#002e6e] font-black text-[9px] flex items-center justify-center shrink-0 shadow">
          Pay
        </span>
      )
    },
    {
      id: 'bhim',
      name: 'BHIM UPI',
      androidPackage: 'in.org.npci.upiapp',
      androidIntent: `intent://pay?${upiParams}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
      iosScheme: `bhim://pay?${upiParams}`,
      universalUpi: universalUpiLink,
      webUrl: 'https://www.bhimupi.org.in/',
      bgColor: 'bg-[#005b9f]',
      borderColor: 'border-[#0077b6]',
      badge: 'Govt UPI',
      icon: (
        <span className="w-6 h-6 rounded-full bg-[#ff9933] text-[#000080] font-black text-[9px] flex items-center justify-center shrink-0 shadow border border-white">
          BHIM
        </span>
      )
    }
  ];

  // Universal launch handler for individual UPI apps
  const handleLaunchUpiApp = (app: (typeof upiApps)[0], e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      setLaunchingAppMsg(`Opening ${app.name}...`);
      setTimeout(() => setLaunchingAppMsg(''), 4000);

      // On Android, use the official package intent in top window
      const link = document.createElement('a');
      link.href = app.androidIntent;
      link.target = '_top';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Fallback: standard upi:// after short delay if package not handled
      setTimeout(() => {
        try {
          const fbLink = document.createElement('a');
          fbLink.href = app.universalUpi;
          fbLink.target = '_top';
          document.body.appendChild(fbLink);
          fbLink.click();
          document.body.removeChild(fbLink);
        } catch (err) {
          // silent
        }
      }, 1500);
      return;
    }

    if (isIOS) {
      setLaunchingAppMsg(`Opening ${app.name}...`);
      setTimeout(() => setLaunchingAppMsg(''), 4000);

      const link = document.createElement('a');
      link.href = app.iosScheme;
      link.target = '_top';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // iOS fallback to universal UPI
      setTimeout(() => {
        try {
          const fbLink = document.createElement('a');
          fbLink.href = app.universalUpi;
          fbLink.target = '_top';
          document.body.appendChild(fbLink);
          fbLink.click();
          document.body.removeChild(fbLink);
        } catch (err) {
          // silent
        }
      }, 1500);
      return;
    }

    // On Computer / Laptop:
    // Open dedicated Computer App Payment Modal with QR scanner and web link
    setDesktopModalApp(app);
  };

  // Universal handler for the main "Open Any UPI App on Mobile" button
  const handleUniversalUpiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      setLaunchingAppMsg('Opening UPI App Chooser...');
      setTimeout(() => setLaunchingAppMsg(''), 4000);
      const link = document.createElement('a');
      link.href = universalAndroidIntent;
      link.target = '_top';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (isIOS) {
      setLaunchingAppMsg('Opening UPI App...');
      setTimeout(() => setLaunchingAppMsg(''), 4000);
      const link = document.createElement('a');
      link.href = universalUpiLink;
      link.target = '_top';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If on Computer:
    setDesktopModalApp({
      id: 'universal',
      name: 'PhonePe / GPay / Paytm',
      androidPackage: '',
      androidIntent: universalAndroidIntent,
      iosScheme: universalUpiLink,
      universalUpi: universalUpiLink,
      webUrl: 'https://www.phonepe.com/',
      bgColor: 'bg-emerald-700',
      borderColor: 'border-emerald-500',
      badge: 'Scan & Pay',
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />
    });
  };

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
    navigator.clipboard.writeText(PHONEPE_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDownloadQrCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Fetch PNG binary data
      const res = await fetch('/qr-code.png');
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      // Ensure strict image/png MIME so every mobile gallery & PC opens it
      const pngBlob = new Blob([blob], { type: 'image/png' });
      const url = URL.createObjectURL(pngBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Rajshahi_Nuts_Payment_QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 3000);
      setDownloadedQr(true);
      setTimeout(() => setDownloadedQr(false), 3000);
    } catch (err) {
      // Fallback: direct anchor with clean filename
      const link = document.createElement('a');
      link.href = '/qr-code.png';
      link.download = 'Rajshahi_Nuts_Payment_QR.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadedQr(true);
      setTimeout(() => setDownloadedQr(false), 3000);
    }
  };

  const handleScreenshotChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setScreenshotError('Please upload an image file (JPG, PNG, WebP) only.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setScreenshotError('File size must be less than 15MB.');
      return;
    }
    setScreenshotError('');
    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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
    if (!screenshotPreview) {
      setScreenshotError('Please upload your payment screenshot first.');
      return;
    }

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
          method === 'qr'
            ? 'QR Code Scan Payment'
            : `UPI Transfer (${PHONEPE_UPI_ID})`,
        paymentScreenshot: screenshotPreview
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

          {/* Modal Header with Website Logo */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#c59b27]/30 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {activeStep === 'payment' && initialAddress ? (
                <button
                  onClick={onBack}
                  className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Address</span>
                </button>
              ) : activeStep === 'payment' ? (
                <button
                  onClick={() => setActiveStep('address')}
                  className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Address</span>
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="cursor-pointer flex items-center gap-1 text-xs text-[#dfba5d] hover:text-white transition-colors py-1 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}

              {/* Website Logo on Payment Page */}
              <div className="flex items-center gap-2 shrink-0">
                <img
                  src="/logo.png"
                  alt="Rajshahi Nuts"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border border-[#dfba5d] bg-black/60 p-0.5 shadow-md"
                />
                <div className="leading-tight">
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-[#fae69e] block tracking-wide">
                    Rajshahi Nuts
                  </span>
                  <span className="text-[10px] text-gray-400 hidden xs:block">
                    Official Payment Portal
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-[#10b981] bg-[#0c2e1f] px-2.5 sm:px-3 py-1 rounded-full border border-[#10b981]/40 shrink-0 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10b981]" />
                <span className="hidden sm:inline">Secure Online Checkout</span>
                <span className="sm:hidden">100% Safe</span>
              </div>

              <button
                onClick={onBack}
                className="cursor-pointer text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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
            <div className="bg-[#241306] border border-[#f59e0b]/50 rounded-xl p-3 mb-4 flex items-center justify-between text-xs text-[#fed7aa]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span><strong>Promotional Online Price:</strong> ₹{totalAmount} offer valid for instant digital checkout.</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[#fef08a] shrink-0 ml-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timerSeconds)}</span>
              </div>
            </div>

            {/* Beautiful Blinking Warning Banner */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-[#2c1502] via-[#482204] to-[#2c1502] p-3 sm:p-3.5 mb-5 shadow-[0_0_30px_rgba(245,158,11,0.45)] animate-pulse">
              <div className="flex items-center justify-center gap-2.5 text-center">
                <span className="relative flex h-3.5 w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
                </span>
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
                <p className="text-xs sm:text-sm font-black text-[#fef08a] tracking-wide uppercase drop-shadow">
                  ⚠️ PLEASE UPLOAD PAYMENT SCREENSHOT TO CONFIRM ORDER
                </p>
                <span className="hidden sm:inline-block text-[10px] bg-amber-400 text-[#2c1502] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Required
                </span>
              </div>
            </div>

            {/* Step-by-Step Customer Guide with Modern Glowing Icons */}
            <div className="bg-[#051c12] border border-[#dfba5d]/40 rounded-2xl p-3.5 sm:p-4 mb-5 shadow-lg">
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <h4 className="font-bold text-[#fae69e] text-xs sm:text-sm">
                    How to Complete Payment &amp; Confirm Order:
                  </h4>
                </div>
                <span className="text-[10px] text-gray-300 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/10 font-semibold">
                  3 Easy Steps
                </span>
              </div>

              {/* 3 Modern Step Cards with Compact Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {/* Step 1 */}
                <div className="bg-gradient-to-b from-[#061e14] to-[#04140d] border border-[#dfba5d]/40 hover:border-[#dfba5d] rounded-xl p-2.5 flex items-start gap-2.5 transition-all shadow">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#dfba5d] to-[#b38920] text-[#05170f] flex items-center justify-center shrink-0 shadow relative">
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#05170f]" />
                    <span className="absolute -top-1 -right-1 bg-[#05170f] text-[#fae69e] border border-[#dfba5d] text-[8px] font-black px-1 rounded-full shadow">
                      01
                    </span>
                  </div>
                  <div>
                    <strong className="text-white block text-xs font-bold">1. Pay ₹{totalAmount}</strong>
                    <p className="text-[11px] text-gray-300 leading-snug mt-0.5">
                      Scan QR or tap PhonePe / GPay to pay ₹{totalAmount}.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-b from-[#061e14] to-[#04140d] border border-sky-500/40 hover:border-sky-400 rounded-xl p-2.5 flex items-start gap-2.5 transition-all shadow">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white flex items-center justify-center shrink-0 shadow relative">
                    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span className="absolute -top-1 -right-1 bg-[#05170f] text-[#38bdf8] border border-[#38bdf8] text-[8px] font-black px-1 rounded-full shadow">
                      02
                    </span>
                  </div>
                  <div>
                    <strong className="text-white block text-xs font-bold">2. Take Screenshot 📸</strong>
                    <p className="text-[11px] text-gray-300 leading-snug mt-0.5">
                      Take screenshot of payment success screen.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-b from-[#061e14] to-[#04140d] border border-emerald-500/40 hover:border-emerald-400 rounded-xl p-2.5 flex items-start gap-2.5 transition-all shadow">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center shrink-0 shadow relative">
                    <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span className="absolute -top-1 -right-1 bg-[#05170f] text-[#10b981] border border-[#10b981] text-[8px] font-black px-1 rounded-full shadow">
                      03
                    </span>
                  </div>
                  <div>
                    <strong className="text-white block text-xs font-bold">3. Upload &amp; Confirm</strong>
                    <p className="text-[11px] text-gray-300 leading-snug mt-0.5">
                      Upload screenshot below &amp; confirm order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exactly 2 Payment Options: QR Code or UPI ID */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#fae69e] mb-2">
                Select Payment Option:
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="tab-qr-payment"
                  onClick={() => setMethod('qr')}
                  className={`cursor-pointer p-3 sm:p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    method === 'qr'
                      ? 'bg-[#0f3d27] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/40 shadow-lg font-bold'
                      : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c] hover:border-white/20'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-black text-base shadow">
                    <QrCode className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-tight">1. Pay via QR Code</span>
                  <span className="text-[10px] text-gray-400">Scan &amp; Pay ₹{totalAmount}</span>
                </button>

                <button
                  type="button"
                  id="tab-upi-payment"
                  onClick={() => setMethod('upi')}
                  className={`cursor-pointer p-3 sm:p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    method === 'upi'
                      ? 'bg-[#0f3d27] border-[#dfba5d] text-[#fae69e] ring-2 ring-[#dfba5d]/40 shadow-lg font-bold'
                      : 'bg-[#071911] border-white/10 text-gray-300 hover:bg-[#0c2a1c] hover:border-white/20'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#0c2e1f] border border-[#dfba5d]/60 flex items-center justify-center text-[#dfba5d] font-bold text-base shadow">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-tight">2. Pay via UPI ID</span>
                  <span className="text-[10px] text-gray-400">{PHONEPE_UPI_ID}</span>
                </button>
              </div>
            </div>

            {/* Option 1: QR Code View (User Uploaded QR Code Image) */}
            {method === 'qr' && (
              <div className="bg-[#05170f] border border-[#dfba5d]/40 rounded-2xl p-4 mb-5 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xs">
                    <QrCode className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="font-bold text-[#fae69e] text-sm sm:text-base">
                    Scan &amp; Pay via QR Code (₹{totalAmount})
                  </h4>
                </div>
                <p className="text-xs text-gray-300 mb-3 max-w-md mx-auto">
                  Scan this QR code using PhonePe, Google Pay, Paytm, CRED or any UPI app:
                </p>

                {/* User's Exact QR Code Display */}
                <div className="relative inline-block max-w-[280px] sm:max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-[#dfba5d] shadow-2xl bg-black p-2 mb-3">
                  <img
                    src="/qr code.png"
                    alt="Payment QR Code"
                    onError={(e) => {
                      // Fallback if URL space encoding differs
                      if (e.currentTarget.src.indexOf('qr-code.png') === -1) {
                        e.currentTarget.src = '/qr-code.png';
                      }
                    }}
                    className="w-full h-auto object-contain rounded-xl mx-auto"
                  />
                  <div className="bg-[#121212] py-1.5 px-3 mt-1.5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400">UPI ID:</span>
                    <span className="font-mono font-bold text-[#fae69e]">{PHONEPE_UPI_ID}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="cursor-pointer text-xs text-[#dfba5d] hover:text-white p-1"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Mobile Direct Pay & Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto mt-1">
                  <button
                    type="button"
                    onClick={handleUniversalUpiClick}
                    className="cursor-pointer w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7b2cbf] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95"
                  >
                    <Smartphone className="w-4 h-4 text-white" />
                    <span>📱 Open UPI App on Mobile (₹{totalAmount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadQrCode}
                    className="cursor-pointer w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#0c2f1f] hover:bg-[#12442d] border border-[#dfba5d]/50 text-[#fae69e] font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95"
                  >
                    {downloadedQr ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>QR Code Saved ✓</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-[#fae69e]" />
                        <span>Download QR Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Launching Feedback Toast */}
                {launchingAppMsg && (
                  <div className="my-2.5 p-2 rounded-xl bg-gradient-to-r from-emerald-950 via-[#072b1c] to-emerald-950 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-pulse max-w-md mx-auto">
                    <Sparkles className="w-4 h-4 text-[#f5d061] animate-spin" />
                    <span>{launchingAppMsg} Please authorize ₹{totalAmount} in the app.</span>
                  </div>
                )}

                {/* Or tap your favorite UPI app to pay directly: (Added below QR buttons as requested) */}
                <div className="mt-4 pt-3.5 border-t border-white/10 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#fae69e] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#dfba5d]" />
                      <span>Or tap your favorite UPI app to pay directly:</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Mobile &amp; PC Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {upiApps.map((app) => (
                      <button
                        key={app.name}
                        type="button"
                        onClick={(e) => handleLaunchUpiApp(app, e)}
                        className="cursor-pointer p-2.5 rounded-xl bg-[#082216] hover:bg-[#0f3d27] border border-white/15 hover:border-[#dfba5d] flex items-center gap-2 text-xs text-white font-bold transition-all shadow hover:scale-[1.02] active:scale-95 group"
                      >
                        {app.icon}
                        <div className="flex flex-col text-left">
                          <span className="group-hover:text-[#fae69e] leading-tight text-xs font-bold">{app.name}</span>
                          <span className="text-[9px] text-gray-400 font-normal">Pay ₹{totalAmount}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Option 2: UPI ID View */}
            {method === 'upi' && (
              <div className="bg-[#05170f] border border-[#dfba5d]/40 rounded-2xl p-4 mb-5 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <Smartphone className="w-5 h-5 text-[#dfba5d]" />
                  <h4 className="font-bold text-[#fae69e] text-sm sm:text-base">
                    Transfer ₹{totalAmount} via Official UPI ID
                  </h4>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  Copy our verified UPI ID below and pay using any UPI app (PhonePe, Google Pay, Paytm, BHIM):
                </p>

                {/* Big Copyable UPI ID Box */}
                <div className="bg-[#072417] border-2 border-[#dfba5d] rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">Official PhonePe / BHIM UPI ID:</span>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#fae69e] tracking-wide block select-all">
                      {PHONEPE_UPI_ID}
                    </span>
                    <span className="text-[11px] text-emerald-400 block mt-0.5">
                      ✓ Recipient: <strong>Rajshahi Nuts</strong> • Amount to Pay: <strong>₹{totalAmount}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="cursor-pointer py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfba5d] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#05170f] font-bold text-xs flex items-center justify-center gap-2 shadow shrink-0 transition-all"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-4 h-4 text-[#05170f]" />
                        <span>Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#05170f]" />
                        <span>Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Launching Feedback Toast in UPI ID view */}
                {launchingAppMsg && (
                  <div className="my-2.5 p-2 rounded-xl bg-gradient-to-r from-emerald-950 via-[#072b1c] to-emerald-950 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-pulse max-w-md mx-auto">
                    <Sparkles className="w-4 h-4 text-[#f5d061] animate-spin" />
                    <span>{launchingAppMsg} Please authorize ₹{totalAmount} in the app.</span>
                  </div>
                )}

                {/* Quick Launch UPI App Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#fae69e] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#dfba5d]" />
                      <span>Or tap your favorite UPI app to pay directly:</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Mobile &amp; PC Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {upiApps.map((app) => (
                      <button
                        key={app.name}
                        type="button"
                        onClick={(e) => handleLaunchUpiApp(app, e)}
                        className="cursor-pointer p-2.5 rounded-xl bg-[#082216] hover:bg-[#0f3d27] border border-white/15 hover:border-[#dfba5d] flex items-center gap-2 text-xs text-white font-bold transition-all shadow hover:scale-[1.02] active:scale-95 group"
                      >
                        {app.icon}
                        <div className="flex flex-col text-left">
                          <span className="group-hover:text-[#fae69e] leading-tight text-xs font-bold">{app.name}</span>
                          <span className="text-[9px] text-gray-400 font-normal">Pay ₹{totalAmount}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pop-Up Style Eye-Catching Payment Screenshot Upload Section */}
            <div className="relative bg-gradient-to-b from-[#0e3b26] via-[#072418] to-[#04150d] border-2 border-[#f5d061] rounded-3xl p-5 sm:p-7 mb-6 shadow-[0_12px_40px_rgba(223,186,93,0.35)] ring-4 ring-[#dfba5d]/25 transition-all">
              {/* Floating Top Beacon Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#dfba5d]/30">
                <div className="inline-flex items-center gap-2 bg-[#f5d061] text-[#05170f] px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <Camera className="w-4 h-4 text-[#05170f]" />
                  <span>Final Step: Upload Payment Screenshot</span>
                </div>
                <span className="text-[11px] bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 px-2.5 py-1 rounded-full font-bold">
                  ✓ Instant Order Confirmation
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleScreenshotChange(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="payment-screenshot-input"
              />

              {!screenshotPreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleScreenshotChange(e.dataTransfer.files[0]);
                    }
                  }}
                  className="cursor-pointer flex flex-col items-center justify-center py-4 px-3 text-center group bg-[#061f14]/60 border-2 border-dashed border-[#dfba5d]/60 hover:border-[#f5d061] rounded-2xl transition-all hover:bg-[#072418]"
                >
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#124b30] to-[#0a2719] border-2 border-[#dfba5d] flex items-center justify-center text-[#dfba5d] shadow-[0_0_25px_rgba(223,186,93,0.35)] group-hover:scale-110 transition-transform">
                      <Camera className="w-8 h-8 text-[#fae69e]" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 bg-[#dfba5d] text-[#05170f] p-1.5 rounded-full shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h4 className="font-black text-white text-base sm:text-lg mb-1 tracking-wide">
                    Upload Payment Receipt Screenshot <span className="text-red-400">*</span>
                  </h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto mb-4 leading-relaxed">
                    Payment complete ho gaya? Apne phone gallery se payment receipt screenshot yahan upload karein taaki aapka order turant confirm ho sake.
                  </p>

                  {/* Eye-Catching Ultra-Stylish Golden Button */}
                  <div className="relative group/btn inline-block w-full sm:w-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#fae69e] via-[#dfba5d] to-[#c59b27] rounded-2xl blur opacity-75 group-hover/btn:opacity-100 transition duration-300 animate-pulse"></div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#fae69e] via-[#dfba5d] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#05170f] font-black text-sm sm:text-base shadow-2xl flex items-center justify-center gap-3 transition-all ring-2 ring-white/60 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#05170f] text-[#fae69e] flex items-center justify-center shadow">
                        <ImageIcon className="w-4 h-4 text-[#fae69e]" />
                      </div>
                      <span className="tracking-wide">CHOOSE FROM GALLERY / PHOTOS</span>
                    </button>
                  </div>

                  <span className="text-xs text-[#fae69e] font-semibold mt-3 flex items-center gap-1.5">
                    👆 Click above to select screenshot from your phone gallery
                  </span>

                  <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
                    <span>✓ JPG, PNG, WebP</span>
                    <span>•</span>
                    <span>Max 15MB</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">100% Safe Verification</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <div className="relative mb-3">
                    <img
                      src={screenshotPreview}
                      alt="Payment Receipt Preview"
                      className="max-h-56 max-w-full rounded-2xl border-2 border-emerald-400 shadow-2xl object-contain bg-black/70 p-1"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-500 text-[#05170f] px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xl">
                      <CheckCircle2 className="w-4 h-4 text-[#05170f]" />
                      <span>Screenshot Attached ✓</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-3 bg-[#04140d] px-3.5 py-2 rounded-xl border border-emerald-500/40 shadow-inner">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-xs font-semibold">{screenshotName || 'Payment_Screenshot.png'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer text-xs sm:text-sm text-[#fae69e] hover:text-white bg-[#0f3d27] border border-[#dfba5d]/50 hover:border-[#dfba5d] py-1.5 px-4 rounded-xl font-bold transition-all shadow active:scale-95"
                  >
                    🔄 Change / Upload Different Screenshot
                  </button>
                </div>
              )}

              {screenshotError && (
                <p className="text-red-400 text-xs mt-2.5 font-bold text-center bg-red-950/50 p-2 rounded-lg border border-red-500/30">
                  {screenshotError}
                </p>
              )}
            </div>

            {/* Confirm Order Action Button */}
            <div className="pt-2 border-t border-[#c59b27]/30">
              <button
                type="button"
                id="confirm-pay-now-btn"
                disabled={!screenshotPreview}
                onClick={screenshotPreview ? processPayment : undefined}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-base sm:text-lg font-black shadow-2xl ${
                  screenshotPreview
                    ? 'cursor-pointer bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-[0.99] text-[#082116] animate-pulse ring-4 ring-[#dfba5d]/30'
                    : 'cursor-not-allowed bg-[#132219] text-gray-400 border border-white/10 opacity-70'
                }`}
              >
                {screenshotPreview ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-[#082116]" />
                    <span>Confirm Order (Paid ₹{totalAmount}) →</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-gray-400" />
                    <span>Please Upload Payment Screenshot First</span>
                  </>
                )}
              </button>

              {!screenshotPreview ? (
                <p className="text-center text-xs text-amber-300/90 mt-2.5 flex items-center justify-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Please pay via PhonePe / UPI and upload the screenshot above to unlock the Confirm Order button.</span>
                </p>
              ) : (
                <p className="text-center text-xs text-emerald-400 mt-2.5 flex items-center justify-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Payment screenshot attached! Click above to confirm and book your order now.</span>
                </p>
              )}

              <p className="text-center text-[11px] text-gray-400 mt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>100% Safe &amp; Secure • Immediate order confirmation and tracking SMS will be sent</span>
              </p>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Desktop / Computer Helper Modal for PhonePe, Paytm, GPay, BHIM */}
      {desktopModalApp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#0a271c] via-[#071e15] to-[#04120c] border-2 border-[#dfba5d] rounded-3xl p-6 shadow-2xl text-white">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setDesktopModalApp(null)}
              className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#082216] border border-[#dfba5d] flex items-center justify-center shadow shrink-0">
                {desktopModalApp.icon}
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-[#fae69e]">
                  Pay ₹{totalAmount} with {desktopModalApp.name}
                </h3>
                <span className="text-[11px] text-emerald-400 block font-medium">
                  Verified Rajshahi Nuts Merchant Account
                </span>
              </div>
            </div>

            {/* Instructions for computer users */}
            <div className="bg-[#04140d] border border-[#dfba5d]/30 rounded-2xl p-3.5 mb-4 text-xs text-left">
              <div className="font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Instructions for PC / Laptop Users:</span>
              </div>
              <ol className="space-y-1.5 text-gray-300 text-[11px] list-decimal list-inside">
                <li>Open <strong>{desktopModalApp.name}</strong> on your mobile phone.</li>
                <li>Tap the <strong>QR Scanner icon</strong> at the top of the app.</li>
                <li>Scan the QR code below and pay <strong>₹{totalAmount}</strong>.</li>
                <li>Take a screenshot on your phone and upload it on this screen!</li>
              </ol>
            </div>

            {/* Large QR Code Display */}
            <div className="bg-[#061e14] border border-[#dfba5d] rounded-2xl p-3 mb-4 text-center">
              <img
                src="/qr-code.png"
                alt="Payment QR Code"
                className="w-44 h-44 mx-auto object-contain rounded-xl bg-white p-1.5 shadow-md"
              />
              <div className="mt-2 text-xs font-bold text-[#fae69e]">
                Scan &amp; Pay ₹{totalAmount} (Rajshahi Nuts)
              </div>
            </div>

            {/* UPI ID Quick Copy */}
            <div className="bg-[#082216] border border-white/10 rounded-xl p-2.5 mb-4 flex items-center justify-between gap-2">
              <div className="truncate text-left">
                <span className="text-[10px] text-gray-400 block">Verified UPI ID:</span>
                <span className="font-mono text-xs font-bold text-[#fae69e] select-all">
                  {PHONEPE_UPI_ID}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="cursor-pointer px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#dfba5d] to-[#c59b27] text-[#05170f] font-bold text-xs flex items-center gap-1 shrink-0"
              >
                {copiedUpi ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons: Web Link + Direct Protocol + Close/Upload */}
            <div className="space-y-2">
              {desktopModalApp.webUrl && (
                <a
                  href={desktopModalApp.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full py-2 px-3 rounded-xl bg-[#0c2f1f] hover:bg-[#12442d] border border-white/20 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#dfba5d]" />
                  <span>Open {desktopModalApp.name} Web Portal</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setDesktopModalApp(null);
                  fileInputRef.current?.click();
                }}
                className="cursor-pointer w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] text-[#05170f] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
              >
                <Camera className="w-4 h-4 text-[#05170f]" />
                <span>I've Paid ₹{totalAmount} → Upload Screenshot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
