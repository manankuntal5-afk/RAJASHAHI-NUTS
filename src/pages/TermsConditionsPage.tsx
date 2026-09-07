import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { FileText, CheckCircle2, AlertCircle, Scale, ShieldCheck, Clock, PackageCheck, MapPin } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const TermsConditionsPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="Terms and Conditions"
      subtitle="Clear and fair terms of service for purchasing our Rajshahi Nuts 4 KG Dry Fruits Combo Pack."
      badge="Legal & Purchase Agreement"
      icon={<FileText className="w-4 h-4" />}
      breadcrumbs="Terms and Conditions"
      activePage="terms-conditions"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Intro Card */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              1. Welcome to Rajshahi Nuts
            </h2>
            <p className="text-xs text-[#c8c0b0]">Effective Date: January 2026</p>
          </div>
        </div>
        <p className="text-[#e2d9c8] leading-relaxed">
          These Terms and Conditions govern your purchase of the <strong>Rajshahi Nuts 4 KG Combo Pack</strong> on our website. By placing an order, you agree to these clear and honest terms designed to protect both the customer and the seller.
        </p>
      </div>

      {/* Product Description & Exactly What You Receive */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <PackageCheck className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            2. Product Contents & Weight Guarantee
          </h2>
        </div>

        <p className="text-[#e2d9c8]">
          When you purchase the Rajshahi Nuts 4 KG Combo Pack, you receive exactly what is described on our website:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
            <div>
              <strong className="text-white block text-sm">1 KG Premium Cashews (kaju)</strong>
              <span className="text-xs text-gray-400">Jumbo whole W-180 grade white cashews</span>
            </div>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
            <div>
              <strong className="text-white block text-sm">1 KG California Almonds (badam)</strong>
              <span className="text-xs text-gray-400">Naturally crunchy with high natural oil</span>
            </div>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
            <div>
              <strong className="text-white block text-sm">1 KG Roasted Pistachios (pista)</strong>
              <span className="text-xs text-gray-400">Lightly salted with natural cracked shell</span>
            </div>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
            <div>
              <strong className="text-white block text-sm">1 KG Sweet Golden Raisins (kishmish)</strong>
              <span className="text-xs text-gray-400">Juicy, naturally dried long seedless raisins</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#fed7aa] bg-[#05170f] p-3 rounded-xl border border-[#dfba5d]/30">
          Total net weight is <strong>exactly 4 Kilograms (4,000 grams)</strong> packed in 4 individual heavy-duty, food-grade vacuum pouches.
        </p>
      </div>

      {/* Pricing & Promotional Offer */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            3. Promotional Pricing & No Hidden Charges
          </h2>
        </div>

        <p className="text-[#e2d9c8] text-sm leading-relaxed">
          The MRP of the 4 KG Combo Pack is ₹3,499. Under our special direct promotional campaign, the total discounted price is only <strong>₹265</strong>.
        </p>

        <ul className="text-xs sm:text-sm text-[#c8c0b0] space-y-2 list-disc pl-5">
          <li>The price of ₹265 includes all applicable taxes (GST).</li>
          <li>All-India doorstep delivery is <strong>100% Free</strong>. There are zero packing or shipping charges.</li>
          <li>This special promotional discount is limited to individual household consumption.</li>
        </ul>
      </div>

      {/* Accurate Customer Information */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            4. Customer Responsibility for Delivery Address
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          To ensure timely doorstep delivery, the customer is requested to provide:
        </p>

        <div className="bg-[#061c13] p-4 rounded-xl border border-white/5 space-y-1.5 text-xs text-[#c8c0b0]">
          <p>• A complete home address with house number, building/street name, and a nearby landmark.</p>
          <p>• Correct 6-digit postal PIN code.</p>
          <p>• An active mobile number reachable by the courier delivery executive.</p>
        </div>
      </div>

      {/* Quality Standards & 7-Day Guarantee */}
      <div className="bg-gradient-to-r from-[#0a271c] via-[#103b29] to-[#0a271c] border-2 border-[#dfba5d]/50 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#061c13] text-[#10b981] flex items-center justify-center border border-[#10b981]/50">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            5. FSSAI Quality Standard & 7-Day Refund Policy
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          All dry fruits packed by Rajshahi Nuts comply strictly with the food safety standards established by the Food Safety and Standards Authority of India (FSSAI Reg. #10022013000845). If the dry fruits are damaged or not fresh upon delivery, you are fully covered under our <strong>7-Day Money-Back Guarantee</strong>.
        </p>
      </div>

      {/* Governing Law */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#dfba5d]" />
          <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
            6. Governing Jurisdiction
          </h2>
        </div>
        <p className="text-xs text-[#c8c0b0] leading-relaxed">
          Any questions or disputes regarding this purchase agreement shall be handled under the laws of the Republic of India and subject to the jurisdiction of the competent courts in Jaipur, Rajasthan.
        </p>
      </div>
    </PageLayout>
  );
};

export default TermsConditionsPage;
