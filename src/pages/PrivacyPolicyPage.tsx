import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { ShieldCheck, Lock, EyeOff, UserCheck, Bell, Database, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Your personal information and trust are 100% safe with Rajshahi Nuts. Read how we protect your details."
      badge="Customer Data Protection"
      icon={<ShieldCheck className="w-4 h-4" />}
      breadcrumbs="Privacy Policy"
      activePage="privacy-policy"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Introduction Card */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
              1. Our Promise to Protect Your Privacy
            </h2>
            <p className="text-xs text-[#c8c0b0]">Last Updated: January 2026</p>
          </div>
        </div>
        <p className="text-[#e2d9c8] leading-relaxed">
          Welcome to <strong>Rajshahi Nuts</strong>. We understand that your personal and financial information is valuable and private. This Privacy Policy explains in simple and clear words what information we collect when you order from our website, how we use it to deliver your 4 KG Dry Fruits Combo Pack, and how we protect it.
        </p>
      </div>

      {/* Information We Collect */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            2. Information We Collect from You
          </h2>
        </div>

        <p className="text-[#e2d9c8]">
          When you place an order on Rajshahi Nuts, we collect only the necessary details needed to confirm your order and deliver the parcel to your doorstep:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-[#fae69e] block text-sm">Delivery Information</span>
            <ul className="text-xs text-[#c8c0b0] space-y-1.5 list-disc pl-4">
              <li>Your Full Name</li>
              <li>Complete Home Address & Landmark</li>
              <li>City, District, State & Pincode</li>
            </ul>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-[#fae69e] block text-sm">Contact Information</span>
            <ul className="text-xs text-[#c8c0b0] space-y-1.5 list-disc pl-4">
              <li>Primary Mobile Number (for delivery calls)</li>
              <li>Alternate Phone Number (optional)</li>
              <li>Email address (for invoice receipt)</li>
            </ul>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-[#fae69e] block text-sm">Payment Verification</span>
            <ul className="text-xs text-[#c8c0b0] space-y-1.5 list-disc pl-4">
              <li>UPI Transaction / Reference Number (UTR)</li>
              <li>Payment receipt screenshot (for instant booking)</li>
              <li>Order amount paid (₹265)</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#123825] p-3.5 rounded-xl border border-[#10b981]/40 flex items-center gap-2.5 text-xs text-[#6ee7b7]">
          <ShieldCheck className="w-5 h-5 text-[#10b981] shrink-0" />
          <span>
            <strong>Zero Bank Details Stored:</strong> We never ask for or store your UPI PIN, ATM PIN, bank password, or credit/debit card numbers. All payments are processed securely via your trusted UPI apps (PhonePe, GPay, Paytm).
          </span>
        </div>
      </div>

      {/* How We Use Your Data */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            3. How We Use Your Information
          </h2>
        </div>

        <p className="text-[#e2d9c8]">
          We use your information strictly for genuine order fulfillment purposes:
        </p>

        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-2.5 bg-[#061c13] p-3 rounded-xl border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Fast Dispatch & Doorstep Delivery:</strong> Sharing your address with our verified courier delivery partners (Delhivery, Blue Dart, Speed Post) so they can locate your house easily.
            </span>
          </div>

          <div className="flex items-start gap-2.5 bg-[#061c13] p-3 rounded-xl border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>SMS Tracking Notifications:</strong> Sending you tracking links, dispatch updates, and out-for-delivery alerts directly on your phone.
            </span>
          </div>

          <div className="flex items-start gap-2.5 bg-[#061c13] p-3 rounded-xl border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#e2d9c8]">
              <strong>Customer Support & Returns:</strong> Helping you quickly if you have any questions regarding your order, delivery delay, or 7-day refund assistance.
            </span>
          </div>
        </div>
      </div>

      {/* No Spam & No Data Selling Guarantee */}
      <div className="bg-gradient-to-r from-[#170a04] via-[#241006] to-[#170a04] border-2 border-[#dfba5d] rounded-2xl p-5 sm:p-7 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#061c13] text-amber-400 flex items-center justify-center border border-amber-400/50">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            4. 100% No-Spam & No-Data-Selling Guarantee
          </h2>
        </div>

        <p className="text-[#e2d9c8] text-sm leading-relaxed">
          At Rajshahi Nuts, we hate spam calls and unwanted telemarketing messages just as much as you do.
        </p>

        <div className="bg-[#05170f] p-4 rounded-xl border border-[#dfba5d]/30 text-xs sm:text-sm text-[#fed7aa] space-y-2">
          <p>
            • We <strong>NEVER</strong> sell, rent, trade, or share your mobile number or personal data with any third-party loan apps, marketing agencies, or call centers.
          </p>
          <p>
            • Your phone number is only used to deliver your dry fruits package safely and provide order support.
          </p>
        </div>
      </div>

      {/* Cookies & Google Analytics Tag */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#fae69e] flex items-center justify-center border border-[#dfba5d]/50">
            <Bell className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
            5. Website Cookies & Google Tags
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
          Our website uses standard Google Tag (Google Analytics &amp; Google Ads) scripts to monitor website traffic speed, track ad performance, and ensure smooth checkout. These scripts do not read your private files or personal photos. You can easily clear your browser cookies anytime from your browser settings.
        </p>
      </div>

      {/* Your Rights & Contact Information */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-4">
        <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#fae69e]">
          6. Your Rights &amp; Privacy Officer Contact
        </h2>

        <p className="text-xs sm:text-sm text-[#e2d9c8]">
          You have full rights over your data. If you wish to update your delivery address, check what details we have on file, or request removal of your contact details after order delivery, please reach out to our team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#dfba5d] shrink-0" />
            <div>
              <span className="text-[11px] text-gray-400 block">Email Us at:</span>
              <a href="mailto:care@rajshahinuts.com" className="text-xs sm:text-sm font-bold text-[#fae69e] hover:underline">
                care@rajshahinuts.com
              </a>
            </div>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#dfba5d] shrink-0" />
            <div>
              <span className="text-[11px] text-gray-400 block">Helpline Number:</span>
              <span className="text-xs sm:text-sm font-bold text-[#fae69e]">
                1800-265-NUTS (Toll-Free)
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
