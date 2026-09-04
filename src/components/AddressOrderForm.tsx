import React, { useState } from 'react';
import { INDIAN_STATES, PRODUCT_DATA } from '../data/productData';
import { OrderAddress } from '../types';
import { MapPin, Phone, User, Home, Building2, Truck, ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface AddressOrderFormProps {
  onProceedToPayment: (addressData: OrderAddress) => void;
}

export const AddressOrderForm: React.FC<AddressOrderFormProps> = ({ onProceedToPayment }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    altPhone: '',
    addressLine: '',
    landmark: '',
    city: '',
    state: INDIAN_STATES[0],
    pincode: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculateTotal = () => {
    if (quantity === 1) return PRODUCT_DATA.salePrice; // ₹265
    return 499; // Special deal for 2 combo packs
  };

  const calculateSavings = () => {
    if (quantity === 1) return PRODUCT_DATA.mrp - PRODUCT_DATA.salePrice;
    return PRODUCT_DATA.mrp * 2 - 499;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 letters)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.addressLine.trim() || formData.addressLine.trim().length < 8) {
      newErrors.addressLine = 'Please enter your complete address (House no., Street, Colony/Area)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city / district';
    }

    const cleanPin = formData.pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit postal pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onProceedToPayment({
        ...formData,
        quantity
      });
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
    }
  };

  return (
    <section id="order-section" className="my-12 max-w-4xl mx-auto">
      <div className="bg-gradient-to-b from-[#092419] to-[#04140d] border-2 border-[#dfba5d] rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#dfba5d]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#0e3b26] border border-[#c59b27]/60 text-[#fae69e] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5d061]" />
            <span>Express Online Order (Free Delivery)</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#fae69e] font-black">
            Enter Delivery Details & Complete Order
          </h2>
          <p className="text-xs sm:text-sm text-[#d8cfbe] mt-1 max-w-lg mx-auto">
            Fill your shipping address below. You can make an instant online payment via UPI, PhonePe, Google Pay, Paytm, or Debit/Credit Cards on the next step.
          </p>
        </div>

        {/* Pack Selection Cards */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#fae69e] mb-2 font-cinzel">
            1. Select Combo Pack Quantity:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1 Pack Option */}
            <div
              onClick={() => setQuantity(1)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-center justify-between relative ${
                quantity === 1
                  ? 'bg-[#0f3825] border-[#dfba5d] shadow-lg shadow-[#dfba5d]/20 scale-[1.01]'
                  : 'bg-[#061c13] border-white/10 opacity-75 hover:opacity-100 hover:border-[#dfba5d]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="pack-1"
                  name="quantitySelect"
                  checked={quantity === 1}
                  onChange={() => setQuantity(1)}
                  className="accent-[#dfba5d] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm sm:text-base">1 Combo Pack (4 KG Total)</h4>
                    <span className="bg-[#dc2626] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      92% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#fae69e]">1kg Kaju + 1kg Badam + 1kg Pista + 1kg Kishmish</p>
                  <p className="text-[11px] text-[#7ee787]">Free Delivery + Save ₹3,234</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 line-through block">₹3,499</span>
                <span className="text-2xl font-black text-gold-gradient">₹265</span>
              </div>
            </div>

            {/* 2 Packs Option (Extra Value) */}
            <div
              onClick={() => setQuantity(2)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-center justify-between relative ${
                quantity === 2
                  ? 'bg-[#0f3825] border-[#dfba5d] shadow-lg shadow-[#dfba5d]/20 scale-[1.01]'
                  : 'bg-[#061c13] border-white/10 opacity-75 hover:opacity-100 hover:border-[#dfba5d]/50'
              }`}
            >
              <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Family Best Value
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="pack-2"
                  name="quantitySelect"
                  checked={quantity === 2}
                  onChange={() => setQuantity(2)}
                  className="accent-[#dfba5d] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm sm:text-base">2 Combo Packs (8 KG Total)</h4>
                  </div>
                  <p className="text-xs text-[#fae69e]">2kg Kaju + 2kg Badam + 2kg Pista + 2kg Kishmish</p>
                  <p className="text-[11px] text-[#7ee787]">Mega Saver Pack • Only ₹499</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 line-through block">₹6,998</span>
                <span className="text-2xl font-black text-gold-gradient">₹499</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#fae69e] font-cinzel">
            2. Customer Name & Delivery Address:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-gray-300 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-300 mb-1">
                10-Digit Mobile Number (for Delivery SMS) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 pl-16 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Address Line */}
          <div>
            <label htmlFor="addressLine" className="block text-xs font-medium text-gray-300 mb-1">
              Complete Delivery Address (House/Flat No., Building, Street, Colony) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Home className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                id="addressLine"
                name="addressLine"
                placeholder="e.g. Flat No. 402, Royal Residency, Sector 14"
                value={formData.addressLine}
                onChange={handleChange}
                className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
              />
            </div>
            {errors.addressLine && <p className="text-red-400 text-xs mt-1">{errors.addressLine}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Landmark */}
            <div>
              <label htmlFor="landmark" className="block text-xs font-medium text-gray-300 mb-1">
                Nearby Landmark (Optional)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  placeholder="Near Hanuman Temple"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xs font-medium text-gray-300 mb-1">
                City / District <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g. Jaipur"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
                />
              </div>
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-xs font-medium text-gray-300 mb-1">
                6-Digit Postal Pincode <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                maxLength={6}
                placeholder="302001"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
              />
              {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
            </div>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-xs font-medium text-gray-300 mb-1">
              Select State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-[#05170f] border border-[#dfba5d]/40 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#dfba5d] focus:ring-1 focus:ring-[#dfba5d]"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st} className="bg-[#092218] text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Bill Summary Box */}
          <div className="bg-[#05170f] border border-[#dfba5d]/30 rounded-2xl p-4 mt-6">
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>{quantity} x Rajshahi Nuts 4 KG Combo Pack:</span>
              <span>₹{quantity === 1 ? PRODUCT_DATA.mrp : PRODUCT_DATA.mrp * 2}</span>
            </div>
            <div className="flex justify-between text-xs text-[#10b981] mb-1">
              <span>Special Promotional Discount:</span>
              <span>-₹{calculateSavings()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#10b981] mb-2 pb-2 border-b border-white/10">
              <span>Express All-India Delivery:</span>
              <span className="font-bold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between items-baseline font-bold text-sm sm:text-base">
              <span className="text-white">Net Payable Amount:</span>
              <span className="text-2xl sm:text-3xl font-black text-gold-gradient">
                ₹{calculateTotal()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="proceed-payment-btn"
              className="cursor-pointer w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-[0.99] text-[#091f15] font-black text-base sm:text-lg shadow-2xl shadow-[#dfba5d]/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider border border-white/40"
            >
              <Lock className="w-5 h-5" />
              <span>Proceed to Secure Payment (₹{calculateTotal()})</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 pt-2">
            <span className="flex items-center gap-1 text-[#10b981]">
              <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#38bdf8]">
              <Truck className="w-4 h-4" /> Dispatched within 24 Hours
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#fae69e]">
              <Lock className="w-4 h-4" /> 100% Safe Online Gateway
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
