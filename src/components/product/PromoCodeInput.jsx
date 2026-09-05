import React, { useState } from "react";
import { Tag, CheckCircle2, X } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function PromoCodeInput({ activePromo, onApplyPromo, onRemovePromo }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = (inputCode) => {
    const clean = (inputCode || code).trim().toUpperCase();
    if (clean === "1FIFIRST") {
      onApplyPromo({ code: "1FIFIRST", discount: 500, label: "₹500 Instant Discount" });
      setError("");
      setCode("");
    } else if (clean === "ZEROFEES") {
      onApplyPromo({ code: "ZEROFEES", waiveFee: true, label: "Zero Convenience Fee" });
      setError("");
      setCode("");
    } else {
      setError("Invalid promo code. Try 1FIFIRST or ZEROFEES");
    }
  };

  if (activePromo) {
    return (
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between p-3 rounded-xl border bg-green-50/70 border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} color="#16A34A" />
            <div>
              <p className="text-xs font-bold text-green-900">{activePromo.code} Applied</p>
              <p className="text-[11px] text-green-700">{activePromo.label}</p>
            </div>
          </div>
          <button onClick={onRemovePromo} className="p-1 rounded-full hover:bg-green-100">
            <X size={14} color="#16A34A" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4">
      <p className="text-xs font-semibold mb-1.5" style={{ color: T.sub }}>
        APPLY PROMO / VOUCHER
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} color={T.sub} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter code (e.g. 1FIFIRST)"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            className="w-full pl-8 pr-3 py-2 text-xs uppercase font-medium bg-white rounded-xl border outline-none focus:border-purple-600"
            style={{ borderColor: T.line }}
          />
        </div>
        <button
          onClick={() => handleApply()}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-opacity active:opacity-90"
          style={{ background: T.purple700 }}
        >
          Apply
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-1.5">
        <span className="text-[10px] text-gray-500">Try:</span>
        <button
          onClick={() => handleApply("1FIFIRST")}
          className="text-[10px] font-bold underline text-purple-700"
        >
          1FIFIRST
        </button>
        <span className="text-[10px] text-gray-400">·</span>
        <button
          onClick={() => handleApply("ZEROFEES")}
          className="text-[10px] font-bold underline text-purple-700"
        >
          ZEROFEES
        </button>
      </div>

      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}
