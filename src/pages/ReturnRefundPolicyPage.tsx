import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, HeartHandshake, Phone, Mail, Clock, ArrowRight, Copy, Check, X, ExternalLink } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const ReturnRefundPolicyPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const websiteEmail = 'care@rajshahinuts.com';

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(websiteEmail);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <PageLayout
      title="Return and Refund Policy"
      subtitle="100% Risk-Free Shopping with our 7-Day Money-Back Guarantee on Rajshahi Nuts."
      badge="7-Day Guarantee"
      icon={<RotateCcw className="w-4 h-4" />}
      breadcrumbs="Return and Refund Policy"
      activePage="return-refund-policy"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* 7-Day Guarantee Hero Badge */}
      <div className="bg-gradient-to-r from-[#0d3322] via-[#144830] to-[#0d3322] border-2 border-[#10b981] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#072014] border-2 border-[#10b981] flex items-center justify-center text-[#10b981] shrink-0 shadow-lg">
          <RotateCcw className="w-10 h-10 animate-spin-slow" />
        </div>
        <div>
          <span className="bg-[#10b981] text-[#05170f] text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
            Customer Peace of Mind
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-[#fae69e] mb-1">
            7-Day 100% Money-Back Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
            At Rajshahi Nuts, our goal is 100% customer satisfaction. If you are not satisfied with the quality, crunch, or freshness of any dry fruit in your 4 KG Combo Pack, we will refund your money quickly without any arguments.
          </p>
        </div>
      </div>

      {/* When Can You Claim a Refund */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#dfba5d]" />
          <span>When Can You Request a Return or Refund?</span>
        </h3>

        <p className="text-sm text-[#e2d9c8]">
          You can request a full refund or free replacement within <strong>7 days of parcel delivery</strong> for any of the following reasons:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Damaged or Torn Parcel:</strong> Outer box or internal pouch found torn, punctured, or tampered during transit.
            </span>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Freshness / Quality Issue:</strong> Dry fruits do not meet your freshness, aroma, or crispness expectations.
            </span>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Weight Discrepancy:</strong> Total weight is less than the promised 4 KG (1 KG each of Kaju, Badam, Pista, Kishmish).
            </span>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Wrong or Missing Item:</strong> Any item missing or incorrect variety delivered.
            </span>
          </div>
        </div>
      </div>

      {/* Simple 3-Step Return & Refund Process */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#dfba5d]" />
          <span>Super Easy 3-Step Refund Process</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Step 1 */}
          <div className="bg-[#061c13] p-4 rounded-xl border border-[#dfba5d]/30 relative space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#dfba5d] text-[#082218] font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-white text-sm">Send a Quick Message</h4>
            <p className="text-xs text-[#c8c0b0] leading-relaxed">
              Take a quick photo or short video of the package and WhatsApp us at <strong>+91 98765 43210</strong> or email <strong>care@rajshahinuts.com</strong> with your Order ID.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#061c13] p-4 rounded-xl border border-[#38bdf8]/30 relative space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#38bdf8] text-[#082218] font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-white text-sm">Fast Verification (2 Hours)</h4>
            <p className="text-xs text-[#c8c0b0] leading-relaxed">
              Our customer care manager reviews your message within 2 to 4 hours and instantly approves the refund or replacement.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#061c13] p-4 rounded-xl border border-[#10b981]/30 relative space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#10b981] text-[#082218] font-black text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-white text-sm">Instant UPI Refund</h4>
            <p className="text-xs text-[#c8c0b0] leading-relaxed">
              Your entire ₹265 amount is sent directly to your PhonePe, Google Pay, Paytm, or bank account within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* No Pickup Hassle for Food Items */}
      <div className="bg-[#061c13] border border-amber-400/40 rounded-2xl p-5 shadow-lg flex items-start gap-3.5">
        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-[#fae69e] text-sm sm:text-base">
            Zero Pickup Hassle for Food Safety
          </h4>
          <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
            Because dry fruits are edible food items, you do not need to pack and return opened or spoiled packets through courier. Once verified with a photo, we issue the refund directly to your UPI ID without requiring you to wait for a courier return pickup.
          </p>
        </div>
      </div>

      {/* Contact Helpline */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e] mb-1">
            Need Help with a Refund or Replacement?
          </h4>
          <p className="text-xs text-[#c8c0b0]">
            Our support desk is open from 9:00 AM to 9:00 PM IST all 7 days of the week.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:18002656887"
            className="cursor-pointer inline-flex items-center gap-2 bg-[#dfba5d] hover:bg-[#fae69e] text-[#082218] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow"
          >
            <Phone className="w-4 h-4" />
            <span>Call 1800-265-NUTS</span>
          </a>

          <button
            type="button"
            id="refund-email-support-btn"
            onClick={() => setShowEmailModal(true)}
            className="cursor-pointer inline-flex items-center gap-2 bg-[#061c13] hover:bg-[#0f3d2b] border-2 border-[#dfba5d] text-[#fae69e] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md group"
            title="Click to view Official Website Email ID"
          >
            <Mail className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
            <span>Email Support ({websiteEmail})</span>
          </button>
        </div>
      </div>

      {/* Pop-up Modal to view Official Website Email ID when clicked */}
      {showEmailModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-[#092218] border-2 border-[#dfba5d] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 text-center relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon Button */}
            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close Email Popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Mail Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfba5d] via-[#fae69e] to-[#996515] p-1 mx-auto shadow-lg shadow-[#dfba5d]/20">
              <div className="w-full h-full rounded-full bg-[#061c13] flex items-center justify-center text-[#dfba5d]">
                <Mail className="w-8 h-8 text-[#38bdf8]" />
              </div>
            </div>

            <div>
              <span className="bg-[#dfba5d]/20 text-[#fae69e] text-xs font-bold px-3 py-1 rounded-full border border-[#dfba5d]/40 uppercase tracking-wider inline-block mb-2">
                Official Website Support Email
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#fae69e]">
                राजशाही नट्स आधिकारिक ईमेल आईडी
              </h3>
              <p className="text-xs text-[#c8c0b0] mt-1">
                For returns, refunds, order tracking or product assistance, you can email us directly.
              </p>
            </div>

            {/* Prominent Website Email Display Box */}
            <div className="bg-[#05170f] border-2 border-[#38bdf8] rounded-2xl p-4 sm:p-5 text-center space-y-2 shadow-inner">
              <span className="text-[11px] font-semibold text-[#38bdf8] uppercase tracking-wider block">
                Website Official Email ID (वेबसाइट की ईमेल आईडी):
              </span>
              <p className="font-mono text-lg sm:text-2xl font-black text-white select-all tracking-wide break-all">
                {websiteEmail}
              </p>
              <p className="text-[11px] text-[#a3b899]">
                Response time: Within 2 to 4 hours (9:00 AM - 9:00 PM IST)
              </p>
            </div>

            {/* Action Buttons: Copy Email & Send Mail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`cursor-pointer w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow ${
                  isCopied
                    ? 'bg-[#10b981] text-[#05170f]'
                    : 'bg-[#dfba5d] hover:bg-[#fae69e] text-[#082218]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ईमेल कॉपी हो गई (Copied!)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email ID (कॉपी करें)</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${websiteEmail}?subject=Rajshahi%20Nuts%20Return%20and%20Refund%20Inquiry`}
                className="cursor-pointer w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-[#061c13] hover:bg-[#0f3d2b] border border-[#dfba5d]/60 text-[#fae69e] transition-all shadow"
              >
                <ExternalLink className="w-4 h-4 text-[#38bdf8]" />
                <span>Send Email (ईमेल भेजें)</span>
              </a>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="cursor-pointer text-xs text-gray-400 hover:text-white underline underline-offset-4"
              >
                Close (बंद करें)
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ReturnRefundPolicyPage;
