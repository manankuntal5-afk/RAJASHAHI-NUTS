import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, Phone, Mail, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  activePage?: ActivePage;
  onHomeClick?: () => void;
  onNavigate?: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ activePage = 'home', onHomeClick, onNavigate }) => {
  const isCurrent = (page: ActivePage) => activePage === page;

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: ActivePage) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper classes for column navigation links
  const getColLinkClass = (page: ActivePage) => {
    if (isCurrent(page)) {
      return "cursor-pointer text-[#38bdf8] font-bold underline underline-offset-4 decoration-2 decoration-[#38bdf8] flex items-center gap-1.5 transition-colors py-0.5 text-left";
    }
    return "cursor-pointer text-[#c8c0b0] hover:text-[#fae69e] flex items-center gap-1.5 transition-colors py-0.5 text-left";
  };

  // Helper classes for bottom strip links
  const getBottomLinkClass = (page: ActivePage) => {
    if (isCurrent(page)) {
      return "cursor-pointer text-[#38bdf8] font-bold underline underline-offset-4 decoration-2 decoration-[#38bdf8] transition-colors";
    }
    return "cursor-pointer hover:text-[#fae69e] transition-colors";
  };

  return (
    <footer className="w-full bg-[#04110b] border-t-2 border-[#dfba5d]/40 pt-12 pb-24 text-gray-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10 pb-10 border-b border-white/10">
          {/* Brand Info & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={handleHome}
              className="font-cinzel text-xl font-black text-[#fae69e] tracking-wider text-left hover:text-[#f5d061] transition-colors cursor-pointer flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfba5d] rounded-lg p-0.5"
              title="Rajshahi Nuts Home"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfba5d] via-[#fae69e] to-[#996515] p-0.5 shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-[#dfba5d]/20">
                <img src="/logo.svg" alt="Rajshahi Nuts Logo" className="w-full h-full rounded-full object-cover bg-[#092218]" />
              </div>
              <span className="group-hover:underline decoration-[#dfba5d]/50 underline-offset-4">
                RAJSHAHI NUTS
              </span>
            </button>

            <p className="text-[#c8c0b0] leading-relaxed text-xs sm:text-sm">
              Rajshahi Nuts is a royal gourmet dry fruits brand from Jaipur, Rajasthan. We deliver 100% pure, farm-fresh, vacuum-sealed Cashews, Almonds, Pistachios, and Raisins direct to Indian families at honest prices.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[#fae69e] text-xs font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" /> 100% Pure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#38bdf8]" /> Free Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#f59e0b]" /> 7-Day Refund
              </span>
            </div>
          </div>

          {/* Quick Policy Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#fae69e] uppercase tracking-wider">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={handleNav('privacy-policy')}
                  className={getColLinkClass('privacy-policy')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('privacy-policy') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('terms-conditions')}
                  className={getColLinkClass('terms-conditions')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('terms-conditions') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Terms and Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('return-refund-policy')}
                  className={getColLinkClass('return-refund-policy')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('return-refund-policy') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Return and Refund Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('cancellation-policy')}
                  className={getColLinkClass('cancellation-policy')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('cancellation-policy') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Cancellation Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('payment-policy')}
                  className={getColLinkClass('payment-policy')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('payment-policy') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Payment Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Information (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#fae69e] uppercase tracking-wider">
              Help &amp; About
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={handleHome}
                  className={getColLinkClass('home')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('home') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Home (राजशाही नट्स)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('faq')}
                  className={getColLinkClass('faq')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('faq') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>FAQ (Questions)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('shipping-policy')}
                  className={getColLinkClass('shipping-policy')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('shipping-policy') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Shipping Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('about-us')}
                  className={getColLinkClass('about-us')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('about-us') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNav('contact-us')}
                  className={getColLinkClass('contact-us')}
                >
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent('contact-us') ? 'text-[#38bdf8]' : 'text-[#dfba5d]'}`} />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Certification (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#fae69e] uppercase tracking-wider">
              Helpline &amp; Support
            </h4>
            <div className="space-y-2 text-xs text-[#c8c0b0]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfba5d] shrink-0" />
                <span className="text-white font-bold">1800-265-NUTS (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                <span>+91 98765 43210 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <a href="mailto:care@rajshahinuts.com" className="hover:underline text-white">care@rajshahinuts.com</a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfba5d] shrink-0 mt-0.5" />
                <span>MI Road, Jaipur, Rajasthan 302001</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-[#9ca3af]">
              <p>✓ FSSAI Reg. #10022013000845</p>
              <p>✓ ISO 22000 Certified Food Safety</p>
              <p>✓ 100% Pure Vegetarian (Green Dot)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 9 Quick Links Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-[11px] text-[#c8c0b0] border-b border-white/10 pb-6">
          <button type="button" onClick={handleHome} className={getBottomLinkClass('home')}>
            Home
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('privacy-policy')} className={getBottomLinkClass('privacy-policy')}>
            Privacy Policy
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('terms-conditions')} className={getBottomLinkClass('terms-conditions')}>
            Terms &amp; Conditions
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('return-refund-policy')} className={getBottomLinkClass('return-refund-policy')}>
            Return &amp; Refund Policy
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('shipping-policy')} className={getBottomLinkClass('shipping-policy')}>
            Shipping Policy
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('cancellation-policy')} className={getBottomLinkClass('cancellation-policy')}>
            Cancellation Policy
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('payment-policy')} className={getBottomLinkClass('payment-policy')}>
            Payment Policy
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('contact-us')} className={getBottomLinkClass('contact-us')}>
            Contact Us
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('about-us')} className={getBottomLinkClass('about-us')}>
            About Us
          </button>
          <span className="text-gray-600">|</span>
          <button type="button" onClick={handleNav('faq')} className={getBottomLinkClass('faq')}>
            FAQ
          </button>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-gray-400 text-[11px]">
          <p>© {new Date().getFullYear()} Rajshahi Nuts. All rights reserved. 24-Hour Special Promotional Offer @ ₹265.</p>
          <p className="flex items-center gap-1 justify-center">
            Crafted for health and royal taste <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
