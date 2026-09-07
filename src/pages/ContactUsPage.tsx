import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const ContactUsPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderId: '',
    topic: 'Order Status & Tracking',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <PageLayout
      title="Contact Us"
      subtitle="We are here to assist you 7 days a week. Reach out to our customer care team anytime."
      badge="Customer Support & Helpline"
      icon={<Phone className="w-4 h-4" />}
      breadcrumbs="Contact Us"
      activePage="contact-us"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* 4 Direct Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Toll Free Helpline */}
        <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#dfba5d] flex items-center justify-center border border-[#dfba5d]/40">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">Toll-Free Helpline</span>
          <a href="tel:18002656887" className="text-base sm:text-lg font-black text-[#fae69e] hover:underline block">
            1800-265-NUTS
          </a>
          <p className="text-[11px] text-[#c8c0b0]">Toll-Free across all Indian networks</p>
        </div>

        {/* Customer Care Mobile & WhatsApp */}
        <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#10b981] flex items-center justify-center border border-[#10b981]/40">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">Mobile &amp; WhatsApp</span>
          <a href="tel:+919876543210" className="text-base sm:text-lg font-black text-white hover:underline block">
            +91 98765 43210
          </a>
          <p className="text-[11px] text-[#c8c0b0]">Instant WhatsApp chat support</p>
        </div>

        {/* Official Email */}
        <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#38bdf8] flex items-center justify-center border border-[#38bdf8]/40">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">Official Support Email</span>
          <a href="mailto:care@rajshahinuts.com" className="text-sm sm:text-base font-bold text-[#fae69e] hover:underline block truncate">
            care@rajshahinuts.com
          </a>
          <p className="text-[11px] text-[#c8c0b0]">Reply within 2 to 4 business hours</p>
        </div>

        {/* Working Hours */}
        <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#f59e0b] flex items-center justify-center border border-[#f59e0b]/40">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">Support Hours</span>
          <strong className="text-sm sm:text-base text-white block">
            9:00 AM - 9:00 PM
          </strong>
          <p className="text-[11px] text-[#c8c0b0]">Open Monday to Sunday (7 Days)</p>
        </div>
      </div>

      {/* Main Grid: Send Message Form + Jaipur Office Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="font-cinzel text-xl font-bold text-[#fae69e] mb-1 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#dfba5d]" />
            <span>Send Us a Direct Message</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#c8c0b0] mb-6">
            Have a question regarding your order, delivery timeline, or payment? Fill out this quick form and our support manager will contact you promptly.
          </p>

          {isSubmitted ? (
            <div className="bg-[#061c13] border border-[#10b981] rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel text-lg font-bold text-[#fae69e]">
                Message Sent Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-[#e2d9c8] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have received your inquiry. Our support representative will reach out on your mobile <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', orderId: '', topic: 'Order Status & Tracking', message: '' });
                }}
                className="cursor-pointer text-xs text-[#dfba5d] hover:underline font-bold mt-2 inline-block"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#fae69e] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#061c13] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#fae69e] mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-[#061c13] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#fae69e] mb-1.5">
                    Order ID (If already ordered)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. RN-98234"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full bg-[#061c13] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#fae69e] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#061c13] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfba5d]"
                  >
                    <option value="Order Status & Tracking">Order Status &amp; Tracking</option>
                    <option value="Payment Verification / Screenshot">Payment Verification / Screenshot</option>
                    <option value="Return or Refund Request">7-Day Refund / Return Request</option>
                    <option value="Product Quality & Packaging">Product Quality &amp; Packaging</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#fae69e] mb-1.5">
                  Your Message or Question *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message or describe your question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#061c13] border border-white/20 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfba5d] resize-none"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#dfba5d] to-[#c59b27] hover:brightness-110 active:scale-98 text-[#082218] font-black text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 uppercase"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Now</span>
              </button>
            </form>
          )}
        </div>

        {/* Jaipur Registered Warehouse & Office Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-[#dfba5d] flex items-center justify-center border border-[#dfba5d]/40">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#fae69e]">
                  Corporate Headquarters
                </h4>
                <p className="text-xs text-gray-400">Rajshahi Nuts Ltd.</p>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#e2d9c8] pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dfba5d] shrink-0 mt-0.5" />
                <span>
                  Plot No. 42, Commercial Complex, Mirza Ismail (MI) Road, Jaipur, Rajasthan 302001, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>FSSAI Registration: #10022013000845</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#dfba5d] shrink-0" />
                <span>GST Registered &amp; ISO 22000 Certified Facility</span>
              </div>
            </div>

            <div className="p-3 bg-[#061c13] rounded-xl border border-white/5 text-xs text-[#c8c0b0]">
              <p className="font-semibold text-[#fae69e] mb-1">Central Warehouse &amp; Dispatch Hub:</p>
              <p>All 4 KG Combo Packs are hygienically vacuum sealed, packed, and dispatched directly from our Jaipur fulfillment center with 24-hour express courier pickup.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactUsPage;
