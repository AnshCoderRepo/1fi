import React from "react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function DownPaymentSlider({ totalAmount, downPayment, onChange }) {
  const maxDownPayment = Math.floor(totalAmount * 0.5); // Max 50% down payment
  const presets = [
    { label: "₹0 Down", value: 0 },
    { label: "10%", value: Math.round(totalAmount * 0.1) },
    { label: "25%", value: Math.round(totalAmount * 0.25) },
    { label: "50%", value: maxDownPayment },
  ];

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-semibold" style={{ color: T.sub }}>
          CUSTOM DOWN PAYMENT (OPTIONAL)
        </p>
        <span className="text-xs font-bold" style={{ color: T.purple700 }}>
          {rupee(downPayment)}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max={maxDownPayment}
        step={500}
        value={downPayment}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-purple-700 h-2 bg-gray-200 rounded-lg cursor-pointer"
      />

      <div className="flex gap-2 mt-2">
        {presets.map((p) => {
          const active = downPayment === p.value;
          return (
            <button
              key={p.label}
              onClick={() => onChange(p.value)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors"
              style={{
                borderColor: active ? T.purple600 : T.line,
                background: active ? `${T.purple600}14` : T.card,
                color: active ? T.purple700 : T.sub,
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
