import React from "react";
import { CheckCircle2, Sparkles, ShieldCheck, Download, ArrowLeft } from "lucide-react";
import TopBar from "../common/TopBar.jsx";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function Confirmation({ order, onDone, onShowToast }) {
  const handleDownloadReceipt = () => {
    onShowToast?.("Order & Mandate receipt downloaded!", "success");
  };

  return (
    <div className="pb-12">
      <TopBar title="Order Confirmation" onBack={onDone} />

      <div className="flex flex-col items-center text-center px-5 pt-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3.5 shadow-sm"
          style={{ background: "#DCFCE7" }}
        >
          <CheckCircle2 size={34} color="#16A34A" strokeWidth={2.5} />
        </div>

        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1" style={{ background: "#F4F0FD", color: T.purple700 }}>
          0% EMI Activated
        </span>
        <p className="font-extrabold text-xl" style={{ color: T.ink }}>
          Instalment Plan Confirmed
        </p>
        <p className="text-xs mt-1 text-gray-500 max-w-xs">
          Your 1Fi 0% EMI has been approved and linked to your auto-debit account.
        </p>

        {/* Order & Financing Breakdown Card */}
        <div
          className="w-full rounded-2xl border mt-5 p-4 text-left shadow-sm space-y-2.5"
          style={{ borderColor: T.line, background: T.card }}
        >
          <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: T.line }}>
            <div>
              <p className="text-xs font-bold" style={{ color: T.ink }}>{order.product.name}</p>
              <p className="text-[11px] text-gray-500">{order.variant.label}</p>
            </div>
            <p className="text-xs font-bold" style={{ color: T.ink }}>{rupee(order.variant.price)}</p>
          </div>

          {order.plan.discount > 0 && (
            <div className="flex justify-between text-xs text-green-700">
              <span>Promo Discount</span>
              <span className="font-semibold">- {rupee(order.plan.discount)}</span>
            </div>
          )}

          {order.plan.downPayment > 0 && (
            <div className="flex justify-between text-xs" style={{ color: T.sub }}>
              <span>Down Payment Paid</span>
              <span className="font-semibold" style={{ color: T.ink }}>{rupee(order.plan.downPayment)}</span>
            </div>
          )}

          <div className="flex justify-between text-xs" style={{ color: T.sub }}>
            <span>Financed via 1Fi</span>
            <span className="font-semibold" style={{ color: T.ink }}>{rupee(order.plan.netFinancedAmount)}</span>
          </div>

          <div className="flex justify-between text-xs" style={{ color: T.sub }}>
            <span>Tenure & EMI</span>
            <span className="font-bold text-purple-700">
              {order.plan.months} months @ {rupee(order.plan.monthly)}/mo
            </span>
          </div>

          <div className="flex justify-between text-xs" style={{ color: T.sub }}>
            <span>Interest Rate</span>
            <span className="font-bold text-green-700">0% (Zero Interest)</span>
          </div>

          <div className="flex justify-between text-xs" style={{ color: T.sub }}>
            <span>Convenience Fee</span>
            <span className="font-semibold" style={{ color: T.ink }}>
              {order.plan.convenienceFee > 0 ? rupee(order.plan.convenienceFee) : "₹0 (Waived)"}
            </span>
          </div>

          <div className="pt-2 border-t flex justify-between items-center" style={{ borderColor: T.line }}>
            <span className="text-xs font-bold" style={{ color: T.ink }}>Total Amount Payable</span>
            <span className="text-base font-extrabold" style={{ color: T.purple700 }}>
              {rupee(order.plan.totalPayable + (order.plan.downPayment || 0))}
            </span>
          </div>
        </div>

        {/* Mandate Details Card */}
        <div
          className="w-full rounded-2xl border mt-3 p-3.5 text-left bg-purple-50/40"
          style={{ borderColor: "#DDD3F8" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck size={16} color={T.purple700} />
            <span className="text-xs font-bold text-purple-950">AutoPay Mandate Linked</span>
          </div>
          <p className="text-[11px] text-gray-600">
            Mandate Ref: <span className="font-mono font-medium text-purple-900">{order.mandateRef || "1FI-MANDATE-849201"}</span>
          </p>
          <p className="text-[11px] text-gray-600 mt-0.5">
            Monthly Auto-debit on the 1st of every month.
          </p>
        </div>

        {/* Actions */}
        <div className="w-full space-y-2.5 mt-6">
          <button
            onClick={onDone}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-md transition-transform active:scale-95"
            style={{ background: T.purple700 }}
          >
            Back to Marketplace
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="w-full py-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors hover:bg-gray-50"
            style={{ borderColor: T.line, color: T.ink }}
          >
            <Download size={14} /> Download EMI Mandate Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
