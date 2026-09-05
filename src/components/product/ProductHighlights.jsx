import React from "react";
import { Shield, Truck, RotateCcw, Award } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function ProductHighlights() {
  const highlights = [
    { icon: Award, label: "100% Genuine" },
    { icon: Shield, label: "1-Yr Brand Warranty" },
    { icon: Truck, label: "Free 2-Day Delivery" },
    { icon: RotateCcw, label: "7-Day Replacement" },
  ];

  return (
    <div className="px-4 pt-4">
      <div className="grid grid-cols-2 gap-2">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-xl border bg-white"
              style={{ borderColor: T.line }}
            >
              <Icon size={14} color={T.purple600} />
              <span className="text-[11px] font-medium" style={{ color: T.ink }}>
                {h.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
