import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { OrderConfirmation } from '../types';
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
  ShieldCheck,
  FileText
} from 'lucide-react';

interface OrderSuccessViewProps {
  order: OrderConfirmation;
  onReset: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ order, onReset }) => {
  const [downloaded, setDownloaded] = useState(false);

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

  const handleDownloadInvoice = () => {
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const invoiceHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tax Invoice - Rajshahi Nuts - ${order.orderId}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; color: #1e293b; padding: 24px 16px; }
    .invoice-card { max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 24px; gap: 16px; }
    .brand-section { display: flex; align-items: center; gap: 16px; }
    .brand-logo-img { width: 72px; height: 72px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); flex-shrink: 0; background: #072417; }
    .brand-title { font-size: 24px; font-weight: 800; color: #064e3b; letter-spacing: -0.5px; line-height: 1.2; }
    .brand-sub { font-size: 12px; color: #64748b; margin-top: 3px; }
    .brand-reg { font-size: 11px; color: #94a3b8; margin-top: 2px; }
    .invoice-badge { background: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; border: 1px solid #a7f3d0; text-transform: uppercase; display: inline-block; margin-bottom: 8px; }
    .invoice-num { font-size: 15px; font-weight: 700; color: #0f172a; font-family: monospace; }
    .invoice-date { font-size: 12px; color: #64748b; margin-top: 2px; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
    .detail-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 13px; line-height: 1.6; }
    .detail-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
    .items-table th { background: #f1f5f9; color: #475569; font-weight: 700; text-align: left; padding: 12px 14px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; font-size: 12px; text-transform: uppercase; }
    .items-table td { padding: 14px; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
    .total-section { background: #f8fafc; border-radius: 12px; padding: 16px; margin-left: auto; max-width: 320px; font-size: 13px; }
    .total-row { display: flex; justify-content: space-between; padding: 4px 0; color: #64748b; }
    .total-grand { display: flex; justify-content: space-between; padding: 8px 0 0; border-top: 2px solid #cbd5e1; font-size: 18px; font-weight: 800; color: #064e3b; margin-top: 6px; }
    .badge-paid { background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid #86efac; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6; }
    .print-btn-bar { text-align: center; margin-bottom: 16px; }
    .print-btn { background: #064e3b; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; }
    @media print {
      body { background: #ffffff; padding: 0; }
      .invoice-card { box-shadow: none; border: none; padding: 0; }
      .print-btn-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-btn-bar">
    <button class="print-btn" onclick="window.print()">🖨️ Print or Save as PDF</button>
  </div>
  <div class="invoice-card">
    <div class="header">
      <div class="brand-section">
        <!-- Official Website Logo (Embedded Vector SVG for Razor Sharp Printing Everywhere) -->
        <div class="brand-logo-img">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="72" height="72">
            <defs>
              <linearGradient id="invGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fceda2"/>
                <stop offset="35%" stop-color="#dfba5d"/>
                <stop offset="70%" stop-color="#aa7f1d"/>
                <stop offset="100%" stop-color="#694b08"/>
              </linearGradient>
              <linearGradient id="invInnerGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0e3824"/>
                <stop offset="60%" stop-color="#061f14"/>
                <stop offset="100%" stop-color="#020e08"/>
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="96" fill="url(#invGoldRim)"/>
            <circle cx="100" cy="100" r="90" fill="#03120b"/>
            <circle cx="100" cy="100" r="87" fill="none" stroke="#dfba5d" stroke-width="1.5" stroke-dasharray="4,2"/>
            <circle cx="100" cy="100" r="82" fill="url(#invInnerGreen)"/>
            <g transform="translate(100, 48)">
              <path d="M -24 14 L -20 -4 L -8 6 L 0 -12 L 8 6 L 20 -4 L 24 14 Z" fill="url(#invGoldRim)" stroke="#593e06" stroke-width="1"/>
              <circle cx="-20" cy="-6" r="2.5" fill="#fff5cc"/>
              <circle cx="0" cy="-14" r="3" fill="#fff5cc"/>
              <circle cx="20" cy="-6" r="2.5" fill="#fff5cc"/>
              <rect x="-24" y="15" width="48" height="4" rx="2" fill="url(#invGoldRim)"/>
            </g>
            <text x="100" y="112" font-family="'Cinzel', Georgia, serif" font-size="44" font-weight="900" fill="url(#invGoldRim)" text-anchor="middle" letter-spacing="3">RN</text>
            <rect x="25" y="124" width="150" height="22" rx="11" fill="#072b1c" stroke="#dfba5d" stroke-width="1.5"/>
            <text x="100" y="139" font-family="'Cinzel', Georgia, sans-serif" font-size="11" font-weight="900" fill="#fae69e" text-anchor="middle" letter-spacing="2">RAJSHAHI NUTS</text>
            <text x="100" y="160" font-family="sans-serif" font-size="8" font-weight="800" fill="#c59b27" text-anchor="middle" letter-spacing="3">ROYAL DRY FRUITS</text>
            <text x="100" y="174" font-family="sans-serif" font-size="7" font-weight="600" fill="#88b59e" text-anchor="middle" letter-spacing="1">100% PURE &amp; NATURAL</text>
          </svg>
        </div>
        <div>
          <div class="brand-title">RAJSHAHI NUTS</div>
          <div class="brand-sub">Premium Royal Dry Fruits • 100% Certified Organic</div>
          <div class="brand-sub">Toll Free: 1800-265-NUTS • support@rajshahinuts.com</div>
          <div class="brand-reg">Govt FSSAI Lic: 10020011000452 • GSTIN: 08AAACR1234F1Z5</div>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="invoice-badge">Tax Invoice / Receipt</span>
        <div class="invoice-num">#${order.orderId}</div>
        <div class="invoice-date">Date: ${formattedDate}, ${formattedTime}</div>
        <div style="margin-top: 6px;"><span class="badge-paid">PAID ONLINE ✓</span></div>
      </div>
    </div>

    <div class="details-grid">
      <div class="detail-box">
        <div class="detail-label">Billed & Shipped To:</div>
        <strong>${order.customer.fullName}</strong><br>
        Phone: +91 ${order.customer.phone}<br>
        ${order.customer.addressLine}, ${order.customer.landmark ? order.customer.landmark + ', ' : ''}<br>
        ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}<br>
        Country: India
      </div>
      <div class="detail-box">
        <div class="detail-label">Payment & Delivery Info:</div>
        <strong>Payment Status:</strong> Successful (100% Pre-Paid)<br>
        <strong>Payment Method:</strong> ${order.paymentMethod}<br>
        <strong>Transaction Reference:</strong> ${order.transactionId}<br>
        <strong>Est. Delivery:</strong> ${order.estimatedDelivery}<br>
        <strong>Dispatch Status:</strong> Packaging in Progress 📦
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Unit Price</th>
          <th style="text-align: right;">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Rajshahi Nuts 4 KG Combo Pack</strong><br>
            <span style="font-size: 11px; color: #64748b;">
              Includes: 1 KG California Almonds + 1 KG Cashews + 1 KG Afghan Raisins + 1 KG Roasted Pistachios
            </span>
          </td>
          <td style="text-align: center;">${order.customer.quantity}</td>
          <td style="text-align: right;">₹${order.amount}</td>
          <td style="text-align: right;"><strong>₹${order.amount}</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="total-section">
      <div class="total-row">
        <span>Subtotal:</span>
        <span>₹${order.amount}</span>
      </div>
      <div class="total-row">
        <span>Delivery / Shipping:</span>
        <span style="color: #15803d; font-weight: 600;">FREE (₹0)</span>
      </div>
      <div class="total-row">
        <span>GST & Packaging:</span>
        <span>Included (₹0)</span>
      </div>
      <div class="total-grand">
        <span>Total Paid:</span>
        <span>₹${order.amount}</span>
      </div>
    </div>

    <div class="footer">
      <p><strong>Thank you for choosing Rajshahi Nuts!</strong></p>
      <p>This is a computer-generated tax invoice and requires no physical signature. Keep this receipt for your records.</p>
      <p>For any queries or tracking assistance, contact 1800-265-NUTS (9 AM to 9 PM) or WhatsApp +91 9876543210.</p>
    </div>
  </div>
</body>
</html>`;

      // 1. Trigger actual file download
      const blob = new Blob([invoiceHTML], { type: 'text/html;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = `Rajshahi_Nuts_Invoice_${order.orderId}.html`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);

      // 2. Also open printable window if permitted
      try {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.open();
          printWindow.document.write(invoiceHTML);
          printWindow.document.close();
        }
      } catch (e) {
        // popup might be blocked, download already succeeded
      }

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 5000);
    } catch (err) {
      console.error('Invoice download failed:', err);
      // Fallback: window print
      window.print();
    }
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
        {/* Top Brand Celebration Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#10b981] to-[#34d399] mx-auto flex items-center justify-center shadow-lg shadow-[#10b981]/30 mb-3 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-[#051e13]" />
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
                src="/logo.svg"
                alt="Rajshahi Nuts Royal Emblem"
                className="w-14 h-14 object-contain rounded-full border-2 border-[#dfba5d] shadow-md bg-[#072417] p-1 shrink-0"
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
              <span className="text-[10px] text-[#10b981] block font-medium">✓ Paid via {order.paymentMethod}</span>
            </div>
          </div>

          {/* Payment Receipt / Screenshot Verification */}
          {order.paymentScreenshot && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs bg-[#072418]/60 p-2.5 rounded-xl border border-[#10b981]/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                <div>
                  <span className="font-bold text-[#a7f3d0] block text-[11px]">Payment Receipt Verified ✓</span>
                  <span className="text-[10px] text-gray-300">Transaction screenshot attached successfully</span>
                </div>
              </div>
              <img
                src={order.paymentScreenshot}
                alt="Payment Screenshot Receipt"
                className="w-10 h-10 object-cover rounded-lg border border-[#dfba5d] shadow"
              />
            </div>
          )}

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
            onClick={handleDownloadInvoice}
            className="cursor-pointer py-3 px-4 rounded-xl bg-gradient-to-r from-[#dfba5d] via-[#fae69e] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#062013] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#062013]" />
                <span>Invoice Downloaded ✓</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#062013]" />
                <span>Download Invoice Receipt</span>
              </>
            )}
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
