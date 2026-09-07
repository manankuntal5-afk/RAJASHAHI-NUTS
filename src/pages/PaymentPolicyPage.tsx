import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { CreditCard, ShieldCheck, CheckCircle2, QrCode, Smartphone, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const PaymentPolicyPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="Payment Policy"
      subtitle="100% safe, encrypted, and transparent payment methods for purchasing Rajshahi Nuts."
      badge="Secure Payments"
      icon={<CreditCard className="w-4 h-4" />}
      breadcrumbs="Payment Policy"
      activePage="payment-policy"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Pricing Transparency */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              1. 100% Transparent Pricing - No Hidden Extra Charges
            </h2>
            <p className="text-xs text-[#c8c0b0]">What you see is exactly what you pay</p>
          </div>
        </div>

        <p className="text-sm text-[#e2d9c8] leading-relaxed">
          The total payable amount for the Rajshahi Nuts 4 KG Combo Pack is strictly <strong>₹265</strong>. There are no surprise checkout fees, no convenience surcharges, no GST additions, and no shipping charges added at the payment step.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
          <div className="bg-[#061c13] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block">Product MRP</span>
            <strong className="text-white text-sm line-through">₹3,499</strong>
          </div>

          <div className="bg-[#061c13] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block">Offer Discount</span>
            <strong className="text-[#10b981] text-sm">- ₹3,234 (92%)</strong>
          </div>

          <div className="bg-[#061c13] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block">Delivery Charges</span>
            <strong className="text-[#38bdf8] text-sm">₹0 (Free)</strong>
          </div>

          <div className="bg-[#0e3b26] p-3 rounded-xl border border-[#dfba5d]/60">
            <span className="text-[11px] text-[#fae69e] block font-bold">Total You Pay</span>
            <strong className="text-amber-400 text-base font-black">₹265 Only</strong>
          </div>
        </div>
      </div>

      {/* Supported Payment Methods */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#dfba5d]" />
          <span>2. Accepted Secure Payment Methods</span>
        </h3>

        <p className="text-sm text-[#e2d9c8]">
          You can pay smoothly using any of India's preferred digital payment channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <Smartphone className="w-6 h-6 text-[#10b981]" />
            <strong className="text-white text-sm block">UPI Direct Apps</strong>
            <p className="text-xs text-[#c8c0b0]">
              PhonePe, Google Pay (GPay), Paytm, BHIM UPI, Cred, and Amazon Pay.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <QrCode className="w-6 h-6 text-[#38bdf8]" />
            <strong className="text-white text-sm block">Instant Dynamic QR Code</strong>
            <p className="text-xs text-[#c8c0b0]">
              Scan the dynamic QR code directly using any mobile camera or banking app.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <CreditCard className="w-6 h-6 text-[#dfba5d]" />
            <strong className="text-white text-sm block">Cards &amp; Net Banking</strong>
            <p className="text-xs text-[#c8c0b0]">
              RuPay, Visa, MasterCard debit/credit cards, and SBI/HDFC/ICICI Net Banking.
            </p>
          </div>
        </div>
      </div>

      {/* Why 100% Online Payment */}
      <div className="bg-[#061c13] border border-[#dfba5d]/30 rounded-2xl p-5 sm:p-6 space-y-3">
        <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
          3. Why Is Cash on Delivery (COD) Not Available?
        </h3>
        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          Courier services charge extra handling fees (₹120 to ₹180 per parcel) for Cash on Delivery, plus return postage if someone rejects the parcel at the door. If we added COD fees, this 4 KG combo pack would cost over ₹600.
        </p>
        <p className="text-xs sm:text-sm text-[#fed7aa]">
          By keeping payments 100% online, we cut out all courier surcharges and pass that exact savings directly to you at the subsidized price of <strong>₹265</strong>. You are always 100% protected by our 7-Day Money-Back Guarantee.
        </p>
      </div>

      {/* 14-Second Verification & Screenshot Upload */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <RefreshCw className="w-5 h-5 text-[#dfba5d]" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              4. 14-Second Verification &amp; Payment Screenshot
            </h3>
            <p className="text-xs text-[#c8c0b0]">Guaranteed fast order confirmation</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          After completing your payment on PhonePe, Paytm, or Google Pay, our secure gateway runs a 14-second verification process to confirm the transaction. If banking servers are busy or slow, you can simply upload a screenshot of your payment receipt or enter the 12-digit UTR reference number. Our packing team immediately locks in your order and prints the shipping label.
        </p>
      </div>

      {/* Double Deduction / Failed Payment Guarantee */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#10b981]" />
          <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
            5. Bank Failed Deduction Protection
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#c8c0b0] leading-relaxed">
          If money is debited from your bank account due to network lag but the website does not display immediate confirmation, please do not worry! Under RBI guidelines, either our system will automatically claim and book your order upon receiving the banking webhook, or your bank will automatically reverse the funds to your account within 24 to 48 hours.
        </p>
      </div>
    </PageLayout>
  );
};

export default PaymentPolicyPage;
