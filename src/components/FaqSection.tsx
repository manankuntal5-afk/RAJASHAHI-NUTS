import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: "Does this combo pack truly contain full 4 KG of dry fruits?",
      a: "Yes, absolutely! The pack contains 1 KG Cashews (W-180), 1 KG California Almonds, 1 KG Roasted Lightly Salted Pistachios, and 1 KG Golden Sweet Raisins. Each dry fruit arrives in an individual 1 KG food-grade vacuum-sealed pouch, totaling exactly 4 Kilograms."
    },
    {
      q: "How is this entire 4 KG pack offered for only ₹265?",
      a: "This is a direct promotional introductory campaign for 'Rajshahi Nuts'. By directly sourcing wholesale crops from growers without middlemen or distributor commissions, we are offering this special deal for 24 hours to welcome new customers across India to sample our unmatched quality."
    },
    {
      q: "How many days will delivery take, and are there shipping charges?",
      a: "All-India home delivery is 100% FREE with zero hidden charges. Your package is dispatched within 24 hours via Express Air / Speed Post, reaching your address safely in 2 to 4 business days with end-to-end SMS tracking."
    },
    {
      q: "Why is Cash on Delivery (COD) not available for this promotion?",
      a: "Due to the subsidized promotional price point of ₹265, COD courier fees and transit return overheads would double the price. To pass maximum savings directly to you, we accept secure instant online payment (UPI, PhonePe, Google Pay, Paytm, Cards). All payments are 100% safe and backed by our money-back guarantee."
    },
    {
      q: "What if I am not satisfied with the quality?",
      a: "Rajshahi Nuts offers a 7-day hassle-free money-back guarantee. If you are not pleased with the freshness or taste of any nut variety, reach out to our customer care helpline for a swift resolution or full refund."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="my-12 w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#0e3b26] border border-[#c59b27]/60 text-[#fae69e] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#f5d061]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#fae69e] font-black">
          Common Questions & Answers
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#092218] border border-[#c59b27]/30 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="cursor-pointer w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-[#fae69e] font-bold text-sm sm:text-base hover:bg-[#0d3324] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#dfba5d] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#e2d9c8] leading-relaxed border-t border-[#c59b27]/20 pt-3 animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
