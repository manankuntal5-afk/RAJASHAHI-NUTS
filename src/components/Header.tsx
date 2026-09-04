import React from 'react';
import { ShieldCheck, Truck, Sparkles, Clock } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick, onHomeClick }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071610]/95 backdrop-blur-md border-b border-[#c59b27]/30">
      {/* Top micro announcement banner: removed 'YouTube special offer' text, kept the Rajshahi line */}
      <div className="bg-gradient-to-r from-[#0d2a1f] via-[#1b4332] to-[#0d2a1f] text-center py-2 px-3 border-b border-[#c59b27]/20 text-xs sm:text-sm text-[#fae69e] flex items-center justify-center gap-2 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#f5d061] animate-pulse shrink-0" />
        <span>Rajshahi Nuts 4 KG Combo Pack Only at <strong>₹265</strong>!</span>
        <span className="hidden md:inline text-white/50">|</span>
        <span className="hidden md:inline text-[#d4af37]">Offer Valid for 24 Hours Only • Free All-India Shipping</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Name - Clickable to go to Home Page */}
        <button
          type="button"
          id="header-brand-home-btn"
          onClick={handleHomeClick}
          className="flex items-center gap-3 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfba5d] rounded-2xl p-1 -m-1 transition-all"
          title="Rajshahi Nuts Home (होम पेज पर जाएं)"
          aria-label="Rajshahi Nuts - Go to Home Page"
        >
          {/* Circular Brand Logo */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#e5c05d] via-[#fae69e] to-[#996515] p-0.5 shadow-lg shadow-[#c59b27]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-[#dfba5d]/60 transition-all duration-300">
            <img
              src="/logo.svg"
              alt="Rajshahi Nuts Logo"
              className="w-full h-full rounded-full object-cover bg-[#092218]"
            />
          </div>

          {/* Name & Subtitle */}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-lg sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fae69e] via-[#e5c05d] to-[#c59b27] group-hover:brightness-125 transition-all">
                RAJSHAHI NUTS
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#113a29] text-[#7ee787] border border-[#238636]">
                <ShieldCheck className="w-3 h-3 mr-1" /> 100% Pure
              </span>
            </div>
            <p className="text-xs text-[#d8cfbe] group-hover:text-white tracking-wide font-medium transition-colors">
              Rajshahi Nuts (राजशाही नट्स) • Royal Dry Fruits
            </p>
          </div>
        </button>

        {/* Action Button & Trust Points */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#e8dfcf]">
            <div className="flex items-center gap-1 text-[#fae69e]">
              <Truck className="w-4 h-4 text-[#7ee787]" />
              <span>Free Home Delivery</span>
            </div>
            <div className="flex items-center gap-1 text-[#fae69e]">
              <Clock className="w-4 h-4 text-[#f5a623]" />
              <span>24 Hours Left</span>
            </div>
          </div>

          <button
            id="header-order-btn"
            onClick={onOrderClick}
            className="cursor-pointer bg-gradient-to-r from-[#dfba5d] via-[#f5d061] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#0a1f16] font-extrabold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#c59b27]/30 transition-all flex items-center gap-1.5 border border-[#fff2b2]/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Now @ ₹265</span>
          </button>
        </div>
      </div>
    </header>
  );
};
