import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Award, ShieldCheck, Heart, Users, Sparkles, CheckCircle2, Factory, Leaf, Star } from 'lucide-react';
import { ActivePage } from '../types';

interface PageProps {
  onHomeClick: () => void;
  onOrderClick: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const AboutUsPage: React.FC<PageProps> = ({ onHomeClick, onOrderClick, onNavigate }) => {
  return (
    <PageLayout
      title="About Rajshahi Nuts"
      subtitle="From royal culinary heritage to modern healthy Indian homes — pure, premium dry fruits at honest prices."
      badge="Our Story & Tradition"
      icon={<Award className="w-4 h-4" />}
      breadcrumbs="About Us"
      activePage="about-us"
      onHomeClick={onHomeClick}
      onOrderClick={onOrderClick}
      onNavigate={onNavigate}
    >
      {/* Brand Story Hero Card with Logo */}
      <div className="bg-[#092419] border-2 border-[#dfba5d]/50 rounded-3xl p-6 sm:p-9 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#dfba5d] via-[#fae69e] to-[#996515] p-1 shadow-2xl shrink-0">
          <img src="/logo.svg" alt="Rajshahi Nuts Royal Logo" className="w-full h-full rounded-full object-cover bg-[#092218]" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-[#dfba5d] text-[#082218] text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
            Royal Heritage of Jaipur
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#fae69e]">
            The Story Behind Rajshahi Nuts
          </h2>
          <p className="text-xs sm:text-sm text-[#e2d9c8] leading-relaxed">
            Founded with pride in the historic pink city of Jaipur, Rajasthan, <strong>Rajshahi Nuts</strong> was born with one simple purpose: To make authentic, royal-grade dry fruits accessible to every Indian family at fair, transparent prices without high distributor markups.
          </p>
        </div>
      </div>

      {/* Trust Stats Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#061c13] border border-white/10 rounded-2xl p-4 text-center space-y-1">
          <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#fae69e] block">1,50,000+</span>
          <p className="text-xs text-[#c8c0b0]">Happy Families Across India</p>
        </div>

        <div className="bg-[#061c13] border border-white/10 rounded-2xl p-4 text-center space-y-1">
          <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#10b981] block">4.9 / 5.0</span>
          <p className="text-xs text-[#c8c0b0]">Customer Rating (7,890+ Reviews)</p>
        </div>

        <div className="bg-[#061c13] border border-white/10 rounded-2xl p-4 text-center space-y-1">
          <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#38bdf8] block">100%</span>
          <p className="text-xs text-[#c8c0b0]">Pure Vegetarian &amp; Chemical Free</p>
        </div>

        <div className="bg-[#061c13] border border-white/10 rounded-2xl p-4 text-center space-y-1">
          <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#f59e0b] block">24 Hours</span>
          <p className="text-xs text-[#c8c0b0]">Express Dispatch Speed</p>
        </div>
      </div>

      {/* Our Sourcing & Quality Standards */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <h3 className="font-cinzel text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#10b981]" />
          <span>Our Direct-from-Orchard Quality Standards</span>
        </h3>

        <p className="text-sm text-[#e2d9c8] leading-relaxed">
          Traditional retail stores pass dry fruits through 4 to 5 middlemen, leading to old stock, artificial polishing, and inflated prices. We bypass this entirely:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#061c13] p-4 rounded-xl border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <strong className="text-white text-sm">W-180 Jumbo Cashews (kaju)</strong>
            </div>
            <p className="text-xs text-gray-300">
              Only the largest whole white cashews are hand-sorted. Rich in creamy natural buttery oils and zero breakage pieces.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <strong className="text-white text-sm">California Nonpareil Almonds (badam)</strong>
            </div>
            <p className="text-xs text-gray-300">
              Sweet, crunchy, and high in Vitamin E and essential Omega-3. Perfectly sized with no bitter kernels.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <strong className="text-white text-sm">Roasted Salted Pistachios (pista)</strong>
            </div>
            <p className="text-xs text-gray-300">
              Naturally split shells roasted to perfection with a light pinch of salt for wholesome daily snacking.
            </p>
          </div>

          <div className="bg-[#061c13] p-4 rounded-xl border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <strong className="text-white text-sm">Golden Long Seedless Raisins (kishmish)</strong>
            </div>
            <p className="text-xs text-gray-300">
              Naturally sun-dried sweet raisins loaded with iron, potassium, and digestive fiber without sulfur treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Vacuum Packaging */}
      <div className="bg-[#092419] border border-[#dfba5d]/40 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
        <h3 className="font-cinzel text-xl font-bold text-[#fae69e] flex items-center gap-2">
          <Factory className="w-5 h-5 text-[#dfba5d]" />
          <span>Hygienic Modern Vacuum-Seal Packaging</span>
        </h3>

        <p className="text-sm text-[#e2d9c8] leading-relaxed">
          Moisture and air are the primary enemies of dry fruit freshness. In our ISO 22000 certified facility in Jaipur, each batch is vacuum-packed into 4 independent 1 KG multi-barrier pouches:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 text-xs text-[#c8c0b0] space-y-1">
            <strong className="text-white block text-sm">Zero Moisture Seepage</strong>
            <p>Airtight nitrogen flush and vacuum sealing keeps crunch fresh for up to 9 months.</p>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 text-xs text-[#c8c0b0] space-y-1">
            <strong className="text-white block text-sm">No Preservatives Needed</strong>
            <p>Because oxygen is extracted, no artificial chemicals or sulfur are used.</p>
          </div>

          <div className="bg-[#061c13] p-3.5 rounded-xl border border-white/5 text-xs text-[#c8c0b0] space-y-1">
            <strong className="text-white block text-sm">FSSAI Certified Facility</strong>
            <p>Strict hygiene protocols, hairnets, and automated robotic weighing machines.</p>
          </div>
        </div>
      </div>

      {/* Official Government & Food Certifications */}
      <div className="bg-[#061c13] border border-[#dfba5d]/40 rounded-2xl p-6 shadow-xl space-y-3">
        <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#fae69e] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#10b981]" />
          <span>Certifications &amp; Accreditations</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#e2d9c8]">
          <div className="bg-[#092419] p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-0.5">FSSAI License #10022013000845</strong>
            <span>Food Safety and Standards Authority of India certified</span>
          </div>

          <div className="bg-[#092419] p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-0.5">ISO 22000:2018 Certified</strong>
            <span>International benchmark for food manufacturing safety</span>
          </div>

          <div className="bg-[#092419] p-3 rounded-xl border border-white/5">
            <strong className="text-white block mb-0.5">100% Pure Vegetarian (Green Dot)</strong>
            <span>Guaranteed pure plant-based natural superfoods</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
