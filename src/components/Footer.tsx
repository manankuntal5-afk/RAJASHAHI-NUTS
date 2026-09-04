import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';

interface FooterProps {
  onHomeClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onHomeClick }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#04110b] border-t border-[#c59b27]/40 pt-12 pb-24 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleHomeClick}
              className="font-cinzel text-xl font-black text-[#fae69e] tracking-wider mb-2 text-left hover:text-[#f5d061] transition-colors cursor-pointer flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfba5d] rounded-lg p-0.5"
              title="Rajshahi Nuts Home (होम पेज पर जाएं)"
              aria-label="Rajshahi Nuts Home"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dfba5d] to-[#996515] p-0.5 shrink-0 group-hover:scale-110 transition-transform">
                <img src="/logo.svg" alt="Rajshahi Nuts Logo" className="w-full h-full rounded-full object-cover bg-[#092218]" />
              </div>
              <span className="group-hover:underline decoration-[#dfba5d]/50 underline-offset-4">
                RAJSHAHI NUTS (राजशाही नट्स)
              </span>
            </button>
            <p className="text-[#c8c0b0] leading-relaxed max-w-md">
              Rajshahi Nuts is one of India's trusted gourmet dry fruit purveyors. We deliver pure, hygienic, and wholesome nutrition direct from the finest orchards to every Indian household.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[#fae69e]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" /> 100% Purity
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#38bdf8]" /> Vacuum Sealed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#f59e0b]" /> 7-Day Refund
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-[#fae69e] text-sm uppercase tracking-wider mb-3 font-cinzel">
              Help & Support
            </h4>
            <ul className="space-y-2 text-[#c8c0b0]">
              <li>Toll-Free Helpline: 1800-265-NUTS</li>
              <li>Customer Care: +91 98765 43210</li>
              <li>Email: care@rajshahinuts.com</li>
              <li>Hours: 9:00 AM to 9:00 PM IST (Mon - Sun)</li>
              <li>Address: Rajshahi Nuts Ltd., MI Road, Jaipur, Rajasthan 302001</li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-bold text-[#fae69e] text-sm uppercase tracking-wider mb-3 font-cinzel">
              Certifications & Safety
            </h4>
            <div className="space-y-2 text-[#c8c0b0]">
              <p>✓ FSSAI Reg. #10022013000845</p>
              <p>✓ ISO 22000 Food Safety Certified</p>
              <p>✓ 100% Pure Vegetarian (Green Dot)</p>
              <p>✓ 256-Bit SSL Encrypted Checkout</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-gray-400 text-[11px]">
          <p>© {new Date().getFullYear()} Rajshahi Nuts (राजशाही नट्स). All rights reserved. 24-Hour Special Promotional Offer.</p>
          <p className="flex items-center gap-1 justify-center">
            Crafted for health and authentic taste <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
