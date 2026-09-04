import React, { useState, useEffect } from 'react';
import { Flame, Clock, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface UrgencyBarProps {
  onOrderClick: () => void;
}

export const UrgencyBar: React.FC<UrgencyBarProps> = ({ onOrderClick }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 48,
    seconds: 35
  });

  const [stockLeft] = useState<number>(14);
  const [activeViewers, setActiveViewers] = useState<number>(187);
  const [recentOrder, setRecentOrder] = useState<string | null>(null);

  const sampleRecentOrders = [
    "Dinesh Meena (Jaipur, Raj.) just ordered 1 Combo Pack",
    "Amit Kumar (Lucknow, U.P.) bought 2 Combo Packs",
    "Sunita Devi (Indore, M.P.) just ordered 1 Combo Pack",
    "Manoj Sharma (Delhi NCR) just booked 1 Combo Pack",
    "Ravi Patel (Ahmedabad, Guj.) just ordered 1 Combo Pack",
    "Sanjay Yadav (Patna, Bihar) just ordered 1 Combo Pack"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setActiveViewers(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 6000);

    const orderInterval = setInterval(() => {
      const randomOrder = sampleRecentOrders[Math.floor(Math.random() * sampleRecentOrders.length)];
      setRecentOrder(randomOrder);
      setTimeout(() => {
        setRecentOrder(null);
      }, 5000);
    }, 14000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(orderInterval);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#170a05] via-[#2a1309] to-[#170a05] border-y border-[#dfba5d]/40 text-[#f5ebd7] py-3 px-4 shadow-inner relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-[#e5a93b]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* Urgency Alert & Timer */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/60 text-[#fca5a5] text-xs font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>Offer Valid For The Next 24 Hours Only!</span>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-4 h-4 text-[#fae69e]" />
            <span className="text-xs text-[#d8cfbe] mr-1">Offer Ends In:</span>
            <div className="flex items-center gap-1">
              <span className="bg-[#0e0704] border border-[#e5c05d]/40 text-[#fae69e] font-bold px-2 py-0.5 rounded text-sm sm:text-base">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-[#fae69e] font-bold">:</span>
              <span className="bg-[#0e0704] border border-[#e5c05d]/40 text-[#fae69e] font-bold px-2 py-0.5 rounded text-sm sm:text-base">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-[#fae69e] font-bold">:</span>
              <span className="bg-[#0e0704] border border-[#dc2626]/80 text-[#f87171] font-bold px-2 py-0.5 rounded text-sm sm:text-base">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Stock & Live Demand */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-[#fed7aa]">
            <Flame className="w-4 h-4 text-[#f97316] animate-bounce" />
            <span>Limited Stock: <strong className="text-[#f87171] font-bold">{stockLeft} Packs Left</strong></span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[#93c5fd]">
            <Eye className="w-4 h-4 text-[#60a5fa]" />
            <span><strong>{activeViewers} buyers</strong> viewing right now</span>
          </div>

          <button
            id="urgency-buy-btn"
            onClick={onOrderClick}
            className="cursor-pointer text-xs font-bold text-[#1a0a03] bg-[#f5d061] hover:bg-[#fae69e] px-3.5 py-1 rounded-full transition-all shadow"
          >
            Claim Deal Now →
          </button>
        </div>
      </div>

      {/* Floating recent purchase toast on bottom-left */}
      {recentOrder && (
        <div className="fixed bottom-20 left-4 z-50 bg-[#071b12]/95 border border-[#c59b27]/60 text-white px-3.5 py-2 rounded-lg shadow-xl backdrop-blur-md text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#10b981] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-[#fae69e]">{recentOrder}</p>
            <p className="text-[10px] text-gray-400">Verified Online Payment • Just now</p>
          </div>
        </div>
      )}
    </div>
  );
};
