import React from 'react';
import { ShieldCheck, PackageCheck, Truck, RotateCcw, Award, CheckCircle } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#10b981]" />,
      title: "100% Pure & Natural",
      desc: "Directly sourced from trusted orchards. Free from any artificial color, chemicals, or polish."
    },
    {
      icon: <PackageCheck className="w-7 h-7 text-[#38bdf8]" />,
      title: "Hygienic Packaging",
      desc: "Food-grade vacuum sealed airtight packets that lock in crunchiness and natural nutritional freshness."
    },
    {
      icon: <Truck className="w-7 h-7 text-[#f59e0b]" />,
      title: "Free Fast Delivery",
      desc: "Express pan-India delivery with live tracking. Safely delivered to your doorstep in 2 to 4 days."
    },
    {
      icon: <RotateCcw className="w-7 h-7 text-[#ec4899]" />,
      title: "7-Day Money-Back Guarantee",
      desc: "If you are not 100% satisfied with the quality of nuts, we offer a hassle-free full refund."
    }
  ];

  return (
    <section className="my-10 bg-gradient-to-r from-[#071d14] via-[#0b2b1e] to-[#071d14] border border-[#c59b27]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-[#061810]/60 border border-[#c59b27]/20">
            <div className="w-14 h-14 rounded-full bg-[#0a271b] border border-[#c59b27]/40 flex items-center justify-center mb-3 shadow-md">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-[#fae69e] mb-1 font-cinzel">
              {item.title}
            </h3>
            <p className="text-xs text-[#cfc7b8] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Certification Banner */}
      <div className="mt-6 pt-4 border-t border-[#c59b27]/20 flex flex-wrap items-center justify-around gap-4 text-xs text-[#fae69e]">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#dfba5d]" />
          <span>FSSAI License Certified: <strong>#10022013000845</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-[#10b981]" />
          <span>ISO 22000 Food Safety Standards Certified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
          <span>100% Pure Vegetarian Certified</span>
        </div>
      </div>
    </section>
  );
};
