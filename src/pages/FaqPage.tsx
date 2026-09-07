import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { HelpCircle, ChevronDown, Search, ShieldCheck, Truck, Phone, MessageSquare, CheckCircle2, RotateCcw } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

interface FaqItem {
  id: number;
  q: string;
  a: string;
  category: 'all' | 'product' | 'price' | 'shipping' | 'payment' | 'refund';
}

export const FaqPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'product' | 'price' | 'shipping' | 'payment' | 'refund'>('all');
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FaqItem[] = [
    {
      id: 1,
      category: 'product',
      q: 'Does this combo pack truly contain full 4 KG of dry fruits?',
      a: 'Yes, absolutely 100%! The Rajshahi Nuts Combo Pack contains 1 KG Whole Jumbo Cashews (W-180 grade), 1 KG California Almonds, 1 KG Roasted Salted Pistachios, and 1 KG Sweet Golden Raisins. Each variety is individually packed in its own separate 1 KG food-grade vacuum pouch, totaling exactly 4 Kilograms (4,000 grams).'
    },
    {
      id: 2,
      category: 'price',
      q: 'How is this entire 4 KG pack offered for only ₹265?',
      a: 'This is a special direct-from-grower promotional introductory offer. By sourcing wholesale crops directly from orchards in bulk and bypassing intermediate distributors, brokers, and retail shop margins, we are running this 24-hour campaign so new customers all across India can taste our royal quality.'
    },
    {
      id: 3,
      category: 'shipping',
      q: 'How many days will delivery take, and are there any shipping charges?',
      a: 'Doorstep delivery is 100% FREE across all of India with zero hidden fees. Orders are vacuum-packed and dispatched within 24 hours of booking. Depending on your state, delivery takes between 2 to 4 business days via our express courier partners (Delhivery, Blue Dart, Speed Post).'
    },
    {
      id: 4,
      category: 'payment',
      q: 'Why is Cash on Delivery (COD) not available for this promotion?',
      a: 'Courier companies charge an additional ₹120 to ₹180 handling fee for Cash on Delivery, plus return transit insurance. If we added COD overheads, the combo pack price would double to over ₹550. To give you the maximum savings of ₹3,234 off MRP, we accept secure instant online payment via PhonePe, Google Pay, Paytm, UPI, and Cards.'
    },
    {
      id: 5,
      category: 'refund',
      q: 'What if I am not satisfied with the quality of the dry fruits?',
      a: 'Rajshahi Nuts provides an unconditional 7-Day Money-Back Guarantee. If the package arrives damaged or the crunch and freshness do not meet your expectations, simply WhatsApp our customer care helpline at +91 98765 43210 or email care@rajshahinuts.com. We will refund 100% of your ₹265 directly to your UPI ID without any argument.'
    },
    {
      id: 6,
      category: 'shipping',
      q: 'How will I track my package after ordering?',
      a: 'As soon as your package is picked up by the courier from our Jaipur dispatch facility, you will receive an automated SMS with your Courier AWB tracking number and a direct tracking link to track your order in real time.'
    },
    {
      id: 7,
      category: 'product',
      q: 'What is the shelf life / expiry of these vacuum-sealed dry fruits?',
      a: 'Because each 1 KG pouch is vacuum sealed with zero oxygen or moisture, the dry fruits remain fresh, crunchy, and aromatic for up to 9 months from the date of packaging. Once you open a pouch, we recommend storing it in an airtight container.'
    },
    {
      id: 8,
      category: 'payment',
      q: 'What is the 14-second verification process on the payment page?',
      a: 'After you pay through PhonePe, Google Pay, or Paytm, our payment screen automatically checks the banking network for 14 seconds to verify your transaction. If bank servers take longer, you can upload a screenshot of your payment receipt or enter your UTR number to immediately lock in your order.'
    },
    {
      id: 9,
      category: 'product',
      q: 'Are these dry fruits suitable for pure vegetarians and fasts (vrat)?',
      a: 'Yes, 100%! Rajshahi Nuts products are 100% vegetarian (Green Dot certified by FSSAI) and naturally gluten-free. They are pure and can be consumed during religious fasts and celebrations.'
    },
    {
      id: 10,
      category: 'refund',
      q: 'Can I cancel my order if I change my mind?',
      a: 'Yes! You can cancel your order free of charge before dispatch (within 6 to 12 hours of placing the order). Call 1800-265-NUTS or WhatsApp us, and we will issue a 100% instant refund to your UPI or bank account.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Find quick, clear, and honest answers to all your questions about our 4 KG Combo Pack."
      badge="Help & Answers"
      icon={<HelpCircle className="w-4 h-4" />}
      breadcrumbs="FAQ"
      activePage="faq"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="w-5 h-5 text-[#dfba5d] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search questions (e.g. weight, delivery, refund, payment)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#092419] border-2 border-[#dfba5d]/50 focus:border-[#fae69e] rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none shadow-lg transition-all"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'product', label: 'Combo & Quality' },
          { id: 'price', label: 'Price & Deals' },
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'payment', label: 'Payment & Safety' },
          { id: 'refund', label: '7-Day Refund' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#dfba5d] text-[#082218] shadow-md shadow-[#dfba5d]/30 scale-105'
                : 'bg-[#092419] text-[#c8c0b0] hover:text-[#fae69e] border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQs List Accordion */}
      <div className="space-y-3 max-w-4xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="bg-[#092419] border border-white/10 rounded-2xl p-8 text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-gray-500 mx-auto" />
            <p className="text-white font-bold text-sm">No matching questions found</p>
            <p className="text-xs text-gray-400">Try searching for a different keyword or browse all questions.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#092419] border border-[#dfba5d]/30 hover:border-[#dfba5d]/60 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="cursor-pointer w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-[#fae69e] font-bold text-sm sm:text-base hover:bg-[#0c3122] transition-colors"
                >
                  <span className="flex items-start gap-2.5">
                    <span className="text-[#dfba5d] font-cinzel text-xs sm:text-sm mt-0.5">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#dfba5d] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#e2d9c8] leading-relaxed border-t border-[#dfba5d]/20 pt-3 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have a Question Box */}
      <div className="mt-10 bg-[#061c13] border border-[#dfba5d]/40 rounded-2xl p-6 text-center space-y-3 max-w-xl mx-auto">
        <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e]">
          Still have a question that isn't answered here?
        </h4>
        <p className="text-xs text-[#c8c0b0]">
          Our customer care executives are available on phone and WhatsApp from 9:00 AM to 9:00 PM IST every day.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact-us')}
            className="cursor-pointer inline-flex items-center gap-2 bg-[#dfba5d] hover:bg-[#fae69e] text-[#082218] text-xs font-bold px-5 py-2.5 rounded-xl shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Go to Contact Us Page</span>
          </button>

          <a
            href="tel:18002656887"
            className="cursor-pointer inline-flex items-center gap-2 bg-[#092419] hover:bg-[#0f3d2b] border border-[#dfba5d]/40 text-[#fae69e] text-xs font-bold px-5 py-2.5 rounded-xl"
          >
            <Phone className="w-4 h-4" />
            <span>Call 1800-265-NUTS</span>
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default FaqPage;
