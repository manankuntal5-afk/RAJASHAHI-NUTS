import React, { useState } from 'react';
import { Header } from './components/Header';
import { UrgencyBar } from './components/UrgencyBar';
import { GallerySection } from './components/GallerySection';
import { TrustBadges } from './components/TrustBadges';
import { AddressOrderForm } from './components/AddressOrderForm';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { OnlinePaymentModal } from './components/OnlinePaymentModal';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrderAddress, OrderConfirmation } from './types';
import { PRODUCT_DATA } from './data/productData';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
  Package,
  HeartHandshake
} from 'lucide-react';

export default function App() {
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [orderAddress, setOrderAddress] = useState<OrderAddress | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Directly opens the Payment / Checkout Modal on ANY "Order Now" click
  const handleOpenOrderPayment = () => {
    setIsPaymentOpen(true);
  };

  // Called when user submits the on-page address form
  const handleProceedFromForm = (addressData: OrderAddress) => {
    setOrderAddress(addressData);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (order: OrderConfirmation) => {
    setIsPaymentOpen(false);
    setConfirmedOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsPaymentOpen(false);
    setOrderAddress(null);
    setConfirmedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmedOrder) {
    return <OrderSuccessView order={confirmedOrder} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-[#061810] text-[#f7f3eb] font-sans antialiased selection:bg-[#dfba5d] selection:text-[#082218]">
      {/* Top Navigation Header */}
      <Header onOrderClick={handleOpenOrderPayment} onHomeClick={handleReset} />

      {/* 24-Hour Urgency & Live Stock Banner */}
      <UrgencyBar onOrderClick={handleOpenOrderPayment} />

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* HERO SECTION: Gallery Slider & Product Purchase Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: 5-Photo Gallery (Single Main Photo + side arrows + 5 thumbnails) */}
          <div className="lg:col-span-7 w-full">
            <GallerySection onOrderClick={handleOpenOrderPayment} />
          </div>

          {/* Right Column: Pricing, 4-Item Breakdown & Instant CTA */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Offer Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-[#dfba5d] to-[#c59b27] text-[#082218] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                24-Hour Special Promotional Deal
              </span>
              <span className="bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% In Stock & Ready
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#fae69e] font-black leading-tight">
                Rajshahi Nuts 4 KG Combo Pack
              </h1>
              <p className="text-sm sm:text-base text-[#d8cfbe] tracking-wide mt-1 font-medium">
                100% Pure, Natural & Hygienic Dry Fruits (राजशाही नट्स)
              </p>
            </div>

            {/* Ratings Bar */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#e2d9c8]">
              <div className="flex text-[#f5d061]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f5d061]" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-gray-400">({PRODUCT_DATA.totalReviews.toLocaleString('en-IN')} Customer Reviews)</span>
            </div>

            {/* What is in the Combo Pack: 4 Items Breakdown with Real Images */}
            <div className="bg-[#092419] border-2 border-[#dfba5d]/50 rounded-2xl p-4 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#dfba5d]/30">
                <span className="font-bold text-[#fae69e] text-sm flex items-center gap-1.5 font-cinzel">
                  <Package className="w-4 h-4 text-[#dfba5d]" /> Exactly 4 KG Included in Pack:
                </span>
                <span className="bg-[#dfba5d] text-[#082218] text-xs font-black px-2.5 py-0.5 rounded-full">
                  Net Weight: 4 KG
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Cashews */}
                <div className="flex items-center gap-2.5 bg-[#061c13] p-2 rounded-xl border border-white/5">
                  <img
                    src="/kaju.webp"
                    alt="1 KG Cashews (kaju)"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-contain bg-[#170a04] p-0.5 border border-[#dfba5d]/40"
                  />
                  <div>
                    <p className="font-bold text-white">1 KG Cashews (काजू)</p>
                    <p className="text-[10px] text-gray-400">kaju pouch</p>
                  </div>
                </div>

                {/* Almonds */}
                <div className="flex items-center gap-2.5 bg-[#061c13] p-2 rounded-xl border border-white/5">
                  <img
                    src="/badam.webp"
                    alt="1 KG Almonds (badam)"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-contain bg-[#170a04] p-0.5 border border-[#dfba5d]/40"
                  />
                  <div>
                    <p className="font-bold text-white">1 KG Almonds (बादाम)</p>
                    <p className="text-[10px] text-gray-400">badam pouch</p>
                  </div>
                </div>

                {/* Pistachios */}
                <div className="flex items-center gap-2.5 bg-[#061c13] p-2 rounded-xl border border-white/5">
                  <img
                    src="/pista.webp"
                    alt="1 KG Pistachios (pista)"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-contain bg-[#170a04] p-0.5 border border-[#dfba5d]/40"
                  />
                  <div>
                    <p className="font-bold text-white">1 KG Pistachios (पिस्ता)</p>
                    <p className="text-[10px] text-gray-400">pista pouch</p>
                  </div>
                </div>

                {/* Raisins */}
                <div className="flex items-center gap-2.5 bg-[#061c13] p-2 rounded-xl border border-white/5">
                  <img
                    src="/kishmish.webp"
                    alt="1 KG Raisins (kishmish)"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-contain bg-[#170a04] p-0.5 border border-[#dfba5d]/40"
                  />
                  <div>
                    <p className="font-bold text-white">1 KG Raisins (किशमिश)</p>
                    <p className="text-[10px] text-gray-400">kishmish pouch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-r from-[#170a04] via-[#241006] to-[#170a04] border-2 border-[#dfba5d] rounded-2xl p-5 shadow-xl">
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-400">Special Promotional Price:</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold-gradient tracking-tight">
                    ₹265
                  </span>
                  <span className="text-sm font-bold text-[#fae69e]">Only</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through block">
                    MRP ₹{PRODUCT_DATA.mrp}
                  </span>
                  <span className="bg-[#dc2626] text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                    92% OFF
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6ee7b7] font-semibold mt-1">
                🎉 You are saving ₹3,234! + 100% Free All-India Doorstep Delivery
              </p>

              {/* Urgency 24 Hours Pill */}
              <div className="mt-3 pt-3 border-t border-[#dfba5d]/30 flex items-center justify-between text-xs text-[#fed7aa]">
                <span className="flex items-center gap-1.5 font-bold text-[#f87171]">
                  <Clock className="w-3.5 h-3.5 animate-spin" /> Offer Valid for the Next 24 Hours Only!
                </span>
                <span className="text-gray-300">Limited Stock Available</span>
              </div>
            </div>

            {/* Primary Order Now Button - Triggers Instant Payment Modal */}
            <button
              id="hero-order-now-btn"
              onClick={handleOpenOrderPayment}
              className="cursor-pointer w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-[0.99] text-[#082218] font-black text-lg sm:text-xl shadow-2xl shadow-[#dfba5d]/30 transition-all flex items-center justify-center gap-3 uppercase tracking-wide border-2 border-white/40 animate-pulse-gold"
            >
              <Sparkles className="w-5 h-5" />
              <span>Order Now @ ₹265 (Pay Online)</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Guarantees List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-[#d8cfbe]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>100% Pure & Natural</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#38bdf8]" />
                <span>Free Home Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#dfba5d]" />
                <span>Hygienic Vacuum Packing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#ec4899]" />
                <span>7-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quality & Trust Badges */}
        <TrustBadges />

        {/* Customer Address & Order Form */}
        <AddressOrderForm onProceedToPayment={handleProceedFromForm} />

        {/* Real Customer Reviews */}
        <ReviewsSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onHomeClick={handleReset} />

      {/* Sticky Bottom Bar with Order Now Button */}
      <StickyBottomBar onOrderClick={handleOpenOrderPayment} onHomeClick={handleReset} />

      {/* Dedicated Online Payment Modal (Appears upon clicking Order Now) */}
      {isPaymentOpen && (
        <OnlinePaymentModal
          orderAddress={orderAddress}
          onBack={() => setIsPaymentOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
