import React from 'react';
import { ShoppingBag } from 'lucide-react';
import mainPosterImage from '../assets/images/regenerated_image_1788437822458.webp';

interface StickyBottomBarProps {
  onOrderClick: () => void;
  onHomeClick?: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onOrderClick, onHomeClick }) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#061810]/95 backdrop-blur-md border-t-2 border-[#dfba5d] px-4 py-2.5 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Product Price Summary - Clickable to Home / Top */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none rounded-lg p-0.5"
          title="Rajshahi Nuts Home (होम पेज पर जाएं)"
          aria-label="Rajshahi Nuts Home"
        >
          <div className="hidden sm:block w-10 h-10 rounded-lg overflow-hidden border border-[#dfba5d] shrink-0 bg-[#072417] group-hover:scale-105 transition-transform">
            <img
              src={mainPosterImage}
              alt="Rajshahi Nuts 4 KG Combo Official Poster"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-[#fae69e] group-hover:underline decoration-[#dfba5d]">Rajshahi Nuts 4 KG Pack</span>
              <span className="bg-[#dc2626] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                92% OFF
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-base sm:text-lg font-black text-gold-gradient">₹265</span>
              <span className="text-gray-400 line-through text-[11px]">₹3,499</span>
              <span className="hidden xs:inline text-[#10b981] font-semibold text-[10px]">
                • Free All-India Delivery
              </span>
            </div>
          </div>
        </button>

        {/* Order Now Button */}
        <button
          id="sticky-order-btn"
          onClick={onOrderClick}
          className="cursor-pointer bg-gradient-to-r from-[#dfba5d] via-[#f5d061] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#091f15] font-black text-xs sm:text-sm px-5 sm:px-7 py-2.5 rounded-full shadow-lg shadow-[#dfba5d]/30 transition-all flex items-center gap-2 uppercase tracking-wider"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Now @ ₹265</span>
        </button>
      </div>
    </div>
  );
};
