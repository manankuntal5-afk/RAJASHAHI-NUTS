import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { XCircle, CheckCircle2, Clock, RotateCcw, Phone, Mail, AlertCircle, HelpCircle } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const CancellationPolicyPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="Cancellation Policy"
      subtitle="Easy and hassle-free cancellation with zero cancellation fees on Rajshahi Nuts."
      badge="Order Cancellation"
      icon={<XCircle className="w-4 h-4" />}
      breadcrumbs="Cancellation Policy"
      activePage="cancellation-policy"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Intro Card */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              1. Flexible Cancellation Window
            </h2>
            <p className="text-xs text-[#c8c0b0]">Cancel anytime before dispatch with zero penalty</p>
          </div>
        </div>
        <p className="text-sm text-[#e2d9c8] leading-relaxed">
          We understand that circumstances can change. At Rajshahi Nuts, you can cancel your order easily and receive a <strong>100% full refund</strong> with zero cancellation charges or hidden deductions.
        </p>
      </div>

      {/* When Can You Cancel */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <span>Cancellation Conditions &amp; Timelines</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#061c13] p-4 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="bg-[#10b981]/20 text-[#6ee7b7] text-xs font-bold px-2.5 py-0.5 rounded-full inline-block">
              Before Dispatch (Recommended)
            </span>
            <h4 className="font-bold text-white text-sm">Within 6 to 12 Hours of Booking</h4>
            <p className="text-xs text-[#c8c0b0] leading-relaxed">
              If your parcel has not yet left our Jaipur warehouse, we will cancel the order immediately upon your request and refund 100% of your payment within 24 hours.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-amber-500/30 space-y-2">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full inline-block">
              After Dispatch
            </span>
            <h4 className="font-bold text-white text-sm">Parcel Already in Transit</h4>
            <p className="text-xs text-[#c8c0b0] leading-relaxed">
              If the courier is already delivering your package, simply refuse to accept the parcel when the delivery executive arrives at your door. Once marked return-to-origin, your refund is processed.
            </p>
          </div>
        </div>
      </div>

      {/* How to Cancel in 2 Minutes */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
          2. How to Request Order Cancellation
        </h3>

        <p className="text-sm text-[#e2d9c8]">
          You can cancel your order through any of our direct customer care channels:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#dfba5d] uppercase block">Option A</span>
            <strong className="text-white text-sm block">WhatsApp Support</strong>
            <p className="text-xs text-gray-300">
              Send your Order ID with the message <em>"Cancel My Order"</em> to <strong>+91 98765 43210</strong>.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#dfba5d] uppercase block">Option B</span>
            <strong className="text-white text-sm block">Toll-Free Helpline</strong>
            <p className="text-xs text-gray-300">
              Call our support executives at <strong>1800-265-NUTS</strong> (9 AM to 9 PM, Mon - Sun).
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-[#dfba5d] uppercase block">Option C</span>
            <strong className="text-white text-sm block">Email Cancellation</strong>
            <p className="text-xs text-gray-300">
              Email <strong>care@rajshahinuts.com</strong> with your Order ID and registered mobile number.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Speed */}
      <div className="bg-gradient-to-r from-[#0d3322] via-[#144830] to-[#0d3322] border-2 border-[#10b981] rounded-2xl p-5 sm:p-7 shadow-xl space-y-2">
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-5 h-5 text-[#10b981]" />
          <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
            100% Full Refund Within 24 Hours
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          Upon cancellation, your full payment of <strong>₹265</strong> is sent directly back to the original UPI app (PhonePe, Google Pay, Paytm) or bank account from which payment was made. No coupons, no store credits — just your money directly back in your account.
        </p>
      </div>

      {/* Auto Cancellation by System */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#dfba5d]" />
          <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
            When Can Rajshahi Nuts Cancel an Order?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#c8c0b0] leading-relaxed">
          Rarely, an order may be auto-cancelled by our system if the delivery address is invalid/unreachable by all couriers, or if duplicate payments were recorded. In every such case, 100% of the customer's funds are immediately refunded and notified via SMS.
        </p>
      </div>
    </PageLayout>
  );
};

export default CancellationPolicyPage;
