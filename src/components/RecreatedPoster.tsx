import React from 'react';
import { Sparkles, ShieldCheck, HeartPulse, PackageCheck, Truck, Check } from 'lucide-react';

interface RecreatedPosterProps {
  onOrderClick: () => void;
}

export const RecreatedPoster: React.FC<RecreatedPosterProps> = ({ onOrderClick }) => {
  return (
    <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-[#c59b27] bg-gradient-to-b from-[#fbf8ee] via-[#f7f2e1] to-[#eedcba] text-[#1c2e24]">
      {/* Decorative Outer Border & Gold Filigree Accents */}
      <div className="absolute inset-1.5 border border-[#c59b27]/60 pointer-events-none rounded-xl" />
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#b8860b] pointer-events-none" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#b8860b] pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#b8860b] pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#b8860b] pointer-events-none" />

      {/* Floating Nut Graphics / Leaves subtle background decorations */}
      <div className="p-4 sm:p-6 relative z-10 flex flex-col items-center">
        {/* Main Big Headline */}
        <div className="text-center mb-1">
          <p className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-[#0e3b26] drop-shadow-sm">
            4 KG DRY FRUITS
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#c59b27] via-[#a27814] to-[#715006] uppercase drop-shadow">
            COMBO PACK
          </h2>
        </div>

        {/* Brand emblem with nut icon */}
        <div className="flex items-center gap-2 my-1">
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#c59b27]" />
          <span className="text-[#a27814] text-xs font-semibold">🌰 🥜 🌰</span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#c59b27]" />
        </div>

        {/* Brand Title */}
        <div className="text-center mb-4">
          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#0a2e1d] tracking-widest">
            RAJSHAHI NUTS
          </h3>
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#8c6710] uppercase">
            PREMIUM • ROYAL • DELICIOUS
          </p>
        </div>

        {/* Central Display: Price Badge + 4 Dry Fruit Bowls */}
        <div className="w-full relative my-2">
          {/* Top Row: Special Price Badge + 1KG Kaju Bowl */}
          <div className="grid grid-cols-2 gap-3 items-center">
            {/* Special Price Badge */}
            <div className="relative aspect-square max-w-[150px] mx-auto rounded-full bg-gradient-to-br from-[#0c3c26] via-[#08291a] to-[#04190f] p-1.5 shadow-xl border-2 border-[#e5c05d] flex flex-col items-center justify-center text-center text-white">
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-[#fae69e] bg-[#051e12] px-2 py-0.5 rounded-full border border-[#c59b27]/50 mb-0.5">
                SPECIAL PRICE
              </span>
              <div className="flex items-center justify-center text-[#fae69e]">
                <span className="text-lg sm:text-2xl font-bold mr-0.5">₹</span>
                <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-gold-gradient">
                  265
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#fae69e] bg-[#0e3b26] px-2.5 py-0.5 rounded-full border border-[#fae69e]/40 mt-1">
                ONLY
              </span>
            </div>

            {/* Bowl 1: 1KG KAJU */}
            <div className="relative group text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-[#ba8c27] to-[#69480a] shadow-lg overflow-hidden">
                <img
                  src="/kaju.webp"
                  alt="1KG Kaju Cashews"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -top-1 right-2 bg-[#092e1d] text-[#fae69e] border border-[#dfba5d] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow">
                1KG KAJU
              </div>
            </div>
          </div>

          {/* Middle Row: 1KG BADAM + 1KG KISHMISH */}
          <div className="grid grid-cols-2 gap-3 items-center my-3">
            {/* Bowl 2: 1KG BADAM */}
            <div className="relative group text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-[#ba8c27] to-[#69480a] shadow-lg overflow-hidden">
                <img
                  src="/badam.webp"
                  alt="1KG Badam Almonds"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-1 left-2 bg-[#092e1d] text-[#fae69e] border border-[#dfba5d] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow">
                1KG BADAM
              </div>
            </div>

            {/* Bowl 4: 1KG KISHMISH */}
            <div className="relative group text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-[#ba8c27] to-[#69480a] shadow-lg overflow-hidden">
                <img
                  src="/kishmish.webp"
                  alt="1KG Kishmish Raisins"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-1 right-2 bg-[#092e1d] text-[#fae69e] border border-[#dfba5d] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow">
                1KG KISHMISH
              </div>
            </div>
          </div>

          {/* Bottom Row: Trust Pills + 1KG PISTA + TOTAL 4 KG Badge */}
          <div className="grid grid-cols-3 gap-2 items-center mt-2">
            {/* Left Badges */}
            <div className="flex flex-col gap-1.5 text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-1 bg-[#09291b] text-white px-2 py-1 rounded-full border border-[#dfba5d]/40">
                <ShieldCheck className="w-3 h-3 text-[#7ee787]" />
                <span>100% NATURAL</span>
              </div>
              <div className="flex items-center gap-1 bg-[#09291b] text-white px-2 py-1 rounded-full border border-[#dfba5d]/40">
                <HeartPulse className="w-3 h-3 text-[#f43f5e]" />
                <span>RICH NUTRIENTS</span>
              </div>
              <div className="flex items-center gap-1 bg-[#09291b] text-white px-2 py-1 rounded-full border border-[#dfba5d]/40">
                <PackageCheck className="w-3 h-3 text-[#38bdf8]" />
                <span>HYGIENIC PACK</span>
              </div>
              <div className="flex items-center gap-1 bg-[#09291b] text-white px-2 py-1 rounded-full border border-[#dfba5d]/40">
                <Truck className="w-3 h-3 text-[#fbbf24]" />
                <span>SAFE DELIVERY</span>
              </div>
            </div>

            {/* Bowl 3: 1KG PISTA */}
            <div className="relative group text-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full p-1 bg-gradient-to-br from-[#ba8c27] to-[#69480a] shadow-lg overflow-hidden">
                <img
                  src="/pista.webp"
                  alt="1KG Pista Pistachios"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-[#092e1d] text-[#fae69e] border border-[#dfba5d] text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow">
                1KG PISTA
              </div>
            </div>

            {/* Right: TOTAL 4 KG BADGE */}
            <div className="relative aspect-square max-w-[110px] mx-auto rounded-full bg-gradient-to-br from-[#0c3c26] to-[#04190f] p-1 shadow-xl border-2 border-[#e5c05d] flex flex-col items-center justify-center text-center text-white">
              <span className="text-[9px] tracking-wider uppercase font-extrabold text-[#fae69e]">
                TOTAL
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-gold-gradient leading-none">
                4 KG
              </span>
              <span className="text-[8px] font-bold text-[#7ee787] mt-0.5">
                COMBO
              </span>
            </div>
          </div>
        </div>

        {/* CTA ORDER NOW BUTTON */}
        <div className="w-full mt-4">
          <button
            id="poster-order-now-btn"
            onClick={onOrderClick}
            className="cursor-pointer w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#0d3f28] via-[#105133] to-[#0d3f28] border-2 border-[#f5d061] text-[#fae69e] font-cinzel text-xl sm:text-2xl font-black tracking-widest shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase animate-pulse-gold"
          >
            <Sparkles className="w-5 h-5 text-[#f5d061]" />
            <span>ORDER NOW</span>
            <span className="text-base font-bold bg-[#dfba5d] text-[#082417] px-2 py-0.5 rounded-md">
              ₹265
            </span>
          </button>
        </div>

        {/* Offer Validity & Brand Tagline Footer */}
        <div className="w-full text-center mt-3 pt-2 border-t border-[#c59b27]/30">
          <div className="inline-block bg-[#0a2f1e] text-[#fae69e] border border-[#dfba5d] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-1">
            ORDER VALID ONLY 24 HOURS
          </div>
          <p className="font-cinzel text-[10px] sm:text-xs text-[#0a2e1d] font-bold tracking-widest">
            RAJSHAHI NUTS • THE ROYAL BITE
          </p>
        </div>
      </div>
    </div>
  );
};
