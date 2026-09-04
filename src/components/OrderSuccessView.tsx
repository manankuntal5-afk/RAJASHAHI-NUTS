import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { OrderConfirmation } from '../types';
import mainPosterImage from '../assets/images/regenerated_image_1788437822458.webp';
import {
  CheckCircle2,
  Package,
  Truck,
  Download,
  Share2,
  PhoneCall,
  Home,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface OrderSuccessViewProps {
  order: OrderConfirmation;
  onReset: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ order, onReset }) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback if confetti fails
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello! I have placed an order for Rajshahi Nuts 4 KG Combo Pack. My Order ID is: ${order.orderId}. Please share my shipment tracking details.`
    );
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#06160f] py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gradient-to-b from-[#0a271c] via-[#071d15] to-[#04120c] border-2 border-[#dfba5d] rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
        {/* Top Celebration Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#10b981] to-[#34d399] mx-auto flex items-center justify-center shadow-lg shadow-[#10b981]/30 mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-[#051e13]" />
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#fae69e] bg-[#0e3b26] px-3.5 py-1 rounded-full border border-[#c59b27]/40 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5d061]" />
            <span>Online Payment Successful</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-[#fae69e]">
            Congratulations! Your Order is Confirmed
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Thank you, <strong className="text-white">{order.customer.fullName}</strong>. We have received your payment of <strong className="text-[#fae69e]">₹{order.amount}</strong> via {order.paymentMethod}.
          </p>
        </div>

        {/* Order Receipt Card */}
        <div className="bg-[#05170f] border border-[#dfba5d]/40 rounded-2xl p-5 mb-6 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-gray-400 block text-[11px]">ORDER ID:</span>
              <span className="font-mono font-bold text-base text-[#fae69e]">{order.orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[11px]">TRANSACTION ID:</span>
              <span className="font-mono font-semibold text-gray-300">{order.transactionId}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-1 text-xs">
            <div className="flex items-center gap-2.5">
              <img
                src={mainPosterImage}
                alt="Rajshahi Nuts 4 KG Combo"
                referrerPolicy="no-referrer"
                className="w-12 h-14 object-cover rounded-lg border border-[#dfba5d]/50 shrink-0 bg-[#072417]"
              />
              <div>
                <span className="text-gray-400 block text-[11px]">Item Ordered:</span>
                <span className="font-bold text-white leading-tight block">
                  {order.customer.quantity}x Rajshahi Nuts 4 KG Combo
                </span>
                <span className="text-[10px] text-[#fae69e] block mt-0.5">
                  Royal Dry Fruits Pack (Net Weight: 4 KG)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block">Amount Paid:</span>
              <span className="font-bold text-lg text-gold-gradient">₹{order.amount}</span>
              <span className="text-[10px] text-[#10b981] block">Paid via {order.paymentMethod}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-3 border-t border-white/10 text-xs">
            <span className="text-gray-400 flex items-center gap-1 mb-1">
              <Home className="w-3.5 h-3.5 text-[#dfba5d]" /> Shipping Delivery Address:
            </span>
            <p className="text-gray-200 font-medium">
              {order.customer.fullName} ({order.customer.phone})
            </p>
            <p className="text-gray-300">
              {order.customer.addressLine}, {order.customer.landmark && `${order.customer.landmark}, `}
              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </p>
          </div>

          {/* Estimated Delivery */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#6ee7b7]">
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-[#10b981]" /> Estimated Doorstep Delivery:
            </span>
            <span className="font-bold text-white">{order.estimatedDelivery}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleWhatsAppShare}
            className="cursor-pointer py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#062013] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Get Tracking on WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="cursor-pointer py-3 px-4 rounded-xl bg-[#0e3b26] hover:bg-[#124d32] border border-[#dfba5d]/50 text-[#fae69e] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice Receipt</span>
          </button>
        </div>

        {/* Support note */}
        <div className="text-center text-xs text-gray-400 pt-4 border-t border-white/10">
          <p className="flex items-center justify-center gap-1 text-[#fae69e] mb-1">
            <PhoneCall className="w-3.5 h-3.5" /> Helpline: 1800-265-NUTS (9:00 AM - 9:00 PM)
          </p>
          <p>An order confirmation receipt and SMS tracking link has been dispatched to your mobile number.</p>

          <button
            onClick={onReset}
            className="cursor-pointer mt-4 inline-block text-xs text-[#dfba5d] hover:underline"
          >
            ← Back to Store Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
