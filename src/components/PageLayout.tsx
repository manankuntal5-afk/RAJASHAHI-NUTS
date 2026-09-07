import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, RotateCcw, Home, ShoppingBag } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActivePage } from '../types';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  breadcrumbs: string;
  activePage?: ActivePage;
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  badge,
  icon,
  breadcrumbs,
  activePage,
  onHomeClick,
  onOrderClick,
  onNavigate,
  children
}) => {
  return (
    <div className="min-h-screen bg-[#061810] text-[#f7f3eb] font-sans antialiased selection:bg-[#dfba5d] selection:text-[#082218] flex flex-col">
      {/* Top Header */}
      <Header onOrderClick={onOrderClick} onHomeClick={onHomeClick} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#dfba5d]/20 text-xs text-[#c8c0b0]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onHomeClick}
              className="cursor-pointer hover:text-[#fae69e] transition-colors flex items-center gap-1.5 font-medium"
            >
              <Home className="w-3.5 h-3.5 text-[#dfba5d]" />
              <span>Home</span>
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-[#fae69e] font-semibold">{breadcrumbs}</span>
          </div>

          <button
            type="button"
            onClick={onHomeClick}
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-[#fae69e] hover:text-white bg-[#0a271c] hover:bg-[#0f3d2b] border border-[#dfba5d]/40 px-3.5 py-1.5 rounded-full transition-all shadow active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0a271c] via-[#103b29] to-[#0a271c] border-2 border-[#dfba5d]/50 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl">
          {/* Subtle Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfba5d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#051c13] border border-[#dfba5d]/60 text-[#fae69e] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow">
              <span className="text-[#dfba5d]">{icon}</span>
              <span>{badge}</span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-black text-[#fae69e] tracking-wide leading-tight mb-3">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#e2d9c8] leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {/* Quick Trust Highlights Pill Bar */}
          <div className="relative z-10 mt-6 pt-5 border-t border-[#dfba5d]/20 flex flex-wrap items-center gap-4 text-xs text-[#fae69e]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" /> 100% Pure Dry Fruits
            </span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#38bdf8]" /> Free All-India Delivery
            </span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#f59e0b]" /> 7-Day Money-Back Guarantee
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-[#e2d9c8] leading-relaxed text-sm sm:text-base">
          {children}
        </div>

        {/* Bottom Prominent Order Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#170a04] via-[#2a1306] to-[#170a04] border-2 border-[#dfba5d] rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="bg-[#dc2626] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              24-Hour Special Promotional Deal
            </span>

            <h3 className="font-cinzel text-xl sm:text-3xl text-[#fae69e] font-black">
              Get Rajshahi Nuts 4 KG Combo Pack @ Only ₹265
            </h3>

            <p className="text-xs sm:text-sm text-[#fed7aa]">
              Includes 1 KG Cashews, 1 KG Almonds, 1 KG Pistachios, and 1 KG Raisins. Free Home Delivery across India with 7-Day Money Back Guarantee.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOrderClick}
                className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#082218] font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all ring-2 ring-white/40"
              >
                <ShoppingBag className="w-5 h-5 text-[#082218]" />
                <span>Order Now @ ₹265 (Free Shipping)</span>
              </button>

              <button
                type="button"
                onClick={onHomeClick}
                className="cursor-pointer w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#092218] hover:bg-[#0e3525] text-[#fae69e] font-bold text-sm border border-[#dfba5d]/50 transition-all"
              >
                View Product Details
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <Footer activePage={activePage} onHomeClick={onHomeClick} onNavigate={onNavigate} />
    </div>
  );
};
