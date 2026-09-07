import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Truck, Package, Clock, ShieldCheck, MapPin, CheckCircle2, Phone, Bell, Box } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const ShippingPolicyPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="Shipping Policy"
      subtitle="Fast, free, and fully insured all-India doorstep delivery for every Rajshahi Nuts order."
      badge="All-India Free Delivery"
      icon={<Truck className="w-4 h-4" />}
      breadcrumbs="Shipping Policy"
      activePage="shipping-policy"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* 100% Free Shipping Banner */}
      <div className="bg-gradient-to-r from-[#0a271c] via-[#103b29] to-[#0a271c] border-2 border-[#dfba5d]/60 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#061c13] border-2 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] shrink-0 shadow-lg">
          <Truck className="w-9 h-9 sm:w-10 sm:h-10" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-[#38bdf8] text-[#082218] text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
            Zero Shipping Fees
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-[#fae69e]">
            100% Free Doorstep Delivery Across All Indian Pincodes
          </h2>
          <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
            There are absolutely <strong>zero shipping charges, zero packaging fees, and zero doorstep delivery costs</strong>. Whether you live in a metro city, town, or rural village, your Rajshahi Nuts 4 KG Combo Pack is delivered 100% free of charge.
          </p>
        </div>
      </div>

      {/* Dispatch & Delivery Timelines */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              Dispatch Time &amp; Estimated Delivery Schedule
            </h3>
            <p className="text-xs text-[#c8c0b0]">Dispatched direct from our Jaipur packing hub</p>
          </div>
        </div>

        <p className="text-sm text-[#e2d9c8]">
          Every order is vacuum-packed fresh and handed over to our express courier partner within <strong>24 hours</strong> of placing your order.
        </p>

        {/* Region wise timeline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#38bdf8] block">North India &amp; Delhi NCR</span>
            <span className="text-lg font-black text-white block">2 - 3 Days</span>
            <p className="text-[11px] text-gray-400">Delhi, Rajasthan, Haryana, Punjab, UP, Uttarakhand</p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#38bdf8] block">West &amp; Central India</span>
            <span className="text-lg font-black text-white block">3 - 4 Days</span>
            <p className="text-[11px] text-gray-400">Maharashtra, Gujarat, Madhya Pradesh, Chhattisgarh</p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#38bdf8] block">South &amp; East India</span>
            <span className="text-lg font-black text-white block">3 - 4 Days</span>
            <p className="text-[11px] text-gray-400">Karnataka, Tamil Nadu, Telangana, AP, Bengal, Bihar</p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-xs font-bold text-[#38bdf8] block">North-East &amp; Remote</span>
            <span className="text-lg font-black text-white block">4 - 5 Days</span>
            <p className="text-[11px] text-gray-400">Assam, Odisha, J&amp;K, Himachal, Andaman &amp; Nicobar</p>
          </div>
        </div>
      </div>

      {/* Packaging Quality */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              5-Layer Protective Vacuum Packaging
            </h3>
            <p className="text-xs text-[#c8c0b0]">Locks in freshness, aroma, and crispness</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <strong className="text-white text-xs block">4 Separate 1 KG Pouches</strong>
            <p className="text-xs text-gray-300">
              Each nut variety (Kaju, Badam, Pista, Kishmish) is packed in its own separate 1 KG pouch so flavors do not mix.
            </p>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <strong className="text-white text-xs block">Airtight Vacuum Sealed</strong>
            <p className="text-xs text-gray-300">
              Oxygen is removed from the pouch before sealing to prevent moisture, sogginess, or insect infestation.
            </p>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <strong className="text-white text-xs block">Sturdy Corrugated Outer Box</strong>
            <p className="text-xs text-gray-300">
              All 4 pouches are packed inside a tough, double-walled box to survive courier loading and transit impacts.
            </p>
          </div>
        </div>
      </div>

      {/* Courier Partners & Real-Time Tracking */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#dfba5d]" />
          <span>Verified Courier Partners &amp; SMS Tracking</span>
        </h3>

        <p className="text-sm text-[#e2d9c8]">
          We partner exclusively with India's most dependable logistics networks:
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#fae69e]">
          <span className="bg-[#061c13] border border-white/10 px-3 py-1.5 rounded-lg">✓ Delhivery Express</span>
          <span className="bg-[#061c13] border border-white/10 px-3 py-1.5 rounded-lg">✓ Blue Dart Aviation</span>
          <span className="bg-[#061c13] border border-white/10 px-3 py-1.5 rounded-lg">✓ India Post Speed Post</span>
          <span className="bg-[#061c13] border border-white/10 px-3 py-1.5 rounded-lg">✓ Xpressbees</span>
          <span className="bg-[#061c13] border border-white/10 px-3 py-1.5 rounded-lg">✓ DTDC Express</span>
        </div>

        <div className="bg-[#061c13] p-4 rounded-xl border border-[#dfba5d]/30 text-xs sm:text-sm text-[#fed7aa] space-y-1">
          <p className="font-bold text-white">📱 Live Tracking on Your Mobile:</p>
          <p>
            As soon as your package is dispatched, you will receive an automated SMS containing your <strong>Tracking AWB Number</strong> and a direct tracking link to follow your parcel's progress until it reaches your doorstep.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPolicyPage;
